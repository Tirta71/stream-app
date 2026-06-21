import { useEffect, useRef, useState } from 'react'
import MovieCard from '../movie/MovieCard.jsx'

function MovieSection({ title, movies, variant = 'poster' }) {
  const viewportRef = useRef(null)
  const railRef = useRef(null)
  const [offset, setOffset] = useState(0)
  const [maxOffset, setMaxOffset] = useState(0)
  const isLandscape = variant === 'landscape'
  const hasHoverPreview = !isLandscape && movies.some((movie) => movie.hoverPreview)
  const sectionId = `movie-section-${title.toLowerCase().replaceAll(' ', '-')}`
  const railId = `${sectionId}-rail`
  const visibleCardCount = isLandscape ? 4 : 5

  useEffect(() => {
    const updateBounds = () => {
      const viewport = viewportRef.current
      const rail = railRef.current

      if (!viewport || !rail) {
        return
      }

      const nextMaxOffset = Math.max(0, rail.scrollWidth - viewport.clientWidth)
      setMaxOffset(nextMaxOffset)
      setOffset((currentOffset) => Math.min(currentOffset, nextMaxOffset))
    }

    updateBounds()
    window.addEventListener('resize', updateBounds)

    return () => {
      window.removeEventListener('resize', updateBounds)
    }
  }, [movies.length])

  const scrollMovies = (direction) => {
    const viewport = viewportRef.current
    const rail = railRef.current

    if (!viewport || !rail) {
      return
    }

    const firstCard = rail.querySelector('[data-movie-card]')
    const railStyle = window.getComputedStyle(rail)
    const gap = Number.parseFloat(railStyle.columnGap || railStyle.gap) || 0
    const cardWidth = firstCard?.getBoundingClientRect().width || rail.clientWidth
    const scrollAmount = (cardWidth + gap) * visibleCardCount

    setOffset((currentOffset) => Math.max(0, Math.min(currentOffset + direction * scrollAmount, maxOffset)))
  }

  const sectionClassName = [
    `relative bg-[#181a1c] px-20 min-[641px]:max-[900px]:px-3 ${
      hasHoverPreview ? 'overflow-visible' : 'overflow-hidden'
    } ${hasHoverPreview ? 'min-[901px]:hover:z-20 min-[901px]:focus-within:z-20' : ''}`,
    isLandscape
      ? 'min-h-[309px] pb-10 pt-9 min-[641px]:max-[900px]:min-h-[142px] min-[641px]:max-[900px]:py-5 max-[640px]:mt-0 max-[640px]:min-h-[235px] max-[640px]:p-[28px_0_0_20px]'
      : 'min-h-[512px] py-10 min-[641px]:max-[900px]:min-h-[241px] min-[641px]:max-[900px]:py-5 max-[640px]:mt-5 max-[640px]:min-h-[189px] max-[640px]:p-[0_0_0_20px]',
  ].join(' ')

  const railClassName = [
    'flex w-max items-stretch transition-transform duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none min-[641px]:max-[900px]:w-auto max-[640px]:!transform-none max-[640px]:!transition-none max-[640px]:[scrollbar-width:none]',
    isLandscape
      ? 'gap-6 min-[641px]:max-[900px]:gap-3 max-[640px]:w-[634px] max-[640px]:gap-4'
      : 'gap-[30px] min-[641px]:max-[900px]:gap-3.5 max-[640px]:w-[428px] max-[640px]:gap-[15.4px]',
  ].join(' ')
  const viewportClassName = [
    hasHoverPreview ? '[overflow-x:clip] [overflow-y:visible]' : 'overflow-hidden',
    'max-[640px]:overflow-x-auto max-[640px]:[overscroll-behavior-inline:contain] max-[640px]:[scrollbar-width:none] max-[640px]:[-webkit-overflow-scrolling:touch] max-[640px]:[&::-webkit-scrollbar]:hidden',
  ].join(' ')

  const leftArrowClassName = [
    'absolute left-[58px] z-[2] grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-[#2f3334] text-white shadow-[0_8px_18px_rgba(0,0,0,0.24)] transition-[opacity,transform] duration-[160ms] hover:enabled:scale-[1.04] disabled:cursor-not-allowed disabled:opacity-40 min-[641px]:max-[900px]:left-0 min-[641px]:max-[900px]:h-[22px] min-[641px]:max-[900px]:w-[22px] min-[641px]:max-[900px]:border-white/30 min-[641px]:max-[900px]:bg-[#30383b] max-[640px]:hidden',
    isLandscape
      ? 'top-[166px] min-[641px]:max-[900px]:top-[75px]'
      : 'top-[268px] min-[641px]:max-[900px]:top-[126px]',
  ].join(' ')

  const rightArrowClassName = [
    'absolute right-[58px] z-[2] grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-[#2f3334] text-white shadow-[0_8px_18px_rgba(0,0,0,0.24)] transition-[opacity,transform] duration-[160ms] hover:enabled:scale-[1.04] disabled:cursor-not-allowed disabled:opacity-40 min-[641px]:max-[900px]:right-2 min-[641px]:max-[900px]:h-[22px] min-[641px]:max-[900px]:w-[22px] min-[641px]:max-[900px]:border-white/30 min-[641px]:max-[900px]:bg-[#30383b] max-[640px]:hidden',
    isLandscape
      ? 'top-[166px] min-[641px]:max-[900px]:top-[75px]'
      : 'top-[268px] min-[641px]:max-[900px]:top-[126px]',
  ].join(' ')

  return (
    <section className={sectionClassName} aria-labelledby={sectionId}>
      <h2
        id={sectionId}
        className="mb-8 text-[32px] font-bold leading-[1.1] tracking-normal text-white min-[641px]:max-[900px]:mb-4 min-[641px]:max-[900px]:text-base min-[641px]:max-[900px]:leading-[1.25] max-[640px]:mb-5 max-[640px]:text-xl max-[640px]:leading-[1.2]"
      >
        {title}
      </h2>

      <div
        ref={viewportRef}
        className={viewportClassName}
      >
        <div
          ref={railRef}
          id={railId}
          className={railClassName}
          style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
        >
          {movies.map((movie, index) => {
            const slotIndex = index % visibleCardCount
            const hoverPlacement = slotIndex === 0 ? 'start' : slotIndex === visibleCardCount - 1 ? 'end' : 'center'

            return (
              <MovieCard key={movie.id} {...movie} variant={variant} hoverPlacement={hoverPlacement} />
            )
          })}
        </div>
      </div>

      <button
        type="button"
        className={leftArrowClassName}
        aria-controls={railId}
        aria-label="Sebelumnya"
        disabled={offset <= 0}
        onClick={() => scrollMovies(-1)}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2] min-[641px]:max-[900px]:h-3.5 min-[641px]:max-[900px]:w-3.5"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        className={rightArrowClassName}
        aria-controls={railId}
        aria-label="Berikutnya"
        disabled={offset >= maxOffset}
        onClick={() => scrollMovies(1)}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2] min-[641px]:max-[900px]:h-3.5 min-[641px]:max-[900px]:w-3.5"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </section>
  )
}

export default MovieSection
