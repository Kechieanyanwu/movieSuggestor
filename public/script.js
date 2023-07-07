const tmdbKey = '7f637d8c9e9dec001ebce8174a10bc17'; // do not share with API key
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl+genreRequestEndpoint+requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      const genres = jsonResponse.genres;
      //console.log(genres);
      return genres;
    };
  } catch (error) {
    console.log(error);
  };
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  //include random page in parameter 
  const urlToFetch = tmdbBaseUrl+discoverMovieEndpoint+requestParams;
 
    try {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    //console.log(jsonResponse);
    const movies = jsonResponse.results;
    //console.log(movies);
    return movies;
    
  }} catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl+movieEndpoint+requestParams;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  };
};

/*
const getMovieCast = async (movie) => { //to-do get movie cast
  
}


const getMovieRating = async (movie) => { //to-do get movie rating 
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}/release_dates`;
}

const getMovieReleaseType = async (movie) => { //to-do get movie release type 
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}/release_dates`;
}
*/


// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = await getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
