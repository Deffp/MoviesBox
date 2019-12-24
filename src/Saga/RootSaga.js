import { all } from 'redux-saga/effects';

import {
  watcherSagaSetMovies,
  watcherSagaGetSelectedMovie,
  watcherSagaAddMovie,
  watcherSagaRemoveMovie,
} from './WatcherSaga';

export default function* rootSaga() {
  yield all([watcherSagaSetMovies(), watcherSagaGetSelectedMovie(), watcherSagaAddMovie(), watcherSagaRemoveMovie()]);
}
