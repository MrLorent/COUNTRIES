import {getAllCountries, getCountryByName} from '@/services/api/RESTcountries';
import {createStore} from 'vuex'

// Create a new store instance.
const store = createStore({
  state: {
    currentCountry: {},
    countries: [],
    regions: [],

    sortedCountries: [],
  },
  getters: {
    getCountries: state => state.countries,
    getSortedCountries: state => state.sortedCountries,
    getCurrentCountry: state => state.currentCountry,
    getRegions: state => state.regions,
  },
  mutations: {
    setCountries: (state, countries_data) => {
      state.countries = countries_data;
      localStorage.setItem('current_countries', JSON.stringify(countries_data));
    },
    setSortedCountries: (state, sorted_countries_data) =>
        state.sortedCountries = sorted_countries_data,
    setCurrentCountry: (state, country_data) => {
      state.currentCountry = country_data;
      localStorage.setItem('current_country', JSON.stringify(country_data));
    },
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

    sortCountries: ({commit, state}) => {
      commit(
          'setSortedCountries',
          state.countries,
      );
    },

    // [LOCAL ACTION] FIND CURRENT COUNTRY
    loadCurrentCountry: async ({commit, state}, country_id) => {
      let current_country_data;

      if (localStorage.getItem('current_country')) {
        current_country_data =
            JSON.parse(localStorage.getItem('current_country'));
      } else {
        const current_country_name = state.countries[country_id].name.official ?
            state.countries[country_id].name.official :
            state.countries[country_id].name;

        current_country_data = await getCountryByName(current_country_name);
      }

      commit(
          'setCurrentCountry',
          current_country_data,
      );
    },

    clearCurrentCountry: ({commit}) => {
      commit(
          'setCurrentCountry',
          {},
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