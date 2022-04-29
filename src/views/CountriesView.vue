<template>
  <header>
      <h1>List of countries</h1>
      <SearchBar/>
  </header>
  <FilterBar
    v-model:countries_sort_type="countries_sort_type"
    v-model:reversed="reversed"
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
    }
  },
  created () {
    this.$store.dispatch('loadCountries');
  },
  computed:  {
    countries() {
      // Getters
      console.log(this.$store.getters.getCountries);
      const countries = this.$store.getters.getCountries;
      const field = this.countries_sort_type;
      const reversed = this.reversed === "on" ? -1 : 1;

      // const filter_func = (a) =>
      //     a.name.toLowerCase().includes(this.search.toLowerCase());
      const string_comparator = (a, b) => a[field].localeCompare(b[field]) * reversed;
      const number_comparator = (a, b) => (b[field] - a[field]) * reversed < 0;
      const comparator = ['name'].includes(field) ? string_comparator : number_comparator;
      
      return countries
          //.filter(filter_func)
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