const BASE_URL = 'https://ih-countries-api.herokuapp.com/countries';

export async function fetchAllCountries() {
  const res = await fetch(BASE_URL)
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`)
  }
  return await res.json()
}

export async function fetchCountryByCode(alpha3Code) {
  const res = await fetch(`${BASE_URL}/${alpha3Code}`)
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`)
  }
  return await res.json()
}