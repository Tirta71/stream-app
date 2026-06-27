import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  editMovie,
  fetchMovies,
  removeMovie,
  selectMovies,
  selectMoviesError,
  selectMoviesStatus,
  selectWatchProgress,
} from "../../store/redux/moviesSlice.js";

const moviePageSize = 7;

const adminPageSections = {
  home: [
    "continueWatching",
    "premiumContents",
    "topRatedMovies",
    "trendingMovies",
    "newReleases",
  ],
  movie: [
    "continueWatching",
    "premiumContents",
    "topRatedMovies",
    "trendingMovies",
    "newReleases",
  ],
  series: [
    "continueWatching",
    "premiumContents",
    "topRatedMovies",
    "trendingMovies",
    "newReleases",
  ],
};

function createMovieSlug(title) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return slug || `movie-${Date.now()}`;
}

function getErrorMessage(error, fallbackMessage) {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

function getBooleanField(movie, camelKey, snakeKey, fallbackValue = false) {
  const value = movie?.[camelKey] ?? movie?.[snakeKey];

  if (value === undefined || value === null) {
    return fallbackValue;
  }

  return value === true || value === "true";
}

function getMovieType(movie) {
  const type = String(movie?.type || "").toLowerCase();

  return type === "series" ? "series" : "movie";
}

function getMovieRating(movie) {
  const rating = Number(movie?.rating);

  return Number.isFinite(rating) ? rating : 0;
}

function getProgressMovieId(watchProgress) {
  return (
    watchProgress?.seriesFilmId ??
    watchProgress?.series_film_id ??
    watchProgress?.movieId ??
    watchProgress?.movie_id
  );
}

function isInWatchProgress(movie, watchProgressItems) {
  return watchProgressItems.some(
    (watchProgress) =>
      String(getProgressMovieId(watchProgress)) === String(movie.id),
  );
}

function getPublishedAt(movie) {
  return movie?.publishedAt ?? movie?.published_at ?? "";
}

function getMoviePayload(movie) {
  const rating = Number(movie.rating);
  const releaseYear = Number(movie.releaseYear);
  const selectedSection = movie.section || "";
  const badge = movie.badge?.trim() || null;
  const publishedAt = movie.publishedAt ? new Date(movie.publishedAt) : null;

  return {
    ageRating: movie.ageRating?.trim() || "13+",
    badge,
    description: movie.description?.trim() || "Deskripsi belum tersedia.",
    image: movie.image.trim(),
    isActive: movie.isActive !== false,
    isPremium:
      movie.isPremium ||
      selectedSection === "premiumContents" ||
      badge?.toLowerCase() === "premium",
    isTopTen: Boolean(movie.top || movie.isTopTen),
    isTrending: Boolean(movie.isTrending || selectedSection === "trendingMovies"),
    previewImage: movie.previewImage?.trim() || movie.image.trim(),
    ...(publishedAt ? { publishedAt } : {}),
    rating: Number.isFinite(rating) ? rating : 0,
    releaseYear: Number.isFinite(releaseYear) ? releaseYear : null,
    slug: movie.slug?.trim() || createMovieSlug(movie.title),
    title: movie.title.trim(),
    trailerUrl: movie.trailerUrl?.trim() || null,
    type: getMovieType(movie),
  };
}

function isInSection(movie, sectionFilter, watchProgressItems) {
  if (sectionFilter === "all") {
    return true;
  }

  if (sectionFilter === "continueWatching") {
    return isInWatchProgress(movie, watchProgressItems);
  }

  if (sectionFilter === "premiumContents") {
    return getBooleanField(movie, "isPremium", "is_premium");
  }

  if (sectionFilter === "topRatedMovies") {
    return getBooleanField(movie, "isTopTen", "is_top_ten") || getMovieRating(movie) >= 4;
  }

  if (sectionFilter === "trendingMovies") {
    return getBooleanField(movie, "isTrending", "is_trending");
  }

  if (sectionFilter === "newReleases") {
    return Boolean(getPublishedAt(movie) || movie?.releaseYear || movie?.release_year);
  }

  return true;
}

function getFilteredMovies(movies, watchProgressItems, pageFilter, sectionFilter) {
  return movies.filter((movie) => {
    const type = getMovieType(movie);
    const isInSelectedSection =
      sectionFilter === "all"
        ? true
        : adminPageSections[pageFilter].includes(sectionFilter) &&
          isInSection(movie, sectionFilter, watchProgressItems);

    if (!isInSelectedSection) {
      return false;
    }

    if (pageFilter === "series") {
      return type === "series";
    }

    if (pageFilter === "movie") {
      return type === "movie";
    }

    return true;
  });
}

function getPaginatedMovies(movies, currentPage) {
  const totalPages = Math.max(1, Math.ceil(movies.length / moviePageSize));
  const activePage = Math.min(currentPage, totalPages);
  const pageStartIndex = (activePage - 1) * moviePageSize;

  return {
    activePage,
    paginatedMovies: movies.slice(pageStartIndex, pageStartIndex + moviePageSize),
    totalPages,
  };
}

function useManageMovies() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const moviesStatus = useSelector(selectMoviesStatus);
  const moviesError = useSelector(selectMoviesError);
  const watchProgress = useSelector(selectWatchProgress);
  const [editingMovie, setEditingMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageFilter, setPageFilter] = useState("home");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const isLoading = moviesStatus === "idle" || moviesStatus === "loading";
  const visibleErrorMessage =
    errorMessage || (moviesStatus === "failed" ? moviesError : "");
  const filteredMovies = getFilteredMovies(
    movies,
    watchProgress,
    pageFilter,
    sectionFilter,
  );
  const { activePage, paginatedMovies, totalPages } = getPaginatedMovies(
    filteredMovies,
    currentPage,
  );

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, moviesStatus]);

  const handleSubmitMovie = async (movie) => {
    const moviePayload = getMoviePayload(movie);

    setIsSubmitting(true);
    setErrorMessage("");
    setStatusMessage("");

    try {
      if (editingMovie) {
        await dispatch(
          editMovie({
            id: editingMovie.id,
            movie: moviePayload,
          }),
        ).unwrap();

        setCurrentPage(1);
        setEditingMovie(null);
        setStatusMessage("Movie berhasil diupdate");
        return true;
      }

      await dispatch(addMovie(moviePayload)).unwrap();

      setCurrentPage(Math.max(1, Math.ceil((movies.length + 1) / moviePageSize)));
      setStatusMessage("Movie berhasil ditambahkan");
      return true;
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Gagal menyimpan movie"));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setStatusMessage("");
  };

  const handlePageFilterChange = (nextPageFilter) => {
    setPageFilter(nextPageFilter);
    setSectionFilter("all");
    setCurrentPage(1);
  };

  const handleSectionFilterChange = (nextSectionFilter) => {
    setSectionFilter(nextSectionFilter);
    setCurrentPage(1);
  };

  const handleDeleteMovie = async (movieId) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setStatusMessage("");

    try {
      await dispatch(removeMovie(movieId)).unwrap();
      setCurrentPage((currentValue) =>
        Math.min(
          currentValue,
          Math.max(1, Math.ceil((movies.length - 1) / moviePageSize)),
        ),
      );

      if (editingMovie?.id === movieId) {
        setEditingMovie(null);
      }

      setStatusMessage("Movie berhasil dihapus");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Gagal menghapus movie"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingMovie(null);
  };

  return {
    activePage,
    currentPage,
    editingMovie,
    errorMessage: visibleErrorMessage,
    handleCancelEdit,
    handleDeleteMovie,
    handleEditMovie,
    handlePageFilterChange,
    handleSectionFilterChange,
    handleSubmitMovie,
    isLoading,
    isSubmitting,
    moviePageSize,
    movies,
    pageFilter,
    paginatedMovies,
    sectionFilter,
    setCurrentPage,
    statusMessage,
    totalPages,
    totalVisibleMovies: filteredMovies.length,
  };
}

export default useManageMovies;
