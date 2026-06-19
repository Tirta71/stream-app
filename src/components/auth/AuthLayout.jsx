import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo/Logo.png'

const authBackgroundUrl = 'https://image.tmdb.org/t/p/w1280/nvxrQQspxmSblCYDtvDAbVFX8Jt.jpg'

function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-[#181a24] p-10 max-[640px]:px-5 max-[640px]:py-6">
      <img className="absolute inset-0 h-full w-full object-cover" src={authBackgroundUrl} alt="" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,26,36,0.32),rgba(24,26,36,0.92)),linear-gradient(90deg,rgba(4,6,12,0.86),rgba(4,6,12,0.28)_48%,rgba(4,6,12,0.84))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.7),transparent_28%,transparent_72%,rgba(0,0,0,0.7)),radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.1),transparent_36%)]" />

      <section
        className="relative z-[1] w-[min(529px,calc(100vw-40px))] rounded-2xl border border-white/20 bg-[rgba(24,26,36,0.84)] p-10 text-[rgba(255,255,255,0.96)] shadow-[0_24px_80px_rgba(0,0,0,0.48)] backdrop-blur-[14px] max-[640px]:w-full max-[640px]:p-6"
        aria-labelledby="auth-title"
      >
        <Link className="mb-7 flex min-h-11 w-full items-center justify-center max-[640px]:mb-5" to="/" aria-label="Chill home">
          <img className="h-auto w-[163px] max-[640px]:w-[132px]" src={logo} alt="Chill" />
        </Link>

        <div className="mb-[34px] text-center max-[640px]:mb-6">
          <h1 id="auth-title" className="mb-2 text-[32px] font-bold leading-[1.2] tracking-normal max-[640px]:text-[28px]">
            {title}
          </h1>
          <p className="m-0 text-base text-[rgba(255,255,255,0.78)]">{subtitle}</p>
        </div>

        {children}
      </section>
    </main>
  )
}

export default AuthLayout
