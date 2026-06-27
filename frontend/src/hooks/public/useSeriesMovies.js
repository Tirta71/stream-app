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
  getGenres,
  getMovieType,
  getMoviesWithProgress,
  getNormalizedText,
  isActiveMovie,
  isPremiumMovie,
  isTrendingMovie,
  mapApiMovieToSeriesDetail,
  sortByPublishedDesc,
  sortByRatingDesc,
} from "../../utils/movieMapper.js";
import useCurrentSubscription from "./useCurrentSubscription.js";

const seriesHeroFallback = {
  title: "Happiness",
  description:
    "Mengisahkan tentang kelompok orang yang berjuang untuk bertahan hidup di dalam sebuah gedung apartemen yang penuh dengan zombie. Sayangnya, virus zombie hanya terdapat di dalam area apartemen tersebut dan tidak menyebar ke luar kawasan apartemen.",
  image:
    "https://dorama.land/storage/generated/serials/1/og/happiness-ad.webp?v=2",
};

const seriesSectionConfigs = [
  {
    getItems: ({ continueSeries }) => continueSeries,
    key: "continueWatching",
    limit: 10,
    title: "Melanjutkan Tonton Series",
    variant: "landscape",
  },
  {
    getItems: ({ seriesMovies }) => seriesMovies.filter(isPremiumMovie),
    key: "seriesFeatured",
    title: "Series Persembahan Chill",
  },
  {
    getItems: ({ seriesMovies }) =>
      [...seriesMovies].sort(sortByRatingDesc).slice(0, 10),
    key: "topRatedSeries",
    title: "Top Rating Series Hari ini",
  },
  {
    getItems: ({ seriesMovies }) =>
      seriesMovies.filter(isTrendingMovie).sort(sortByRatingDesc),
    key: "trendingSeries",
    title: "Series Trending",
  },
  {
    getItems: ({ seriesMovies }) =>
      [...seriesMovies].sort(sortByPublishedDesc).slice(0, 10),
    key: "newReleases",
    title: "Rilis Baru",
  },
];

function getHeroImage(movie) {
  return movie?.preview_image || movie?.previewImage || movie?.image;
}

function mapHeroMovie(movie) {
  if (!movie) {
    return {
      ...seriesHeroFallback,
      detail: null,
      fallbackImage: seriesHeroFallback.image,
    };
  }

  return {
    description: movie.description || seriesHeroFallback.description,
    detail: mapApiMovieToSeriesDetail(movie),
    fallbackImage: seriesHeroFallback.image,
    image: getHeroImage(movie) || seriesHeroFallback.image,
    title: movie.title || seriesHeroFallback.title,
  };
}

function isSeriesMovie(movie) {
  return getMovieType(movie) === "series";
}

function hasGenre(movie, selectedGenre) {
  if (!selectedGenre) {
    return true;
  }

  return getGenres(movie.genres).some(
    (genre) => getNormalizedText(genre) === getNormalizedText(selectedGenre),
  );
}

function useSeriesMovies() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const moviesStatus = useSelector(selectMoviesStatus);
  const watchProgress = useSelector(selectWatchProgress);
  const { isSubscribed } = useCurrentSubscription();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSeriesDetail, setSelectedSeriesDetail] = useState(null);

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, moviesStatus]);

  const seriesMovies = useMemo(
    () =>
      movies.filter(
        (movie) =>
          isActiveMovie(movie) &&
          isSeriesMovie(movie) &&
          (isSubscribed || !isPremiumMovie(movie)),
      ),
    [isSubscribed, movies],
  );

  const genreOptions = useMemo(() => {
    const uniqueGenres = new Set();

    seriesMovies.forEach((movie) => {
      getGenres(movie.genres).forEach((genre) => {
        uniqueGenres.add(genre);
      });
    });

    return [...uniqueGenres].sort((firstGenre, secondGenre) =>
      firstGenre.localeCompare(secondGenre),
    );
  }, [seriesMovies]);

  const filteredSeriesMovies = useMemo(
    () => seriesMovies.filter((movie) => hasGenre(movie, selectedGenre)),
    [selectedGenre, seriesMovies],
  );

  const heroMovie = useMemo(() => {
    const heroSource = filteredSeriesMovies.length
      ? filteredSeriesMovies
      : seriesMovies;
    const happinessMovie = heroSource.find((movie) =>
      getNormalizedText(movie.title).includes("happiness"),
    );
    const firstSeriesMovie = [...heroSource].sort(sortByPublishedDesc)[0];

    return mapHeroMovie(happinessMovie || firstSeriesMovie);
  }, [filteredSeriesMovies, seriesMovies]);

  const sections = useMemo(() => {
    const continueSeries = getMoviesWithProgress(
      filteredSeriesMovies,
      watchProgress,
    ).filter((item) => isSeriesMovie(item.movie));

    return buildMovieSections(seriesSectionConfigs, {
      continueSeries,
      seriesMovies: filteredSeriesMovies,
    });
  }, [filteredSeriesMovies, watchProgress]);

  const showHeroDetail = () => {
    if (heroMovie.detail) {
      setSelectedSeriesDetail(heroMovie.detail);
    }
  };

  const showSeriesDetail = (detail) => {
    if (detail) {
      setSelectedSeriesDetail(detail);
    }
  };

  const closeSeriesDetail = () => {
    setSelectedSeriesDetail(null);
  };

  return {
    closeSeriesDetail,
    genreOptions,
    heroMovie,
    moviesStatus,
    selectedGenre,
    selectedSeriesDetail,
    setSelectedGenre,
    showHeroDetail,
    showSeriesDetail,
    sections,
  };
}

export default useSeriesMovies;
