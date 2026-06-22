import { useState } from "react";

const emptyForm = {
  slug: "",
  section: "",
  sectionTitle: "",
  title: "",
  image: "",
  rating: "",
  badge: "",
  description: "",
  previewImage: "",
  ageRating: "13+",
  episodeCount: "",
  duration: "",
  episodeTitle: "",
  genres: "",
  progress: 0,
  previewType: "movie",
  top: false,
};

const episodeCountOptions = [
  "",
  "Movie",
  "1 Episode",
  "6 Episode",
  "8 Episode",
  "10 Episode",
  "12 Episode",
  "16 Episode",
  "24 Episode",
];

const sectionOptions = [
  {
    section: "continueWatching",
    sectionTitle: "Melanjutkan Tonton Film",
  },
  {
    section: "topRatedMovies",
    sectionTitle: "Top Rating Film dan Series Hari ini",
  },
  {
    section: "trendingMovies",
    sectionTitle: "Film Trending",
  },
  {
    section: "newReleases",
    sectionTitle: "Rilis Baru",
  },
];

function getMovieGenres(movie) {
  if (typeof movie?.genres === "string") {
    return movie.genres;
  }

  if (Array.isArray(movie?.genres)) {
    return movie.genres.join(", ");
  }

  if (movie?.genre) {
    return movie.genre;
  }

  return movie?.hoverPreview?.genres?.join(", ") ?? "";
}

function getFormState(movie) {
  if (!movie) {
    return emptyForm;
  }

  return {
    slug: movie.slug ?? "",
    section: movie.section ?? movie.category ?? "",
    sectionTitle: movie.sectionTitle ?? "",
    title: movie.title ?? "",
    image: movie.image ?? "",
    rating: movie.rating ?? "",
    badge: movie.badge ?? "",
    description: movie.description ?? "",
    previewImage:
      movie.previewImage ??
      movie.hoverPreview?.previewImage ??
      movie.image ??
      "",
    ageRating: movie.ageRating ?? movie.hoverPreview?.ageRating ?? "13+",
    episodeCount: movie.episodeCount ?? movie.hoverPreview?.episodeCount ?? "",
    duration: movie.duration ?? movie.hoverPreview?.duration ?? "",
    episodeTitle: movie.episodeTitle ?? movie.hoverPreview?.episodeTitle ?? "",
    genres: getMovieGenres(movie),
    progress: movie.progress ?? movie.hoverPreview?.progress ?? 0,
    previewType: movie.previewType ?? movie.hoverPreview?.type ?? "movie",
    top: Boolean(movie.top),
  };
}

function MovieFormField({ label, children }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-white">
      {label}
      {children}
    </label>
  );
}

function getSectionOption(section) {
  return sectionOptions.find((option) => option.section === section);
}

