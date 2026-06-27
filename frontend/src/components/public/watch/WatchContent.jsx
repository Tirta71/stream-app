import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fastForward10Icon from "../../../assets/icon/fast-forward-10.svg";
import playIcon from "../../../assets/icon/play.svg";
import rewind10Icon from "../../../assets/icon/rewind-10.svg";
import volumeHighIcon from "../../../assets/icon/volume-high.svg";
import PageMessage from "../ui/PageMessage.jsx";

function IconButton({ children, isActive = false, label, onClick }) {
  return (
    <button
      aria-label={label}
      className={[
        "grid h-12 w-12 place-items-center rounded-full border-0 text-white transition-colors hover:bg-white/10 max-[640px]:h-9 max-[640px]:w-9",
        isActive ? "bg-white/10" : "bg-transparent",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function PlayIcon({ pause = false }) {
  if (!pause) {
    return (
      <img
        alt=""
        aria-hidden="true"
        className="h-10 w-10 max-[640px]:h-7 max-[640px]:w-7"
        draggable="false"
        src={playIcon}
      />
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-10 w-10 fill-current max-[640px]:h-7 max-[640px]:w-7"
      viewBox="0 0 40 40"
    >
      <path d="M12 9h6v22h-6V9Zm10 0h6v22h-6V9Z" />
    </svg>
  );
}

function ReplayIcon({ direction = "back" }) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className="h-10 w-10 max-[640px]:h-7 max-[640px]:w-7"
      draggable="false"
      src={direction === "forward" ? fastForward10Icon : rewind10Icon}
    />
  );
}

function VolumeIcon() {
  return (
    <img
      alt=""
      aria-hidden="true"
      className="h-10 w-10 max-[640px]:h-7 max-[640px]:w-7"
      draggable="false"
      src={volumeHighIcon}
    />
  );
}

function MutedIcon() {
  return (
    <span
      aria-hidden="true"
      className="relative grid h-10 w-10 place-items-center max-[640px]:h-7 max-[640px]:w-7"
    >
      <img
        alt=""
        aria-hidden="true"
        className="h-full w-full opacity-70"
        draggable="false"
        src={volumeHighIcon}
      />
      <span className="absolute h-[3px] w-9 rotate-45 rounded-full bg-white max-[640px]:w-7" />
    </span>
  );
}

function VolumeControl({
  isMuted,
  onChangeVolume,
  onToggleMute,
  volumeLevel,
}) {
  const sliderValue = isMuted ? 0 : volumeLevel;

  return (
    <div className="flex items-center gap-1 rounded-full pr-2 transition-colors hover:bg-white/10 max-[640px]:pr-1">
      <IconButton
        isActive={isMuted}
        label={isMuted ? "Nyalakan suara" : "Matikan suara"}
        onClick={onToggleMute}
      >
        {isMuted ? <MutedIcon /> : <VolumeIcon />}
      </IconButton>
      <input
        aria-label="Atur volume"
        className="h-1.5 w-24 cursor-pointer accent-white max-[640px]:w-16"
        max="100"
        min="0"
        onChange={(event) => onChangeVolume(event.target.value)}
        type="range"
        value={sliderValue}
      />
    </div>
  );
}

function ListIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 fill-none stroke-current [stroke-linecap:round] [stroke-width:2.4] max-[640px]:h-6 max-[640px]:w-6"
      viewBox="0 0 24 24"
    >
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </svg>
  );
}

function SubtitleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2] max-[640px]:h-6 max-[640px]:w-6"
      viewBox="0 0 24 24"
    >
      <path d="M4 5h16v14H4z" />
      <path d="M7 15h4" />
      <path d="M13 15h4" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2] max-[640px]:h-6 max-[640px]:w-6"
      viewBox="0 0 24 24"
    >
      <path d="M4 14a8 8 0 0 1 16 0" />
      <path d="m12 14 5-5" />
      <path d="M12 20h.01" />
    </svg>
  );
}

