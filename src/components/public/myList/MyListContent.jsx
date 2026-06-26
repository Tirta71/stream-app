import Footer from "../layout/Footer.jsx";
import Navbar from "../layout/Navbar.jsx";
import MovieDetailModal from "../movie/MovieDetailModal.jsx";
import SeriesDetailModal from "../series/SeriesDetailModal.jsx";
import PageMessage from "../ui/PageMessage.jsx";
import PageTitle from "../ui/PageTitle.jsx";
import PageTransition from "../ui/PageTransition.jsx";
import MyListGrid from "./MyListGrid.jsx";

function MyListContent({
  error,
  isLoading,
  movies,
  onCloseMovieDetail,
  onCloseSeriesDetail,
  onShowMovieDetail,
  onShowSeriesDetail,
  selectedMovieDetail,
  selectedSeriesDetail,
  status,
}) {
  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <Navbar />
      <PageTransition className="bg-[#181a1c] px-20 pb-16 pt-[78px] max-[900px]:px-5 max-[640px]:pb-9 max-[640px]:pt-8">
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
          <MyListGrid
            movies={movies}
            onShowMovieDetail={onShowMovieDetail}
            onShowSeriesDetail={onShowSeriesDetail}
          />
        )}
      </PageTransition>
      <MovieDetailModal
        detail={selectedMovieDetail}
        onClose={onCloseMovieDetail}
      />
      <SeriesDetailModal
        detail={selectedSeriesDetail}
        onClose={onCloseSeriesDetail}
      />
      <Footer />
    </div>
  );
}

export default MyListContent;
