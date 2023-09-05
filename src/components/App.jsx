import { useState, useEffect } from 'react';
import fetchImages from 'services/pixabay-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  // state = {
  //   searchKey: '',
  //   gallery: [],
  //   page: 1,
  //   largeImage: '',
  //   largeImageAlt: '',
  //   showModal: false,
  //   loading: false,
  // };

  const [searchKey, setSearchKey] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [showButton, setShowButton] = useState(false);
  const imagesPerRequest = 12;

  useEffect(() => {
    if (!searchKey) {
      return;
    }
    setLoading(true);

    fetchImages(searchKey, page)
      .then(result => {
        if (result.length === 0) {
          toast.error('Please, enter a valid request!', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        if (result.length >= imagesPerRequest) {
          setShowButton(true);
        }
        if (result.length < imagesPerRequest) {
          setShowButton(false);
        }
        setGallery(prev => [...prev, ...result]);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, [searchKey, page]);

  const onFormSubmitHandler = ({ searchInput }) => {
    if(searchKey === searchInput) {
      alert(`Ви вже шукаєте за запитом "${searchInput}"`);
    } else {
      setSearchKey(searchInput);
      setGallery([]);
    }
  };

  const onLoadButtonClick = () => {
    setPage(page => page + 1);
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImage(largeImageURL);
  };

  const closeModal = evt => {
    setShowModal(false);
  };

  return (
    <div>
      <Searchbar onSubmit={onFormSubmitHandler} />
      <ImageGallery images={gallery} onModalClick={openModal} />

      {showButton && <Button onLoadMore={onLoadButtonClick} />}
      {loading && <Loader />}
      {showModal && <Modal onClose={closeModal} largeImage={largeImage} />}
      <ToastContainer />
    </div>
  );
};

export default App;