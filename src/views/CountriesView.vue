<template>
  <header>
      <h1>List of countries</h1>
      <SearchBar/>
  </header>
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
import SearchBar from "@/components/SearchBar.vue"
import CountryLink from "@/components/CountryLink.vue";
import ErrorMessage from "@/components/icons/ErrorMessage.vue";

export default {
  name: 'CountriesView',
  components: {
    SearchBar,
    CountryLink,
    ErrorMessage,
  },
  created () {
    this.$store.dispatch('loadCountries');
  },
  computed:  {
    countries() {
      // Getters
      console.log(this.$store.getters.getCountries);
      return this.$store.getters.getCountries;
    }
  }
}
</script>

<style scoped>
header {
  justify-content: space-between;
}

h1 {
  text-align: center;
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
  margin: var(--header-height) 0 0 0;
}
</style>