import _ from 'lodash';
import { createActions, handleActions } from 'redux-actions';

import MovieAPI from '../MovieAPI/MovieAPI';

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
);

export const reducers = handleActions(
  {
    [actions.setMovies]: (state, { payload: { moviesList, genresList } }) => {
      const genresIndex = _.keyBy(genresList, 'id');
      const m = moviesList.map((movie) => ({
        ...movie,
        genresList: movie.genre_ids.map((id) => genresIndex[id]),
      }));
      return { ...state, moviesList: m };
    },
    [actions.setFavoriteMovies]: (state, { payload: { favoriteMoviesList, genresList } }) => {
      const genresIndex = _.keyBy(genresList, 'id');
      const m = favoriteMoviesList.map((movie) => ({
        ...movie,
        genresList: movie.genresList.map((id) => genresIndex[id.id]),
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
      const updateList = [m, ...favoriteMoviesList];
      return { ...state, favoriteMoviesList: updateList };
    },
    [actions.isLoading]: (state) => ({
      ...state,
      loading: actions.payload,
    }),
  },
  defaultState,
);

export const getMovies = (currentPage) => async (dispatch) => {
  const movies = await MovieAPI.getAllMovies(currentPage);
  const genres = await MovieAPI.getGenres();
  dispatch(actions.setMovies({ moviesList: movies, genresList: genres }));
  dispatch(actions.isLoading(false));
};

export const getFavoriteMovies = () => async (dispatch, getState) => {
  const genres = await MovieAPI.getGenres();
  const { favoriteMoviesList } = getState();
  dispatch(actions.setFavoriteMovies({ favoriteMoviesList, genresList: genres }));
  dispatch(actions.isLoading(true));
};

export const getSelectedMovie = (id) => async (dispatch) => {
  const movie = await MovieAPI.getMovieItem(id);
  const genres = await MovieAPI.getGenres();
  dispatch(actions.setMovie({ movie, genresList: genres }));
  dispatch(actions.isLoading(false));
};

export const addToFavorite = (id) => async (dispatch, getState) => {
  const { favoriteMoviesList } = getState();
  const movie = await MovieAPI.getMovieItem(id);
  const genres = await MovieAPI.getGenres();
  dispatch(
    actions.addMovieToFavoriteList({
      movie,
      favoriteMoviesList,
      genresList: genres,
    }),
  );
};

export const removeMovie = (id) => async (dispatch, getState) => {
  const { favoriteMoviesList } = getState();
  const movie = await MovieAPI.getMovieItem(id);
  dispatch(actions.removeMovieFromFavoriteList({ movie, favoriteMoviesList }));
};
