import {createStore} from 'vuex'

// Create a new store instance.
const store = createStore({
  state: {
    current_country: {},
    countries: [],
  },
  getters: {
    getCountries: state => state.countries,
  },
  mutations: {
    setCountries: (state, countries_data) => state.countries = countries_data,
  },
  actions: {
    loadCountries: async ({commit}) => {
      // load the data via fetch
      const response = await fetch('https://restcountries.com/v2/all')

      if (!response.ok) throw response;

      // parse the JSON response
      const countries_data = await response.json();

      // commit the new value via the "setWorldData" mutation
      commit(
          'setCountries',
          countries_data,
      );
    }
  }
})

export default store;