function FullscreenIcon({ isExit = false }) {
  if (isExit) {
    return (
      <svg
        aria-hidden="true"
        className="h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.4] max-[640px]:h-5 max-[640px]:w-5"
        viewBox="0 0 24 24"
      >
        <path d="M9 3v6H3" />
        <path d="M15 3v6h6" />
        <path d="M15 21v-6h6" />
        <path d="M9 21v-6H3" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2] max-[640px]:h-6 max-[640px]:w-6"
      viewBox="0 0 24 24"
    >
      <path d="M8 3H3v5" />
      <path d="M16 3h5v5" />
      <path d="M21 16v5h-5" />
      <path d="M3 16v5h5" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7 fill-current max-[640px]:h-5 max-[640px]:w-5"
      viewBox="0 0 24 24"
    >
      <path d="M5 5v14l9-7-9-7Zm12 0h2v14h-2V5Z" />
    </svg>
  );
}

function BenefitIcon({ type }) {
  const path = {
    device: "M5 8h14v8H5V8Zm14 10h3V6H2v12h8v2h4v-2h5Z",
    download: "M11 3h2v9h4l-5 5-5-5h4V3Zm-6 16h14v2H5v-2Z",
    film: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM6 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm8 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z",
    noAds: "M4 4.5 5.5 3 21 18.5 19.5 20l-4-4H15l-1-3h-4l-1 3H6.5l2.8-8.4L4 4.5ZM7 7.5V16H5V5.5l2 2Zm10 6V8h-3l-.6-2H22v2h-3v7.5l-2-2ZM10.7 11h2.6L12 7.4 10.7 11Z",
    quality: "M4 6h16v12H4V6Zm3 4v2h2v4h2V8H9v2H7Zm6-2v8h2v-3l2.4 3H20l-3.2-4 3-4H17l-2 2.8V8h-2Z",
    subtitle: "M4 5h16v13l-4-3H4V5Zm3 4v2h10V9H7Zm0 4v2h6v-2H7Z",
  }[type];

  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 fill-current"
      viewBox="0 0 24 24"
    >
      <path d={path} />
    </svg>
  );
}

const premiumBenefits = [
  ["download", "Download Konten Pilihan"],
  ["noAds", "Tidak Ada Iklan"],
  ["film", "Tonton Semua Konten"],
  ["quality", "Kualitas Maksimal Sampai Dengan 4K"],
  ["device", "Tonton di Tv, Tablet, Mobile, dan Laptop"],
  ["subtitle", "Subtitle Untuk Konten Pilihan"],
];

function PremiumOverlay() {
  return (
    <div className="absolute inset-0 z-20 grid place-items-center bg-black/56 px-5 text-center text-white backdrop-blur-[3px]">
      <div className="w-[min(720px,100%)]">
        <h1 className="m-0 text-[32px] font-bold leading-[1.2] max-[640px]:text-2xl">
          Layanan Premium<span aria-hidden="true">&#10024;</span>
        </h1>
        <p className="m-0 mt-3 text-lg text-white/90 max-[640px]:text-sm">
          Tingkatkan paket anda untuk dapat menonton video ini.
        </p>
        <h2 className="m-0 mt-16 text-lg font-semibold max-[640px]:mt-9">
          Kenapa Harus Berlangganan?
        </h2>
        <div className="mx-auto mt-5 grid max-w-[560px] grid-cols-3 gap-x-14 gap-y-5 max-[640px]:grid-cols-2 max-[640px]:gap-x-6">
          {premiumBenefits.map(([type, title]) => (
            <article
              className="flex flex-col items-center gap-3 text-sm leading-[1.35] text-white/72"
              key={title}
            >
              <div className="text-white">
                <BenefitIcon type={type} />
              </div>
              <span>{title}</span>
            </article>
          ))}
        </div>
        <Link
          className="mx-auto mt-14 inline-flex min-h-[42px] min-w-[194px] items-center justify-center rounded-full bg-[#0f1e93] px-7 text-base font-bold text-white transition-colors hover:bg-[#1728b8] max-[640px]:mt-9"
          to="/langganan"
        >
          Ubah Jadi Premium
        </Link>
      </div>
    </div>
  );
}

