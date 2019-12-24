import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFavoriteMovies } from '../../Reducer/ReducerMoviesList';
import MovieItem from '../MovieItem/MovieItem';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import './FavoriteMoviesList.css';
class FavoriteMoviesList extends Component {
  componentDidMount() {
    const { getFavoriteMovies } = this.props;

    getFavoriteMovies;
  }

  renderMovieItem = (movie) => <MovieItem key={movie.id} movie={movie} />;

  render() {
    const { favoriteMoviesList, loading } = this.props;

    return (
      <div className="container-fluid  moviesList">
        <Header />
        {loading ? (
          <Loader />
        ) : (
          <div className="row wrapperFavoriteMovies ">{favoriteMoviesList.map(this.renderMovieItem)}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favoriteMoviesList: state.favoriteMoviesList,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { getFavoriteMovies })(FavoriteMoviesList);
