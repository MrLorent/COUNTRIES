import {get_all_countries, get_country_by_name} from '@/services/api/RESTCountries';
import {createStore} from 'vuex'

const store = createStore({
  /*======== STATE ========*/
  state: {
    /*----- ATTRIBUTS -----*/
    current_country: {},
    countries: [],
    regions: [],

    /*------ FILTERS ------*/
    countries_sort_type: localStorage.getItem('countries_sort_type') || 'name',
    reversed: localStorage.getItem('reversed') || 'off',
    region_filter: localStorage.getItem('region_filter') || 'all',
  },

  /*======== GETTERS ========*/
  getters: {
    /*---- ATTRIBUTS GETTERS ----*/
    get_countries: state => state.countries,
    get_current_country: state => state.current_country,
    get_regions: state => state.regions,

    /*---- FILTERS GETTERS ----*/
    get_countries_sort_type: state => state.countries_sort_type,
    get_reversed: state => state.reversed,
    get_region_filter: state => state.region_filter,
    get_sorted_countries: state => {
      const countries = state.countries;
      const field = state.countries_sort_type;
      const reversed = state.reversed === 'on' ? -1 : 1;

      // FILTERS
      const region_filter_func = (a) => state.region_filter === 'all' ?
          true :
          a.region.toLowerCase().includes(state.region_filter.toLowerCase());

      // COMPARATORS
      const name_comparator = (a, b) => a[field].official ?
          a[field].official.localeCompare(b[field].official) * reversed :
          a[field].localeCompare(b[field]) * reversed;
      const numeric_code_comparator = (a, b) => a[field] ?
          (b[field] - a[field]) * reversed < 0 :
          (b.ccn3 - a.ccn3) * reversed < 0;
      const comparator =
          ['name'].includes(field) ? name_comparator : numeric_code_comparator;

      return countries.filter(region_filter_func).sort(comparator);
    },
  },

  /*======== MUTATIONS ========*/
  mutations: {
    /*---- ATTRIBUTS SETTERS ----*/
    set_countries: (state, countries_data) => {
      state.countries = countries_data;
      localStorage.setItem('current_countries', JSON.stringify(countries_data));
    },

    set_regions: (state, list_of_regions) => state.regions = list_of_regions,

    set_current_country: (state, country_data) => {
      state.current_country = country_data;
      localStorage.setItem('current_country', JSON.stringify(country_data));
    },

    /*---- FILTERS SETTERS ----*/
    set_countries_sort_type: (state, new_countries_sort_type) => {
      state.countries_sort_type = new_countries_sort_type;
      localStorage.setItem('countries_sort_type', new_countries_sort_type);
    },

    set_reversed: (state, new_reversed_value) => {
      state.reversed = new_reversed_value;
      localStorage.setItem('reversed', new_reversed_value);
    },

    set_region_filter: (state, new_region_filter) => {
      state.region_filter = new_region_filter;
      localStorage.setItem('region_filter', new_region_filter);
    },
  },

  /*======== ACTIONS ========*/
  actions: {
    /*------ COUNTRIES VIEW METHODS ------*/
    load_countries: async ({commit}) => {
      let countries_data;

      if (localStorage.getItem('current_countries')) {
        countries_data = JSON.parse(localStorage.getItem('current_countries'));
      } else if (localStorage.getItem('all_countries')) {
        countries_data = JSON.parse(localStorage.getItem('all_countries'));
      } else {
        // [API REQUEST]
        // Get the list of countries from the API
        countries_data = await get_all_countries();

        // localy store the list of countries
        localStorage.setItem('all_countries', JSON.stringify(countries_data));
      }

      // commit the new value via the "setCountries" mutation
      commit(
          'set_countries',
          countries_data,
      );
    },

    load_regions: ({commit, state}) => {
      const countries = localStorage.getItem('all_countries') ?
          JSON.parse(localStorage.getItem('all_countries')) :
          state.countries;
      let regions = state.regions;

      countries.forEach(country => {
        if (!regions.includes(country.region)) regions.push(country.region);
      });

      commit(
          'set_regions',
          regions,
      );
    },

    /*------ SEARCH BAR METHODS ------*/
    search_country_by_name: async ({commit}, country_name) => {
      // [API REQUEST]
      // load the data via fetch
      const result = await get_country_by_name(country_name);

      commit(
          'set_countries',
          result,
      );
    },

    /*------ FILTER BAR METHODS ------*/
    update_countries_sort_type: ({commit}, new_countries_sort_type) => {
      commit(
          'set_countries_sort_type',
          new_countries_sort_type,
      );
    },

    update_reversed: ({commit}, new_reversed_value) => {
      commit(
          'set_reversed',
          new_reversed_value,
      );
    },

    update_region_filter: ({commit}, new_region_filter) => {
      commit(
          'set_region_filter',
          new_region_filter,
      );
    },

    /*------ COUNTRY VIEW METHODS ------*/
    find_current_country: async ({commit, getters}, country_id) => {
      let current_country = getters.get_sorted_countries[country_id];

      commit(
          'set_current_country',
          current_country,
      );
    },
  }
})

export default store;