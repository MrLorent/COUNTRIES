<template>
  <header>
    <h1 class="country_name">{{ country.name.official }}</h1>
  </header>
  <div class="country">
      <!-- TEXT DESCRIPTIONS SECTION -->
      <div class="caracteristics">
          <!-- COUNTRY NAME -->
          <div class="carac">
            <span class="label">Name : </span>
            <span class="name">{{ country.name.official }}</span>
          </div>

          <!-- COUNTRY NATIVE NAME -->
          <div class="carac native_name">
            <span class="label">Native name : </span>
            <span class="native_name">{{ country.name.nativeName[Object.keys(country.name.nativeName)[0]].official }}</span>
          </div>

          <!-- COUNTRY CAPITAL -->
          <div class="carac">
            <span class="label">Capital : </span>
            <span class="capital">{{ country.capital[0] }}</span>
          </div>

          <!-- COUNTRY LANGUAGES -->
          <div class="carac">
            <span class="label">Language(s) spoken : </span>
            <ul class="languages">
              <li class="language" v-for="(language, idx) in country.languages" :key="idx">- {{ language }}</li>
            </ul>
          </div>

          <!-- COUNTRY CURRENCIES -->
          <div class="carac">
            <span class="label">Currency(ies) : </span>
            <ul class="carac currencies">
              <li class="language" v-for="(currency, idx) in country.currencies" :key="idx">- {{ currency.name }} ({{ currency.symbol }})</li>
            </ul>
          </div>
      </div>

      <!-- FLAG SECTION -->
      <div class="flag">
        <img class="flag_picture" :src="country.flags.svg"/>
        <span class="label">{{ country.name.official ? country.name.official : country.name + " flag"}}</span>
      </div>
  </div>

  <!-- BACK BUTTON -->
  <router-link
    :to="{name :'home'}"
    class="back_button"
  >
  ← BACK
  </router-link>
</template>

<script>

export default {
  name: 'CountryView',
  props: {
    id: String,
  },
  created () {
    // ACTION
    this.$store.dispatch('loadCurrentCountry', this.id);
  },
  beforeUnmount () {
    // ACTION
    this.$store.dispatch('clearCurrentCountry');
    localStorage.removeItem('current_country');
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
    height: calc(100% - var(--header-height));
    display: flex;
    margin: var(--header-height) 0 0 0;
  }
  
  header {
    justify-content: center;
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
    padding: 0 0 20px 0;
  }

  .carac .label {
    font-weight: bold;
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
    padding: 20px 0;
  }

  .back_button {
    font-style: italic;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 15px;
    margin: 15px;
  }
</style>