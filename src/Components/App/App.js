import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { Footer } from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';
import SelectedMovieItem from '../SelectedMovieItem/SelectedMoviesItem';
import FavoriteMoviesList from '../FavoriteMoviesList/FavoriteMoviesList';
import Loader from '../Loader/Loader';
import { store, persistor } from '../../Store/Store';
import './App.css';

export const App = () => {
  return (
    <div className="container-fluid">
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <Router>
            <Switch>
              <Route path="/page/:page" render={(props) => <MoviesList {...props} key={props.match.params.page} />} />
              <Route path="/FavoriteMoviesList" component={FavoriteMoviesList} />
              <Route path="/movie/:id" component={SelectedMovieItem} />
              <Route path="/" render={(props) => <MoviesList {...props} key={props.match.params.page} />} />
            </Switch>
          </Router>
          <Footer />
        </PersistGate>
      </Provider>
    </div>
  );
};
