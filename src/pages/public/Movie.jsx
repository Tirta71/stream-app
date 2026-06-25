import MovieContent from "../../components/public/movie/MovieContent.jsx";
import useMovieMovies from "../../hooks/public/useMovieMovies.js";

function Movie() {
  const {
    genreOptions,
    heroMovie,
    sections,
    selectedGenre,
    setSelectedGenre,
  } = useMovieMovies();

  return (
    <MovieContent
      genreOptions={genreOptions}
      heroMovie={heroMovie}
      onGenreSelect={setSelectedGenre}
      sections={sections}
      selectedGenre={selectedGenre}
    />
  );
}

export default Movie;
