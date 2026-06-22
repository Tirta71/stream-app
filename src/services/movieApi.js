import axios from 'axios'

const moviesApiUrl = import.meta.env.VITE_MOVIES_API_URL

function getMoviesApiUrl() {
  if (!moviesApiUrl) {
    throw new Error('VITE_MOVIES_API_URL belum diset di .env')
  }

  return moviesApiUrl.replace(/\/$/, '')
}

async function requestMovies(path = '', options = {}) {
  try {
    const response = await axios({
      url: `${getMoviesApiUrl()}${path}`,
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

export function getMovies() {
  return requestMovies()
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
