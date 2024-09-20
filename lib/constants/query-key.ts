export const QUERY_KEYS = {
  // admin
  loginAdmin: '/admin/login',
  meAdmin: '/admin/users/me',
  movieAdmin: '/content-manager/collection-types/api::movie.movie',
  genreAdmin: '/content-manager/collection-types/api::genre.genre',

  // next
  createManySentence: '/api/common/createManySentence',
  createManyGenre: '/api/common/createManyGenre',
  createManyPartOfSpeech: '/api/common/createManyPartOfSpeech',

  // tmdb
  movieNowPlaying: '/movie/now_playing',
  moviePopular: '/movie/popular',
  movieTopRated: '/movie/top_rated',
  movieById: '/movie',
  searchMovie: '/search/movie',
  genreMovie: '/genre/movie/list',

  // customer
  login: '/api/auth/local',
  register: '/api/auth/register',
}
