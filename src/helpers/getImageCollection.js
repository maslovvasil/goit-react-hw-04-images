import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const getImageCollection = async (search, page) => {
  try {
    const data = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '27808107-8f1452157e5133d5097f72be5',
        q: search,
        page: page,
        per_page: 12,
      },
    });
    return { array: data.data.hits, total: data.data.totalHits };
  } catch (error) {
    Notify.failure(error.message);
  }
};

export default getImageCollection;