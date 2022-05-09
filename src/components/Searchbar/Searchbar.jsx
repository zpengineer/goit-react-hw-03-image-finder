import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  static props = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      console.log('Ввели пустую строку');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: ' ' });
  };

  handleSearchQuery = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.form}>
          <button
            type="submit"
            className={styles.button}
            onClick={this.handleSubmit}
          >
            <span className={styles.label}>Search</span>
          </button>

          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            name="searchQuery"
            value={this.state.searchQuery}
            placeholder="Search images and photos"
            onChange={this.handleSearchQuery}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
