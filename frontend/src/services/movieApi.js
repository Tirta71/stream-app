import { requestApi } from "./apiClient.js";

export function getMovies() {
  return requestApi(
    {
      method: "GET",
      url: "/movies?take=50",
    },
    "Gagal mengambil data movie",
  );
}

export function getMovie(id) {
  return requestApi(
    {
      method: "GET",
      url: `/movies/${id}`,
    },
    "Gagal mengambil detail movie",
  );
}

export function getWatchProgress() {
  return requestApi(
    {
      method: "GET",
      url: "/watch-progress",
    },
    "Gagal mengambil progress menonton",
  );
}

export function saveWatchProgress(progress) {
  return requestApi(
    {
      data: progress,
      method: "POST",
      url: "/watch-progress",
    },
    "Gagal menyimpan progress menonton",
  );
}

export function createMovie(movie) {
  return requestApi(
    {
      data: movie,
      method: "POST",
      url: "/movies",
    },
    "Gagal menambahkan movie",
  );
}

export function updateMovie(id, movie) {
  return requestApi(
    {
      data: movie,
      method: "PATCH",
      url: `/movies/${id}`,
    },
    "Gagal mengupdate movie",
  );
}

export function deleteMovie(id) {
  return requestApi(
    {
      method: "DELETE",
      url: `/movies/${id}`,
    },
    "Gagal menghapus movie",
  );
}
