import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import MoviesList from '../MoviesList/MoviesList';
import SelectedMovieItem from '../SelectedMovieItem/SelectedMoviesItem';
import FavoriteMoviesList from '../FavoriteMoviesList/FavoriteMoviesList';
import Loader from '../Loader/Loader';
import { store, persistor } from '../../Store/Store';
import './App.css';

const App = () => (
  <div className="Wrapper">
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router>
          <Switch>
            <Route path="/page/:page" component={MoviesList} />
            <Route path="/favorite_movies_list" component={FavoriteMoviesList} />
            <Route path="/movie/:id" component={SelectedMovieItem} />
            <Route path="/" component={MoviesList} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  </div>
);
export default App;
