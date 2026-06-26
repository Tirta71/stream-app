import ProfileContent from "../../components/public/profile/ProfileContent.jsx";
import useProfilePage from "../../hooks/public/useProfilePage.js";

function Profile() {
  const {
    closeMovieDetail,
    closeSeriesDetail,
    isLoading,
    isSubscribed,
    moviesError,
    moviesStatus,
    myListMovies,
    profile,
    selectedMovieDetail,
    selectedSeriesDetail,
    showMovieDetail,
    showSeriesDetail,
    subscription,
  } = useProfilePage();

  return (
    <ProfileContent
      error={moviesError}
      isLoading={isLoading}
      isSubscribed={isSubscribed}
      movies={myListMovies}
      onCloseMovieDetail={closeMovieDetail}
      onCloseSeriesDetail={closeSeriesDetail}
      onShowMovieDetail={showMovieDetail}
      onShowSeriesDetail={showSeriesDetail}
      profile={profile}
      selectedMovieDetail={selectedMovieDetail}
      selectedSeriesDetail={selectedSeriesDetail}
      status={moviesStatus}
      subscription={subscription}
    />
  );
}

export default Profile;
