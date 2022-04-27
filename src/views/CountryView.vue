<template>
  <div class="country">
    <h1 class="country_name">{{ country.name }}</h1>
     <router-link :to="{name :'home'}" class="back_button">← Retour</router-link>
  </div>
</template>

<script>

export default {
  name: 'CountryView',
  props: ['id'],
  created () {
    // action
    this.$store.dispatch('findCurrentCountry', this.id);
  },
  computed: {
    country: function() {
      console.log(this.$store.getters.getCurrentCountry);
      return this.$store.getters.getCurrentCountry;
    }
  },
}
</script>

<style scoped>

</style>