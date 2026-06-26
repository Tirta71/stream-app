import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  selectMovies,
  selectMoviesStatus,
  selectWatchProgress,
} from "../../store/redux/moviesSlice.js";
import {
  buildMovieSections,
  getSimilarMovieRecommendations,
  getMovieType,
  getMoviesWithProgress,
  isActiveMovie,
  isTrendingMovie,
  sortByPublishedDesc,
  sortByRatingDesc,
} from "../../utils/movieMapper.js";

const homeSectionConfigs = [
  {
    getItems: ({ continueMovies }) => continueMovies,
    key: "continueWatching",
    limit: 10,
    title: "Melanjutkan Tonton Film",
    variant: "landscape",
  },
  {
    getItems: ({ activeMovies }) =>
      [...activeMovies].sort(sortByRatingDesc).slice(0, 10),
    key: "topRatedMovies",
    title: "Top Rating Film dan Series Hari ini",
  },
  {
    getItems: ({ activeMovies }) =>
      activeMovies
        .filter((movie) => getMovieType(movie) === "movie" && isTrendingMovie(movie))
        .sort(sortByRatingDesc),
    key: "trendingMovies",
    title: "Film Trending",
  },
  {
    getItems: ({ activeMovies }) =>
      [...activeMovies].sort(sortByPublishedDesc).slice(0, 10),
    key: "newReleases",
    title: "Rilis Baru",
  },
];

function useHomeMovies() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const moviesStatus = useSelector(selectMoviesStatus);
  const watchProgress = useSelector(selectWatchProgress);
  const [selectedMovieDetail, setSelectedMovieDetail] = useState(null);
  const [selectedSeriesDetail, setSelectedSeriesDetail] = useState(null);

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, moviesStatus]);

  const activeMovies = useMemo(
    () => movies.filter(isActiveMovie),
    [movies],
  );

  const visibleSections = useMemo(() => {
    const continueMovies = getMoviesWithProgress(activeMovies, watchProgress);

    return buildMovieSections(homeSectionConfigs, {
      activeMovies,
      continueMovies,
    });
  }, [activeMovies, watchProgress]);

  return {
    closeMovieDetail: () => setSelectedMovieDetail(null),
    closeSeriesDetail: () => setSelectedSeriesDetail(null),
    moviesStatus,
    selectedMovieDetail,
    selectedSeriesDetail,
    showMovieDetail: (detail) => {
      if (detail) {
        setSelectedMovieDetail({
          ...detail,
          recommendations: getSimilarMovieRecommendations(detail, activeMovies),
        });
      }
    },
    showSeriesDetail: (detail) => {
      if (detail) {
        setSelectedSeriesDetail(detail);
      }
    },
    visibleSections,
  };
}

export default useHomeMovies;
