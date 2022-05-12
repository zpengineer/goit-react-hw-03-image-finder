import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import pixabayAPI from './services/pixabay-api';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Container from './Container';
import Modal from './Modal';
import Loader from './Loader/Loader';
import styles from './App.module.css';

class App extends Component {
  state = {
    isShow: false,
    searchQuery: '',
    serchResult: [],
    page: 1,
    status: 'idle',
    currentImgTag: '',
    currentLargeImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  componentDidMount() {
    this.pageHeader();
  }

  fetchImages = async () => {
    try {
      this.setState({ status: 'pending' });

      await pixabayAPI(this.state.searchQuery, this.state.page).then(res => {
        if (res.data.hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.',
            {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else {
          this.setState(prevState => ({
            serchResult: [...prevState.serchResult, ...res.data.hits],
            page: prevState.page + 1,
          }));
        }
      });
    } catch (error) {
      console.log(error);

      toast.warn("We're sorry, but you've reached the end of search results.", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      this.setState({ status: 'resolved' });

      if (this.state.page > 1) {
        console.log(document.documentElement.scrollHeight);

        setTimeout(this.smoothScroll, 250);
      }
    }
  };

  onToggle = () => {
    this.setState(prevState => ({ isShow: !prevState.isShow }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, serchResult: [] });
  };

  onClickImg = e => {
    const currentImgTag = e.target.alt;
    const currentLargeImg = e.target.dataset.source;

    this.setState({ currentImgTag, currentLargeImg });

    this.onToggle();
  };

  pageHeader = () => {
    const { height: pageHeaderHeight } = document
      .querySelector('#header')
      .getBoundingClientRect();

    document.body.style.paddingTop = `${pageHeaderHeight}px`;
  };

  smoothScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;

    window.scrollTo({
      top: scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { serchResult, status, isShow, currentImgTag, currentLargeImg } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && (
          <div className={styles.notification}>
            Gallery is empty, search for images.
          </div>
        )}

        {status === 'pending' && <Loader />}

        {serchResult.length > 0 && (
          <ImageGallery
            serchResult={serchResult}
            onClickImg={this.onClickImg}
          />
        )}

        {serchResult.length > 0 && status === 'resolved' && (
          <Button loadMore={this.fetchImages} />
        )}

        {isShow && (
          <Modal onClose={this.onToggle}>
            <img src={currentLargeImg} alt={currentImgTag} />
          </Modal>
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    );
  }
}

export default App;
