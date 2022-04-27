<template>
  <h1>Countries</h1>
  <div class="countries">
    <router-link  v-for="(country, idx) in countries" :key="idx">
      <h2 class="country__title">{{country.name}}</h2>
    </router-link>
  </div>
</template>
<script>


export default {
  name: 'CountriesView',
  // computed:  {
  //   countries() {

  //     // Getters
  //     return this.$store.getters.getCountries;
  //   }
  // }
}
</script>

<style scoped>

</style>