import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import useMyListToggle from "../../../hooks/public/useMyListToggle.js";
import { replaceBrokenImage } from "../../../utils/imageFallback.js";
import MyListIcon from "../ui/MyListIcon.jsx";

function ModalIconButton({
  children,
  className = "",
  disabled = false,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={[
        "grid place-items-center rounded-full border border-white/40 text-white transition-[background-color,border-color,box-shadow,color,opacity,transform] duration-200 ease-out hover:scale-105 hover:border-white/70 hover:bg-white/10",
        disabled ? "cursor-wait opacity-70 hover:scale-100" : "",
        className,
      ].join(" ")}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function SoundIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] max-[640px]:h-4 max-[640px]:w-4"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="m19 9-6 6" />
      <path d="m13 9 6 6" />
    </svg>
  );
}

function DetailRow({ label, value }) {
  if (!value) {
    return null;
  }

  return (
    <div className="grid grid-cols-[112px_minmax(0,1fr)] gap-2 text-sm leading-[1.35] text-white/88 max-[640px]:grid-cols-[76px_minmax(0,1fr)] max-[640px]:text-[10px]">
      <span className="text-[#c1c2c4]">{label}</span>
      <span>: {value}</span>
    </div>
  );
}

function RecommendationCard({ movie }) {
  const isPremiumBadge = movie.badge?.trim().toLowerCase() === "premium";
  const badgeClassName = [
    "absolute left-2 top-2 inline-flex max-w-[92px] items-center justify-center rounded-full border px-2 py-1 text-center text-[10px] font-bold leading-none text-white max-[640px]:left-1 max-[640px]:top-1 max-[640px]:max-w-[56px] max-[640px]:px-1 max-[640px]:py-0.5 max-[640px]:text-[6px]",
    isPremiumBadge
      ? "border-[#B7A207] bg-[#B7A207]"
      : "border-[#0f1e93] bg-[#0f1e93]",
  ].join(" ");

  return (
    <article className="relative aspect-[2/3] w-full overflow-hidden rounded bg-[#202124]">
      <img
        className="h-full w-full object-cover"
        src={movie.image}
        alt={movie.title}
        loading="lazy"
        onError={replaceBrokenImage}
      />
      {movie.badge ? (
        <span className={badgeClassName}>{movie.badge}</span>
      ) : null}
      {movie.top ? (
        <span className="absolute right-0 top-0 grid min-h-10 w-7 place-items-center rounded-bl bg-[#b71f1d] p-1 text-center text-xs leading-[1.05] text-white max-[640px]:min-h-7 max-[640px]:w-5 max-[640px]:text-[7px]">
          Top 10
        </span>
      ) : null}
    </article>
  );
}

