import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";

function SoundButton({ className = "", iconClassName = "" }) {
  return (
    <button
      type="button"
      className={[
        "grid place-items-center rounded-full border border-white/40 bg-transparent text-white transition-[border-color,background] duration-150 hover:border-white/70 hover:bg-white/10",
        className,
      ].join(" ")}
      aria-label="Matikan suara"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={[
          "fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]",
          iconClassName,
        ].join(" ")}
      >
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        <path d="m19 9-6 6" />
        <path d="m13 9 6 6" />
      </svg>
    </button>
  );
}

const heroClassNames = {
  default: {
    section: "relative h-[587px] overflow-hidden bg-[#181a1c] max-[760px]:h-[225px]",
    image:
      "absolute inset-0 h-full w-full object-cover object-center opacity-[0.86] max-[760px]:opacity-[0.72]",
    overlay:
      "absolute inset-0 bg-[linear-gradient(90deg,rgba(15,17,25,0.84)_0%,rgba(15,17,25,0.56)_31%,rgba(15,17,25,0.16)_68%,rgba(15,17,25,0.34)_100%),linear-gradient(180deg,rgba(24,26,28,0)_30%,rgba(24,26,28,0.5)_66%,#181a1c_90%,#181a1c_100%)] max-[760px]:bg-[linear-gradient(90deg,rgba(15,17,25,0.9),rgba(15,17,25,0.62)_58%,rgba(15,17,25,0.16)),linear-gradient(180deg,rgba(24,26,28,0)_30%,rgba(24,26,28,0.76)_78%,#181a1c_96%,#181a1c_100%)]",
    content:
      "absolute bottom-[88px] left-20 w-[min(668px,calc(100%-160px))] max-[760px]:bottom-auto max-[760px]:left-[22px] max-[760px]:top-[67px] max-[760px]:w-[min(320px,calc(100%-40px))]",
    title:
      "mb-5 text-5xl font-bold leading-[1.1] tracking-normal text-white max-[760px]:mb-2 max-[760px]:text-2xl max-[760px]:leading-[1.2]",
    description:
      "m-0 max-w-[668px] text-lg leading-[1.42] text-[rgba(255,255,255,0.96)] max-[760px]:line-clamp-2 max-[760px]:max-w-[320px] max-[760px]:text-xs max-[760px]:leading-[1.35] max-[760px]:text-white/85",
    actions: "mt-10 flex items-center gap-2.5 max-[760px]:mt-3 max-[760px]:gap-2",
    sound:
      "absolute bottom-[88px] right-20 h-11 w-11 max-[760px]:bottom-[48px] max-[760px]:right-6 max-[760px]:h-[25px] max-[760px]:w-[25px]",
  },
  series: {
    section: "relative h-[587px] overflow-hidden bg-[#181a1c] max-[760px]:h-[225px]",
    image:
      "absolute inset-0 h-full w-full object-cover object-center opacity-[0.94] max-[760px]:opacity-[0.72]",
    overlay:
      "absolute inset-0 bg-[linear-gradient(90deg,rgba(15,17,25,0.72)_0%,rgba(15,17,25,0.48)_38%,rgba(15,17,25,0.12)_70%,rgba(15,17,25,0.34)_100%),linear-gradient(180deg,rgba(24,26,28,0)_24%,rgba(24,26,28,0.52)_68%,#181a1c_100%)] max-[760px]:bg-[linear-gradient(90deg,rgba(15,17,25,0.9),rgba(15,17,25,0.62)_58%,rgba(15,17,25,0.16)),linear-gradient(180deg,rgba(24,26,28,0)_30%,rgba(24,26,28,0.76)_78%,#181a1c_96%,#181a1c_100%)]",
    content:
      "absolute bottom-[56px] left-16 w-[min(560px,calc(100%-128px))] max-[760px]:bottom-auto max-[760px]:left-[22px] max-[760px]:top-[67px] max-[760px]:w-[min(320px,calc(100%-40px))]",
    title:
      "mb-5 text-[42px] font-bold leading-[1.1] tracking-normal text-white max-[760px]:mb-2 max-[760px]:text-2xl max-[760px]:leading-[1.2]",
    description:
      "m-0 max-w-[560px] text-base leading-[1.42] text-[rgba(255,255,255,0.96)] max-[760px]:line-clamp-2 max-[760px]:max-w-[320px] max-[760px]:text-xs max-[760px]:leading-[1.35] max-[760px]:text-white/85",
    actions: "mt-9 flex items-center gap-2.5 max-[760px]:mt-3 max-[760px]:gap-2",
    sound:
      "absolute bottom-[56px] right-16 h-11 w-11 max-[760px]:bottom-[48px] max-[760px]:right-6 max-[760px]:h-[25px] max-[760px]:w-[25px]",
  },
};

