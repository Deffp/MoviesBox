import { put } from 'redux-saga/effects';

import MovieAPI from '../MovieAPI/MovieAPI';
import { actions } from '../Reducer/ReducerMoviesList';

export function* workerSagaSetMovies(currentPage) {
  try {
    const movies = yield MovieAPI.getAllMovies(currentPage.currentPage);
    const genres = yield MovieAPI.getGenres();
    yield put(actions.setMovies({ moviesList: movies, genresList: genres }));
    yield put(actions.isLoading(false));
  } catch (e) {
    console.log(e);
  }
}

export function* workerSagaGetSelectedMovie(id) {
  try {
    const movie = yield MovieAPI.getMovieItem(id.id);
    const genres = yield MovieAPI.getGenres();
    yield put(actions.setMovie({ movie: movie, genresList: genres }));
    yield put(actions.isLoading(false));
  } catch (e) {
    console.log(e);
  }
}

export function* workerSagaAddToFavorite(action) {
  try {
    const favoriteList = action.favoriteMoviesList;
    const movie = yield MovieAPI.getMovieItem(action.id);
    const genres = yield MovieAPI.getGenres();
    yield put(actions.addMovieToFavoriteList({ movie, favoriteMoviesList: favoriteList, genresList: genres }));
  } catch (e) {
    console.log(e);
  }
}

export function* workerSagaRemoveMovie(action) {
  try {
    const favoriteList = action.favoriteMoviesList;
    const movie = yield MovieAPI.getMovieItem(action.id);
    yield put(actions.removeMovieFromFavoriteList({ movie, favoriteMoviesList: favoriteList }));
  } catch (e) {
    console.log(e);
  }
}
