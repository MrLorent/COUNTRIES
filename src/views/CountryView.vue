<template>
  <div class="country">
    <h1 class="country_name">{{ country.name.official ? country.name.official : country.name }}</h1>
    <div class="container">
      <div class="caracteristics">
          <span class="carac name">Name : <strong>{{ country.name.official ? country.name.official : country.name }}</strong></span>
          <span class="carac native_name">Native name : <strong>{{ country.name.nativeName ? country.name.nativeName.eng.official : country.nativeName }}</strong></span>
          <span class="carac capital">Capital : <strong>{{ typeof(country.capital) == "object" ? country.capital[0] : country.capital }}</strong></span>
          <ul class="carac languages">
            Language(s) spoken :
            <li class="language" v-for="(language, idx) in country.languages" :key="idx">- <strong>{{ language.name ? language.name : language}}</strong></li>
          </ul>
          <ul class="carac currencies">
            Currency(ies) :
            <li class="language" v-for="(currency, idx) in country.currencies" :key="idx">- <strong>{{ currency.name }} ({{ currency.symbol }})</strong></li>
          </ul>
      </div>
      <div class="flag">
        <img class="flag_picture" :src="country.flags.svg"/>
        <span class="label">{{ country.name.official ? country.name.official : country.name + " flag"}}</span>
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
    position: relative;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .caracteristics {
    padding: 5%;
  }

  .carac {
    padding: 0 0 15px 0;
  }

  li {
    margin: 10px 0 0 10px;
  }

  .flag {
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