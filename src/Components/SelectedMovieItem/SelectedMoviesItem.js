import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import { store } from '../../Store/Store';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import './SelectedMovieItem.css';

class SelectedMovieItem extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      getMovie,
    } = this.props;
    getMovie(id);
  }

  displayGenres = (movie) => {
    return movie.genresList.map((categorie) => categorie.name).join(',');
  };

  handleClickAdd = () => {
    const {
      match: {
        params: { id },
      },
      addMovie,
    } = this.props;
    const state = store.getState().favoriteMoviesList;
    addMovie(id, state);
  };

  handleClickRemove = () => {
    const {
      match: {
        params: { id },
      },
      removeMovie,
    } = this.props;
    const state = store.getState().favoriteMoviesList;
    removeMovie(id, state);
  };

  buttonChange = () => {
    const { isFavorite } = this.props;

    return isFavorite ? (
      <button
        className={classNames({ buttonFavorite: true }, { active: true }, { 'col-xl-3 col-sm-12': true })}
        onClick={this.handleClickRemove}>
        <span>Remove from favorites</span>
      </button>
    ) : (
      <button
        className={classNames({ buttonFavorite: true }, { active: false }, { 'col-xl-3 col-sm-12': true })}
        onClick={this.handleClickAdd}>
        <span>Add to favorites</span>
      </button>
    );
  };

  render() {
    const { movie, loading } = this.props;

    return (
      <div className="container-fluid selectedItem">
        <Header />
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="row header seleccheckMovietedItem">
              <img
                className="img-fluid"
                src={`http://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
                alt="Movie poster"
              />
              <div className="col-sm-1 selectedItem originalTitle">{movie.original_title}</div>
              <div className="col-sm-1 selectedItem genres">{this.displayGenres(movie)}</div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-sm-12 selectedItem">
                <img
                  className="img-fluid selectedItem"
                  src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt="Movie poster"
                />
              </div>
              <div className="col-xl-8 col-sm-12 overview">
                <h3>Overview</h3>
                {movie.overview}
              </div>
            </div>
            <div className="col wrapperBtn">{this.buttonChange()}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.movie,
    loading: state.loading,
    isFavorite: _.find(store.getState().favoriteMoviesList, { id: state.movie.id }),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMovie: (id) => {
      dispatch({ type: 'GET_MOVIE', id });
    },
    addMovie: (id, favoriteMoviesList) => {
      dispatch({ type: 'ADD_MOVIE', id, favoriteMoviesList });
    },
    removeMovie: (id, favoriteMoviesList) => {
      dispatch({ type: 'REMOVE_MOVIE', id, favoriteMoviesList });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedMovieItem);
