/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MoviesList from '../MoviesList/MoviesList';
import SelectedMovieItem from '../SelectedMovieItem/SelectedMoviesItem';
import FavoriteMoviesList from '../FavoriteMoviesList/FavoriteMoviesList';
import './App.css';

const App = () => (
  <div className="Wrapper">
    <Router>
      <Switch>
        <Route path="/page/:page" render={(props) => <MoviesList {...props} key={props.match.params.page} />} />
        <Route path="/favorite_movies_list" component={FavoriteMoviesList} />
        <Route path="/movie/:id" component={SelectedMovieItem} />
        <Route path="/" render={(props) => <MoviesList {...props} key={props.match.params.page} />} />
      </Switch>
    </Router>
  </div>
);
export default App;
