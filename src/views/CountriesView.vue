<template>
  <header>
      <h1>List of countries</h1>
      <SearchBar/>
  </header>
  <FilterBar
    v-model:countries_sort_type="countries_sort_type"
    v-model:reversed="reversed"
    v-model:region_filter="region_filter"
  />
  <div class="countries">
    <ErrorMessage v-if="countries.length === 0"/>
    <CountryLink
      v-for="(country, idx) in countries"
      :key="idx"
      :id="idx"
      :name="country.name.official ? country.name.official : country.name"
      :flag="country.flags.svg"
    />
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import FilterBar from "@/components/FilterBar.vue";
import CountryLink from "@/components/CountryLink.vue";
import ErrorMessage from "@/components/icons/ErrorMessage.vue";

export default {
  name: 'CountriesView',
  components: {
    SearchBar,
    FilterBar,
    CountryLink,
    ErrorMessage,
  },
  data() {
    return {
      countries_sort_type: localStorage.getItem("countries_sort_type") || "name",
      reversed: localStorage.getItem("reversed") || "off",
      region_filter: localStorage.getItem("region_filter") || "all",
    }
  },
  created () {
    this.$store.dispatch('loadCountries')
    .then(() => {
      this.$store.dispatch('loadRegions');
      console.log(this.$store.getters.getCountries);
    });
  },
  computed:  {
    countries() {
      // GETTER
      const countries = this.$store.getters.getCountries;
      const field = this.countries_sort_type;
      const reversed = this.reversed === "on" ? -1 : 1;

      const region_filter_func = (a) => this.region_filter === "all" ? true : a.region.toLowerCase().includes(this.region_filter.toLowerCase());
      const name_comparator = (a, b) => a[field].official ? a[field].official.localeCompare(b[field].official) * reversed : a[field].localeCompare(b[field]) * reversed;
      const numeric_code_comparator = (a, b) => a[field] ? (b[field] - a[field]) * reversed < 0 : (b.ccn3 - a.ccn3) * reversed < 0;
      const comparator = ['name'].includes(field) ? name_comparator : numeric_code_comparator;
      
      return countries
          .filter(region_filter_func)
          .sort(comparator)
    }
  }
}
</script>

<style scoped>
header {
  justify-content: space-between;
  border-bottom: 1px solid var(--light-grey);
}

.countries {
  width: 100%;
  height: calc(100% - var(--header-height));
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
  padding: 15px;
  margin: calc(var(--header-height) + var(--filter-bar-height)) 0 0 0;
}
</style>