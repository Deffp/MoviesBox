import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { Container, Row, Image, Col } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { getSelectedMovie, addToFavorite, removeMovie } from '../../Reducer/ReducerMoviesList';
import { store } from '../../Store/Store';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import './SelectedMovieItem.css';

class SelectedMovieItem extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      getSelectedMovie,
    } = this.props;
    getSelectedMovie(id);
  }

  displayGenres = (movie) => movie.genresList.map((categorie) => categorie.name).join(',');

  buttonChange = () => {
    const {
      match: {
        params: { id },
      },
      addToFavorite,
      removeMovie,
      isFavorite,
    } = this.props;

    return isFavorite ? (
      <button
        type="button"
        className={classNames({ buttonFavorite: true }, { active: true })}
        onClick={_.partial(removeMovie, id)}>
        <span>Remove from favorites</span>
        <FontAwesomeIcon className="iconInButton" icon={faStar} />
      </button>
    ) : (
      <button
        type="button"
        className={classNames({ buttonFavorite: true }, { active: false })}
        onClick={_.partial(addToFavorite, id)}>
        <span>Add to favorites</span>
        <FontAwesomeIcon className="iconInButton" icon={faStar} />
      </button>
    );
  };

  render() {
    const { movie, loading } = this.props;
    return (
      <div className="wrapperSelectedMovie">
        <Header />
        {loading ? (
          <Loader />
        ) : (
          <Container className="wrapperSelectedItem">
            <Row>
              <Col>
                <Row>
                  <Col
                    className="wrapperImg topImg"
                    md={12}
                    style={{ backgroundImage: `url(http://image.tmdb.org/t/p/w500${movie.backdrop_path})` }}>
                    <div className="wrapperText">
                      <span className="originalTitle">{movie.original_title}</span>
                      <span className="releaseDate">{moment(movie.release_date).format('Y')} </span>
                      <span className="genresFilms">{this.displayGenres(movie)}</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={3} className="wrapperImgLogo">
                    <Image className="imgLogo" src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`} />
                    <div>{this.buttonChange()}</div>
                  </Col>
                  <Col className="wrapperOverview" xs={12} md={9}>
                    <h2>Overview</h2>
                    {movie.overview}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: state.movie,
  loading: state.loading,
  isFavorite: _.find(store.getState().favoriteMoviesList, {
    id: state.movie.id,
  }),
});

export default connect(mapStateToProps, {
  getSelectedMovie,
  addToFavorite,
  removeMovie,
})(SelectedMovieItem);
