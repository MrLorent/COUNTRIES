export async function getAllCountries() {
  // load the data via fetch
  const response = await fetch('https://restcountries.com/v2/all')

  if (!response.ok) throw response;

  // parse the JSON response
  return await response.json();
}

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