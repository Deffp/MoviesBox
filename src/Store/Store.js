import { createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducers as MoviesList } from '../Reducer/ReducerMoviesList';
import RootSaga from '../Saga/RootSaga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: 'favoriteMoviesList',
  blacklist: '_persist',
};

const pReducer = persistReducer(persistConfig, MoviesList);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(pReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
export const persistor = persistStore(store);

sagaMiddleware.run(RootSaga);
