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
        <Route path="/page/:page" component={MoviesList} />
        <Route path="/favorite_movies_list" component={FavoriteMoviesList} />
        <Route path="/movie/:id" component={SelectedMovieItem} />
        <Route path="/" component={MoviesList} />
      </Switch>
    </Router>
  </div>
);
export default App;
