/* eslint-disable object-curly-newline */
/* eslint-disable radix */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
// eslint-disable-next-line object-curly-newline

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import _ from 'lodash';
import classNames from 'classnames/bind';
import { Container, Row, Image, Col } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import RootStore from '../../Store/RootStore';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import './SelectedMovieItem.css';

class SelectedMovieItem extends Component {
  componentDidMount() {
    const { setMovie } = RootStore.MoviesStore;

    const {
      match: {
        params: { id },
      },
    } = this.props;
    setMovie(parseInt(id));
  }

  displayGenres = (movie) => movie.genresList.map((categorie) => categorie.name).join(',');

  buttonChange = () => {
    const { favoriteMoviesList, addMovie, removeMovie } = RootStore.FavoriteMoviesStore;
    const { movie } = RootStore.MoviesStore;

    return _.find(favoriteMoviesList, { id: movie.id }) ? (
      <button
        type="button"
        className={classNames({ buttonFavorite: true }, { active: true })}
        onClick={() => removeMovie(movie.id)}>
        <span>Remove from favorites</span>
        <FontAwesomeIcon className="iconInButton" icon={faStar} />
      </button>
    ) : (
      <button
        type="button"
        className={classNames({ buttonFavorite: true }, { active: false })}
        onClick={() => addMovie(movie)}>
        <span>Add to favorites</span>
        <FontAwesomeIcon className="iconInButton" icon={faStar} />
      </button>
    );
  };

  render() {
    const { movie, loading } = RootStore.MoviesStore;
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
                    style={{
                      backgroundImage: `url(http://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                    }}>
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

export default observer(SelectedMovieItem);
