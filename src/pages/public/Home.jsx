import HomeContent from "../../components/public/home/HomeContent.jsx";
import useHomeMovies from "../../hooks/public/useHomeMovies.js";

function Home({ heroMovie }) {
  const {
    closeSeriesDetail,
    selectedSeriesDetail,
    showSeriesDetail,
    visibleSections,
  } = useHomeMovies();

  return (
    <HomeContent
      heroMovie={heroMovie}
      onCloseSeriesDetail={closeSeriesDetail}
      onShowSeriesDetail={showSeriesDetail}
      sections={visibleSections}
      selectedSeriesDetail={selectedSeriesDetail}
    />
  );
}

export default Home;
