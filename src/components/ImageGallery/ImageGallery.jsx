import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGallery';

import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ data }) => {
  return (
    <Gallery>
      {data.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          image={webformatURL}
          largeImage={largeImageURL}
          alt={tags}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;