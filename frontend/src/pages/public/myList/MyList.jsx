import MyListContent from "../../../components/public/myList/MyListContent.jsx";
import useMyListMovies from "../../../hooks/public/useMyListMovies.js";

function MyList() {
  const {
    closeMovieDetail,
    closeSeriesDetail,
    isLoading,
    moviesError,
    moviesStatus,
    myListMovies,
    selectedMovieDetail,
    selectedSeriesDetail,
    showMovieDetail,
    showSeriesDetail,
  } = useMyListMovies();

  return (
    <MyListContent
      error={moviesError}
      isLoading={isLoading}
      movies={myListMovies}
      onCloseMovieDetail={closeMovieDetail}
      onCloseSeriesDetail={closeSeriesDetail}
      onShowMovieDetail={showMovieDetail}
      onShowSeriesDetail={showSeriesDetail}
      selectedMovieDetail={selectedMovieDetail}
      selectedSeriesDetail={selectedSeriesDetail}
      status={moviesStatus}
    />
  );
}

export default MyList;
