import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import { reducers as MoviesList } from '../Reducer/ReducerMoviesList';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: 'favoriteMoviesList',
  blacklist: '_persist',
};

const pReducer = persistReducer(persistConfig, MoviesList);

export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
