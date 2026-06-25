import Footer from "../../components/public/layout/Footer.jsx";
import Navbar from "../../components/public/layout/Navbar.jsx";
import MyListContent from "../../components/public/myList/MyListContent.jsx";
import PageTransition from "../../components/public/ui/PageTransition.jsx";
import useMyListMovies from "../../hooks/public/useMyListMovies.js";

function MyList() {
  const { isLoading, moviesError, moviesStatus, myListMovies } =
    useMyListMovies();

  return (
    <div className="min-h-svh min-w-[320px] overflow-x-hidden bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <Navbar />
      <PageTransition className="bg-[#181a1c] px-20 pb-16 pt-[78px] max-[900px]:px-5 max-[640px]:pb-9 max-[640px]:pt-8">
        <MyListContent
          error={moviesError}
          isLoading={isLoading}
          movies={myListMovies}
          status={moviesStatus}
        />
      </PageTransition>
      <Footer />
    </div>
  );
}

export default MyList;
