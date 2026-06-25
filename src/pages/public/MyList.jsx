import MyListContent from "../../components/public/myList/MyListContent.jsx";
import useMyListMovies from "../../hooks/public/useMyListMovies.js";

function MyList() {
  const { isLoading, moviesError, moviesStatus, myListMovies } =
    useMyListMovies();

  return (
    <MyListContent
      error={moviesError}
      isLoading={isLoading}
      movies={myListMovies}
      status={moviesStatus}
    />
  );
}

export default MyList;
