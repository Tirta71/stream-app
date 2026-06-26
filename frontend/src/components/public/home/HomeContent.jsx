import Footer from "../layout/Footer.jsx";
import HeroSection from "../layout/HeroSection.jsx";
import Navbar from "../layout/Navbar.jsx";
import MovieDetailModal from "../movie/MovieDetailModal.jsx";
import MovieSection from "../movie/MovieSection.jsx";
import SeriesDetailModal from "../series/SeriesDetailModal.jsx";
import PageTransition from "../ui/PageTransition.jsx";

function HomeContent({
  heroMovie,
  onCloseMovieDetail,
  onCloseSeriesDetail,
  onShowMovieDetail,
  onShowSeriesDetail,
  sections,
  selectedMovieDetail,
  selectedSeriesDetail,
}) {
  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <Navbar />
      <PageTransition className="bg-[#181a1c] pb-20 max-[640px]:pb-0">
        <HeroSection movie={heroMovie} />
        {sections.map((section) => (
          <MovieSection
            key={section.key}
            movies={section.movies}
            onShowMovieDetail={onShowMovieDetail}
            onShowSeriesDetail={onShowSeriesDetail}
            title={section.title}
            variant={section.variant}
          />
        ))}
      </PageTransition>
      <MovieDetailModal
        detail={selectedMovieDetail}
        onClose={onCloseMovieDetail}
      />
      <SeriesDetailModal
        detail={selectedSeriesDetail}
        onClose={onCloseSeriesDetail}
      />
      <Footer />
    </div>
  );
}

export default HomeContent;
