import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import styles from './ImageGallery.module.css';

class ImageGallery extends Component {
  static props = {
    searchQuery: PropTypes.string.isRequired,
    serchResult: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    serchResult: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=25409295-3fe7f980d3353c85bb9c47a25&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(({ hits }) => this.setState({ serchResult: hits }));
    }
  }

  render() {
    const { serchResult } = this.state;

    return (
      <ul className={styles.gallery}>
        {serchResult &&
          serchResult.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              smallImage={webformatURL}
              largeImage={largeImageURL}
              tags={tags}
              onClickImg={this.props.onClickImg}
            />
          ))}
      </ul>
    );
  }
}

export default ImageGallery;
