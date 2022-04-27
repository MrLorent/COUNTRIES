<template>
  <h1>Countries</h1>
  <div class="countries">
    <div  v-for="(country, idx) in countries" :key="idx">
      <h2 class="country__name">{{country.name}}</h2>
    </div>
  </div>
</template>

<script>


export default {
  name: 'CountriesView',
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