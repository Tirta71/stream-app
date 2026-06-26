import MovieCard from "../movie/MovieCard.jsx";
import PageMessage from "../ui/PageMessage.jsx";

const desktopColumnCount = 6;

function MyListGrid({ movies, onShowMovieDetail, onShowSeriesDetail }) {
  if (!movies.length) {
    return <PageMessage message="Daftar kamu masih kosong." variant="empty" />;
  }

  return (
    <div className="grid grid-cols-6 gap-x-4 gap-y-8 min-[641px]:max-[900px]:grid-cols-[repeat(auto-fit,120px)] min-[641px]:max-[900px]:justify-start min-[641px]:max-[900px]:gap-x-3 min-[641px]:max-[900px]:gap-y-5 max-[640px]:grid-cols-3 max-[640px]:gap-x-[14px] max-[640px]:gap-y-[22px]">
      {movies.map((movie, index) => {
        const slotIndex = index % desktopColumnCount;
        const hoverPlacement =
          slotIndex === 0
            ? "start"
            : slotIndex === desktopColumnCount - 1
              ? "end"
              : "center";

        return (
          <MovieCard
            key={movie.id}
            {...movie}
            hoverPlacement={hoverPlacement}
            onShowMovieDetail={onShowMovieDetail}
            onShowSeriesDetail={onShowSeriesDetail}
            size="compact"
            variant="poster"
          />
        );
      })}
    </div>
  );
}

export default MyListGrid;