function HeroSection({
  movie,
  fallbackImage = "",
  onStart,
  onShowDetail,
  variant = "default",
}) {
  const navigate = useNavigate();
  const classes = heroClassNames[variant] || heroClassNames.default;
  const imageUrl = movie.image || fallbackImage;
  const shouldReduceMotion = useReducedMotion();
  const heroRevealContainer = shouldReduceMotion
    ? {
        animate: { opacity: 1 },
        initial: { opacity: 1 },
      }
    : {
        animate: {
          opacity: 1,
          transition: {
            delayChildren: 0.12,
            staggerChildren: 0.08,
          },
        },
        initial: { opacity: 1 },
      };
  const heroRevealItem = shouldReduceMotion
    ? {
        animate: { opacity: 1 },
        initial: { opacity: 1 },
      }
    : {
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
        initial: { opacity: 0, y: 18 },
      };

  const handleImageError = (event) => {
    if (fallbackImage && event.currentTarget.src !== fallbackImage) {
      event.currentTarget.src = fallbackImage;
    }
  };
  const handleStart = () => {
    if (onStart) {
      onStart();
      return;
    }

    if (movie?.detail?.id) {
      navigate(`/watch/${movie.detail.id}`);
    }
  };

  return (
    <section
      className={classes.section}
      aria-labelledby="hero-title"
    >
      <img
        className={classes.image}
        src={imageUrl}
        alt=""
        onError={handleImageError}
      />
      <div className={classes.overlay}></div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,rgba(24,26,28,0),#181a1c_82%)]" />

      <motion.div
        animate="animate"
        className={classes.content}
        initial="initial"
        variants={heroRevealContainer}
      >
        <motion.h1
          id="hero-title"
          className={classes.title}
          variants={heroRevealItem}
        >
          {movie.title}
        </motion.h1>
        <motion.p
          className={classes.description}
          variants={heroRevealItem}
        >
          {movie.description}
        </motion.p>

        <motion.div
          className={classes.actions}
          variants={heroRevealItem}
        >
          <button
            type="button"
            className="min-h-[45px] min-w-[93px] rounded-full border-0 bg-[#0f1e93] px-[26px] py-2.5 font-bold text-white hover:bg-[#1728b8] max-[760px]:min-h-[25px] max-[760px]:min-w-[55px] max-[760px]:px-3 max-[760px]:py-1 max-[760px]:text-xs"
            onClick={handleStart}
          >
            Mulai
          </button>
          <button
            type="button"
            className="inline-flex min-h-[45px] items-center gap-2 rounded-full border-0 bg-[rgba(47,51,52,0.95)] px-[26px] py-2.5 font-bold text-white max-[760px]:min-h-[25px] max-[760px]:gap-1.5 max-[760px]:px-3 max-[760px]:py-1 max-[760px]:text-xs"
            onClick={onShowDetail}
          >
            <span aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] max-[760px]:h-3 max-[760px]:w-3"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 10v6" />
                <path d="M12 7.5h.01" />
              </svg>
            </span>
            Selengkapnya
          </button>
          <span className="inline-flex min-h-[45px] min-w-[52px] items-center justify-center rounded-full border border-white/40 font-medium text-white max-[760px]:min-h-[25px] max-[760px]:min-w-[30px] max-[760px]:text-xs">
            18+
          </span>
        </motion.div>
      </motion.div>

      <SoundButton
        className={classes.sound}
        iconClassName="h-6 w-6 max-[760px]:h-4 max-[760px]:w-4"
      />
    </section>
  );
}

export default HeroSection;
