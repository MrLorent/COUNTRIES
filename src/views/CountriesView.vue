<template>
  <h1>Countries</h1>
  <div class="countries">
    <CountryLink
      v-for="(country, idx) in countries"
      :key="idx"
      :id="idx"
      :name="country.name"
    />
  </div>
</template>

<script>
import CountryLink from "../components/CountryLink.vue";

export default {
  name: 'CountriesView',
  components: {
    CountryLink
  },
  created () {
    // action
    this.$store.dispatch('loadCountries');
  },
  computed:  {
    countries() {
      // Getters
      return this.$store.getters.getCountries;
    }
  }
}
</script>

<style scoped>

</style>