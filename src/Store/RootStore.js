import { create, localForage } from 'mobx-persist';

import MoviesStore from './MoviesStore';
import FavoriteMoviesStore from './FavoriteMoviesStore';

const hydrate = create({
  storage: localForage,
  jsonify: true,
});

class RootStore {
  constructor() {
    this.MoviesStore = new MoviesStore();
    this.FavoriteMoviesStore = new FavoriteMoviesStore();
    hydrate('FavoriteMoviesList', this.FavoriteMoviesStore);
    hydrate('Movies', this.MoviesStore);
  }
}

const rootStore = new RootStore();

export default rootStore;
