<template>
  <HeaderBar/>
  <div class="countries">
    <CountryLink
      v-for="(country, idx) in countries"
      :key="idx"
      :id="idx"
      :name="country.name"
      :flag="country.flags.svg"
    />
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
import CountryLink from "@/components/CountryLink.vue";

export default {
  name: 'CountriesView',
  components: {
    HeaderBar,
    CountryLink,
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
h1 {
  text-align: center;
  padding: 3% 2.5% 2.5% 2.5%;
}

.countries {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px 15px 15px;
}
</style>