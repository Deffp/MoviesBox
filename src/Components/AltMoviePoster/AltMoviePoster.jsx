import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class AltMoviePoster extends Component {
  checkMoviePoster = () => {
    const { movie } = this.props;
    return movie.poster_path ? (
      <Card.Img src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="" />
    ) : (
      <Card.Img src="https://www.moodfit.com/front/images/image-not-found-designerbg.png" alt="" />
    );
  };

  render() {
    return <div>{this.checkMoviePoster()}</div>;
  }
}
