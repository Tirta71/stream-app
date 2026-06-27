import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentSubscription } from "../../services/accountApi.js";
import { getMovie, saveWatchProgress } from "../../services/movieApi.js";
import {
  fetchMovies,
  selectMovies,
  selectMoviesError,
  selectMoviesStatus,
} from "../../store/redux/moviesSlice.js";
import {
  getMovieType,
  isPremiumMovie,
} from "../../utils/movieMapper.js";

function getText(value, fallbackValue = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallbackValue;
}

function getEpisodes(movie) {
  if (Array.isArray(movie?.episodes)) {
    return movie.episodes;
  }

  if (movie?.episodes && typeof movie.episodes === "object") {
    return Object.values(movie.episodes);
  }

  return [];
}

function getPreviewImage(movie, episode) {
  return (
    getText(episode?.thumbnail_url) ||
    getText(episode?.thumbnailUrl) ||
    getText(movie?.preview_image) ||
    getText(movie?.previewImage) ||
    getText(movie?.image)
  );
}

function getVideoUrl(movie, episode) {
  return (
    getText(episode?.video_url) ||
    getText(episode?.videoUrl) ||
    getText(movie?.trailer_url) ||
    getText(movie?.trailerUrl)
  );
}

function normalizeEpisode(episode, index, movie) {
  const episodeNumber =
    Number(episode?.episode_number ?? episode?.episodeNumber) || index + 1;

  return {
    description:
      getText(episode?.description) ||
      getText(movie?.description) ||
      "Episode tersedia untuk ditonton.",
    duration: getText(episode?.duration),
    id: episode?.id ?? `${movie?.id}-episode-${episodeNumber}`,
    number: episodeNumber,
    thumbnailUrl: getPreviewImage(movie, episode),
    title: getText(episode?.title, `Episode ${episodeNumber}`),
    videoUrl: getVideoUrl(movie, episode),
  };
}

function getWatchEpisodes(movie) {
  const episodes = getEpisodes(movie);

  if (episodes.length) {
    return episodes.map((episode, index) =>
      normalizeEpisode(episode, index, movie),
    );
  }

  return [
    normalizeEpisode(
      {
        duration: getText(movie?.duration),
        title: getText(movie?.title, "Movie"),
        videoUrl: getVideoUrl(movie),
      },
      0,
      movie,
    ),
  ];
}

function getWatchTitle(movie, episode) {
  if (!movie) {
    return "";
  }

  if (getMovieType(movie) === "series") {
    return `${movie.title} Episode ${episode?.number ?? 1}: ${
      episode?.title ?? "Episode 1"
    }`;
  }

  return movie.title;
}

function useWatchMovie() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const moviesStatus = useSelector(selectMoviesStatus);
  const moviesError = useSelector(selectMoviesError);
  const [remoteMovie, setRemoteMovie] = useState(null);
  const [remoteStatus, setRemoteStatus] = useState("loading");
  const [remoteError, setRemoteError] = useState("");
  const [subscription, setSubscription] = useState(null);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState("");

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, moviesStatus]);

  const movieFromStore = useMemo(
    () => movies.find((movie) => String(movie.id) === String(id)),
    [id, movies],
  );

  useEffect(() => {
    if (!id || movieFromStore) {
      return undefined;
    }

    let isActive = true;

    getMovie(id)
      .then((movie) => {
        if (!isActive) {
          return;
        }

        setRemoteMovie(movie);
        setRemoteStatus("succeeded");
      })
      .catch((requestError) => {
        if (!isActive) {
          return;
        }

        setRemoteMovie(null);
        setRemoteStatus("failed");
        setRemoteError(requestError.message || "Konten tidak ditemukan");
      });

    return () => {
      isActive = false;
    };
  }, [id, movieFromStore]);

  useEffect(() => {
    let isActive = true;

    getCurrentSubscription()
      .then((currentSubscription) => {
        if (isActive) {
          setSubscription(currentSubscription);
        }
      })
      .catch(() => {
        if (isActive) {
          setSubscription(null);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const movie = movieFromStore ?? remoteMovie;
  const episodes = useMemo(() => getWatchEpisodes(movie), [movie]);
  const selectedEpisode = useMemo(
    () =>
      episodes.find((episode) => String(episode.id) === String(selectedEpisodeId)) ??
      episodes[0],
    [episodes, selectedEpisodeId],
  );
  const contentType = getMovieType(movie) === "series" ? "series" : "movie";
  const isLocked = Boolean(movie && isPremiumMovie(movie) && !subscription);
  const isLoading =
    moviesStatus === "idle" ||
    moviesStatus === "loading" ||
    (!movieFromStore && remoteStatus === "loading");
  const error =
    remoteError ||
    (moviesStatus === "failed" && !movieFromStore ? moviesError : "");

  const saveProgress = (progressPercent = 10, lastPositionSeconds = 0) => {
    if (!movie || isLocked) {
      return;
    }

    saveWatchProgress({
      episodeMovieId:
        contentType === "series" ? selectedEpisode?.id ?? null : null,
      lastPositionSeconds,
      progressPercent,
      seriesFilmId: movie.id,
    }).catch(() => null);
  };

  return {
    backgroundImage: getPreviewImage(movie, selectedEpisode),
    contentType,
    episodes,
    error,
    isLoading,
    isLocked,
    movie,
    saveProgress,
    selectedEpisode,
    setSelectedEpisodeId,
    title: getWatchTitle(movie, selectedEpisode),
    videoUrl: getVideoUrl(movie, selectedEpisode),
  };
}

export default useWatchMovie;
