import MoviesStore from './MoviesStore';
import FavoriteMoviesStore from './FavoriteMoviesStore';

class RootStore {
  constructor() {
    this.MoviesStore = new MoviesStore();
    this.FavoriteMoviesStore = new FavoriteMoviesStore();
  }
}

const rootStore = new RootStore();

export default rootStore;
