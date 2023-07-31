import axios from "axios";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common["x-api-key"] = "live_4nO0pEoVJThgIhvV9ZSdmihp54IDajIXsqlyVjweW0UsjRb50CnPj3VzLQQwIaJY";

const END_POINTS = {
    breeds: 'breeds',
    info: 'images/search',
};

// export function fetchBreeds() {
//   return axios.get(`${BASE_URL}/breeds`)
// };
  
// export function fetchCatByBreed(breedId) {
//   return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
// };

export const fetchBreeds = () => {
    return axios(`${END_POINTS.breeds}`);
};

export const fetchCatByBreed = breedId => {
    return axios(`${END_POINTS.info}?breed_ids=${breedId}`);
};