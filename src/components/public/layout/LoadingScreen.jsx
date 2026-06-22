import logo from "../../../assets/img/logo/Logo.png";

function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-[9999] grid min-h-svh min-w-[320px] place-items-center overflow-hidden bg-[#181a1c]"
      role="status"
      aria-label="Memuat halaman"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(50,84,255,0.2),rgba(24,26,28,0)_42%),linear-gradient(180deg,#111315_0%,#181a1c_58%,#0f1012_100%)]" />
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3254ff]/10 blur-3xl max-[640px]:h-[280px] max-[640px]:w-[280px]" />

      <div className="relative flex w-[min(320px,calc(100%-48px))] flex-col items-center">
        <div className="chill-loader-mark relative grid h-[136px] w-[136px] place-items-center rounded-full border border-white/10 bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.48),0_0_52px_rgba(50,84,255,0.22)] max-[640px]:h-[112px] max-[640px]:w-[112px]">
          <span className="chill-loader-ring absolute inset-[-7px] rounded-full" />
          <span className="absolute inset-[15px] rounded-full border border-white/[0.06] bg-[#181a1c]/70 backdrop-blur-sm max-[640px]:inset-3" />
          <img
            className="relative z-10 h-auto w-[103px] max-[640px]:w-[86px]"
            src={logo}
            alt="Chill"
          />
        </div>

        <div className="mt-8 h-1.5 w-full max-w-[226px] overflow-hidden rounded-full bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] max-[640px]:mt-6 max-[640px]:max-w-[190px]">
          <span className="chill-loader-progress block h-full rounded-full bg-[linear-gradient(90deg,#3254ff_0%,#6d83ff_52%,#ffffff_100%)]" />
        </div>

        <p className="mt-4 text-center text-sm font-bold tracking-[0.08em] text-white/70 max-[640px]:text-xs">
          MENYIAPKAN TONTONAN
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
