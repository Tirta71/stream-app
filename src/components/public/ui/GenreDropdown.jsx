import { useEffect, useRef, useState } from "react";

const genreColumns = [
  [
    "Aksi",
    "Anak-anak",
    "Anime",
    "Britania",
    "Drama",
    "Fantasi Ilmiah & Fantasi",
    "Kejahatan",
  ],
  [
    "KDrama",
    "Komedi",
    "Petualangan",
    "Perang",
    "Romantis",
    "Sains & Alam",
    "Thriller",
  ],
];

function splitGenresIntoColumns(genres) {
  const middleIndex = Math.ceil(genres.length / 2);

  return [genres.slice(0, middleIndex), genres.slice(middleIndex)];
}

function GenreDropdown({
  buttonClassName = "",
  className = "",
  genres,
  menuClassName = "",
  onSelect,
  selectedGenre = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hasCustomPosition = /\b(static|fixed|absolute|relative|sticky)\b/.test(
    className,
  );
  const genreOptions = genres?.length ? genres : genreColumns.flat();
  const visibleGenreColumns = splitGenresIntoColumns(genreOptions);
  const buttonLabel = selectedGenre || "Genre";

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((currentValue) => !currentValue);
  };

  const selectGenre = (genre) => {
    onSelect?.(genre);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={[hasCustomPosition ? "" : "relative", className]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className={[
          "inline-flex items-center gap-2 rounded-md bg-[#2f3334] px-4 py-2 text-sm font-bold text-white transition-colors duration-150 hover:bg-[#3c4244]",
          buttonClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={toggleMenu}
      >
        {buttonLabel}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`h-4 w-4 fill-none stroke-current transition-transform duration-150 [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen ? (
        <div
          className={[
            "absolute left-0 top-full z-40 mt-1 grid w-[348px] grid-cols-2 rounded bg-[#2f3334] py-2 text-sm font-medium text-white shadow-[0_18px_34px_rgba(0,0,0,0.38)] ring-1 ring-white/[0.05]",
            menuClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          role="menu"
        >
          <div className="col-span-2">
            <button
              type="button"
              className={`block min-h-8 w-full px-4 py-1.5 text-left transition-colors duration-150 hover:bg-white/10 hover:text-white ${
                selectedGenre ? "text-white/80" : "bg-white/10 text-white"
              }`}
              role="menuitemradio"
              aria-checked={!selectedGenre}
              onClick={() => selectGenre("")}
            >
              Semua Genre
            </button>
          </div>
          {visibleGenreColumns.map((genreColumn) => (
            <div key={genreColumn.join("-")}>
              {genreColumn.map((genre) => {
                const isSelected = selectedGenre === genre;

                return (
                  <button
                    key={genre}
                    type="button"
                    className={`block min-h-8 w-full px-4 py-1.5 text-left transition-colors duration-150 hover:bg-white/10 hover:text-white ${
                      isSelected ? "bg-white/10 text-white" : "text-white/90"
                    }`}
                    role="menuitemradio"
                    aria-checked={isSelected}
                    onClick={() => selectGenre(genre)}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default GenreDropdown;
