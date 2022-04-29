<template>
  <header>
      <h1>List of countries</h1>
      <SearchBar/>
  </header>
  <FilterBar/>

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
  /*====== ATTRIBUTS ======*/
  name: 'CountriesView',
  components: {
    SearchBar,
    FilterBar,
    CountryLink,
    ErrorMessage,
  },

  /*====== METHODS ======*/
  computed:  {
    countries() {
      // GETTER
      return this.$store.getters.getSortedCountries;
    }
  },

  /*====== HOOKS ======*/
  created () {
    this.$store.dispatch('load_countries')
    .then(() => {
      this.$store.dispatch('loadRegions');
      console.log(this.$store.getters.getCountries);
    });
  },
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