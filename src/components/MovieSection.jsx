import { useEffect, useRef, useState } from 'react'
import MovieCard from './MovieCard.jsx'
import '../styles/movie-section.css'

function MovieSection({ title, movies, variant = 'poster' }) {
  const viewportRef = useRef(null)
  const railRef = useRef(null)
  const [offset, setOffset] = useState(0)
  const [maxOffset, setMaxOffset] = useState(0)
  const sectionId = `movie-section-${title.toLowerCase().replaceAll(' ', '-')}`
  const railId = `${sectionId}-rail`

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

    const firstCard = rail.querySelector('.movie-card')
    const railStyle = window.getComputedStyle(rail)
    const gap = Number.parseFloat(railStyle.columnGap || railStyle.gap) || 0
    const cardWidth = firstCard?.getBoundingClientRect().width || rail.clientWidth
    const visibleCards = variant === 'landscape' ? 2 : 3
    const scrollAmount = (cardWidth + gap) * visibleCards

    setOffset((currentOffset) => Math.max(0, Math.min(currentOffset + direction * scrollAmount, maxOffset)))
  }

  return (
    <section className={`movie-section movie-section--${variant}`} aria-labelledby={sectionId}>
      <h2 id={sectionId}>{title}</h2>

      <div ref={viewportRef} className="movie-section__viewport">
        <div
          ref={railRef}
          id={railId}
          className="movie-section__rail"
          style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} variant={variant} />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="movie-section__arrow movie-section__arrow--left"
        aria-controls={railId}
        aria-label="Sebelumnya"
        disabled={offset <= 0}
        onClick={() => scrollMovies(-1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        className="movie-section__arrow movie-section__arrow--right"
        aria-controls={railId}
        aria-label="Berikutnya"
        disabled={offset >= maxOffset}
        onClick={() => scrollMovies(1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </section>
  )
}

export default MovieSection
