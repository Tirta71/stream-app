import Footer from '../components/layout/Footer.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import MovieSection from '../components/sections/MovieSection.jsx'
import {
  continueWatching,
  heroMovie,
  newReleases,
  topRatedMovies,
  trendingMovies,
} from '../data/movies.js'

// function MobileBrowserHeader() {
//   return (
//     <header className="home-browser" aria-label="Mobile browser preview">
//       <div className="home-browser__status">
//         <span>9:30</span>
//         <span className="home-browser__signals" aria-hidden="true">
//           <i></i>
//           <i></i>
//           <i></i>
//         </span>
//       </div>
//       <div className="home-browser__url">
//         <span className="home-browser__aa">AA</span>
//         <span className="home-browser__lock" aria-hidden="true"></span>
//         <span>https://chill.com</span>
//         <span className="home-browser__refresh" aria-hidden="true"></span>
//       </div>
//     </header>
//   )
// }

function Home() {
  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      {/* <MobileBrowserHeader /> */}
      <Navbar />
      <main className="bg-[#181a1c] pb-20 max-[640px]:pb-0">
        <HeroSection movie={heroMovie} />
        <MovieSection title="Melanjutkan Tonton Film" movies={continueWatching} variant="landscape" />
        <MovieSection title="Top Rating Film dan Series Hari ini" movies={topRatedMovies} />
        <MovieSection title="Film Trending" movies={trendingMovies} />
        <MovieSection title="Rilis Baru" movies={newReleases} />
      </main>
      <Footer />
    </div>
  )
}

export default Home
