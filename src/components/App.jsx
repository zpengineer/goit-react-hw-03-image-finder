import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Container from './Container';
import Modal from './Modal';

class App extends Component {
  state = {
    isShow: false,
    tag: '',
    largeImg: '',
  };

  onToggle = () => {
    this.setState(prevState => ({ isShow: !prevState.isShow }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  onClickImg = e => {
    const tag = e.target.alt;
    const largeImg = e.target.dataset.source;

    this.setState({ tag, largeImg });

    this.onToggle();
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery
          searchQuery={this.state.searchQuery}
          onClickImg={this.onClickImg}
        />

        {this.state.isShow && (
          <Modal onClose={this.onToggle}>
            <img src={this.state.largeImg} alt={this.state.tag} />
          </Modal>
        )}
      </Container>
    );
  }
}

export default App;
