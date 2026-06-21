import Footer from '../../components/public/layout/Footer.jsx'
import Navbar from '../../components/public/layout/Navbar.jsx'
import HeroSection from '../../components/public/sections/HeroSection.jsx'
import MovieSection from '../../components/public/sections/MovieSection.jsx'

function Home({ heroMovie, movieGroups }) {
  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <Navbar />
      <main className="bg-[#181a1c] pb-20 max-[640px]:pb-0">
        <HeroSection movie={heroMovie} />
        <MovieSection title="Melanjutkan Tonton Film" movies={movieGroups.continueWatching} variant="landscape" />
        <MovieSection title="Top Rating Film dan Series Hari ini" movies={movieGroups.topRatedMovies} />
        <MovieSection title="Film Trending" movies={movieGroups.trendingMovies} />
        <MovieSection title="Rilis Baru" movies={movieGroups.newReleases} />
      </main>
      <Footer />
    </div>
  )
}

export default Home
