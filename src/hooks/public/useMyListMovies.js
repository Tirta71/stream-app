import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  selectMovies,
  selectMoviesError,
  selectMoviesStatus,
} from "../../store/redux/moviesSlice.js";
import { mapApiMovieToPublicMovie } from "../../utils/movieMapper.js";

const myListLimit = 12;

function useMyListMovies() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const moviesStatus = useSelector(selectMoviesStatus);
  const moviesError = useSelector(selectMoviesError);

  useEffect(() => {
    if (moviesStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, moviesStatus]);

  const myListMovies = useMemo(
    () => movies.map(mapApiMovieToPublicMovie).slice(0, myListLimit),
    [movies],
  );

  return {
    isLoading: moviesStatus === "idle" || moviesStatus === "loading",
    moviesError,
    moviesStatus,
    myListMovies,
  };
}

export default useMyListMovies;
