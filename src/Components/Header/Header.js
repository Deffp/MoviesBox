import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';

import './Header.css';
class Header extends Component {
  toggleActive = () => {
    return this.props.match.isExact && this.props.match.path === '/FavoriteMoviesList' ? (
      <Link to="/">
        <button className={classNames({ buttonShowFavoriteMovies: true }, { active: true })}>
          <span className={classNames({ buttonText: true }, { active: true })}>Show favorite</span>
        </button>
      </Link>
    ) : (
      <Link to="/FavoriteMoviesList">
        <button className={classNames({ buttonShowFavoriteMovies: true }, { active: false })}>
          <span className={classNames({ buttonText: true })}>Show favorite</span>
        </button>
      </Link>
    );
  };

  render() {
    return (
      <div className="row justify-content-around Header">
        <div className="col-9">
          <Link to="/">
            <span className="titleLogo">Themoviebox</span>
          </Link>
        </div>
        <div className="col-md-auto align-self-center ">{this.toggleActive()}</div>
      </div>
    );
  }
}

export default withRouter(Header);
