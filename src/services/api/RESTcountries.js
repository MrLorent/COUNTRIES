export async function getAllCountries() {
  // load the data via fetch
  const response = await fetch('https://restcountries.com/v2/all')

  if (!response.ok) throw response;

  // parse the JSON response
  return await response.json();
}