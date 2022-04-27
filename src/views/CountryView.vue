<template>
  <div class="country">
    <router-link :to="{name :'home'}" class="back_button">← Retour</router-link>
    <h1 class="country_name">Country Name</h1>
  </div>
</template>

<script>

export default {
  name: 'CountryView',
  props: {
    id: Number,
  },
//   created () {
//     // action
//     this.$store.dispatch('setCurrentMovie', this.id);
//   },
//   computed: {
//     country: function() {
//       console.log(this.$store.getters.getCurrentMovie);
//       return this.$store.getters.getCurrentMovie;
//     }
//   },
}
</script>

<style scoped>

</style>