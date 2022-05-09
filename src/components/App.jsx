import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Container from './Container';
import Modal from './Modal';

class App extends Component {
  state = {
    isShow: false,
    searchQuery: '',
    imgInfo: [],
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  onToggle = () => {
    this.setState(prevState => ({ isShow: !prevState.isShow }));
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery
          searchQuery={this.state.searchQuery}
          onClickImg={this.onToggle}
        />

        {this.state.isShow && (
          <Modal onClose={this.onToggle}>
            <img src="" alt="" />
          </Modal>
        )}
      </Container>
    );
  }
}

export default App;
