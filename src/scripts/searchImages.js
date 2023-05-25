import axios from 'axios';
import { API_KEY, URL_PREFIX } from './models/data.js';

async function searchImages(searchQuery, page = 1) {
  return await axios({
    method: 'GET',
    url: `${URL_PREFIX}`,
    headers: {
      'Content-Type': 'application/json',
    },

    params: {
      key: `${API_KEY}`,
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: +`${page}`,
      per_page: 40,
    },
  });
}

export default searchImages;
