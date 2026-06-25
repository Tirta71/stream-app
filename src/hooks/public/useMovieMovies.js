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
  sortByPublishedDesc,
  sortByRatingDesc,
} from "../../utils/movieMapper.js";

const movieHeroFallback = {
  title: "Avatar: The Way of Water",
  description:
    "Jake Sully hidup bersama keluarga barunya di planet Pandora. Ketika ancaman lama kembali, Jake harus bekerja sama dengan Neytiri dan bangsa Na'vi untuk melindungi rumah mereka.",
  image: "https://image.tmdb.org/t/p/w1280/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
};

const movieSectionConfigs = [
  {
    getItems: ({ continueMovies }) => continueMovies,
    key: "continueWatching",
    limit: 10,
    title: "Melanjutkan Tonton Film",
    variant: "landscape",
  },
  {
    getItems: ({ movieItems }) => {
      const premiumMovies = movieItems.filter(isPremiumMovie);

      return premiumMovies.length ? premiumMovies : movieItems;
    },
    key: "movieFeatured",
    title: "Film Persembahan Chill",
  },
  {
    getItems: ({ movieItems }) =>
      [...movieItems].sort(sortByRatingDesc).slice(0, 10),
    key: "topRatedMovies",
    title: "Top Rating Film Hari ini",
  },
  {
    getItems: ({ movieItems }) =>
      movieItems.filter(isTrendingMovie).sort(sortByRatingDesc),
    key: "trendingMovies",
    title: "Film Trending",
  },
  {
    getItems: ({ movieItems }) =>
      [...movieItems].sort(sortByPublishedDesc).slice(0, 10),
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
      ...movieHeroFallback,
      fallbackImage: movieHeroFallback.image,
    };
  }

  return {
    description: movie.description || movieHeroFallback.description,
    fallbackImage: movieHeroFallback.image,
    image: getHeroImage(movie) || movieHeroFallback.image,
    title: movie.title || movieHeroFallback.title,
  };
}

function isMovie(movie) {
  return getMovieType(movie) === "movie";
}

function hasGenre(movie, selectedGenre) {
  if (!selectedGenre) {
    return true;
  }

  return getGenres(movie.genres).some(
    (genre) => getNormalizedText(genre) === getNormalizedText(selectedGenre),
  );
}

function useMovieMovies() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const moviesStatus = useSelector(selectMoviesStatus);
  const watchProgress = useSelector(selectWatchProgress);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, moviesStatus]);

  const movieItems = useMemo(
    () => movies.filter((movie) => isActiveMovie(movie) && isMovie(movie)),
    [movies],
  );

  const genreOptions = useMemo(() => {
    const uniqueGenres = new Set();

    movieItems.forEach((movie) => {
      getGenres(movie.genres).forEach((genre) => {
        uniqueGenres.add(genre);
      });
    });

    return [...uniqueGenres].sort((firstGenre, secondGenre) =>
      firstGenre.localeCompare(secondGenre),
    );
  }, [movieItems]);

  const filteredMovieItems = useMemo(
    () => movieItems.filter((movie) => hasGenre(movie, selectedGenre)),
    [movieItems, selectedGenre],
  );

  const heroMovie = useMemo(() => {
    const heroSource = filteredMovieItems.length ? filteredMovieItems : movieItems;
    const avatarMovie = heroSource.find((movie) =>
      getNormalizedText(movie.title).includes("avatar"),
    );
    const firstMovie = [...heroSource].sort(sortByPublishedDesc)[0];

    return mapHeroMovie(avatarMovie || firstMovie);
  }, [filteredMovieItems, movieItems]);

  const sections = useMemo(() => {
    const continueMovies = getMoviesWithProgress(
      filteredMovieItems,
      watchProgress,
    ).filter((item) => isMovie(item.movie));

    return buildMovieSections(movieSectionConfigs, {
      continueMovies,
      movieItems: filteredMovieItems,
    });
  }, [filteredMovieItems, watchProgress]);

  return {
    genreOptions,
    heroMovie,
    moviesStatus,
    sections,
    selectedGenre,
    setSelectedGenre,
  };
}

export default useMovieMovies;
