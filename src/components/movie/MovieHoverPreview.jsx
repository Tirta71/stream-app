function CircleButton({ children, label, variant = 'outline' }) {
  const className =
    variant === 'solid'
      ? 'grid size-[55px] place-items-center rounded-full bg-white text-[#181a1c]'
      : 'grid size-[54px] place-items-center rounded-full border border-[#c1c2c4] text-white'

  return (
    <button type="button" className={className} aria-label={label}>
      {children}
    </button>
  )
}

function MovieHoverPreview({ title, image, previewImage = image, ageRating = '13+', episodeCount = '16 Episode', genres = [] }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 hidden w-[408px] -translate-x-1/2 -translate-y-1/2 scale-[0.96] overflow-hidden rounded-lg bg-[#181a1c] opacity-0 shadow-[0_18px_60px_rgba(0,0,0,0.5)] transition-[opacity,transform] duration-200 min-[901px]:block min-[901px]:group-hover/movie-card:pointer-events-auto min-[901px]:group-hover/movie-card:scale-100 min-[901px]:group-hover/movie-card:opacity-100 min-[901px]:group-focus-within/movie-card:pointer-events-auto min-[901px]:group-focus-within/movie-card:scale-100 min-[901px]:group-focus-within/movie-card:opacity-100">
      <img className="h-[254px] w-full object-cover" src={previewImage} alt={title} />
      <div className="h-[206px] bg-[#181a1c] px-[29px] pt-[29px] text-white">
        <div className="flex h-[55px] items-start justify-between">
          <div className="flex items-center gap-4">
            <CircleButton label="Putar" variant="solid">
              <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </CircleButton>
            <CircleButton label="Tambahkan ke daftar">
              <svg
                viewBox="0 0 24 24"
                className="size-[29px] fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </CircleButton>
          </div>
          <CircleButton label="Detail">
            <svg
              viewBox="0 0 24 24"
              className="size-[29px] fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </CircleButton>
        </div>

        <div className="mt-[17px] flex h-[35px] items-center gap-[19px] text-lg font-bold tracking-[0.2px]">
          <span className="inline-flex h-[35px] min-w-[59px] items-center justify-center rounded-full bg-[#4b5258] px-3 text-[#c1c2c4]">
            {ageRating}
          </span>
          <span>{episodeCount}</span>
        </div>

        <div className="mt-[17px] flex items-center gap-[29px] text-lg font-medium tracking-[0.2px] text-[#c1c2c4]">
          {genres.map((genre, index) => (
            <span key={genre} className="flex items-center gap-[29px]">
              <span>{genre}</span>
              {index < genres.length - 1 ? (
                <span aria-hidden="true">
                  &bull;
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieHoverPreview
