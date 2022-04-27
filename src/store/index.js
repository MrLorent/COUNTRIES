import {createStore} from 'vuex'

// Create a new store instance.
const store = createStore({
  state: {
    currentCountry: {},
    countries: [],
  },
  getters: {
    getCountries: state => state.countries,
    getCurrentCountry: state => state.currentCountry,
  },
  mutations: {
    setCountries: (state, countries_data) => state.countries = countries_data,
    setCurrentCountry: (state, country_data) => state.currentCountry =
        country_data,
  },
  actions: {
    loadCountries: async ({commit}) => {
      // load the data via fetch
      const response = await fetch('https://restcountries.com/v2/all')

      if (!response.ok) throw response;

      // parse the JSON response
      const countries_data = await response.json();

      // commit the new value via the "setCountries" mutation
      commit(
          'setCountries',
          countries_data,
      );
    },
    findCurrentCountry: ({commit, state}, country_id) => {
      let current_country = state.countries[country_id];
      commit(
          'setCurrentCountry',
          current_country,
      );
    }
  }
})

export default store;