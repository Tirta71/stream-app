import { useEffect, useState } from "react";
import {
  createMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "../../services/movieApi.js";

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
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const { activePage, paginatedMovies, totalPages } = getPaginatedMovies(
    movies,
    currentPage,
  );

  useEffect(() => {
    let isMounted = true;

    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const moviesData = await getMovies();

        if (isMounted) {
          setMovies(Array.isArray(moviesData) ? moviesData : []);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getErrorMessage(error, "Gagal mengambil data movie"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmitMovie = async (movie) => {
    const moviePayload = getMoviePayload(movie);

    setIsSubmitting(true);
    setErrorMessage("");
    setStatusMessage("");

    try {
      if (editingMovie) {
        const updatedMovie = await updateMovie(editingMovie.id, moviePayload);

        setMovies((currentMovies) =>
          currentMovies.map((currentMovie) =>
            currentMovie.id === editingMovie.id ? updatedMovie : currentMovie,
          ),
        );
        setCurrentPage(1);
        setEditingMovie(null);
        setStatusMessage("Movie berhasil diupdate");
        return true;
      }

      const createdMovie = await createMovie(moviePayload);

      setMovies((currentMovies) => [...currentMovies, createdMovie]);
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
      await deleteMovie(movieId);
      setMovies((currentMovies) =>
        currentMovies.filter((movie) => movie.id !== movieId),
      );
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
    errorMessage,
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
