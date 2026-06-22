function getMovieGenre(movie) {
  if (typeof movie.genres === 'string') {
    return movie.genres || '-'
  }

  if (Array.isArray(movie.genres)) {
    return movie.genres.join(', ')
  }

  if (movie.genre) {
    return movie.genre
  }

  return movie.hoverPreview?.genres?.join(', ') ?? '-'
}

function getMovieSection(movie) {
  return movie.sectionTitle || movie.section || movie.category || '-'
}

function MovieTable({ isBusy = false, movies, onEdit, onDelete }) {
  if (!movies.length) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-[#181a1c] p-8 text-center text-[#c1c2c4]">
        Belum ada movie di kategori ini.
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#181a1c]">
      <div className="grid grid-cols-[minmax(0,1fr)_120px] gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#c1c2c4] max-[640px]:grid-cols-1 max-[640px]:px-3">
        <span>Movie</span>
        <span className="max-[640px]:hidden">Action</span>
      </div>

      <div className="divide-y divide-white/10">
        {movies.map((movie) => (
          <article
            className="grid grid-cols-[minmax(0,1fr)_120px] items-center gap-3 px-4 py-3 text-sm text-white max-[640px]:grid-cols-1 max-[640px]:px-3"
            key={movie.id}
          >
            <div className="flex min-w-0 items-center gap-3 max-[420px]:items-start">
              <img
                alt=""
                className="h-14 w-20 shrink-0 rounded object-cover max-[420px]:h-12 max-[420px]:w-[68px]"
                loading="lazy"
                src={movie.image}
              />
              <div className="min-w-0">
                <p className="truncate font-bold">{movie.title}</p>
                <p className="mt-1 truncate text-xs text-[#8f969a]">{getMovieGenre(movie)}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#c1c2c4]">
                  <span>Rating: {movie.rating || '-'}</span>
                  <span>Type: {movie.previewType || '-'}</span>
                  <span>Section: {getMovieSection(movie)}</span>
                  {movie.badge ? (
                    <span className="rounded-full bg-[#0f1e93] px-2 py-0.5 font-bold text-white">
                      {movie.badge}
                    </span>
                  ) : (
                    <span>Badge: -</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 max-[640px]:justify-start max-[420px]:grid max-[420px]:grid-cols-2">
              <button
                className="rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-white transition-[background,border-color] duration-150 hover:border-white/50 hover:bg-white/10"
                disabled={isBusy}
                onClick={() => onEdit(movie)}
                type="button"
              >
                Edit
              </button>
              <button
                className="rounded-full border border-[#b71f1d]/50 px-3 py-2 text-xs font-bold text-[#ff7775] transition-[background,border-color] duration-150 hover:border-[#ff7775] hover:bg-[#b71f1d]/15"
                disabled={isBusy}
                onClick={() => onDelete(movie.id)}
                type="button"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default MovieTable
