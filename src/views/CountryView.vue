<template>
  <div class="country">
    <h1 class="country_name">{{ country.name }}</h1>
    <div class="container">
      <div class="caracteristics">

      </div>
      <div class="flag">
        <img class="flag_picture" :src="country.flags.svg"/>
        <span class="label">{{ country.name + " flag"}}</span>
      </div>
    </div>
    <router-link
      :to="{name :'home'}"
      class="back_button"
    >
    ← Retour
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'CountryView',
  props: {
    id: String,
  },
  created () {
    // ACTION
    this.$store.dispatch('findCurrentCountry', this.id);
  },
  computed: {
    country: function() {
      // GETTER
      console.log(this.$store.getters.getCurrentCountry);
      return this.$store.getters.getCurrentCountry;
    }
  },
}
</script>

<style scoped>
  .country {
    width: 100%;
    height: 100%;
  }
  h1 {
    text-align: center;
    padding: 3% 2.5% 2.5% 2.5%;
  }

  .container {
    width: 100%;
    height: 83.5vh;
    display: flex;
  }

  .caracteristics,
  .flag {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
  }

  .flag {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .flag_picture {
    height: 200px;
  }

  .flag .label {
    color:var(--discret-font-color);
    font-style: italic;
    padding: 15px 0;
  }

  .back_button {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 30px;
  }

</style>