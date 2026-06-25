import Footer from "../layout/Footer.jsx";
import HeroSection from "../layout/HeroSection.jsx";
import Navbar from "../layout/Navbar.jsx";
import MovieSection from "../movie/MovieSection.jsx";
import GenreDropdown from "../ui/GenreDropdown.jsx";
import PageTransition from "../ui/PageTransition.jsx";
import SeriesDetailModal from "./SeriesDetailModal.jsx";

function SeriesContent({
  genreOptions,
  heroMovie,
  onCloseSeriesDetail,
  onGenreSelect,
  onShowHeroDetail,
  onShowSeriesDetail,
  sections,
  selectedGenre,
  selectedSeriesDetail,
}) {
  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <Navbar
        genreOptions={genreOptions}
        onGenreSelect={onGenreSelect}
        selectedGenre={selectedGenre}
        showGenreMenu
      />
      <PageTransition className="relative bg-[#181a1c] pb-20 max-[640px]:pb-0">
        <HeroSection
          fallbackImage={heroMovie.fallbackImage}
          movie={heroMovie}
          onShowDetail={onShowHeroDetail}
          variant="series"
        />
        <GenreDropdown
          buttonClassName="h-8 min-w-[82px] justify-center px-3 py-0 text-xs"
          className="absolute left-16 top-[43px] z-30 hidden min-[761px]:block"
          genres={genreOptions}
          menuClassName="mt-0 w-[282px] rounded-[4px] py-1 text-[11px] leading-[1.2]"
          onSelect={onGenreSelect}
          selectedGenre={selectedGenre}
        />

        {sections.map((section) => (
          <MovieSection
            key={section.key}
            movies={section.movies}
            onShowSeriesDetail={onShowSeriesDetail}
            title={section.title}
            variant={section.variant}
          />
        ))}
      </PageTransition>
      <SeriesDetailModal
        detail={selectedSeriesDetail}
        onClose={onCloseSeriesDetail}
      />
      <Footer />
    </div>
  );
}

export default SeriesContent;
