import { useState } from 'react'

const emptyForm = {
  title: '',
  image: '',
  rating: '',
  badge: '',
  genre: '',
  description: '',
  top: false,
}

function getMovieGenre(movie) {
  if (movie?.genre) {
    return movie.genre
  }

  return movie?.hoverPreview?.genres?.join(', ') ?? ''
}

function getFormState(movie) {
  if (!movie) {
    return emptyForm
  }

  return {
    title: movie.title ?? '',
    image: movie.image ?? '',
    rating: movie.rating ?? '',
    badge: movie.badge ?? '',
    genre: getMovieGenre(movie),
    description: movie.description ?? '',
    top: Boolean(movie.top),
  }
}

function MovieFormField({ label, children }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-white">
      {label}
      {children}
    </label>
  )
}

function MovieForm({ onSubmit, editingMovie, onCancel }) {
  const [formData, setFormData] = useState(() => getFormState(editingMovie))
  const isEditing = Boolean(editingMovie)

  const handleInputChange = (event) => {
    const { checked, name, type, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({
      ...editingMovie,
      title: formData.title.trim(),
      image: formData.image.trim(),
      rating: formData.rating.trim(),
      badge: formData.badge.trim(),
      genre: formData.genre.trim(),
      description: formData.description.trim(),
      top: formData.top,
    })

    if (!isEditing) {
      setFormData(emptyForm)
    }
  }

  const inputClassName =
    'min-h-11 rounded-lg border border-white/15 bg-[#202326] px-4 text-sm font-medium text-white outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#8f969a] focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]'

  return (
    <form
      className="rounded-xl border border-white/10 bg-[#181a1c] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.22)] max-[640px]:p-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-6 max-[640px]:mb-4">
        <h2 className="text-2xl font-bold text-white max-[640px]:text-xl">
          {isEditing ? 'Update Movie' : 'Tambah Movie'}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#c1c2c4]">
          {isEditing ? 'Ubah data movie yang dipilih.' : 'Tambahkan movie ke kategori aktif.'}
        </p>
      </div>

      <div className="grid gap-4 max-[640px]:gap-3 md:grid-cols-2">
        <MovieFormField label="Title">
          <input
            className={inputClassName}
            name="title"
            onChange={handleInputChange}
            placeholder="Judul movie"
            required
            type="text"
            value={formData.title}
          />
        </MovieFormField>

        <MovieFormField label="Image URL">
          <input
            className={inputClassName}
            name="image"
            onChange={handleInputChange}
            placeholder="https://..."
            required
            type="url"
            value={formData.image}
          />
        </MovieFormField>

        <MovieFormField label="Rating">
          <input
            className={inputClassName}
            name="rating"
            onChange={handleInputChange}
            placeholder="4.5"
            type="text"
            value={formData.rating}
          />
        </MovieFormField>

        <MovieFormField label="Badge">
          <input
            className={inputClassName}
            name="badge"
            onChange={handleInputChange}
            placeholder="Episode Baru"
            type="text"
            value={formData.badge}
          />
        </MovieFormField>

        <MovieFormField label="Genre">
          <input
            className={inputClassName}
            name="genre"
            onChange={handleInputChange}
            placeholder="Drama, Komedi"
            type="text"
            value={formData.genre}
          />
        </MovieFormField>

        <label className="flex min-h-11 items-center gap-3 self-end rounded-lg border border-white/10 bg-[#202326] px-4 text-sm font-semibold text-white">
          <input
            checked={formData.top}
            className="h-4 w-4 accent-[#3254ff]"
            name="top"
            onChange={handleInputChange}
            type="checkbox"
          />
          Top 10
        </label>
      </div>

      <div className="mt-4">
        <MovieFormField label="Description">
          <textarea
            className={`${inputClassName} min-h-28 resize-y py-3`}
            name="description"
            onChange={handleInputChange}
            placeholder="Deskripsi singkat movie"
            value={formData.description}
          />
        </MovieFormField>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 max-[640px]:mt-5">
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#3254ff] px-6 text-sm font-bold text-white transition-[background,transform] duration-150 hover:-translate-y-px hover:bg-[#4162ff] max-[640px]:w-full"
          type="submit"
        >
          {isEditing ? 'Simpan Update' : 'Tambah Movie'}
        </button>

        {isEditing ? (
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-bold text-white transition-[background,border-color] duration-150 hover:border-white/50 hover:bg-white/10 max-[640px]:w-full"
            onClick={onCancel}
            type="button"
          >
            Batal
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default MovieForm
