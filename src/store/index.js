import {createStore} from 'vuex'

// Create a new store instance.
const store = createStore({
  state: {
    currentCountry: {},
    countries: [],
    regions: [],
  },
  getters: {
    getCountries: state => state.countries,
    getCurrentCountry: state => state.currentCountry,
    getRegions: state => state.regions,
  },
  mutations: {
    setCountries: (state, countries_data) => {
      state.countries = countries_data;
      localStorage.setItem('current_countries', JSON.stringify(countries_data));
    },
    setCurrentCountry: (state, country_data) => state.currentCountry =
        country_data,
    setRegions: (state, list_of_regions) => state.regions = list_of_regions,
  },
  actions: {
    // [API REQUEST] GET ALL COUNTRIES
    loadCountries: async ({commit}) => {
      let countries_data;

      if (localStorage.getItem('current_countries')) {
        countries_data = JSON.parse(localStorage.getItem('current_countries'));
      } else if (localStorage.getItem('all_countries')) {
        countries_data = JSON.parse(localStorage.getItem('all_countries'));
      } else {
        // load the data via fetch
        const response = await fetch('https://restcountries.com/v2/all')

        if (!response.ok) throw response;

        // parse the JSON response
        countries_data = await response.json();

        // localy store the list of countries
        localStorage.setItem('all_countries', JSON.stringify(countries_data));
      }

      // commit the new value via the "setCountries" mutation
      commit(
          'setCountries',
          countries_data,
      );
    },

    // [LOCAL ACTION] FIND CURRENT COUNTRY
    findCurrentCountry: ({commit, state}, country_id) => {
      let current_country = state.countries[country_id];
      commit(
          'setCurrentCountry',
          current_country,
      );
    },

    // [API REQUEST] GET COUNTRY BY NAME
    searchCountryByName: async ({commit}, country_name) => {
      // load the data via fetch
      const response =
          await fetch('https://restcountries.com/v3.1/name/' + country_name);
      let country_data = [];
      if (!response.ok && response.status != 404) {
        throw response;
      }

      // parse the JSON response if it isn't empty
      if (response.status != 404) country_data = await response.json();

      // commit the new value via the "setCountries" mutation
      commit(
          'setCountries',
          country_data,
      );
    },

    // [LOCAL ACTION] LIST ALL REGIONS
    loadRegions: ({commit, state}) => {
      const countries = localStorage.getItem('all_countries') ?
          JSON.parse(localStorage.getItem('all_countries')) :
          state.countries;
      let regions = state.regions;

      countries.forEach(country => {
        if (!regions.includes(country.region)) regions.push(country.region);
      });

      commit(
          'setRegions',
          regions,
      );
    },
  }
})

export default store;