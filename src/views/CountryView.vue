<template>
  <!-- HEADER -->
  <header>
    <h1 class="country_name">{{ country.name.official ? country.name.official : country.name }}</h1>
  </header>

  <div class="country">
      <!-- TEXT DESCRIPTIONS SECTION -->
      <div class="caracteristics">
          <!-- COUNTRY NAME -->
          <div class="carac">
            <span class="label">Name : </span>
            <span class="name">{{ country.name.official ? country.name.official : country.name }}</span>
          </div>

          <!-- COUNTRY NATIVE NAME -->
          <div class="carac native_name">
            <span class="label">Native name : </span>
            <span class="native_name">{{ country.name.nativeName ? country.name.nativeName[Object.keys(country.name.nativeName)[0]].official : country.nativeName }}</span>
          </div>

          <!-- COUNTRY CAPITAL -->
          <div class="carac">
            <span class="label">Capital : </span>
            <span class="capital">{{ typeof(country.capital) == "object" ? country.capital[0] : country.capital }}</span>
          </div>

          <!-- COUNTRY LANGUAGES -->
          <div class="carac">
            <span class="label">Language(s) spoken : </span>
            <ul class="languages">
              <li class="language" v-for="(language, idx) in country.languages" :key="idx">- {{ language.name ? language.name : language}}</li>
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
    :to="{name :'countries'}"
    class="back_button"
  >
  ← BACK
  </router-link>
</template>

<script>
export default {
  /*====== ATTRIBUTS ======*/
  name: 'CountryView',
  props: {
    id: String,
  },

  /*======= METHODS =======*/
  computed: {
    country: function() {
      // GETTER
      return this.$store.getters.get_current_country;
    }
  },

  /*======= HOOKS =======*/
  created () {
    // ACTION
    this.$store.dispatch('find_current_country', this.id);
  },
  beforeUnmount () {
    // ACTION
    this.$store.dispatch('clear_current_country');
    localStorage.removeItem('current_country');
  },
}
</script>

<style scoped>
.country
{
  width: 100%;
  height: calc(100% - var(--header-height));
  display: flex;
  margin: var(--header-height) 0 0 0;
}

header
{
  justify-content: center;
}

.caracteristics,
.flag
{
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.caracteristics
{
  width: 34%;
  padding: 5%;
}

.carac
{
  padding: 0 0 20px 0;
}

.carac .label
{
  font-weight: bold;
}

li
{
  margin: 10px 0 0 10px;
}

.flag
{
  width: 66%;
  align-items: center;
}

.flag_picture
{
  width: 50%;
}

.flag .label
{
  color:var(--discret-font-color);
  font-style: italic;
  padding: 20px 0;
}

.back_button
{
  font-style: italic;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px;
  margin: 15px;
}

@media (max-width: 991.98px)
{
  
}

@media (max-width: 575.98px)
{

}
</style>