import {getAllCountries, getCountryByName} from '@/services/api/RESTcountries';
import {createStore} from 'vuex'

// Create a new store instance.
const store = createStore({
  state: {
    currentCountry: {},
    countries: [],
    regions: [],

    countries_sort_type: localStorage.getItem('countries_sort_type') || 'name',
    reversed: localStorage.getItem('reversed') || 'off',
    region_filter: localStorage.getItem('region_filter') || 'all',
  },
  getters: {
    getCountries: state => state.countries,
    get_countries_sort_type: state => state.countries_sort_type,
    getSortedCountries: state => {
      const countries = state.countries;
      const field = state.countries_sort_type;
      const reversed = state.reversed === 'on' ? -1 : 1;

      const region_filter_func = (a) => state.region_filter === 'all' ?
          true :
          a.region.toLowerCase().includes(state.region_filter.toLowerCase());
      const name_comparator = (a, b) => a[field].official ?
          a[field].official.localeCompare(b[field].official) * reversed :
          a[field].localeCompare(b[field]) * reversed;
      const numeric_code_comparator = (a, b) => a[field] ?
          (b[field] - a[field]) * reversed < 0 :
          (b.ccn3 - a.ccn3) * reversed < 0;
      const comparator =
          ['name'].includes(field) ? name_comparator : numeric_code_comparator;

      return countries.filter(region_filter_func).sort(comparator)
    },
    getCurrentCountry: state => state.currentCountry,
    getRegions: state => state.regions,
  },
  mutations: {
    setCountries: (state, countries_data) => {
      state.countries = countries_data;
      localStorage.setItem('current_countries', JSON.stringify(countries_data));
    },
    set_countries_sort_type: (state, new_countries_sort_type) => {
      state.countries_sort_type = new_countries_sort_type;
      localStorage.setItem('countries_sort_type', new_countries_sort_type);
    },
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

    update_countries_sort_type: ({commit}, new_countries_sort_type) => {
      commit(
          'set_countries_sort_type',
          new_countries_sort_type,
      );
    },

    // [LOCAL ACTION] FIND CURRENT COUNTRY
    findCurrentCountry: async ({commit, getters}, country_id) => {
      let current_country = getters.getSortedCountries[country_id];
      commit(
          'setCurrentCountry',
          current_country,
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