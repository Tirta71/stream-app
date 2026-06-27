import HomeContent from "../../../components/public/home/HomeContent.jsx";
import useHomeMovies from "../../../hooks/public/useHomeMovies.js";

function Home() {
  const {
    closeMovieDetail,
    closeSeriesDetail,
    heroMovie,
    selectedMovieDetail,
    selectedSeriesDetail,
    showHeroDetail,
    showMovieDetail,
    showSeriesDetail,
    visibleSections,
  } = useHomeMovies();

  return (
    <HomeContent
      heroMovie={heroMovie}
      onCloseMovieDetail={closeMovieDetail}
      onCloseSeriesDetail={closeSeriesDetail}
      onShowHeroDetail={showHeroDetail}
      onShowMovieDetail={showMovieDetail}
      onShowSeriesDetail={showSeriesDetail}
      sections={visibleSections}
      selectedMovieDetail={selectedMovieDetail}
      selectedSeriesDetail={selectedSeriesDetail}
    />
  );
}

export default Home;
