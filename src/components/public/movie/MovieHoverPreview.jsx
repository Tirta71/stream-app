function CircleButton({ children, label, variant = 'outline', size = 'default' }) {
  const isCompact = size === 'compact'
  const className =
    variant === 'solid'
      ? [
          'grid place-items-center rounded-full bg-white text-[#181a1c] transition-transform duration-150 hover:scale-105',
          isCompact ? 'size-9' : 'size-[48px]',
        ].join(' ')
      : [
          'grid place-items-center rounded-full border border-[#c1c2c4] text-white transition-[border-color,transform] duration-150 hover:scale-105 hover:border-white',
          isCompact ? 'size-10' : 'size-[54px]',
        ].join(' ')

  return (
    <button type="button" className={className} aria-label={label}>
      {children}
    </button>
  )
}

function GenreRow({ genres, compact = false }) {
  if (!genres.length) {
    return null
  }

  return (
    <div
      className={[
        'flex items-center justify-between gap-4 font-medium tracking-[0.2px] text-[#c1c2c4]',
        compact ? 'mt-[15px] text-xs' : 'mt-[18px] text-lg',
      ].join(' ')}
    >
      {genres.map((genre, index) => (
        <span key={genre} className="contents">
          <span>{genre}</span>
          {index < genres.length - 1 ? (
            <span className="text-[#c1c2c4]" aria-hidden="true">
              &bull;
            </span>
          ) : null}
        </span>
      ))}
    </div>
  )
}

function MovieHoverPreview({
  title,
  image,
  previewImage = image,
  ageRating = '13+',
  episodeCount,
  duration,
  genres = [],
  placement = 'center',
  progress = 35,
  type,
}) {
  const previewType = type ?? (episodeCount === 'Movie' ? 'movie' : 'series')
  const metaText = duration ?? (previewType === 'movie' ? '2j 33m' : episodeCount ?? '16 Episode')
  const isContinue = previewType === 'continue'
  const verticalClassName = 'top-1/2 -translate-y-1/2'
  const placementClassName = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  }

  return (
    <div
      className={`pointer-events-none absolute z-50 hidden h-[453px] w-[409px] scale-[0.94] overflow-hidden rounded-lg bg-[#181a1c] opacity-0 shadow-[0_26px_74px_rgba(0,0,0,0.58)] ring-1 ring-white/[0.06] transition-[opacity,transform] duration-200 ease-out min-[901px]:block min-[901px]:group-hover/movie-card:pointer-events-auto min-[901px]:group-hover/movie-card:scale-100 min-[901px]:group-hover/movie-card:opacity-100 min-[901px]:group-focus-within/movie-card:pointer-events-auto min-[901px]:group-focus-within/movie-card:scale-100 min-[901px]:group-focus-within/movie-card:opacity-100 ${verticalClassName} ${
        placementClassName[placement] ?? placementClassName.center
      }`}
    >
      <img
        className="h-[254px] w-full object-cover brightness-[0.82]"
        src={previewImage}
        alt={title}
      />
      <div className="h-[199px] bg-[#181a1c] px-[29px] pt-[29px] text-white">
        <div className="flex h-[55px] items-start justify-between">
          <div className="flex items-center gap-5">
            <CircleButton label="Putar" variant="solid">
              <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-current">
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

        {isContinue ? (
          <>
            <div className="mt-[28px] flex items-center gap-[18px]">
              <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#41484a]">
                <div className="h-full rounded-full bg-[#3254ff]" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-lg font-medium tracking-[0.2px] text-[#c1c2c4]">{metaText}</span>
            </div>
            <GenreRow genres={genres} />
          </>
        ) : (
          <>
            <div className="mt-[17px] flex h-[35px] items-center gap-[19px] text-lg font-bold tracking-[0.2px]">
              <span className="inline-flex h-[35px] min-w-[59px] items-center justify-center rounded-full bg-[#4b5258] px-3 text-[#c1c2c4]">
                {ageRating}
              </span>
              <span>{metaText}</span>
            </div>
            <GenreRow genres={genres} />
          </>
        )}
      </div>
    </div>
  )
}

export default MovieHoverPreview