function MovieForm({
  onSubmit,
  editingMovie,
  defaultSection = "",
  defaultSectionTitle = "",
  isSubmitting = false,
  onCancel,
}) {
  const [formData, setFormData] = useState(() => {
    const initialForm = getFormState(editingMovie);

    return {
      ...initialForm,
      section: initialForm.section || defaultSection,
      sectionTitle: initialForm.sectionTitle || defaultSectionTitle,
    };
  });
  const isEditing = Boolean(editingMovie);

  const handleInputChange = (event) => {
    const { checked, name, type, value } = event.target;

    if (name === "section") {
      const selectedSection = getSectionOption(value);

      setFormData((currentData) => ({
        ...currentData,
        section: value,
        sectionTitle: selectedSection?.sectionTitle ?? "",
      }));
      return;
    }

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const progressValue = Number(formData.progress);

    const wasSaved = await onSubmit({
      ...editingMovie,
      slug: formData.slug.trim(),
      section: formData.section.trim(),
      sectionTitle: formData.sectionTitle.trim(),
      title: formData.title.trim(),
      image: formData.image.trim(),
      rating: formData.rating.trim(),
      badge: formData.badge.trim(),
      description: formData.description.trim(),
      previewImage: formData.previewImage.trim(),
      ageRating: formData.ageRating.trim(),
      episodeCount: formData.episodeCount.trim(),
      duration: formData.duration.trim(),
      episodeTitle: formData.episodeTitle.trim(),
      genres: formData.genres.trim(),
      progress: Number.isFinite(progressValue) ? progressValue : 0,
      previewType: formData.previewType,
      top: formData.top,
    });

    if (!isEditing && wasSaved !== false) {
      setFormData({
        ...emptyForm,
        section: defaultSection,
        sectionTitle: defaultSectionTitle,
      });
    }
  };

  const inputClassName =
    "min-h-11 rounded-lg border border-white/15 bg-[#202326] px-4 text-sm font-medium text-white outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#8f969a] focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]";

  return (
    <form
      className="rounded-xl border border-white/10 bg-[#181a1c] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.22)] max-[640px]:p-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-6 max-[640px]:mb-4">
        <h2 className="text-2xl font-bold text-white max-[640px]:text-xl">
          {isEditing ? "Update Movie" : "Tambah Movie"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#c1c2c4]">
          {isEditing ? "Ubah data movie" : "Tambahkan movie baru"}
        </p>
      </div>

      <div className="grid gap-4 max-[640px]:gap-3 md:grid-cols-2">
        <MovieFormField label="Section Homepage">
          <select
            className={inputClassName}
            name="section"
            onChange={handleInputChange}
            required
            value={formData.section}
          >
            <option value="">Pilih section homepage</option>
            {sectionOptions.map((option) => (
              <option key={option.section} value={option.section}>
                {option.sectionTitle}
              </option>
            ))}
          </select>
        </MovieFormField>

        <MovieFormField label="Slug">
          <input
            className={inputClassName}
            name="slug"
            onChange={handleInputChange}
            placeholder="all-of-us-are-dead"
            type="text"
            value={formData.slug}
          />
        </MovieFormField>

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

        <MovieFormField label="Preview Image URL">
          <input
            className={inputClassName}
            name="previewImage"
            onChange={handleInputChange}
            placeholder="https://..."
            type="url"
            value={formData.previewImage}
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

        <MovieFormField label="Age Rating">
          <input
            className={inputClassName}
            name="ageRating"
            onChange={handleInputChange}
            placeholder="13+"
            type="text"
            value={formData.ageRating}
          />
        </MovieFormField>

        <MovieFormField label="Preview Type">
          <select
            className={inputClassName}
            name="previewType"
            onChange={handleInputChange}
            value={formData.previewType}
          >
            <option value="movie">movie</option>
            <option value="series">series</option>
            <option value="continue">continue</option>
          </select>
        </MovieFormField>

        <MovieFormField label="Episode Count">
          <select
            className={inputClassName}
            name="episodeCount"
            onChange={handleInputChange}
            value={formData.episodeCount}
          >
            {episodeCountOptions.map((option) => (
              <option key={option || "empty"} value={option}>
                {option || "Pilih episode count"}
              </option>
            ))}
          </select>
        </MovieFormField>

        <MovieFormField label="Duration">
          <input
            className={inputClassName}
            name="duration"
            onChange={handleInputChange}
            placeholder="2j 33m"
            type="text"
            value={formData.duration}
          />
        </MovieFormField>

        <MovieFormField label="Episode Title">
          <input
            className={inputClassName}
            name="episodeTitle"
            onChange={handleInputChange}
            placeholder='"Episode 1"'
            type="text"
            value={formData.episodeTitle}
          />
        </MovieFormField>

        <MovieFormField label="Progress">
          <input
            className={inputClassName}
            max="100"
            min="0"
            name="progress"
            onChange={handleInputChange}
            placeholder="35"
            type="number"
            value={formData.progress}
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
        <MovieFormField label="Genres">
          <input
            className={inputClassName}
            name="genres"
            onChange={handleInputChange}
            placeholder="Drama, Komedi, Romantis"
            type="text"
            value={formData.genres}
          />
        </MovieFormField>
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
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting
            ? "Menyimpan..."
            : isEditing
              ? "Simpan Update"
              : "Tambah Movie"}
        </button>

        {isEditing ? (
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-bold text-white transition-[background,border-color] duration-150 hover:border-white/50 hover:bg-white/10 max-[640px]:w-full"
            disabled={isSubmitting}
            onClick={onCancel}
            type="button"
          >
            Batal
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default MovieForm;
