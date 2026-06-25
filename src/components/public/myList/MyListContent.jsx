import PageMessage from "../ui/PageMessage.jsx";
import PageTitle from "../ui/PageTitle.jsx";
import MyListGrid from "./MyListGrid.jsx";

function MyListContent({ error, isLoading, movies, status }) {
  return (
    <>
      <PageTitle title="Daftar Saya" />

      {status === "failed" ? (
        <PageMessage
          className="mb-5 p-4 font-semibold"
          message={error}
          variant="danger"
        />
      ) : null}

      {isLoading && !movies.length ? (
        <PageMessage message="Memuat daftar..." />
      ) : (
        <MyListGrid movies={movies} />
      )}
    </>
  );
}

export default MyListContent;
