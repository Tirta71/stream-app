import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api/v1'
const moviesApiUrl = import.meta.env.VITE_MOVIES_API_URL
const watchProgressApiUrl = import.meta.env.VITE_WATCH_PROGRESS_API_URL

function getMoviesApiUrl() {
  const baseUrl = moviesApiUrl || `${apiBaseUrl.replace(/\/$/, '')}/movies`

  return baseUrl.replace(/\/$/, '')
}

function getWatchProgressApiUrl() {
  if (watchProgressApiUrl) {
    return watchProgressApiUrl.replace(/\/$/, '')
  }

  return `${apiBaseUrl.replace(/\/$/, '')}/watch-progress`
}

function getResponseData(responseData) {
  return responseData?.data ?? responseData
}

function getErrorMessage(error) {
  const errorData = error.response?.data

  if (typeof errorData === 'string') {
    return errorData
  }

  return errorData?.message || `Request data gagal (${error.response?.status ?? 'network'})`
}

async function requestData(baseUrl, path = '', options = {}) {
  try {
    const response = await axios({
      url: `${baseUrl}${path}`,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
      withCredentials: true,
      ...options,
    })

    return getResponseData(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(getErrorMessage(error), { cause: error })
    }

    throw error
  }
}

async function requestMovies(path = '', options = {}) {
  return requestData(getMoviesApiUrl(), path, options)
}

export function getMovies() {
  return requestMovies('?take=50')
}

export async function getWatchProgress() {
  return requestData(getWatchProgressApiUrl())
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
