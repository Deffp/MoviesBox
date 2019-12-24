import { createActions, handleActions } from 'redux-actions';
import _ from 'lodash';

const defaultState = {
  moviesList: [],
  favoriteMoviesList: [],
  movie: { genresList: [] },
  loading: true,
  genresList: [],
};

export const actions = createActions(
  {},
  'SET_MOVIES',
  'SET_FAVORITE_MOVIES',
  'SET_MOVIE',
  'IS_LOADING',
  'ADD_MOVIE_TO_FAVORITE_LIST',
  'REMOVE_MOVIE_FROM_FAVORITE_LIST',
  'FETCH_MOVIES',
  'GET_MOVIE',
  'ADD_MOVIE',
  'REMOVE_MOVIE',
);

export const reducers = handleActions(
  {
    [actions.setMovies]: (state, { payload: { moviesList, genresList } }) => {
      const genresIndex = _.keyBy(genresList, 'id');
      const m = moviesList.map((m) => ({
        ...m,
        genresList: m.genre_ids.map((id) => genresIndex[id]),
      }));
      return { ...state, moviesList: m };
    },
    [actions.setFavoriteMovies]: (state, { payload: { favoriteMoviesList, genresList } }) => {
      const genresIndex = _.keyBy(genresList, 'id');
      const m = favoriteMoviesList.map((m) => ({
        ...m,
        genresList: m.genres.map((id) => genresIndex[id.id]),
      }));
      return { ...state, favoriteMoviesList: m };
    },
    [actions.setMovie]: (state, { payload: { movie, genresList } }) => {
      const genresIndex = _.keyBy(genresList, 'id');
      const m = {
        ...movie,
        genresList: movie.genres.map((id) => genresIndex[id.id]),
      };
      return { ...state, movie: m };
    },
    [actions.removeMovieFromFavoriteList]: (state, { payload: { movie, favoriteMoviesList } }) => {
      const removeMovie = favoriteMoviesList.filter((next) => next.id !== movie.id);
      return { ...state, favoriteMoviesList: removeMovie };
    },
    [actions.addMovieToFavoriteList]: (state, { payload: { movie, favoriteMoviesList, genresList } }) => {
      const genresIndex = _.keyBy(genresList, 'id');
      const m = {
        ...movie,
        genresList: movie.genres.map((id) => genresIndex[id.id]),
      };
      if (_.find(favoriteMoviesList, { id: movie.id })) {
        return { ...state };
      }
      favoriteMoviesList = [m, ...favoriteMoviesList];
      return { ...state, favoriteMoviesList };
    },
    [actions.isLoading]: (state, actions) => ({
      ...state,
      loading: actions.payload,
    }),
    [actions.fetchMovies]: (state, actions) => ({
      ...state,
      action: actions.payload,
    }),
    [actions.getMovie]: (state, actions) => ({
      ...state,
      action: actions.payload,
    }),
    [actions.addMovie]: (state, actions) => ({
      ...state,
      action: actions.payload,
    }),
    [actions.removeMovie]: (state, actions) => ({
      ...state,
      action: actions.payload,
    }),
  },
  defaultState,
);