function MovieDetailModal({ detail, onClose }) {
  const shouldReduceMotion = useReducedMotion();
  const recommendations = detail?.recommendations ?? [];
  const {
    isInMyList,
    isSaving: isMyListSaving,
    toggleMyList,
  } = useMyListToggle(detail?.id);
  const metaItems = [detail?.releaseYear, detail?.duration].filter(Boolean);
  const modalVariants = shouldReduceMotion
    ? {
        animate: { opacity: 1 },
        initial: { opacity: 1 },
      }
    : {
        animate: {
          opacity: 1,
          transition: { duration: 0.22 },
        },
        initial: { opacity: 0 },
      };
  const panelVariants = shouldReduceMotion
    ? {
        animate: { opacity: 1 },
        initial: { opacity: 1 },
      }
    : {
        animate: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
        },
        initial: { opacity: 0, scale: 0.975, y: 18 },
      };

  useEffect(() => {
    if (!detail) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [detail, onClose]);

  if (!detail) {
    return null;
  }

  return (
    <motion.div
      animate="animate"
      className="fixed inset-0 z-[80] overflow-y-auto bg-[#080b0d]/80 px-6 py-14 text-white backdrop-blur-[1px] max-[640px]:px-5 max-[640px]:py-[92px]"
      initial="initial"
      role="presentation"
      variants={modalVariants}
      onMouseDown={onClose}
    >
      <motion.article
        aria-labelledby="movie-detail-title"
        aria-modal="true"
        className="relative mx-auto w-[min(820px,calc(100vw-48px))] overflow-hidden rounded-lg bg-[#181a1c] shadow-[0_34px_90px_rgba(0,0,0,0.66)] ring-1 ring-white/[0.06] max-[640px]:w-full max-[640px]:rounded"
        role="dialog"
        variants={panelVariants}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Tutup detail film"
          className="absolute right-4 top-4 z-30 grid h-8 w-8 place-items-center rounded-full bg-[#181a1c]/80 text-white transition-colors hover:bg-[#2f3334] max-[640px]:right-2 max-[640px]:top-2 max-[640px]:h-6 max-[640px]:w-6"
          onClick={onClose}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] max-[640px]:h-4 max-[640px]:w-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <section className="relative h-[420px] overflow-hidden bg-[#202124] max-[640px]:h-[198px]">
          <img
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={detail.image}
            alt=""
            onError={replaceBrokenImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,17,25,0.12)_0%,rgba(15,17,25,0.06)_54%,rgba(15,17,25,0.26)_100%),linear-gradient(180deg,rgba(24,26,28,0)_28%,rgba(24,26,28,0.62)_68%,#181a1c_100%)]" />
          <div className="absolute inset-x-0 bottom-0 px-[72px] pb-14 max-[640px]:px-7 max-[640px]:pb-7">
            <h2
              id="movie-detail-title"
              className="m-0 text-[32px] font-bold leading-[1.15] text-white max-[640px]:text-xl"
            >
              {detail.title}
            </h2>
            <div className="mt-5 flex items-center gap-3 max-[640px]:mt-3 max-[640px]:gap-2">
              <Link
                className="inline-flex min-h-[39px] min-w-[86px] items-center justify-center rounded-full bg-[#0f1e93] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1728b8] max-[640px]:min-h-[30px] max-[640px]:min-w-[67px] max-[640px]:px-4 max-[640px]:py-1 max-[640px]:text-xs"
                to={`/watch/${detail.id}`}
              >
                Mulai
              </Link>
              <ModalIconButton
                label={
                  isInMyList
                    ? "Hapus dari daftar saya"
                    : "Tambahkan ke daftar saya"
                }
                className={[
                  "h-10 w-10 max-[640px]:h-[30px] max-[640px]:w-[30px]",
                  isInMyList
                    ? "border-white bg-white text-[#181a1c] shadow-[0_8px_20px_rgba(255,255,255,0.16)] hover:bg-white hover:text-[#181a1c]"
                    : "",
                ].join(" ")}
                disabled={isMyListSaving}
                onClick={toggleMyList}
              >
                <MyListIcon
                  className="h-5 w-5 max-[640px]:h-4 max-[640px]:w-4"
                  isSaved={isInMyList}
                />
              </ModalIconButton>
              <ModalIconButton
                label="Matikan suara"
                className="ml-auto h-10 w-10 max-[640px]:h-[30px] max-[640px]:w-[30px]"
              >
                <SoundIcon />
              </ModalIconButton>
            </div>
          </div>
        </section>

        <div className="px-[72px] pb-[72px] pt-10 max-[640px]:px-7 max-[640px]:pb-8 max-[640px]:pt-7">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(270px,0.9fr)] gap-12 max-[640px]:grid-cols-1 max-[640px]:gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#c1c2c4] max-[640px]:gap-2 max-[640px]:text-[10px]">
                {metaItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
                <span className="inline-flex min-h-6 items-center justify-center rounded border  border-white/45 px-2 text-xs text-white/86 max-[640px]:min-h-5 max-[640px]:px-1.5 max-[640px]:text-[8px]">
                  {detail.ageRating}
                </span>
              </div>
              <p className="m-0 mt-6 text-sm leading-[1.48] text-white/88 max-[640px]:mt-4 max-[640px]:text-[10px]">
                {detail.description}
              </p>
            </div>

            <div className="space-y-4 max-[640px]:space-y-3">
              <DetailRow label="Cast" value={detail.cast} />
              <DetailRow label="Genre" value={detail.genres.join(", ")} />
              <DetailRow label="Pembuat Film" value={detail.creators} />
            </div>
          </div>

          {recommendations.length ? (
            <section
              className="mt-14 max-[640px]:mt-7"
              aria-labelledby="movie-recommendation-title"
            >
              <h3
                id="movie-recommendation-title"
                className="m-0 mb-6 text-xl font-bold leading-[1.2] max-[640px]:mb-3 max-[640px]:text-sm"
              >
                Rekomendasi Serupa
              </h3>
              <div className="grid grid-cols-3 gap-7 max-[640px]:gap-3">
                {recommendations.map((movie) => (
                  <RecommendationCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </motion.article>
    </motion.div>
  );
}

export default MovieDetailModal;
