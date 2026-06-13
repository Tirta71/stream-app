import '../styles/movie-card.css'

function MovieCard({ movie, variant }) {
  const isLandscape = variant === 'landscape'

  return (
    <article className={`movie-card movie-card--${variant}`} aria-label={movie.title}>
      <img className="movie-card__image" src={movie.image} alt={movie.title} loading="lazy" />

      {movie.badge ? <span className="movie-card__chip">{movie.badge}</span> : null}
      {movie.top ? <span className="movie-card__top">Top 10</span> : null}

      {isLandscape ? (
        <div className="movie-card__caption">
          <h3>{movie.title}</h3>
          <span className="movie-card__rating" aria-label={`Rating ${movie.rating} dari 5`}>
            <span aria-hidden="true">&#9733;</span>
            {movie.rating}/5
          </span>
        </div>
      ) : null}
    </article>
  )
}

export default MovieCard
