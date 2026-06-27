import ProfileContent from "../../../components/public/profile/ProfileContent.jsx";
import useProfilePage from "../../../hooks/public/useProfilePage.js";

function Profile() {
  const {
    closeMovieDetail,
    closeSeriesDetail,
    isLoading,
    isSavingProfile,
    isSubscribed,
    moviesError,
    moviesStatus,
    myListMovies,
    onProfileChange,
    onProfilePhotoChange,
    onProfileSubmit,
    profile,
    profileError,
    profileForm,
    profileMessage,
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
      isSavingProfile={isSavingProfile}
      movies={myListMovies}
      onCloseMovieDetail={closeMovieDetail}
      onCloseSeriesDetail={closeSeriesDetail}
      onProfileChange={onProfileChange}
      onProfilePhotoChange={onProfilePhotoChange}
      onProfileSubmit={onProfileSubmit}
      onShowMovieDetail={showMovieDetail}
      onShowSeriesDetail={showSeriesDetail}
      profile={profile}
      profileError={profileError}
      profileForm={profileForm}
      profileMessage={profileMessage}
      selectedMovieDetail={selectedMovieDetail}
      selectedSeriesDetail={selectedSeriesDetail}
      status={moviesStatus}
      subscription={subscription}
    />
  );
}

export default Profile;
