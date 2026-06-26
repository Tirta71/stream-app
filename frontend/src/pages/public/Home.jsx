import HomeContent from "../../components/public/home/HomeContent.jsx";
import useHomeMovies from "../../hooks/public/useHomeMovies.js";

function Home({ heroMovie }) {
  const {
    closeMovieDetail,
    closeSeriesDetail,
    selectedMovieDetail,
    selectedSeriesDetail,
    showMovieDetail,
    showSeriesDetail,
    visibleSections,
  } = useHomeMovies();

  return (
    <HomeContent
      heroMovie={heroMovie}
      onCloseMovieDetail={closeMovieDetail}
      onCloseSeriesDetail={closeSeriesDetail}
      onShowMovieDetail={showMovieDetail}
      onShowSeriesDetail={showSeriesDetail}
      sections={visibleSections}
      selectedMovieDetail={selectedMovieDetail}
      selectedSeriesDetail={selectedSeriesDetail}
    />
  );
}

export default Home;
