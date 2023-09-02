import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../Modal';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { ModalImage } from '../Modal/Modal.styled';

const ImageGalleryItem = ({ image, alt, largeImage }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <GalleryItem>
      <GalleryItemImage
        src={image}
        alt={alt}
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal onClose={setShowModal}>
          <ModalImage src={largeImage} alt={alt} />
        </Modal>
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;