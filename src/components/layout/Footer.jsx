import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo/Logo.png'

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

  const getLinksClassName = (groupName, isGenre = false) =>
    [
      'grid gap-[13px] text-base text-[rgba(193,194,196,0.88)] max-[900px]:gap-2.5 max-[900px]:pt-3 max-[900px]:text-[13px]',
      isGenre ? 'grid-cols-[repeat(4,minmax(120px,1fr))] max-[900px]:grid-cols-2' : '',
      openGroup === groupName ? 'max-[900px]:grid' : 'max-[900px]:hidden',
    ]
      .filter(Boolean)
      .join(' ')

  return (
    <footer className="grid min-h-[284px] grid-cols-[auto_auto_auto] items-center justify-between border-t border-[rgba(231,227,252,0.23)] bg-[#181a1c] px-20 py-[60px] text-[rgba(193,194,196,0.88)] max-[900px]:min-h-[194px] max-[900px]:grid-cols-1 max-[900px]:gap-[18px] max-[900px]:px-5 max-[900px]:pb-[30px] max-[900px]:pt-[26px]">
      <div className="flex flex-col gap-[26px] max-[900px]:gap-3">
        <Link className="inline-flex items-center text-white max-[900px]:w-fit" to="/" aria-label="Chill home">
          <img className="h-auto w-[163px] max-[900px]:w-[84px]" src={logo} alt="Chill" />
        </Link>
        <p className="m-0 text-base max-[900px]:text-xs">@2023 Chill All Rights Reserved.</p>
      </div>

      <nav
        className="block"
        aria-label="Genre"
      >
        <button
          type="button"
          className="mb-[15px] flex w-full items-center justify-start bg-transparent p-0 text-left text-base font-bold text-white max-[900px]:m-0 max-[900px]:min-h-6 max-[900px]:justify-between"
          aria-controls="footer-genre-links"
          aria-expanded={openGroup === 'genre'}
          onClick={() => toggleGroup('genre')}
        >
          <span>Genre</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`hidden h-5 w-5 shrink-0 fill-none stroke-current transition-transform duration-[160ms] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] max-[900px]:block ${
              openGroup === 'genre' ? 'max-[900px]:rotate-90' : ''
            }`}
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
        <div id="footer-genre-links" className={getLinksClassName('genre', true)}>
          {genreLinks.map((link) => (
            <Link key={link} className="transition-colors duration-[160ms] hover:text-white" to="/">
              {link}
            </Link>
          ))}
        </div>
      </nav>

      <nav
        className="block"
        aria-label="Bantuan"
      >
        <button
          type="button"
          className="mb-[15px] flex w-full items-center justify-start bg-transparent p-0 text-left text-base font-bold text-white max-[900px]:m-0 max-[900px]:min-h-6 max-[900px]:justify-between"
          aria-controls="footer-help-links"
          aria-expanded={openGroup === 'help'}
          onClick={() => toggleGroup('help')}
        >
          <span>Bantuan</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`hidden h-5 w-5 shrink-0 fill-none stroke-current transition-transform duration-[160ms] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] max-[900px]:block ${
              openGroup === 'help' ? 'max-[900px]:rotate-90' : ''
            }`}
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
        <div id="footer-help-links" className={getLinksClassName('help')}>
          {helpLinks.map((link) => (
            <Link key={link} className="transition-colors duration-[160ms] hover:text-white" to="/">
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </footer>
  )
}

export default Footer
