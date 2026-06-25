import Footer from "../../components/public/layout/Footer.jsx";
import HeroSection from "../../components/public/layout/HeroSection.jsx";
import Navbar from "../../components/public/layout/Navbar.jsx";
import MovieSection from "../../components/public/movie/MovieSection.jsx";
import SeriesDetailModal from "../../components/public/series/SeriesDetailModal.jsx";
import PageTransition from "../../components/public/ui/PageTransition.jsx";
import useHomeMovies from "../../hooks/public/useHomeMovies.js";

function Home({ heroMovie }) {
  const {
    closeSeriesDetail,
    selectedSeriesDetail,
    showSeriesDetail,
    visibleSections,
  } = useHomeMovies();

  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <Navbar />
      <PageTransition className="bg-[#181a1c] pb-20 max-[640px]:pb-0">
        <HeroSection movie={heroMovie} />
        {visibleSections.map((section) => (
          <MovieSection
            key={section.key}
            movies={section.movies}
            onShowSeriesDetail={showSeriesDetail}
            title={section.title}
            variant={section.variant}
          />
        ))}
      </PageTransition>
      <SeriesDetailModal
        detail={selectedSeriesDetail}
        onClose={closeSeriesDetail}
      />
      <Footer />
    </div>
  );
}

export default Home;
