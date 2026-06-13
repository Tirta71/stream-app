import Footer from '../components/Footer.jsx'
import HeroSection from '../components/HeroSection.jsx'
import MovieSection from '../components/MovieSection.jsx'
import Navbar from '../components/Navbar.jsx'
import {
  continueWatching,
  heroMovie,
  newReleases,
  topRatedMovies,
  trendingMovies,
} from '../data/movies.js'
import '../styles/home.css'

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
    <div className="home-page">
      {/* <MobileBrowserHeader /> */}
      <Navbar />
      <main>
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