function getYoutubeVideoId(videoUrl) {
  if (!videoUrl) {
    return "";
  }

  try {
    const url = new URL(videoUrl);
    const host = url.hostname.replace("www.", "");

    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] ?? "";
    }

    if (host.includes("youtube.com")) {
      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/").filter(Boolean)[1] ?? "";
      }

      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/").filter(Boolean)[1] ?? "";
      }

      return url.searchParams.get("v") ?? "";
    }
  } catch {
    return "";
  }

  return "";
}

function getEmbedUrl(videoUrl) {
  if (!videoUrl) {
    return "";
  }

  const youtubeVideoId = getYoutubeVideoId(videoUrl);
  const baseUrl = youtubeVideoId
    ? `https://www.youtube.com/embed/${youtubeVideoId}`
    : videoUrl;
  const separator = baseUrl.includes("?") ? "&" : "?";
  const origin =
    typeof window === "undefined"
      ? ""
      : `&origin=${encodeURIComponent(window.location.origin)}`;

  return `${baseUrl}${separator}autoplay=0&controls=0&enablejsapi=1&modestbranding=1&playsinline=1&rel=0${origin}`;
}

function SubtitlePanel() {
  return (
    <div className="absolute bottom-[76px] right-10 z-30 grid w-[392px] grid-cols-2 gap-8 rounded-md bg-[#202829] px-4 py-3 text-sm shadow-[0_18px_42px_rgba(0,0,0,0.32)] max-[640px]:right-4 max-[640px]:w-[calc(100vw-32px)]">
      <div>
        <h3 className="m-0 text-base font-bold">Audio</h3>
        <p className="m-0 mt-4 flex items-center gap-2">
          <span aria-hidden="true">&#10003;</span>
          Bahasa Inggris
        </p>
      </div>
      <div>
        <h3 className="m-0 text-base font-bold">Terjemahan</h3>
        <p className="m-0 mt-4 flex items-center gap-2">
          <span aria-hidden="true">&#10003;</span>
          Bahasa Indonesia
        </p>
        <p className="m-0 mt-5 text-white/50">Bahasa Inggris</p>
      </div>
    </div>
  );
}

