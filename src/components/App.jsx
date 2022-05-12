import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
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
    error: null,
    status: 'idle',
    currentImgTag: '',
    currentLargeImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ status: 'pending', serchResult: [] });

      this.fetchImges();
    }
  }

  componentDidMount() {
    this.pageHeader();
    this.scrollOnLoadButton();
  }

  fetchImges = () => {
    pixabayAPI(this.state.searchQuery, this.state.page)
      .then(({ hits }) => {
        this.setState(prevState => ({
          serchResult: [...prevState.serchResult, ...hits],
          page: prevState.page + 1,
          status: 'resolved',
        }));

        if (this.state.page !== 1) console.log(this.scrollOnLoadButton);

        if (this.state.serchResult.length === 0) {
          console.log('Ошибка текст не найден');
        }
      })
      .catch(error => this.setState({ error, status: 'pending' }));
  };

  onToggle = () => {
    this.setState(prevState => ({ isShow: !prevState.isShow }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
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

  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
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
          <div className={styles.notification}>Search images and photos</div>
        )}

        {status === 'pending' && <Loader />}

        {status === 'resolved' && (
          <ImageGallery
            serchResult={serchResult}
            onClickImg={this.onClickImg}
          />
        )}

        {serchResult.length > 0 && <Button loadMore={this.fetchImges} />}

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
