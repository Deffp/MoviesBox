import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import { getFavoriteMovies } from '../../Reducer/ReducerMoviesList';
import MovieItem from '../MovieItem/MovieItem';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './FavoriteMoviesList.css';

class FavoriteMoviesList extends Component {
  componentDidMount() {
    const { getFavoriteMovies } = this.props;
    getFavoriteMovies();
  }

  renderMovieList = (movie) => <MovieItem key={movie.id} movie={movie} />;

  render() {
    const { favoriteMoviesList, loading } = this.props;
    return (
      <div>
        <Header />
        {loading ? <Loader /> : <Row className="wrapperList">{favoriteMoviesList.map(this.renderMovieList)}</Row>}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favoriteMoviesList: state.favoriteMoviesList,
  loading: state.loading,
});

export default connect(mapStateToProps, { getFavoriteMovies })(FavoriteMoviesList);
