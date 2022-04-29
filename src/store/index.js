import {getAllCountries, getCountryByName} from '@/services/api/RESTcountries';
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
        countries_data = await getAllCountries();

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
      const result = await getCountryByName(country_name);
      commit(
          'setCountries',
          result,
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