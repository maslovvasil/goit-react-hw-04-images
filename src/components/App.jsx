import { useState, useEffect } from 'react';
import * as Scroll from 'react-scroll';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { BallTriangle } from 'react-loader-spinner';

// import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import getImageCollection from 'helpers/getImageCollection';

import { AppContainer, LoaderContainer, NotFound } from './App.styled';

const App = () => {
  const [data, setData] = useState([]);
  const [totalImages, setTotalImages] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [panding, setPanding] = useState(false);
  const [status, setStatus] = useState('resolves');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search) {
          setPanding(true);

          const data = await getImageCollection(search, page);

          setPanding(false);

          if (data.array) {
            if (data.array.length === 0) {
              setStatus('rejected');
              return;
            }

            loadMoreData(data.array);
            setTotalImages(data.total);
            setStatus('resolved');
          }
          const scroll = Scroll.animateScroll;
          scroll.scrollToBottom();
        }
      } catch (error) {
        Notify.failure(error.message);
      }
    };
    fetchData();
  }, [search, page]);

  const handleSubmit = newSearch => {
    if (search === newSearch && page === 1) {
      Notify.failure('You allready use this request');
      return;
    }
    setData([]);
    setSearch(newSearch);
    setPage(1);
  };

  const loadMoreData = newData => setData(data => [...data, ...newData]);

  return (
    <AppContainer>
      {/* <Searchbar onSubmit={handleSubmit} /> */}

      {status === 'rejected' && (
        <NotFound>Sorry, we find nothing. Try another request</NotFound>
      )}

      {status === 'resolved' && <ImageGallery data={data} />}

      {panding && (
        <LoaderContainer>
          <BallTriangle
            height="80"
            width="80"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
          />
        </LoaderContainer>
      )}

      {data.length > 0 && data.length < totalImages && (
        <Button onClick={setPage} />
      )}
    </AppContainer>
  );
};

export default App;