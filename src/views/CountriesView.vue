<template>
  <!-- HEADER -->
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

  <div class="filters_button">
    <FiltersIcon/>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import FilterBar from "@/components/FilterBar.vue";
import CountryLink from "@/components/CountryLink.vue";
import ErrorMessage from "@/components/icons/ErrorMessage.vue";
import FiltersIcon from "@/components/icons/FiltersIcon.vue";

export default {
  /*====== ATTRIBUTS ======*/
  name: 'CountriesView',
  components: {
    SearchBar,
    FilterBar,
    CountryLink,
    ErrorMessage,
    FiltersIcon
  },

  /*====== METHODS ======*/
  computed:  {
    countries() {
      // GETTER
      return this.$store.getters.get_sorted_countries;
    }
  },

  /*====== HOOKS ======*/
  created () {
    this.$store.dispatch('load_countries')
    .then(() => {
      this.$store.dispatch('load_regions');
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
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 15px;
  margin: calc(var(--header-height) + var(--filter-bar-height)) 0 0 0;
}

.filters_button
{
  display: none;
}

@media (max-width: 991.98px)
{
  
}

@media (max-width: 575.98px)
{
  header
  {
    height: calc(2 * var(--header-height));
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .countries
  {
    margin: calc(2 * var(--header-height)) 0 0 0;
  }

  .filters_button
  {
    cursor: pointer;
    background-color: var(--green);
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 15px;
  }
}
</style>