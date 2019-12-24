import { actions } from '../Reducer/ReducerMoviesList';
import {
  workerSagaSetMovies,
  workerSagaGetSelectedMovie,
  workerSagaAddToFavorite,
  workerSagaRemoveMovie,
} from './WorkersSagas';
import { takeLatest } from 'redux-saga/effects';

export function* watcherSagaSetMovies() {
  yield takeLatest(actions.fetchMovies, workerSagaSetMovies);
}

export function* watcherSagaGetSelectedMovie() {
  yield takeLatest(actions.getMovie, workerSagaGetSelectedMovie);
}

export function* watcherSagaAddMovie() {
  yield takeLatest(actions.addMovie, workerSagaAddToFavorite);
}

export function* watcherSagaRemoveMovie() {
  yield takeLatest(actions.removeMovie, workerSagaRemoveMovie);
}
