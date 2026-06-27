import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/img/logo/Logo.png";
import logoMobile from "../../../assets/img/logo/logo_mobile.png";
import { useAuthSession } from "../../../hooks/public/useAuthSession.js";
import { getProfilePhotoUrl } from "../../../utils/profile.js";
import GenreDropdown from "../ui/GenreDropdown.jsx";

const getNavLinkClassName = ({ isActive }) =>
  [
    "py-3 transition-colors duration-[160ms] hover:text-white max-[760px]:whitespace-nowrap max-[760px]:py-2.5",
    isActive ? "font-bold text-white" : "text-white/85",
  ].join(" ");

function Navbar({
  genreOptions = [],
  onGenreSelect,
  selectedGenre = "",
  showGenreMenu = false,
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout, user } = useAuthSession();
  const profileAvatarUrl = getProfilePhotoUrl(user);
  const navbarRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen((currentValue) => !currentValue);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    closeProfile();
    logout();
  };

  return (
    <header
      ref={navbarRef}
      className="relative z-20 flex h-[94px] items-center gap-[80px] bg-[#181a1c] px-20 max-[760px]:h-14 max-[760px]:gap-3.5 max-[760px]:px-5"
    >
      <Link
        className="inline-flex items-center text-white max-[760px]:shrink-0"
        to="/"
        aria-label="Chill home"
      >
        <picture>
          <source media="(max-width: 760px)" srcSet={logoMobile} />
          <img
            className="h-auto w-[103px] max-[760px]:w-5"
            src={logo}
            alt="Chill"
          />
        </picture>
      </Link>

      <nav
        className="flex items-center gap-[80px] text-lg font-medium text-[rgba(255,255,255,0.96)] max-[760px]:min-w-0 max-[760px]:gap-3 max-[760px]:text-[10px]"
        aria-label="Primary navigation"
      >
        <NavLink
          className={getNavLinkClassName}
          to="/series"
        >
          Series
        </NavLink>
        <NavLink
          className={getNavLinkClassName}
          to="/film"
        >
          Film
        </NavLink>
        <NavLink
          className={getNavLinkClassName}
          to="/daftar-saya"
        >
          Daftar Saya
        </NavLink>
        {showGenreMenu ? (
          <GenreDropdown
            buttonClassName="!bg-transparent !px-0 py-3 text-lg font-medium hover:!bg-transparent max-[760px]:!gap-1 max-[760px]:!px-0 max-[760px]:py-2.5 max-[760px]:text-[10px] max-[760px]:[&_svg]:h-3 max-[760px]:[&_svg]:w-3"
            className="min-[761px]:hidden"
            genres={genreOptions}
            menuClassName="!fixed !left-5 !right-5 !top-14 !mt-0 !w-auto max-h-[calc(100svh-64px)] grid-cols-2 overflow-y-auto rounded-lg py-2 text-[11px] shadow-[0_18px_40px_rgba(0,0,0,0.48)]"
            onSelect={onGenreSelect}
            selectedGenre={selectedGenre}
          />
        ) : null}
      </nav>

      <div className="ml-auto flex items-center gap-3 max-[760px]:gap-1">
        <button
          type="button"
          className="grid h-10 w-10 overflow-hidden rounded-full border-2 border-[#c7d2fe] bg-[#d7e2ff] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.16)] max-[760px]:h-7 max-[760px]:w-7"
          aria-controls="profile-dropdown"
          aria-expanded={isProfileOpen}
          aria-label="Menu profil"
          onClick={toggleProfile}
        >
          <img
            className="h-full w-full object-cover"
            src={profileAvatarUrl}
            alt=""
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          className="h-6 w-6 border-0 bg-transparent p-0 text-white max-[760px]:h-[18px] max-[760px]:w-[18px]"
          aria-controls="profile-dropdown"
          aria-expanded={isProfileOpen}
          aria-label="Buka menu profil"
          onClick={toggleProfile}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`h-full w-full fill-none stroke-current transition-transform duration-[160ms] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] ${
              isProfileOpen ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      <div
        id="profile-dropdown"
        className={`absolute right-[30px] top-[94px] w-[156px] rounded bg-[#181a1c] py-1 shadow-[0_20px_28px_rgba(0,0,0,0.34)] ring-1 ring-white/[0.03] max-[760px]:right-5 max-[760px]:top-14 max-[760px]:w-[113px] max-[760px]:rounded-md ${
          isProfileOpen ? "block" : "hidden"
        }`}
      >
        <Link
          className="flex min-h-10 items-center gap-[5px] px-3 py-2 text-sm text-[#3254ff] transition-colors duration-150 hover:bg-white/[0.03] max-[760px]:min-h-8 max-[760px]:gap-1.5 max-[760px]:px-2.5 max-[760px]:text-[10px]"
          to="/profil"
          onClick={closeProfile}
        >
          <span aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8] max-[760px]:h-4 max-[760px]:w-4"
            >
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          </span>
          Profil Saya
        </Link>
        <Link
          className="flex min-h-10 items-center gap-[5px] px-3 py-2 text-sm text-[rgba(255,255,255,0.96)] transition-colors duration-150 hover:bg-white/[0.03] max-[760px]:min-h-8 max-[760px]:gap-1.5 max-[760px]:px-2.5 max-[760px]:text-[10px]"
          to="/langganan"
          onClick={closeProfile}
        >
          <span aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8] max-[760px]:h-4 max-[760px]:w-4"
            >
              <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
            </svg>
          </span>
          Ubah Premium
        </Link>
        <Link
          className="flex min-h-10 items-center gap-[5px] px-3 py-2 text-sm text-[rgba(255,255,255,0.96)] transition-colors duration-150 hover:bg-white/[0.03] max-[760px]:min-h-8 max-[760px]:gap-1.5 max-[760px]:px-2.5 max-[760px]:text-[10px]"
          to="/login"
          onClick={handleLogout}
        >
          <span aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8] max-[760px]:h-4 max-[760px]:w-4"
            >
              <path d="M10 17 15 12l-5-5" />
              <path d="M15 12H3" />
              <path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
            </svg>
          </span>
          Keluar
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
