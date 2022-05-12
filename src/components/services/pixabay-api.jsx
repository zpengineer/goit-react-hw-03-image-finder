const axios = require('axios');
const API_KEY = '25409295-3fe7f980d3353c85bb9c47a25';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;

function pixabayApi(query, page) {
  return fetch(
    `${BASE_URL}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`Картинки по запросу ${query} не найдены.`)
    );
  });
}

export default pixabayApi;
