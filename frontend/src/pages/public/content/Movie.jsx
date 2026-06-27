import MovieContent from "../../../components/public/movie/MovieContent.jsx";
import useMovieMovies from "../../../hooks/public/useMovieMovies.js";

function Movie() {
  const {
    closeMovieDetail,
    genreOptions,
    heroMovie,
    sections,
    selectedGenre,
    selectedMovieDetail,
    setSelectedGenre,
    showHeroDetail,
    showMovieDetail,
  } = useMovieMovies();

  return (
    <MovieContent
      genreOptions={genreOptions}
      heroMovie={heroMovie}
      onCloseMovieDetail={closeMovieDetail}
      onGenreSelect={setSelectedGenre}
      onShowHeroDetail={showHeroDetail}
      onShowMovieDetail={showMovieDetail}
      sections={sections}
      selectedGenre={selectedGenre}
      selectedMovieDetail={selectedMovieDetail}
    />
  );
}

export default Movie;
