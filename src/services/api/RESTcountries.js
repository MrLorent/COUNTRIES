/*##########################################*/
/*##########| REST Countries API |##########*/
/*##########################################*/
/*======== https://restcountries.com =======*/
/*##########################################*/

/**
 * Get the list of all the countries from the API
 * @returns {Array} - Array of countries Objects
 */
export async function getAllCountries() {
  // load the data via fetch
  const response = await fetch('https://restcountries.com/v2/all')

  if (!response.ok) throw response;

  // parse the JSON response
  return await response.json();
}

/**
 * Get a list of country corresponding to the name passed
 * @param { String } country_name - name of the country
 * @returns { Array } - Array of countries Objects. Empty if no result found.
 */
export async function getCountryByName(country_name) {
  // load the data via fetch
  const response =
      await fetch('https://restcountries.com/v3.1/name/' + country_name);
  let result = [];

  if (!response.ok && response.status != 404) {
    throw response;
  }

  // parse the JSON response if it isn't empty
  if (response.status != 404) result = await response.json();

  return result;
}