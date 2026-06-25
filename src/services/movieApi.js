import axios from 'axios'

const moviesApiUrl = import.meta.env.VITE_MOVIES_API_URL
const watchProgressApiUrl = import.meta.env.VITE_WATCH_PROGRESS_API_URL
const watchProgressResource = 'watch_progress'

function getMoviesApiUrl() {
  if (!moviesApiUrl) {
    throw new Error('VITE_MOVIES_API_URL belum diset di .env')
  }

  return moviesApiUrl.replace(/\/$/, '')
}

function getWatchProgressApiUrl(movieId) {
  if (watchProgressApiUrl) {
    return watchProgressApiUrl.replace('{movieId}', movieId).replace(/\/$/, '')
  }

  return `${getMoviesApiUrl()}/${movieId}/${watchProgressResource}`
}

async function requestData(baseUrl, path = '', options = {}) {
  try {
    const response = await axios({
      url: `${baseUrl}${path}`,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
      ...options,
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || `Request data gagal (${error.response?.status ?? 'network'})`, {
        cause: error,
      })
    }

    throw error
  }
}

async function requestMovies(path = '', options = {}) {
  return requestData(getMoviesApiUrl(), path, options)
}

async function requestWatchProgress(movieId, path = '', options = {}) {
  return requestData(getWatchProgressApiUrl(movieId), path, options)
}

export function getMovies() {
  return requestMovies()
}

export async function getWatchProgress(movies = []) {
  if (!Array.isArray(movies) || movies.length === 0) {
    return []
  }

  const progressResponses = await Promise.allSettled(
    movies.map((movie) => requestWatchProgress(movie.id)),
  )

  return progressResponses.flatMap((response) =>
    response.status === 'fulfilled' && Array.isArray(response.value)
      ? response.value
      : [],
  )
}

export function createMovie(movie) {
  return requestMovies('', {
    data: movie,
    method: 'POST',
  })
}

export function updateMovie(id, movie) {
  return requestMovies(`/${id}`, {
    data: movie,
    method: 'PUT',
  })
}

export function deleteMovie(id) {
  return requestMovies(`/${id}`, {
    method: 'DELETE',
  })
}
