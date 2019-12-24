import axios from 'axios';

class MovieAPI {
  constructor(url, key) {
    this.baseURL = url;
    this.key = key;
  }

  async getResourse(path, params) {
    const instance = axios.create({
      baseURL: this.baseURL,
    });

    // eslint-disable-next-line max-len
    const result = instance.get(path, { params: { api_key: this.key, ...params } }).then((res) => res.data);
    return result;
  }

  async getAllMovies(page = 1) {
    const { results } = await this.getResourse('/movie/now_playing', { page });
    return results;
  }

  async getMovieItem(id) {
    return this.getResourse(`/movie/${id}`);
  }

  async getGenres() {
    const { genres } = await this.getResourse('/genre/movie/list');
    return genres;
  }
}

export default new MovieAPI(process.env.REACT_APP_BASE_API_URL, process.env.REACT_APP_KEY);
