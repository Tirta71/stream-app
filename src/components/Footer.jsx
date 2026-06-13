import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo/Logo.png'
import '../styles/footer.css'

const genreLinks = [
  'Aksi',
  'Anak-anak',
  'Anime',
  'Britania',
  'Drama',
  'Fantasi Ilmiah & Fantasi',
  'Kejahatan',
  'KDrama',
  'Komedi',
  'Petualangan',
  'Perang',
  'Romantis',
  'Sains & Alam',
  'Thriller',
]

const helpLinks = ['FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan']

function Footer() {
  const [openGroup, setOpenGroup] = useState(null)

  const toggleGroup = (groupName) => {
    setOpenGroup((currentGroup) => (currentGroup === groupName ? null : groupName))
  }

  return (
    <footer className="footer">
      <div className="footer__brand">
        <Link className="footer__logo" to="/home" aria-label="Chill home">
          <img src={logo} alt="Chill" />
        </Link>
        <p>@2023 Chill All Rights Reserved.</p>
      </div>

      <nav
        className={`footer__group ${openGroup === 'genre' ? 'footer__group--open' : ''}`}
        aria-label="Genre"
      >
        <button
          type="button"
          className="footer__toggle"
          aria-controls="footer-genre-links"
          aria-expanded={openGroup === 'genre'}
          onClick={() => toggleGroup('genre')}
        >
          <span>Genre</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
        <div id="footer-genre-links" className="footer__links footer__links--genre">
          {genreLinks.map((link) => (
            <Link key={link} to="/home">
              {link}
            </Link>
          ))}
        </div>
      </nav>

      <nav
        className={`footer__group footer__group--help ${
          openGroup === 'help' ? 'footer__group--open' : ''
        }`}
        aria-label="Bantuan"
      >
        <button
          type="button"
          className="footer__toggle"
          aria-controls="footer-help-links"
          aria-expanded={openGroup === 'help'}
          onClick={() => toggleGroup('help')}
        >
          <span>Bantuan</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
        <div id="footer-help-links" className="footer__links">
          {helpLinks.map((link) => (
            <Link key={link} to="/home">
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </footer>
  )
}

export default Footer
