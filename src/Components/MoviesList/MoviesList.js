import React, { Component } from 'react';
import { connect } from 'react-redux';

import MovieItem from '../MovieItem/MovieItem';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import './MoviesList.css';

class MoviesList extends Component {
  componentDidMount() {
    const {
      match: { params },
      setMovies,
    } = this.props;
    setMovies(params.page);
  }

  renderMovieList = (movie) => <MovieItem key={movie.id} movie={movie} />;

  render() {
    const { moviesList, loading } = this.props;
    return (
      <div className="container-fluid moviesList">
        <Header />
        {loading ? (
          <Loader />
        ) : (
          <div className="row wrapperList">
            {moviesList.map(this.renderMovieList)}
            <Pagination location={this.props} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moviesList: state.moviesList,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMovies: (page) => {
      dispatch({ type: 'FETCH_MOVIES', currentPage: page });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
