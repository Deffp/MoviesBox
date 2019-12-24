import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './Header.css';

class Header extends Component {
  toggleActive = () => {
    const {
      match: { isExact, path },
    } = this.props;
    return isExact && path === '/favorite_movies_list' ? (
      <Link to="/">
        <button type="button" className={classNames({ buttonShowFavoriteMovies: true }, { active: true })}>
          <span className={classNames({ buttonText: true }, { active: true })}>
            <FontAwesomeIcon className="headerIcon" icon={faStar} />
            Show favorite
          </span>
        </button>
      </Link>
    ) : (
      <Link to="/favorite_movies_list">
        <button type="button" className={classNames({ buttonShowFavoriteMovies: true }, { active: false })}>
          <span className={classNames({ buttonText: true })}>
            <FontAwesomeIcon className="headerIcon" icon={faStar} />
            Show favorite
          </span>
        </button>
      </Link>
    );
  };

  render() {
    return (
      <Navbar className="header">
        <Navbar.Brand>
          <Link className="wrapperTitleLogo" to="/">
            <span className="titleLogo">
              Themovie
              <span className="boldText">box</span>
            </span>
          </Link>
        </Navbar.Brand>
        <div className="wrapperBtn">{this.toggleActive()}</div>
      </Navbar>
    );
  }
}

export default withRouter(Header);
