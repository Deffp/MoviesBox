import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import AltMoviePoster from '../AltMoviePoster/AltMoviePoster';
import './MovieItem.css';

export default class MovieItem extends Component {
  renderGenresMovie = (movie) => {
    return movie.genresList.map((categorie) => categorie.name).join(',');
  };

  render() {
    const { movie } = this.props;

    return (
      <div className=" wrapper col-md-auto col-lg-3">
        <Link to={`/movie/${movie.id}`}>
          <div className="item">
            <div className="col releaseDate">{moment(movie.release_date).format('Y')}</div>
            <AltMoviePoster movie={movie} />
            <div className="row infoMovie">
              <div className="col-5 nameMovie">{movie.title}</div>
              <div className="col-5 categoriesMovie">{this.renderGenresMovie(movie)}</div>
              <div className="col-3 ratingMovie">{movie.vote_average}</div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
