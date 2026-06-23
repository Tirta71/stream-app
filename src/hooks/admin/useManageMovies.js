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
} from "../../store/redux/moviesSlice.js";

const moviePageSize = 7;

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

function getMoviePayload(movie) {
  const progress = Number(movie.progress);
  const payload = { ...movie };
  const section = movie.section.trim();

  delete payload.category;

  return {
    ...payload,
    slug: movie.slug?.trim() || createMovieSlug(movie.title),
    section,
    sectionTitle: movie.sectionTitle.trim(),
    title: movie.title.trim(),
    image: movie.image.trim(),
    rating: movie.rating?.trim() ?? "",
    badge: movie.badge?.trim() ?? "",
    top: Boolean(movie.top),
    description: movie.description?.trim() ?? "",
    previewImage: movie.previewImage?.trim() || movie.image.trim(),
    ageRating: movie.ageRating?.trim() ?? "13+",
    episodeCount: movie.episodeCount?.trim() ?? "",
    duration: movie.duration?.trim() ?? "",
    episodeTitle: movie.episodeTitle?.trim() ?? "",
    genres: movie.genres?.trim() ?? "",
    progress: Number.isFinite(progress) ? progress : 0,
    previewType:
      movie.previewType ||
      (section === "continueWatching" ? "continue" : "movie"),
  };
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
  const [editingMovie, setEditingMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const isLoading = moviesStatus === "idle" || moviesStatus === "loading";
  const visibleErrorMessage =
    errorMessage || (moviesStatus === "failed" ? moviesError : "");
  const { activePage, paginatedMovies, totalPages } = getPaginatedMovies(
    movies,
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
    handleSubmitMovie,
    isLoading,
    isSubmitting,
    moviePageSize,
    movies,
    paginatedMovies,
    setCurrentPage,
    statusMessage,
    totalPages,
  };
}

export default useManageMovies;
