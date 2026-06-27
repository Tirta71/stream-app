import WatchContent from "../../../components/public/watch/WatchContent.jsx";
import useWatchMovie from "../../../hooks/public/useWatchMovie.js";

function Watch() {
  const {
    backgroundImage,
    contentType,
    episodes,
    error,
    isLoading,
    isLocked,
    movie,
    saveProgress,
    selectedEpisode,
    setSelectedEpisodeId,
    title,
    videoUrl,
  } = useWatchMovie();

  return (
    <WatchContent
      backgroundImage={backgroundImage}
      contentType={contentType}
      episodes={episodes}
      error={error}
      isLoading={isLoading}
      isLocked={isLocked}
      key={`${movie?.id ?? "watch"}-${selectedEpisode?.id ?? "episode"}`}
      movie={movie}
      onSaveProgress={saveProgress}
      onSelectEpisode={setSelectedEpisodeId}
      selectedEpisode={selectedEpisode}
      title={title}
      videoUrl={videoUrl}
    />
  );
}

export default Watch;
