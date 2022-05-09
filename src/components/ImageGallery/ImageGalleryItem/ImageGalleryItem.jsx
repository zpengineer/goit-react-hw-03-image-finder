import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImage, tags, onClickImg }) => {
  return (
    <li className={styles.galleryItem}>
      <img
        className={styles.img}
        src={smallImage}
        alt={tags}
        onClick={() => onClickImg()}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
