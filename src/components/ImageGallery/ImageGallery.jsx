import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import Button from 'components/Button';
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
    serchResult: [],
    page: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });

      this.fetchImgs();
    }
  }

  fetchImgs = () => {
    fetch(
      `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${this.state.page}&key=25409295-3fe7f980d3353c85bb9c47a25&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(
          new Error(`Картинки по запросу ${this.state.searchQuery} не найдены.`)
        );
      })
      .then(({ hits }) =>
        this.setState(prevState => ({
          serchResult: [...prevState.serchResult, ...hits],
          page: prevState.page + 1,
          status: 'resolved',
        }))
      )
      .catch(error => this.setState({ error, status: 'pending' }));
  };

  render() {
    const { serchResult, status } = this.state;

    if (status === 'idle') {
      return <div>Начните поиск картинки</div>;
    }

    if (status === 'resolved') {
      return (
        <ul className={styles.gallery}>
          {serchResult.map(({ id, webformatURL, largeImageURL, tags }) => (
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

    if (serchResult.length > 0) {
      return <Button loadMore={this.fetchImgs} />;
    }
  }
}

export default ImageGallery;
