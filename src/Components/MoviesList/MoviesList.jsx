import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import { getMovies } from '../../Reducer/ReducerMoviesList';
import MovieItem from '../MovieItem/MovieItem';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MoviesList.css';

class MoviesList extends Component {
  componentDidMount() {
    const {
      match: { params },
      getMovies,
    } = this.props;
    getMovies(params.page);
  }

  componentDidUpdate() {
    const {
      match: { params },
      getMovies,
    } = this.props;
    getMovies(params.page);
  }

  renderMovieList = (movie) => <MovieItem key={movie.id} movie={movie} />;

  render() {
    const { moviesList, loading } = this.props;

    return (
      <div>
        <Header />
        {loading ? (
          <Loader />
        ) : (
          <Row className="wrapperList">
            {moviesList.map(this.renderMovieList)}
            <Pagination location={this.props} />
          </Row>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  moviesList: state.moviesList,
  loading: state.loading,
});

export default connect(mapStateToProps, { getMovies })(MoviesList);
