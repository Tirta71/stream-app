import '../styles/hero-section.css'

function HeroSection({ movie }) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <img className="hero-section__image" src={movie.image} alt="" />
      <div className="hero-section__shade"></div>

      <div className="hero-section__content">
        <h1 id="hero-title">{movie.title}</h1>
        <p>{movie.description}</p>

        <div className="hero-section__actions">
          <div className="hero-section__left-actions">
            <button type="button" className="hero-section__primary">
              Mulai
            </button>
            <button type="button" className="hero-section__secondary">
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 10v6" />
                  <path d="M12 7.5h.01" />
                </svg>
              </span>
              Selengkapnya
            </button>
            <span className="hero-section__age">18+</span>
          </div>

          <button type="button" className="hero-section__volume" aria-label="Matikan suara">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <path d="m19 9-6 6" />
              <path d="m13 9 6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
