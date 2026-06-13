import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/img/logo/Logo.png'
import '../styles/navbar.css'

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navbarRef = useRef(null)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const toggleProfile = () => {
    setIsProfileOpen((currentValue) => !currentValue)
  }

  const closeProfile = () => {
    setIsProfileOpen(false)
  }

  return (
    <header ref={navbarRef} className="navbar">
      <Link className="navbar__brand" to="/home" aria-label="Chill home">
        <img src={logo} alt="Chill" />
      </Link>

      <nav className="navbar__links" aria-label="Primary navigation">
        <NavLink to="/home">Series</NavLink>
        <NavLink to="/home">Film</NavLink>
        <NavLink to="/home">Daftar Saya</NavLink>
      </nav>

      <div className="navbar__profile">
        <button
          type="button"
          className="navbar__avatar"
          aria-controls="profile-dropdown"
          aria-expanded={isProfileOpen}
          aria-label="Menu profil"
          onClick={toggleProfile}
        >
          <span>TS</span>
        </button>
        <button
          type="button"
          className={`navbar__chevron ${isProfileOpen ? 'navbar__chevron--open' : ''}`}
          aria-controls="profile-dropdown"
          aria-expanded={isProfileOpen}
          aria-label="Buka menu profil"
          onClick={toggleProfile}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      <div
        id="profile-dropdown"
        className={`navbar__dropdown ${isProfileOpen ? 'navbar__dropdown--open' : ''}`}
      >
        <Link to="/home" onClick={closeProfile}>
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          </span>
          Profil Saya
        </Link>
        <Link to="/home" onClick={closeProfile}>
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
            </svg>
          </span>
          Ubah Premium
        </Link>
        <Link to="/login" onClick={closeProfile}>
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M10 17 15 12l-5-5" />
              <path d="M15 12H3" />
              <path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
            </svg>
          </span>
          Keluar
        </Link>
      </div>
    </header>
  )
}

export default Navbar
