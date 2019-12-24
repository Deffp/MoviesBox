import React, { Component } from 'react';

export default class AltMoviePoster extends Component {
  checkMoviePoster = () => {
    const { movie } = this.props;
    return movie.poster_path ? (
      <img className="poster" src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="" />
    ) : (
      <img className="poster" src="https://www.moodfit.com/front/images/image-not-found-designerbg.png" alt="" />
    );
  };

  render() {
    return <div className="col moviePoster">{this.checkMoviePoster()}</div>;
  }
}
