import { observable } from 'mobx';
import _ from 'lodash';

import MovieAPI from '../MovieAPI/MovieAPI';

class MoviesStore {
  @observable moviesList = [];

  @observable genresList = [];

  @observable loading = true;

  @observable movie = { genresList: [] };

  @observable setMovies = async (page) => {
    try {
      const movies = await MovieAPI.getAllMovies(page);
      const genresList = await MovieAPI.getGenres();
      const genresIndex = _.keyBy(genresList, 'id');
      const moviesList = movies.map((movie) => ({
        ...movie,
        genresList: movie.genre_ids.map((id) => genresIndex[id]),
      }));
      this.moviesList = [...moviesList];
      this.genresList = [...genresList];
    } catch (error) {
      //   console.log(error);
    } finally {
      this.loading = false;
    }
  };

  @observable setMovie = async (idMovie) => {
    const genresList = await MovieAPI.getGenres();
    const genresIndex = _.keyBy(genresList, 'id');
    const movie = this.moviesList.find((m) => m.id === idMovie);
    const selectedMovie = {
      ...movie,
      genresList: movie.genre_ids.map((id) => genresIndex[id]),
    };
    this.movie = {
      ...selectedMovie,
    };
    this.loading = false;
  };
}

export default MoviesStore;
