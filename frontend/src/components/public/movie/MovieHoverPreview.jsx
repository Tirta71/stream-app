import { replaceBrokenImage } from "../../../utils/imageFallback.js";
import MyListIcon from "../ui/MyListIcon.jsx";

function CircleButton({
  children,
  disabled = false,
  isSelected = false,
  label,
  onClick,
  variant = 'outline',
  size = 'default',
}) {
  const isCompact = size === 'compact'
  const className =
    variant === 'solid'
      ? [
          'grid place-items-center rounded-full border border-white bg-white text-[#181a1c] transition-[background-color,border-color,box-shadow,color,opacity,transform] duration-200 ease-out hover:scale-105',
          disabled ? 'cursor-wait opacity-70 hover:scale-100' : '',
          isCompact ? 'size-9' : 'size-[48px]',
        ].join(' ')
      : [
          'grid place-items-center rounded-full border transition-[background-color,border-color,box-shadow,color,opacity,transform] duration-200 ease-out hover:scale-105',
          isSelected
            ? 'border-white bg-white text-[#181a1c] shadow-[0_8px_20px_rgba(255,255,255,0.16)] hover:bg-white hover:text-[#181a1c]'
            : 'border-[#c1c2c4] bg-transparent text-white hover:border-white hover:bg-white/8',
          disabled ? 'cursor-wait opacity-70 hover:scale-100' : '',
          isCompact ? 'size-10' : 'size-[54px]',
        ].join(' ')

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
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
  contentType,
  episodeCount,
  episodeTitle,
  duration,
  genres = [],
  isInMyList = false,
  leftOffset,
  isMyListSaving = false,
  onPlay,
  onShowDetail,
  onToggleMyList,
  placement = 'center',
  progress = 35,
  type,
}) {
  const previewType = type ?? (episodeCount === 'Movie' ? 'movie' : 'series')
  const isContinue = previewType === 'continue'
  const isSeries = previewType === 'series'
  const isContinueSeries = isContinue && contentType === 'series'
  const visibleEpisodeTitle = isContinueSeries ? episodeTitle : ''
  const metaText = isSeries
    ? episodeCount ?? '16 Episode'
    : duration ?? (previewType === 'movie' ? '2j 33m' : episodeCount ?? '16 Episode')
  const verticalClassName = 'top-1/2 -translate-y-1/2'
  const hoverSizeClassName = isContinue ? 'h-[494px]' : 'h-[453px]'
  const previewImageClassName = 'h-[254px]'
  const previewBodyClassName = isContinue
    ? 'h-[240px] px-[29px] pt-[29px]'
    : 'h-[199px] px-[29px] pt-[29px]'
  const placementClassName = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  }
  const hasCustomLeftOffset = Number.isFinite(leftOffset)
  const horizontalClassName = hasCustomLeftOffset
    ? ''
    : placementClassName[placement] ?? placementClassName.center
  const horizontalStyle = hasCustomLeftOffset
    ? { left: `${leftOffset}px` }
    : undefined

  return (
    <div
      className={`pointer-events-none absolute z-50 hidden ${hoverSizeClassName} w-[409px] scale-[0.94] overflow-hidden rounded-lg bg-[#181a1c] opacity-0 shadow-[0_26px_74px_rgba(0,0,0,0.58)] ring-1 ring-white/[0.06] transition-[opacity,transform] duration-200 ease-out min-[901px]:block min-[901px]:group-hover/movie-card:pointer-events-auto min-[901px]:group-hover/movie-card:scale-100 min-[901px]:group-hover/movie-card:opacity-100 min-[901px]:group-focus-within/movie-card:pointer-events-auto min-[901px]:group-focus-within/movie-card:scale-100 min-[901px]:group-focus-within/movie-card:opacity-100 ${verticalClassName} ${
        horizontalClassName
      }`}
      style={horizontalStyle}
    >
      <img
        className={`${previewImageClassName} w-full object-cover brightness-[0.82]`}
        src={previewImage}
        alt={title}
        onError={(event) => replaceBrokenImage(event, image)}
      />
      <div className={`${previewBodyClassName} bg-[#181a1c] text-white`}>
        <div className="flex h-[55px] items-start justify-between">
          <div className="flex items-center gap-5">
            <CircleButton label="Putar" onClick={onPlay} variant="solid">
              <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </CircleButton>
            <CircleButton
              disabled={isMyListSaving}
              isSelected={isInMyList}
              label={
                isInMyList
                  ? "Hapus dari daftar saya"
                  : "Tambahkan ke daftar saya"
              }
              onClick={onToggleMyList}
            >
              <MyListIcon isSaved={isInMyList} />
            </CircleButton>
          </div>
          <CircleButton label="Detail" onClick={onShowDetail}>
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
            {visibleEpisodeTitle ? (
              <p className="mt-[15px] text-lg font-bold tracking-[0.2px] text-white">
                {visibleEpisodeTitle}
              </p>
            ) : null}
            <div className={`${visibleEpisodeTitle ? 'mt-[23px]' : 'mt-[28px]'} flex items-center gap-[18px]`}>
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
