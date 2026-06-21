import MovieHoverPreview from './MovieHoverPreview.jsx'

function MovieCard({ title, image, rating, badge, top, variant, hoverPreview, hoverPlacement = 'center' }) {
  const isLandscape = variant === 'landscape'
  const hasHoverPreview = Boolean(hoverPreview)
  const sizeClassName = isLandscape
    ? 'h-[162px] w-[302px] min-[641px]:max-[900px]:h-[82px] min-[641px]:max-[900px]:w-[155px] max-[640px]:h-[151px] max-[640px]:w-[309px]'
    : 'h-[365px] w-[232px] min-[641px]:max-[900px]:h-[187px] min-[641px]:max-[900px]:w-[120px] max-[640px]:h-[143.4px] max-[640px]:w-[95.6px]'
  const cardClassName = [
    'group/movie-card relative flex-none',
    sizeClassName,
    hasHoverPreview ? 'overflow-visible z-0 hover:z-30 focus-within:z-30' : '',
  ].join(' ')
  const frameClassName = [
    'relative h-full w-full overflow-hidden bg-[#202124] transition-[box-shadow,filter,transform] duration-200 [transform:translateZ(0)]',
    isLandscape ? 'rounded-lg shadow-none' : 'rounded shadow-none',
    hasHoverPreview
      ? 'min-[901px]:group-hover/movie-card:scale-[1.018] min-[901px]:group-hover/movie-card:shadow-[0_18px_48px_rgba(0,0,0,0.34)] min-[901px]:group-focus-within/movie-card:scale-[1.018] min-[901px]:group-focus-within/movie-card:shadow-[0_18px_48px_rgba(0,0,0,0.34)]'
      : '',
    isLandscape
      ? "after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,0)_38%,rgba(0,0,0,0.72)_100%)] after:content-['']"
      : '',
  ].join(' ')

  return (
    <article className={cardClassName} aria-label={title} data-movie-card tabIndex={hasHoverPreview ? 0 : undefined}>
      <div className={frameClassName}>
        <img
          className="h-full w-full object-cover [backface-visibility:hidden]"
          src={image}
          alt={title}
          loading="lazy"
        />

        {badge ? (
          <span className="absolute left-4 top-4 z-[2] inline-flex min-h-7 items-center rounded-full border border-[#0f1e93] bg-[#0f1e93] px-2.5 py-1 text-sm font-bold leading-[1.4] tracking-[0.2px] text-white min-[641px]:max-[900px]:left-2 min-[641px]:max-[900px]:top-2 min-[641px]:max-[900px]:w-[104px] min-[641px]:max-[900px]:origin-top-left min-[641px]:max-[900px]:scale-50 min-[641px]:max-[900px]:justify-center min-[641px]:max-[900px]:p-0 max-[640px]:left-[7px] max-[640px]:top-[7px] max-[640px]:w-[104px] max-[640px]:origin-top-left max-[640px]:scale-[0.4285] max-[640px]:justify-center max-[640px]:p-0">
            {badge}
          </span>
        ) : null}
        {top ? (
          <span className="absolute right-0 top-0 z-[2] grid min-h-12 w-[31px] place-items-center rounded-bl rounded-tr bg-[#b71f1d] p-1 text-center text-sm leading-[1.4] tracking-[0.2px] text-white min-[641px]:max-[900px]:origin-top-right min-[641px]:max-[900px]:scale-[0.72] min-[641px]:max-[900px]:rounded-b-[5px] max-[640px]:min-h-[22px] max-[640px]:w-[15px] max-[640px]:rounded-b-[3px] max-[640px]:text-[5px]">
            Top 10
          </span>
        ) : null}

        {isLandscape ? (
          <div className="absolute inset-x-0 bottom-0 z-[1] flex min-h-[54px] items-end justify-between gap-3 px-4 pb-3.5 pt-4 text-white min-[641px]:max-[900px]:min-h-[30px] min-[641px]:max-[900px]:gap-1.5 min-[641px]:max-[900px]:px-[9px] min-[641px]:max-[900px]:pb-[7px] min-[641px]:max-[900px]:pt-2 max-[640px]:min-h-[52px] max-[640px]:px-4 max-[640px]:pb-3 max-[640px]:pt-4">
            <h3 className="m-0 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold leading-[1.2] min-[641px]:max-[900px]:text-[9px] min-[641px]:max-[900px]:leading-[1.2] max-[640px]:text-sm">
              {title}
            </h3>
            <span
              className="inline-flex shrink-0 items-center gap-1 text-sm text-white/90 min-[641px]:max-[900px]:gap-0.5 min-[641px]:max-[900px]:text-[8px] max-[640px]:text-xs"
              aria-label={`Rating ${rating} dari 5`}
            >
              <span
                className="text-[15px] leading-none text-white min-[641px]:max-[900px]:text-[8px] max-[640px]:text-xs"
                aria-hidden="true"
              >
                &#9733;
              </span>
              {rating}/5
            </span>
          </div>
        ) : null}
      </div>

      {hasHoverPreview ? (
        <MovieHoverPreview title={title} image={image} placement={hoverPlacement} variant={variant} {...hoverPreview} />
      ) : null}
    </article>
  )
}

export default MovieCard
