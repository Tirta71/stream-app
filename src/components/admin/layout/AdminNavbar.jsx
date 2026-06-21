import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo/Logo.png'

function AdminNavbar() {
  return (
    <header className="relative z-20 flex min-h-[86px] items-center justify-between gap-6 border-b border-white/10 bg-[#181a1c] px-20 max-[900px]:px-5 max-[640px]:min-h-0 max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-3 max-[640px]:py-4">
      <div className="flex items-center gap-5 max-[640px]:justify-between max-[640px]:gap-3">
        <Link className="inline-flex items-center text-white" to="/" aria-label="Chill home">
          <img className="h-auto w-[103px] max-[640px]:w-[84px]" src={logo} alt="Chill" />
        </Link>
        <div className="h-8 w-px bg-white/15 max-[640px]:hidden" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3254ff] max-[640px]:hidden">
            Admin Panel
          </p>
          <p className="text-lg font-bold text-white max-[640px]:text-sm">Manage Movies</p>
        </div>
      </div>

      <Link
        className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-bold text-white transition-[background,border-color] duration-150 hover:border-white/50 hover:bg-white/10 max-[640px]:min-h-9 max-[640px]:w-full max-[640px]:px-4 max-[640px]:text-xs"
        to="/"
      >
        Lihat Homepage
      </Link>
    </header>
  )
}

export default AdminNavbar
