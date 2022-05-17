<template>
  <!-- HEADER -->
  <header>
    <h1 class="country_name">{{ country.name.official ? country.name.official : country.name }}</h1>
  </header>

  <div class="country">
    <!-- TEXT DESCRIPTIONS SECTION -->
    <div class="caracteristics">
      <div class="container">
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
    country() {
      // GETTER
      return this.$store.getters.get_current_country;
    }
  },

  /*======= HOOKS =======*/
  created () {
    // ACTION
    this.$store.dispatch('find_current_country', this.id);

    // PAGE TITLE
    document.title = this.country.name.official ? this.country.name.official : this.country.name;
  },
}
</script>

<style scoped>
.country
{
  width: 100%;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  display: flex;
  position: relative;
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
  padding: 5%;
}

.caracteristics
{
  width: 34%;
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
  z-index: 1;
}

@media (max-width: 991.98px)
{
  .country
  {
    height: auto;
    flex-direction: column-reverse;
    justify-content: flex-end;
  }

  .caracteristics,
  .flag
  {
    width: 100%;
  }

  .caracteristics
  {
    padding: 0 5% 5% 5%;
  }

  .container
  {
    margin: 0 auto;
  }

  .back_button
  {
    margin: 0;
  }
}
</style>