import { useState } from "react";

const emptyForm = {
  ageRating: "13+",
  badge: "",
  description: "",
  image: "",
  isActive: true,
  isPremium: false,
  isTrending: false,
  previewImage: "",
  publishedAt: "",
  rating: "",
  releaseYear: "",
  section: "newReleases",
  slug: "",
  title: "",
  top: false,
  trailerUrl: "",
  type: "movie",
};

const sectionOptions = [
  {
    section: "premiumContents",
    titleByType: {
      movie: "Film Persembahan Chill",
      series: "Series Persembahan Chill",
    },
  },
  {
    section: "topRatedMovies",
    titleByType: {
      movie: "Top Rating Film",
      series: "Top Rating Series",
    },
  },
  {
    section: "trendingMovies",
    titleByType: {
      movie: "Film Trending",
      series: "Series Trending",
    },
  },
  {
    section: "newReleases",
    titleByType: {
      movie: "Rilis Baru",
      series: "Rilis Baru",
    },
  },
];

const typeOptions = [
  { label: "Movie", value: "movie" },
  { label: "Series", value: "series" },
];

function getBooleanField(movie, camelKey, snakeKey, fallbackValue = false) {
  const value = movie?.[camelKey] ?? movie?.[snakeKey];

  if (value === undefined || value === null) {
    return fallbackValue;
  }

  return value === true || value === "true";
}

function getMovieType(movie) {
  const type = String(movie?.type || "").toLowerCase();

  return type === "series" ? "series" : "movie";
}

function getDerivedSection(movie) {
  if (getBooleanField(movie, "isPremium", "is_premium")) {
    return "premiumContents";
  }

  if (getBooleanField(movie, "isTrending", "is_trending")) {
    return "trendingMovies";
  }

  if (
    getBooleanField(movie, "isTopTen", "is_top_ten") ||
    Number(movie?.rating) >= 4
  ) {
    return "topRatedMovies";
  }

  return "newReleases";
}

