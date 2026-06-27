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
  isPremiumMovie,
  isTrendingMovie,
  mapApiMovieToMovieDetail,
  mapApiMovieToSeriesDetail,
  sortByPublishedDesc,
  sortByRatingDesc,
} from "../../utils/movieMapper.js";
import useCurrentSubscription from "./useCurrentSubscription.js";

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

const homeHeroFallback = {
  description: "Temukan film dan series pilihan yang siap kamu tonton hari ini.",
  image: "",
  title: "CHILL",
};

function getHeroImage(movie) {
  return movie?.preview_image || movie?.previewImage || movie?.image;
}

function mapHomeHeroMovie(movie) {
  if (!movie) {
    return {
      ...homeHeroFallback,
      detail: null,
      fallbackImage: "",
      type: "movie",
    };
  }

  const type = getMovieType(movie) === "series" ? "series" : "movie";

  return {
    description: movie.description || homeHeroFallback.description,
    detail:
      type === "series"
        ? mapApiMovieToSeriesDetail(movie)
        : mapApiMovieToMovieDetail(movie),
    fallbackImage: getHeroImage(movie) || "",
    image: getHeroImage(movie) || "",
    title: movie.title || homeHeroFallback.title,
    type,
  };
}

function useHomeMovies() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const moviesStatus = useSelector(selectMoviesStatus);
  const watchProgress = useSelector(selectWatchProgress);
  const { isSubscribed } = useCurrentSubscription();
  const [selectedMovieDetail, setSelectedMovieDetail] = useState(null);
  const [selectedSeriesDetail, setSelectedSeriesDetail] = useState(null);

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, moviesStatus]);

  const activeMovies = useMemo(
    () =>
      movies.filter(
        (movie) =>
          isActiveMovie(movie) && (isSubscribed || !isPremiumMovie(movie)),
      ),
    [isSubscribed, movies],
  );

  const visibleSections = useMemo(() => {
    const continueMovies = getMoviesWithProgress(activeMovies, watchProgress);

    return buildMovieSections(homeSectionConfigs, {
      activeMovies,
      continueMovies,
    });
  }, [activeMovies, watchProgress]);
  const heroMovie = useMemo(() => {
    const heroSource =
      activeMovies.find((movie) =>
        String(movie.title ?? "").toLowerCase().includes("duty after school"),
      ) ??
      activeMovies.find(isTrendingMovie) ??
      activeMovies[0];

    return mapHomeHeroMovie(heroSource);
  }, [activeMovies]);

  const showHeroDetail = () => {
    if (!heroMovie.detail) {
      return;
    }

    if (heroMovie.type === "series") {
      setSelectedSeriesDetail(heroMovie.detail);
      return;
    }

    setSelectedMovieDetail({
      ...heroMovie.detail,
      recommendations: getSimilarMovieRecommendations(heroMovie.detail, activeMovies),
    });
  };

  return {
    closeMovieDetail: () => setSelectedMovieDetail(null),
    closeSeriesDetail: () => setSelectedSeriesDetail(null),
    heroMovie,
    moviesStatus,
    selectedMovieDetail,
    selectedSeriesDetail,
    showHeroDetail,
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
