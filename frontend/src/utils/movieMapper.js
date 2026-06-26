export function createEmptyHomeSections() {
  return []
}

export function getNormalizedText(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

export function getMovieType(movie) {
  return getNormalizedText(movie?.type)
}

export function getMovieSectionKey(movie) {
  return movie?.section || movie?.category || ''
}

export function getMovieSectionTitle(movie) {
  return movie?.sectionTitle || getMovieSectionKey(movie)
}

export function getBoolean(value) {
  return value === true || value === 'true'
}

export function getNumber(value, fallbackValue = 0) {
  const numberValue = Number(value)

  return Number.isFinite(numberValue) ? numberValue : fallbackValue
}

function getText(value, fallbackValue = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallbackValue
}

function getField(movie, snakeKey, camelKey, fallbackValue = '') {
  return movie?.[snakeKey] ?? movie?.[camelKey] ?? fallbackValue
}

function getTimestamp(value) {
  if (!value) {
    return 0
  }

  if (typeof value === 'number') {
    return value > 9999999999 ? value : value * 1000
  }

  const parsedDate = Date.parse(value)

  return Number.isFinite(parsedDate) ? parsedDate : 0
}

export function getGenres(genres) {
  if (Array.isArray(genres)) {
    return genres
      .map((genre) => {
        if (typeof genre === 'string') {
          return genre.trim()
        }

        return genre?.name || genre?.title || genre?.genre?.name || ''
      })
      .filter(Boolean)
  }

  if (typeof genres === 'string') {
    return genres
      .split(',')
      .map((genre) => genre.trim())
      .filter(Boolean)
  }

  return []
}

function getEpisodes(movie) {
  if (Array.isArray(movie?.episodes)) {
    return movie.episodes
  }

  if (movie?.episodes && typeof movie.episodes === 'object') {
    return Object.values(movie.episodes)
  }

  return []
}

function getPeople(movie) {
  const normalizePerson = (person) => ({
    ...person,
    name: person?.name || person?.person?.name || '',
    role: person?.role || person?.personRole || '',
  })

  if (Array.isArray(movie?.people)) {
    return movie.people.map(normalizePerson)
  }

  if (movie?.people && typeof movie.people === 'object') {
    return Object.values(movie.people).map(normalizePerson)
  }

  return []
}

function getPeopleNames(movie, roles) {
  const roleSet = new Set(roles.map(getNormalizedText))

  return getPeople(movie)
    .filter((person) => roleSet.has(getNormalizedText(person?.role)))
    .map((person) => getText(person?.name))
    .filter(Boolean)
}

function findEpisode(movie, episodeId) {
  const episodes = getEpisodes(movie)

  if (!episodeId) {
    return episodes[0]
  }

  return (
    episodes.find(
      (episode) =>
        String(episode?.id) === String(episodeId) ||
        String(episode?.episode_number) === String(episodeId) ||
        String(episode?.episodeNumber) === String(episodeId),
    ) ?? episodes[0]
  )
}

function getEpisodeCountText(movie) {
  const type = getMovieType(movie)
  const episodes = getEpisodes(movie)
  const oldEpisodeCount = getText(movie?.episodeCount)

  if (oldEpisodeCount) {
    return oldEpisodeCount
  }

  if (type === 'series') {
    return `${episodes.length || 1} Episode`
  }

  return 'Movie'
}

function getSeriesEpisodeCountText(movie) {
  const oldEpisodeCount = getText(movie?.episodeCount)

  if (oldEpisodeCount && getNormalizedText(oldEpisodeCount) !== 'movie') {
    return oldEpisodeCount
  }

  return `${getEpisodes(movie).length || 1} episode`
}

function getDurationText(movie, episode) {
  return (
    getText(episode?.duration) ||
    getText(movie?.duration) ||
    (getMovieType(movie) === 'movie' ? undefined : '')
  )
}

function getPreviewType(movie, watchProgress) {
  const oldPreviewType = getNormalizedText(movie?.previewType)

  if (watchProgress || oldPreviewType === 'continue') {
    return 'continue'
  }

  if (oldPreviewType === 'series' || getMovieType(movie) === 'series') {
    return 'series'
  }

  return 'movie'
}

function getProgressValue(movie, watchProgress) {
  return getNumber(
    watchProgress?.progress_percent ?? watchProgress?.progressPercent ?? movie?.progress,
    watchProgress ? 0 : 35,
  )
}

function getPreviewImage(movie, episode) {
  return (
    getText(movie?.preview_image) ||
    getText(movie?.previewImage) ||
    getText(episode?.thumbnail_url) ||
    getText(episode?.thumbnailUrl) ||
    getText(movie?.image)
  )
}

function getCardImage(movie, episode, isContinue) {
  if (isContinue) {
    return (
      getText(episode?.thumbnail_url) ||
      getText(episode?.thumbnailUrl) ||
      getPreviewImage(movie, episode)
    )
  }

  return getText(movie?.image) || getPreviewImage(movie, episode)
}

function getContentType(movie) {
  const type = getMovieType(movie)

  return type === 'series' ? 'series' : 'movie'
}

export function mapApiMovieToSeriesDetail(movie) {
  const episodes = getEpisodes(movie)
    .map((episode, index) => ({
      description:
        getText(episode?.description) ||
        getText(movie?.description) ||
        'Episode tersedia untuk ditonton.',
      duration: getText(episode?.duration),
      id: episode?.id || `${movie?.id || movie?.slug}-episode-${index + 1}`,
      number: getNumber(
        episode?.episode_number ?? episode?.episodeNumber,
        index + 1,
      ),
      thumbnailUrl:
        getText(episode?.thumbnail_url) ||
        getText(episode?.thumbnailUrl) ||
        getPreviewImage(movie),
      title: getText(episode?.title, `Episode ${index + 1}`),
    }))
    .filter((episode) => episode.title)
  const castNames = getPeopleNames(movie, ['cast'])
  const creatorNames = getPeopleNames(movie, ['creator', 'director'])
  const releaseYear = getNumber(getField(movie, 'release_year', 'releaseYear'))

  return {
    ageRating: getField(movie, 'age_rating', 'ageRating', '13+'),
    cast: castNames.join(', '),
    creators: creatorNames.join(', '),
    description: movie?.description || '',
    episodeCount: getSeriesEpisodeCountText(movie),
    episodes,
    genres: getGenres(movie?.genres),
    id: movie?.id || movie?.slug || movie?.title,
    image: getPreviewImage(movie) || getText(movie?.image),
    releaseYear: releaseYear ? String(releaseYear) : '',
    title: movie?.title || 'Untitled',
  }
}

export function mapApiMovieToMovieDetail(movie) {
  const episode = findEpisode(movie)
  const castNames = getPeopleNames(movie, ['cast'])
  const creatorNames = getPeopleNames(movie, ['director', 'creator'])
  const releaseYear = getNumber(getField(movie, 'release_year', 'releaseYear'))

  return {
    ageRating: getField(movie, 'age_rating', 'ageRating', '13+'),
    cast: castNames.join(', '),
    creators: creatorNames.join(', '),
    description: movie?.description || '',
    duration: getDurationText(movie, episode),
    genres: getGenres(movie?.genres),
    id: movie?.id || movie?.slug || movie?.title,
    image: getPreviewImage(movie, episode) || getText(movie?.image),
    releaseYear: releaseYear ? String(releaseYear) : '',
    title: movie?.title || 'Untitled',
  }
}

export function isActiveMovie(movie) {
  return getField(movie, 'is_active', 'isActive', true) !== false
}

export function isTopTenMovie(movie) {
  return getBoolean(
    movie?.isTopTen ?? getField(movie, 'is_top_ten', 'top', false),
  )
}

export function isTrendingMovie(movie) {
  return getBoolean(getField(movie, 'is_trending', 'isTrending', false))
}

export function isPremiumMovie(movie) {
  return (
    getBoolean(getField(movie, 'is_premium', 'isPremium', false)) ||
    getNormalizedText(movie?.badge) === 'premium'
  )
}

export function sortByRatingDesc(firstMovie, secondMovie) {
  return getNumber(secondMovie?.rating) - getNumber(firstMovie?.rating)
}

export function sortByPublishedDesc(firstMovie, secondMovie) {
  const firstTimestamp = getTimestamp(
    getField(firstMovie, 'published_at', 'publishedAt'),
  )
  const secondTimestamp = getTimestamp(
    getField(secondMovie, 'published_at', 'publishedAt'),
  )

  if (firstTimestamp !== secondTimestamp) {
    return secondTimestamp - firstTimestamp
  }

  const releaseYearDiff =
    getNumber(getField(secondMovie, 'release_year', 'releaseYear')) -
    getNumber(getField(firstMovie, 'release_year', 'releaseYear'))

  if (releaseYearDiff !== 0) {
    return releaseYearDiff
  }

  return getNumber(secondMovie?.id) - getNumber(firstMovie?.id)
}

function getProgressMovieId(watchProgress) {
  return (
    watchProgress?.movieId ??
    watchProgress?.series_film_id ??
    watchProgress?.seriesFilmId ??
    watchProgress?.movie_id
  )
}

export function getMoviesWithProgress(movies, watchProgressItems = []) {
  const activeMovies = movies.filter(isActiveMovie)

  return watchProgressItems
    .map((watchProgress) => {
      const movieId = getProgressMovieId(watchProgress)
      const movie = activeMovies.find(
        (activeMovie) => String(activeMovie.id) === String(movieId),
      )

      if (!movie) {
        return null
      }

      return {
        movie,
        watchProgress,
      }
    })
    .filter(Boolean)
    .sort(
      (firstItem, secondItem) =>
        getTimestamp(secondItem.watchProgress?.last_watched_at) -
        getTimestamp(firstItem.watchProgress?.last_watched_at),
    )
}

export function mapApiMovieToRecommendation(movie) {
  return {
    badge: movie?.badge || (isPremiumMovie(movie) ? 'Premium' : ''),
    id: movie?.id || movie?.slug || movie?.title,
    image: getText(movie?.image) || getPreviewImage(movie),
    title: movie?.title || 'Untitled',
    top: isTopTenMovie(movie),
  }
}

export function getSimilarMovieRecommendations(detail, movies, limit = 3) {
  const detailGenres = new Set((detail?.genres ?? []).map(getNormalizedText))

  return movies
    .filter(
      (movie) =>
        isActiveMovie(movie) &&
        getMovieType(movie) === 'movie' &&
        String(movie?.id) !== String(detail?.id),
    )
    .map((movie) => {
      const genreScore = getGenres(movie?.genres).filter((genre) =>
        detailGenres.has(getNormalizedText(genre)),
      ).length

      return {
        genreScore,
        movie,
      }
    })
    .sort((firstItem, secondItem) => {
      if (firstItem.genreScore !== secondItem.genreScore) {
        return secondItem.genreScore - firstItem.genreScore
      }

      return sortByRatingDesc(firstItem.movie, secondItem.movie)
    })
    .slice(0, limit)
    .map((item) => mapApiMovieToRecommendation(item.movie))
}

export function mapApiMovieToPublicMovie(movie, options = {}) {
  const watchProgress = options.watchProgress ?? movie?.watchProgress
  const episode = findEpisode(
    movie,
    watchProgress?.episode_movie_id ?? watchProgress?.episodeMovieId,
  )
  const previewType = getPreviewType(movie, watchProgress)
  const isContinue = previewType === 'continue'
  const contentType = getContentType(movie)
  const image = getCardImage(movie, episode, isContinue)
  const previewImage = getPreviewImage(movie, episode) || image
  const duration = getDurationText(movie, episode)
  const badge = movie?.badge || (isPremiumMovie(movie) ? 'Premium' : '')
  const episodeTitle = isContinue
    ? getText(episode?.title) || getText(movie?.episodeTitle)
    : undefined

  return {
    detail:
      contentType === 'series'
        ? mapApiMovieToSeriesDetail(movie)
        : mapApiMovieToMovieDetail(movie),
    id: movie?.id || movie?.slug || movie?.title,
    title: movie?.title || 'Untitled',
    image,
    rating: String(movie?.rating ?? '0'),
    badge,
    top: isTopTenMovie(movie),
    description: movie?.description || '',
    hoverPreview: {
      previewImage,
      ageRating: getField(movie, 'age_rating', 'ageRating', '13+'),
      contentType,
      episodeCount: getEpisodeCountText(movie),
      duration,
      episodeTitle,
      genres: getGenres(movie?.genres),
      progress: getProgressValue(movie, watchProgress),
      type: previewType,
    },
  }
}

function mapSectionItem(item) {
  if (item?.movie) {
    return mapApiMovieToPublicMovie(item.movie, {
      watchProgress: item.watchProgress,
    })
  }

  return mapApiMovieToPublicMovie(item)
}

export function buildMovieSections(sectionConfigs, context) {
  return sectionConfigs
    .map((sectionConfig) => {
      const items = sectionConfig.getItems(context)
      const limitedItems = sectionConfig.limit
        ? items.slice(0, sectionConfig.limit)
        : items

      return {
        key: sectionConfig.key,
        movies: limitedItems.map(mapSectionItem),
        title: sectionConfig.title,
        variant: sectionConfig.variant ?? 'poster',
      }
    })
    .filter((section) => section.movies.length > 0)
}

export function groupMoviesBySection(movies) {
  return buildMovieSections(
    [
      {
        getItems: ({ items }) => items,
        key: 'all',
        title: 'Movie',
      },
    ],
    { items: movies },
  )
}