function getDateInputValue(value) {
  if (!value) {
    return "";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().slice(0, 10);
}

function getFormState(movie) {
  if (!movie) {
    return emptyForm;
  }

  const isPremium = getBooleanField(movie, "isPremium", "is_premium");
  const isTrending = getBooleanField(movie, "isTrending", "is_trending");
  const isTopTen = getBooleanField(movie, "isTopTen", "is_top_ten");

  return {
    ageRating: movie.ageRating ?? movie.age_rating ?? "13+",
    badge: movie.badge ?? "",
    description: movie.description ?? "",
    image: movie.image ?? "",
    isActive: getBooleanField(movie, "isActive", "is_active", true),
    isPremium,
    isTrending,
    previewImage: movie.previewImage ?? movie.preview_image ?? movie.image ?? "",
    publishedAt: getDateInputValue(movie.publishedAt ?? movie.published_at),
    rating: String(movie.rating ?? ""),
    releaseYear: String(movie.releaseYear ?? movie.release_year ?? ""),
    section: getDerivedSection(movie),
    slug: movie.slug ?? "",
    title: movie.title ?? "",
    top: Boolean(movie.top || isTopTen),
    trailerUrl: movie.trailerUrl ?? movie.trailer_url ?? "",
    type: getMovieType(movie),
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

function getSectionTitle(option, type) {
  return option?.titleByType?.[type] ?? "";
}

function MovieForm({
  onSubmit,
  editingMovie,
  defaultSection = "",
  isSubmitting = false,
  onCancel,
}) {
  const [formData, setFormData] = useState(() => {
    const initialForm = getFormState(editingMovie);

    return {
      ...initialForm,
      section: initialForm.section || defaultSection || "newReleases",
    };
  });
  const isEditing = Boolean(editingMovie);

  const handleInputChange = (event) => {
    const { checked, name, type, value } = event.target;

    if (name === "section") {
      setFormData((currentData) => ({
        ...currentData,
        isPremium: value === "premiumContents" ? true : currentData.isPremium,
        isTrending: value === "trendingMovies" ? true : currentData.isTrending,
        section: value,
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

    const wasSaved = await onSubmit({
      ...editingMovie,
      ageRating: formData.ageRating.trim(),
      badge: formData.badge.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
      isActive: formData.isActive,
      isPremium: formData.isPremium,
      isTopTen: formData.top,
      isTrending: formData.isTrending,
      previewImage: formData.previewImage.trim(),
      publishedAt: formData.publishedAt,
      rating: formData.rating.trim(),
      releaseYear: formData.releaseYear.trim(),
      section: formData.section,
      slug: formData.slug.trim(),
      title: formData.title.trim(),
      top: formData.top,
      trailerUrl: formData.trailerUrl.trim(),
      type: formData.type,
    });

    if (!isEditing && wasSaved !== false) {
      setFormData({
        ...emptyForm,
        section: defaultSection || "newReleases",
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
          {isEditing
            ? "Ubah data konten dari backend."
            : "Tambahkan movie atau series baru ke backend."}
        </p>
      </div>

      <div className="grid gap-4 max-[640px]:gap-3 md:grid-cols-2">
        <MovieFormField label="Type">
          <select
            className={inputClassName}
            name="type"
            onChange={handleInputChange}
            required
            value={formData.type}
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </MovieFormField>

        <MovieFormField label="Kategori Tampilan">
          <select
            className={inputClassName}
            name="section"
            onChange={handleInputChange}
            required
            value={formData.section}
          >
            {sectionOptions.map((option) => (
              <option key={option.section} value={option.section}>
                {getSectionTitle(option, formData.type)}
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

        <MovieFormField label="Trailer URL">
          <input
            className={inputClassName}
            name="trailerUrl"
            onChange={handleInputChange}
            placeholder="https://www.youtube.com/embed/..."
            type="url"
            value={formData.trailerUrl}
          />
        </MovieFormField>

        <MovieFormField label="Rating">
          <input
            className={inputClassName}
            max="5"
            min="0"
            name="rating"
            onChange={handleInputChange}
            placeholder="4.5"
            required
            step="0.1"
            type="number"
            value={formData.rating}
          />
        </MovieFormField>

        <MovieFormField label="Badge">
          <input
            className={inputClassName}
            name="badge"
            onChange={handleInputChange}
            placeholder="Premium / Episode Baru"
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
            required
            type="text"
            value={formData.ageRating}
          />
        </MovieFormField>

        <MovieFormField label="Release Year">
          <input
            className={inputClassName}
            max="2100"
            min="1900"
            name="releaseYear"
            onChange={handleInputChange}
            placeholder="2026"
            type="number"
            value={formData.releaseYear}
          />
        </MovieFormField>

        <MovieFormField label="Published At">
          <input
            className={inputClassName}
            name="publishedAt"
            onChange={handleInputChange}
            type="date"
            value={formData.publishedAt}
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

        <label className="flex min-h-11 items-center gap-3 self-end rounded-lg border border-white/10 bg-[#202326] px-4 text-sm font-semibold text-white">
          <input
            checked={formData.isTrending}
            className="h-4 w-4 accent-[#3254ff]"
            name="isTrending"
            onChange={handleInputChange}
            type="checkbox"
          />
          Trending
        </label>

        <label className="flex min-h-11 items-center gap-3 self-end rounded-lg border border-white/10 bg-[#202326] px-4 text-sm font-semibold text-white">
          <input
            checked={formData.isPremium}
            className="h-4 w-4 accent-[#3254ff]"
            name="isPremium"
            onChange={handleInputChange}
            type="checkbox"
          />
          Premium
        </label>

        <label className="flex min-h-11 items-center gap-3 self-end rounded-lg border border-white/10 bg-[#202326] px-4 text-sm font-semibold text-white">
          <input
            checked={formData.isActive}
            className="h-4 w-4 accent-[#3254ff]"
            name="isActive"
            onChange={handleInputChange}
            type="checkbox"
          />
          Aktif
        </label>
      </div>

      <div className="mt-4">
        <MovieFormField label="Description">
          <textarea
            className={`${inputClassName} min-h-28 resize-y py-3`}
            name="description"
            onChange={handleInputChange}
            placeholder="Deskripsi singkat movie"
            required
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
