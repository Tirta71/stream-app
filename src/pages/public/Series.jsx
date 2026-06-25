import SeriesContent from "../../components/public/series/SeriesContent.jsx";
import useSeriesMovies from "../../hooks/public/useSeriesMovies.js";

function Series() {
  const {
    closeSeriesDetail,
    genreOptions,
    heroMovie,
    sections,
    selectedGenre,
    selectedSeriesDetail,
    setSelectedGenre,
    showHeroDetail,
    showSeriesDetail,
  } = useSeriesMovies();

  return (
    <SeriesContent
      genreOptions={genreOptions}
      heroMovie={heroMovie}
      onCloseSeriesDetail={closeSeriesDetail}
      onGenreSelect={setSelectedGenre}
      onShowHeroDetail={showHeroDetail}
      onShowSeriesDetail={showSeriesDetail}
      sections={sections}
      selectedGenre={selectedGenre}
      selectedSeriesDetail={selectedSeriesDetail}
    />
  );
}

export default Series;
