const fallbackSectionTitles = {
  continueWatching: 'Melanjutkan Tonton Film',
  topRatedMovies: 'Top Rating Film dan Series Hari ini',
  trendingMovies: 'Film Trending',
  newReleases: 'Rilis Baru',
}

const fallbackSectionOrders = {
  continueWatching: 1,
  topRatedMovies: 2,
  trendingMovies: 3,
  newReleases: 4,
}

export function createEmptyHomeSections() {
  return []
}

export function getMovieSectionKey(movie) {
  return movie.section || movie.category || ''
}

export function getMovieSectionTitle(movie) {
  const sectionKey = getMovieSectionKey(movie)

  return movie.sectionTitle || fallbackSectionTitles[sectionKey] || sectionKey
}

function getGenres(genres) {
  if (Array.isArray(genres)) {
    return genres.filter(Boolean)
  }

  if (typeof genres === 'string') {
    return genres
      .split(',')
      .map((genre) => genre.trim())
      .filter(Boolean)
  }

  return []
}

function getBoolean(value) {
  return value === true || value === 'true'
}

function getNumber(value, fallbackValue = 0) {
  const numberValue = Number(value)

  return Number.isFinite(numberValue) ? numberValue : fallbackValue
}

function getPreviewType(movie) {
  return (
    movie.previewType ||
    (getMovieSectionKey(movie) === 'continueWatching'
      ? 'continue'
      : movie.episodeCount === 'Movie'
        ? 'movie'
        : 'series')
  )
}

function getSectionVariant(movie) {
  return getPreviewType(movie) === 'continue' ? 'landscape' : 'poster'
}

export function mapApiMovieToPublicMovie(movie) {
  const previewType = getPreviewType(movie)
  const image = movie.image || movie.previewImage || ''
  const previewImage = movie.previewImage || image

  return {
    id: movie.id || movie.slug || movie.title,
    title: movie.title || 'Untitled',
    image,
    rating: movie.rating || '0',
    badge: movie.badge || '',
    top: getBoolean(movie.top),
    description: movie.description || '',
    hoverPreview: {
      previewImage,
      ageRating: movie.ageRating || '13+',
      episodeCount: movie.episodeCount || (previewType === 'movie' ? 'Movie' : '16 Episode'),
      duration: movie.duration || undefined,
      episodeTitle: movie.episodeTitle || undefined,
      genres: getGenres(movie.genres),
      progress: getNumber(movie.progress, 35),
      type: previewType,
    },
  }
}

export function groupMoviesBySection(movies) {
  const sectionMap = new Map()

  movies.forEach((movie, index) => {
    const sectionKey = getMovieSectionKey(movie)

    if (!sectionKey) {
      return
    }

    if (!sectionMap.has(sectionKey)) {
      sectionMap.set(sectionKey, {
        key: sectionKey,
        movies: [],
        order: getNumber(movie.sectionOrder, fallbackSectionOrders[sectionKey] ?? index),
        title: getMovieSectionTitle(movie),
        variant: getSectionVariant(movie),
      })
    }

    const section = sectionMap.get(sectionKey)
    const sectionTitle = getMovieSectionTitle(movie)

    if (sectionTitle && section.title === sectionKey) {
      section.title = sectionTitle
    }

    if (getSectionVariant(movie) === 'landscape') {
      section.variant = 'landscape'
    }

    section.movies.push(mapApiMovieToPublicMovie(movie))
  })

  return [...sectionMap.values()]
    .filter((section) => section.movies.length > 0)
    .sort((firstSection, secondSection) => firstSection.order - secondSection.order)
    .map((section) => ({
      key: section.key,
      movies: section.movies,
      title: section.title,
      variant: section.variant,
    }))
}