function SpeedPanel({ onSelectSpeed, selectedSpeed }) {
  return (
    <div className="absolute bottom-[76px] right-10 z-30 w-48 rounded-md bg-[#202829] p-3 text-sm shadow-[0_18px_42px_rgba(0,0,0,0.32)] max-[640px]:right-4">
      <h3 className="m-0 text-base font-bold">Kecepatan</h3>
      {[
        [0.5, "0.5x"],
        [0.75, "0.75x"],
        [1, "1x (Normal)"],
        [1.25, "1.25x"],
        [1.5, "1.5x"],
      ].map(([rate, label]) => (
        <button
          className={[
            "flex w-full items-center justify-between border-0 bg-transparent px-0 py-2 text-left text-white hover:text-white/70",
            selectedSpeed === rate ? "font-bold" : "",
          ].join(" ")}
          key={rate}
          onClick={() => onSelectSpeed(rate)}
          type="button"
        >
          {label}
          {selectedSpeed === rate ? <span aria-hidden="true">&#10003;</span> : null}
        </button>
      ))}
    </div>
  );
}

function EpisodesPanel({ episodes, onSelectEpisode }) {
  return (
    <div className="absolute bottom-[76px] right-10 z-30 w-[456px] overflow-hidden rounded-md bg-[#202829] text-sm shadow-[0_18px_42px_rgba(0,0,0,0.32)] max-[640px]:right-4 max-[640px]:w-[calc(100vw-32px)]">
      <h3 className="m-0 bg-[#3d4243] px-3 py-3 text-base font-bold">
        &larr; Episode Selanjutnya
      </h3>
      {episodes.slice(0, 4).map((episode, index) => (
        <button
          className={[
            "grid w-full grid-cols-[1fr] border-0 px-3 py-3 text-left text-white hover:bg-white/8",
            index === 0 ? "bg-[#3d4243]" : "bg-transparent",
          ].join(" ")}
          key={episode.id}
          onClick={() => onSelectEpisode(episode.id)}
          type="button"
        >
          <span>Episode {episode.number}</span>
          {index === 1 ? (
            <span className="mt-3 grid grid-cols-[170px_minmax(0,1fr)] gap-3 max-[640px]:grid-cols-[96px_minmax(0,1fr)]">
              <img
                alt=""
                className="h-24 w-[170px] rounded object-cover max-[640px]:h-16 max-[640px]:w-24"
                src={episode.thumbnailUrl}
              />
              <span>
                <strong className="block">{episode.title}</strong>
                <span className="mt-2 line-clamp-3 block text-white/80">
                  {episode.description}
                </span>
              </span>
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

function NextEpisodePanel({ episodes, currentEpisode, onSelectEpisode }) {
  const nextEpisode =
    episodes.find((episode) => episode.number > currentEpisode?.number) ??
    episodes[1];

  if (!nextEpisode) {
    return null;
  }

  return (
    <div className="absolute bottom-[76px] right-28 z-30 w-[456px] overflow-hidden rounded-md bg-[#202829] text-sm shadow-[0_18px_42px_rgba(0,0,0,0.32)] max-[640px]:right-4 max-[640px]:w-[calc(100vw-32px)]">
      <h3 className="m-0 bg-[#3d4243] px-3 py-3 text-base font-bold">
        Episode Selanjutnya
      </h3>
      <button
        className="grid w-full grid-cols-[170px_minmax(0,1fr)] gap-3 border-0 bg-transparent px-3 py-5 text-left text-white hover:bg-white/8 max-[640px]:grid-cols-[96px_minmax(0,1fr)]"
        onClick={() => onSelectEpisode(nextEpisode.id)}
        type="button"
      >
        <img
          alt=""
          className="h-24 w-[170px] rounded object-cover max-[640px]:h-16 max-[640px]:w-24"
          src={nextEpisode.thumbnailUrl}
        />
        <span>
          <strong className="block">
            Episode {nextEpisode.number}: {nextEpisode.title}
          </strong>
          <span className="mt-2 line-clamp-3 block text-white/80">
            {nextEpisode.description}
          </span>
        </span>
      </button>
    </div>
  );
}

function clampNumber(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(value, maxValue));
}

function postPlayerCommand(iframeRef, func, args = []) {
  iframeRef.current?.contentWindow?.postMessage(
    JSON.stringify({
      event: "command",
      func,
      args,
    }),
    "*",
  );
}

function getProgressPercent(seconds, durationSeconds) {
  if (!durationSeconds) {
    return 0;
  }

  return clampNumber(Math.round((seconds / durationSeconds) * 100), 0, 100);
}

function requestElementFullscreen(element) {
  if (!element) {
    return;
  }

  if (getFullscreenElement()) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      return;
    }

    document.webkitExitFullscreen?.();
    return;
  }

  if (element.requestFullscreen) {
    element.requestFullscreen();
    return;
  }

  element.webkitRequestFullscreen?.();
}

function getFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement;
}

function WatchContent({
  backgroundImage,
  contentType,
  episodes,
  error,
  isLoading,
  isLocked,
  movie,
  onSaveProgress,
  onSelectEpisode,
  selectedEpisode,
  title,
  videoUrl,
}) {
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const hideControlsTimerRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(100);
  const [activePanel, setActivePanel] = useState("");
  const [areControlsVisible, setAreControlsVisible] = useState(true);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState(1);
  const embedUrl = getEmbedUrl(videoUrl);
  const isSeries = contentType === "series";
  const shouldShowControls = !isFullscreen || areControlsVisible || isLocked;
  const controlsVisibilityClassName = shouldShowControls
    ? "pointer-events-auto opacity-100"
    : "pointer-events-none opacity-0";
  const playerClassName = [
    "relative min-h-svh overflow-hidden bg-black text-white",
    isFullscreen && !areControlsVisible && !isLocked
      ? "cursor-none"
      : "cursor-default",
  ].join(" ");

  const clearControlsHideTimer = useCallback(() => {
    if (!hideControlsTimerRef.current) {
      return;
    }

    window.clearTimeout(hideControlsTimerRef.current);
    hideControlsTimerRef.current = null;
  }, []);

  const scheduleControlsHide = useCallback(
    (nextIsFullscreen) => {
      clearControlsHideTimer();

      if (!nextIsFullscreen || isLocked) {
        return;
      }

      hideControlsTimerRef.current = window.setTimeout(() => {
        setAreControlsVisible(false);
        setActivePanel("");
      }, 5000);
    },
    [clearControlsHideTimer, isLocked],
  );

  const revealControls = useCallback(() => {
    if (!isFullscreen || isLocked) {
      return;
    }

    setAreControlsVisible(true);
    scheduleControlsHide(true);
  }, [isFullscreen, isLocked, scheduleControlsHide]);

  const handlePlayerAreaClick = () => {
    revealControls();
    togglePlay();
  };

  useEffect(() => {
    if (!isPlaying || isLocked) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setPlaybackSeconds((currentSeconds) => {
        if (!durationSeconds) {
          return currentSeconds + 1;
        }

        return Math.min(currentSeconds + 1, durationSeconds);
      });
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [durationSeconds, isLocked, isPlaying]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const nextIsFullscreen = Boolean(getFullscreenElement());

      setIsFullscreen(nextIsFullscreen);
      setAreControlsVisible(true);
      setActivePanel("");
      scheduleControlsHide(nextIsFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      clearControlsHideTimer();
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
    };
  }, [clearControlsHideTimer, scheduleControlsHide]);

  useEffect(() => {
    const handleYoutubeMessage = (event) => {
      const message =
        typeof event.data === "string" ? JSON.parse(event.data || "{}") : event.data;
      const info = message?.info;

      if (message?.event !== "infoDelivery" || !info) {
        return;
      }

      if (typeof info.currentTime === "number") {
        setPlaybackSeconds(info.currentTime);
      }

      if (typeof info.duration === "number") {
        setDurationSeconds(info.duration);
      }

      if (info.playerState === 1) {
        setIsPlaying(true);
      }

      if (info.playerState === 2 || info.playerState === 0) {
        setIsPlaying(false);
      }

      if (typeof info.volume === "number") {
        setVolumeLevel(clampNumber(info.volume, 0, 100));
      }

      if (typeof info.muted === "boolean") {
        setIsMuted(info.muted);
      }
    };

    const safeHandleYoutubeMessage = (event) => {
      try {
        handleYoutubeMessage(event);
      } catch {
        // Ignore messages from unrelated iframes.
      }
    };

    window.addEventListener("message", safeHandleYoutubeMessage);

    return () => {
      window.removeEventListener("message", safeHandleYoutubeMessage);
    };
  }, []);

  const saveCurrentProgress = (seconds) => {
    onSaveProgress?.(
      getProgressPercent(seconds, durationSeconds),
      Math.round(seconds),
    );
  };

  const togglePlay = () => {
    if (isLocked) {
      return;
    }

    const nextIsPlaying = !isPlaying;

    postPlayerCommand(iframeRef, nextIsPlaying ? "playVideo" : "pauseVideo");
    setIsPlaying(nextIsPlaying);
    saveCurrentProgress(playbackSeconds);
  };

  const seekBy = (seconds) => {
    if (isLocked) {
      return;
    }

    const nextSeconds = clampNumber(
      playbackSeconds + seconds,
      0,
      durationSeconds || Number.MAX_SAFE_INTEGER,
    );

    postPlayerCommand(iframeRef, "seekTo", [nextSeconds, true]);
    setPlaybackSeconds(nextSeconds);
    saveCurrentProgress(nextSeconds);
  };

  const toggleMute = () => {
    if (isLocked) {
      return;
    }

    if (isMuted || volumeLevel === 0) {
      const restoredVolume = volumeLevel || 60;

      postPlayerCommand(iframeRef, "unMute");
      postPlayerCommand(iframeRef, "setVolume", [restoredVolume]);
      setVolumeLevel(restoredVolume);
      setIsMuted(false);
      return;
    }

    postPlayerCommand(iframeRef, "mute");
    setIsMuted(true);
  };

  const changeVolume = (value) => {
    if (isLocked) {
      return;
    }

    const nextVolume = clampNumber(Number(value), 0, 100);

    postPlayerCommand(iframeRef, "setVolume", [nextVolume]);
    setVolumeLevel(nextVolume);

    if (nextVolume === 0) {
      postPlayerCommand(iframeRef, "mute");
      setIsMuted(true);
      return;
    }

    postPlayerCommand(iframeRef, "unMute");
    setIsMuted(false);
  };

  const selectSpeed = (rate) => {
    postPlayerCommand(iframeRef, "setPlaybackRate", [rate]);
    setSelectedSpeed(rate);
    setActivePanel("");
  };

  const skipIntro = () => {
    if (isLocked) {
      return;
    }

    const introEndSeconds = 85;
    const nextSeconds = Math.max(playbackSeconds, introEndSeconds);

    postPlayerCommand(iframeRef, "seekTo", [nextSeconds, true]);
    postPlayerCommand(iframeRef, "playVideo");
    setPlaybackSeconds(nextSeconds);
    setIsPlaying(true);
    saveCurrentProgress(nextSeconds);
  };

  const selectEpisode = (episodeId) => {
    setActivePanel("");
    setIsPlaying(false);
    setPlaybackSeconds(0);
    onSelectEpisode(episodeId);
  };

  if (isLoading) {
    return (
      <main className="grid min-h-svh place-items-center bg-[#181a1c] px-5 text-white">
        <PageMessage message="Memuat video..." />
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="grid min-h-svh place-items-center bg-[#181a1c] px-5 text-white">
        <PageMessage
          message={error || "Video tidak ditemukan."}
          variant="danger"
        />
      </main>
    );
  }

  return (
    <main
      className={playerClassName}
      onClick={revealControls}
      onKeyDown={revealControls}
      onMouseMove={revealControls}
      onTouchStart={revealControls}
      ref={playerRef}
    >
      <button
        className={[
          "absolute left-5 top-5 z-40 rounded-full bg-black/40 px-4 py-2 text-sm font-bold text-white backdrop-blur transition-[background-color,opacity] duration-200 hover:bg-black/60",
          controlsVisibilityClassName,
        ].join(" ")}
        onClick={() => navigate(-1)}
        type="button"
      >
        Kembali
      </button>

      {embedUrl && !isLocked ? (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full scale-[1.02] border-0"
          ref={iframeRef}
          src={embedUrl}
          title={title}
        />
      ) : (
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src={backgroundImage}
        />
      )}

      <div className="absolute inset-0 bg-black/28" />

      {isLocked ? <PremiumOverlay /> : null}

      {!isLocked ? (
        <button
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className={[
            "absolute inset-0 z-10 border-0 bg-transparent",
            isFullscreen && !areControlsVisible ? "cursor-none" : "cursor-default",
          ].join(" ")}
          onClick={handlePlayerAreaClick}
          type="button"
        />
      ) : null}

      {!isLocked ? (
        <button
          aria-label={isPlaying ? "Pause" : "Play"}
          className={[
            "absolute left-1/2 top-1/2 z-20 grid h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[7px] border-white/75 bg-black/18 text-white backdrop-blur-sm transition-[opacity,transform] duration-200 hover:scale-105 max-[640px]:h-16 max-[640px]:w-16 max-[640px]:border-4",
            controlsVisibilityClassName,
          ].join(" ")}
          onClick={togglePlay}
          type="button"
        >
          <PlayIcon pause={isPlaying} />
        </button>
      ) : null}

      {!isLocked ? (
        <button
          className={[
            "absolute bottom-[117px] right-12 z-20 rounded-full bg-white px-6 py-2.5 text-base font-bold text-[#4a4d52] transition-[background-color,opacity] duration-200 hover:bg-white/90 max-[640px]:bottom-24 max-[640px]:right-4 max-[640px]:px-4 max-[640px]:py-2 max-[640px]:text-xs",
            controlsVisibilityClassName,
          ].join(" ")}
          onClick={skipIntro}
          type="button"
        >
          Lewati Intro
        </button>
      ) : null}

      <div
        className={[
          "absolute inset-x-0 bottom-0 z-30 bg-black/48 px-10 py-6 backdrop-blur-[1px] transition-opacity duration-200 max-[640px]:px-3 max-[640px]:py-3",
          controlsVisibilityClassName,
        ].join(" ")}
      >
        <div className="grid grid-cols-[auto_minmax(180px,1fr)_auto] items-center gap-8 max-[760px]:grid-cols-1 max-[760px]:gap-3">
          <div className="flex items-center gap-2">
            <IconButton label={isPlaying ? "Pause" : "Play"} onClick={togglePlay}>
              <PlayIcon pause={isPlaying} />
            </IconButton>
            <IconButton label="Mundur 10 detik" onClick={() => seekBy(-10)}>
              <ReplayIcon />
            </IconButton>
            <IconButton label="Maju 10 detik" onClick={() => seekBy(10)}>
              <ReplayIcon direction="forward" />
            </IconButton>
            <VolumeControl
              isMuted={isMuted || volumeLevel === 0}
              onChangeVolume={changeVolume}
              onToggleMute={toggleMute}
              volumeLevel={volumeLevel}
            />
          </div>

          <p className="m-0 truncate text-center text-lg font-medium max-[640px]:text-sm">
            {title}
          </p>

          <div className="ml-auto flex items-center gap-3 max-[760px]:ml-0">
            {isSeries ? (
              <>
                <IconButton
                  label="Episode selanjutnya"
                  onClick={() =>
                    setActivePanel((current) =>
                      current === "next" ? "" : "next",
                    )
                  }
                >
                  <NextIcon />
                </IconButton>
                <IconButton
                  label="Daftar episode"
                  onClick={() =>
                    setActivePanel((current) =>
                      current === "episodes" ? "" : "episodes",
                    )
                  }
                >
                  <ListIcon />
                </IconButton>
              </>
            ) : null}
            <IconButton
              isActive={activePanel === "subtitle"}
              label="Subtitle"
              onClick={() =>
                setActivePanel((current) =>
                  current === "subtitle" ? "" : "subtitle",
                )
              }
            >
              <SubtitleIcon />
            </IconButton>
            <IconButton
              isActive={activePanel === "speed"}
              label="Kecepatan"
              onClick={() =>
                setActivePanel((current) =>
                  current === "speed" ? "" : "speed",
                )
              }
            >
              <SpeedIcon />
            </IconButton>
            <IconButton
              label={isFullscreen ? "Keluar layar penuh" : "Layar penuh"}
              onClick={() => requestElementFullscreen(playerRef.current)}
            >
              <FullscreenIcon isExit={isFullscreen} />
            </IconButton>
          </div>
        </div>
      </div>

      {shouldShowControls && activePanel === "subtitle" ? <SubtitlePanel /> : null}
      {shouldShowControls && activePanel === "speed" ? (
        <SpeedPanel
          onSelectSpeed={selectSpeed}
          selectedSpeed={selectedSpeed}
        />
      ) : null}
      {shouldShowControls && activePanel === "episodes" ? (
        <EpisodesPanel episodes={episodes} onSelectEpisode={selectEpisode} />
      ) : null}
      {shouldShowControls && activePanel === "next" ? (
        <NextEpisodePanel
          currentEpisode={selectedEpisode}
          episodes={episodes}
          onSelectEpisode={selectEpisode}
        />
      ) : null}
    </main>
  );
}

export default WatchContent;
