import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyList } from "../../services/accountApi.js";
import {
  fetchMovies,
  selectMovies,
  selectMoviesError,
  selectMoviesStatus,
} from "../../store/redux/moviesSlice.js";
import {
  getSimilarMovieRecommendations,
  isPremiumMovie,
  mapApiMovieToPublicMovie,
} from "../../utils/movieMapper.js";
import { myListUpdatedEventName } from "../../utils/myListEvents.js";
import useCurrentSubscription from "./useCurrentSubscription.js";

const myListLimit = 12;

function getSeriesFilmId(item) {
  return item?.seriesFilmId ?? item?.series_film_id ?? item?.seriesFilm?.id;
}

function useMyListMovies(limit = myListLimit) {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const moviesStatus = useSelector(selectMoviesStatus);
  const moviesError = useSelector(selectMoviesError);
  const { isSubscribed } = useCurrentSubscription();
  const [myListItems, setMyListItems] = useState([]);
  const [myListStatus, setMyListStatus] = useState("loading");
  const [myListError, setMyListError] = useState("");
  const [selectedMovieDetail, setSelectedMovieDetail] = useState(null);
  const [selectedSeriesDetail, setSelectedSeriesDetail] = useState(null);

  const loadMyList = useCallback(() => {
    let isActive = true;

    getMyList()
      .then((items) => {
        if (!isActive) {
          return;
        }

        setMyListItems(Array.isArray(items) ? items : []);
        setMyListStatus("succeeded");
      })
      .catch((requestError) => {
        if (!isActive) {
          return;
        }

        setMyListItems([]);
        setMyListStatus("failed");
        setMyListError(requestError.message || "Gagal mengambil daftar saya");
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, moviesStatus]);

  useEffect(() => {
    const cleanupRequest = loadMyList();
    const handleMyListUpdated = () => {
      setMyListStatus("loading");
      setMyListError("");
      loadMyList();
    };

    window.addEventListener(myListUpdatedEventName, handleMyListUpdated);

    return () => {
      cleanupRequest();
      window.removeEventListener(myListUpdatedEventName, handleMyListUpdated);
    };
  }, [loadMyList]);

  const visibleMovies = useMemo(
    () => movies.filter((movie) => isSubscribed || !isPremiumMovie(movie)),
    [isSubscribed, movies],
  );

  const myListMovies = useMemo(() => {
    const moviesById = new Map(
      visibleMovies.map((movie) => [String(movie.id), movie]),
    );

    return myListItems
      .map((item) => {
        const itemMovieId = getSeriesFilmId(item);

        return moviesById.get(String(itemMovieId)) ?? item.seriesFilm;
      })
      .filter(Boolean)
      .filter((movie) => isSubscribed || !isPremiumMovie(movie))
      .map(mapApiMovieToPublicMovie)
      .slice(0, limit);
  }, [isSubscribed, limit, myListItems, visibleMovies]);

  const showMovieDetail = (detail) => {
    if (detail) {
      setSelectedMovieDetail({
        ...detail,
        recommendations: getSimilarMovieRecommendations(detail, visibleMovies),
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
    isLoading:
      moviesStatus === "idle" ||
      moviesStatus === "loading" ||
      myListStatus === "idle" ||
      myListStatus === "loading",
    moviesError: myListError || moviesError,
    moviesStatus:
      myListStatus === "failed" || moviesStatus === "failed"
        ? "failed"
        : myListStatus,
    myListMovies,
    selectedMovieDetail,
    selectedSeriesDetail,
    showMovieDetail,
    showSeriesDetail,
  };
}

export default useMyListMovies;
