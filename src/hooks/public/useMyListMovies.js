import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  selectMovies,
  selectMoviesError,
  selectMoviesStatus,
} from "../../store/redux/moviesSlice.js";
import {
  getSimilarMovieRecommendations,
  mapApiMovieToPublicMovie,
} from "../../utils/movieMapper.js";

const myListLimit = 12;

function useMyListMovies() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const moviesStatus = useSelector(selectMoviesStatus);
  const moviesError = useSelector(selectMoviesError);
  const [selectedMovieDetail, setSelectedMovieDetail] = useState(null);
  const [selectedSeriesDetail, setSelectedSeriesDetail] = useState(null);

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, moviesStatus]);

  const myListMovies = useMemo(
    () => movies.map(mapApiMovieToPublicMovie).slice(0, myListLimit),
    [movies],
  );

  const showMovieDetail = (detail) => {
    if (detail) {
      setSelectedMovieDetail({
        ...detail,
        recommendations: getSimilarMovieRecommendations(detail, movies),
      });
    }
  };

  const showSeriesDetail = (detail) => {
    if (detail) {
      setSelectedSeriesDetail(detail);
    }
  };

  return {
    closeMovieDetail: () => setSelectedMovieDetail(null),
    closeSeriesDetail: () => setSelectedSeriesDetail(null),
    isLoading: moviesStatus === "idle" || moviesStatus === "loading",
    moviesError,
    moviesStatus,
    myListMovies,
    selectedMovieDetail,
    selectedSeriesDetail,
    showMovieDetail,
    showSeriesDetail,
  };
}

export default useMyListMovies;
