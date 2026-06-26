import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createMovie as createMovieRequest,
  deleteMovie as deleteMovieRequest,
  getMovies,
  getWatchProgress,
  updateMovie as updateMovieRequest,
} from "../../services/movieApi.js";

const initialState = {
  items: [],
  watchProgress: [],
  status: "idle",
  error: null,
};

function getRejectedMessage(error, fallbackMessage) {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const movies = await getMovies();
      const movieItems = Array.isArray(movies) ? movies : [];
      const watchProgress = await getWatchProgress(movieItems).catch(() => []);

      return {
        items: movieItems,
        watchProgress: Array.isArray(watchProgress) ? watchProgress : [],
      };
    } catch (error) {
      return rejectWithValue(
        getRejectedMessage(error, "Gagal mengambil data movie"),
      );
    }
  },
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movie, { rejectWithValue }) => {
    try {
      return await createMovieRequest(movie);
    } catch (error) {
      return rejectWithValue(
        getRejectedMessage(error, "Gagal menambahkan movie"),
      );
    }
  },
);

export const editMovie = createAsyncThunk(
  "movies/editMovie",
  async ({ id, movie }, { rejectWithValue }) => {
    try {
      return await updateMovieRequest(id, movie);
    } catch (error) {
      return rejectWithValue(getRejectedMessage(error, "Gagal mengupdate movie"));
    }
  },
);

export const removeMovie = createAsyncThunk(
  "movies/removeMovie",
  async (movieId, { rejectWithValue }) => {
    try {
      await deleteMovieRequest(movieId);

      return movieId;
    } catch (error) {
      return rejectWithValue(getRejectedMessage(error, "Gagal menghapus movie"));
    }
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.watchProgress = action.payload.watchProgress;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.items = [];
        state.watchProgress = [];
      })
      .addCase(addMovie.pending, (state) => {
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(editMovie.pending, (state) => {
        state.error = null;
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        const movieIndex = state.items.findIndex(
          (movie) => movie.id === action.payload.id,
        );

        if (movieIndex >= 0) {
          state.items[movieIndex] = action.payload;
        }
      })
      .addCase(editMovie.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(removeMovie.pending, (state) => {
        state.error = null;
      })
      .addCase(removeMovie.fulfilled, (state, action) => {
        state.items = state.items.filter((movie) => movie.id !== action.payload);
      })
      .addCase(removeMovie.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const selectMovies = (state) => state.movies.items;
export const selectMoviesError = (state) => state.movies.error;
export const selectMoviesStatus = (state) => state.movies.status;
export const selectWatchProgress = (state) => state.movies.watchProgress;

export default moviesSlice.reducer;
