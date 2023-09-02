export default async function fetchImages(searchKey, page) {
  const axios = require('axios');

  const API_KEY = '27808107-8f1452157e5133d5097f72be5';

  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchKey}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;

  const images = await axios.get(URL);

  const returnedImages = images.data.hits.map(
    ({ id, largeImageURL, tags, webformatURL }) => {
      return {
        id,
        largeImageURL,
        tags,
        webformatURL,
      };
    }
  );
  return returnedImages;
}


// key: '27808107-8f1452157e5133d5097f72be5',