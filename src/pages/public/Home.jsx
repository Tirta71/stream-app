import { useEffect } from 'react'
import Footer from '../../components/public/layout/Footer.jsx'
import HeroSection from '../../components/public/layout/HeroSection.jsx'
import Navbar from '../../components/public/layout/Navbar.jsx'
import MovieSection from '../../components/public/movie/MovieSection.jsx'

function Home({ heroMovie, homeSections, onRefreshMovies }) {
  useEffect(() => {
    onRefreshMovies?.()
  }, [onRefreshMovies])

  const visibleSections = homeSections.filter((section) => section.movies.length > 0)

  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <Navbar />
      <main className="bg-[#181a1c] pb-20 max-[640px]:pb-0">
        <HeroSection movie={heroMovie} />
        {visibleSections.map((section) => (
          <MovieSection
            key={section.key}
            movies={section.movies}
            title={section.title}
            variant={section.variant}
          />
        ))}
      </main>
      <Footer />
    </div>
  )
}

export default Home
