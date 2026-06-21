import { useState } from "react";
import {
  AdminCategorySelect,
  AdminFooter,
  AdminNavbar,
  AdminPageHeader,
  AdminPagination,
  MovieForm,
  MovieTable,
} from "../../components/admin/manageMovies.js";

const movieCategoryOptions = [
  { label: "Melanjutkan Tonton Film", value: "continueWatching" },
  { label: "Top Rating Film dan Series Hari ini", value: "topRatedMovies" },
  { label: "Film Trending", value: "trendingMovies" },
  { label: "Rilis Baru", value: "newReleases" },
];

const moviePageSize = 7;

function createMovieId(title) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${slug || "movie"}-${Date.now()}`;
}

function ManageMovies({ movieGroups, setMovieGroups }) {
  const [selectedGroup, setSelectedGroup] = useState("continueWatching");
  const [editingMovie, setEditingMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const selectedMovies = movieGroups[selectedGroup] ?? [];
  const selectedCategory = movieCategoryOptions.find(
    (option) => option.value === selectedGroup,
  );
  const totalPages = Math.max(
    1,
    Math.ceil(selectedMovies.length / moviePageSize),
  );
  const activePage = Math.min(currentPage, totalPages);
  const pageStartIndex = (activePage - 1) * moviePageSize;
  const paginatedMovies = selectedMovies.slice(
    pageStartIndex,
    pageStartIndex + moviePageSize,
  );
  const startItem = selectedMovies.length > 0 ? pageStartIndex + 1 : 0;
  const endItem = Math.min(
    pageStartIndex + moviePageSize,
    selectedMovies.length,
  );

  const handleCategoryChange = (nextGroup) => {
    setSelectedGroup(nextGroup);
    setEditingMovie(null);
    setCurrentPage(1);
  };

  const handleAddMovie = (movie) => {
    const newMovie = {
      ...movie,
      id: createMovieId(movie.title),
    };

    setMovieGroups((currentGroups) => ({
      ...currentGroups,
      [selectedGroup]: [...(currentGroups[selectedGroup] ?? []), newMovie],
    }));
    setCurrentPage(
      Math.max(1, Math.ceil((selectedMovies.length + 1) / moviePageSize)),
    );
  };

  const handleUpdateMovie = (updatedMovie) => {
    setMovieGroups((currentGroups) => ({
      ...currentGroups,
      [selectedGroup]: (currentGroups[selectedGroup] ?? []).map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie,
      ),
    }));
    setEditingMovie(null);
  };

  const handleSubmitMovie = (movie) => {
    if (editingMovie) {
      handleUpdateMovie(movie);
      return;
    }

    handleAddMovie(movie);
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
  };

  const handleDeleteMovie = (movieId) => {
    setMovieGroups((currentGroups) => ({
      ...currentGroups,
      [selectedGroup]: (currentGroups[selectedGroup] ?? []).filter(
        (movie) => movie.id !== movieId,
      ),
    }));
    setCurrentPage((currentValue) =>
      Math.min(
        currentValue,
        Math.max(1, Math.ceil((selectedMovies.length - 1) / moviePageSize)),
      ),
    );

    if (editingMovie?.id === movieId) {
      setEditingMovie(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingMovie(null);
  };

  return (
    <div className="min-h-svh min-w-[320px] bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <AdminNavbar />
      <main className="bg-[#181a1c] px-20 py-12 max-[900px]:px-5 max-[640px]:px-4 max-[640px]:py-6">
        <AdminPageHeader title="Manage Movies" />

        <section className="mt-10 grid items-stretch gap-6 max-[640px]:mt-6 max-[640px]:gap-4 lg:grid-cols-2">
          <div className="flex h-full flex-col gap-6 max-[640px]:gap-4">
            <div className="rounded-xl border border-white/10 bg-[#181a1c] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.22)] max-[640px]:p-4">
              <AdminCategorySelect
                onChange={handleCategoryChange}
                options={movieCategoryOptions}
                selectedGroup={selectedGroup}
              />
              <div className="mt-5 rounded-lg bg-white/[0.04] p-4 max-[640px]:mt-4 max-[640px]:p-3">
                <p className="text-sm text-[#c1c2c4]">Kategori aktif</p>
                <p className="mt-1 text-xl font-bold text-white max-[640px]:text-base">
                  {selectedCategory?.label}
                </p>
                <p className="mt-2 text-sm text-[#8f969a]">
                  {selectedMovies.length} movie tersedia
                </p>
              </div>
            </div>

            <MovieForm
              editingMovie={editingMovie}
              key={`${selectedGroup}-${editingMovie?.id ?? "new"}`}
              onCancel={handleCancelEdit}
              onSubmit={handleSubmitMovie}
            />
          </div>

          <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#181a1c] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.22)] max-[640px]:p-4">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-white max-[640px]:text-xl">Data Movie</h2>
                <p className="mt-1 text-sm text-[#c1c2c4]">
                  Get data dari kategori yang sedang dipilih, dibatasi agar card
                  table tetap rapi.
                </p>
              </div>
            </div>
            <MovieTable
              movies={paginatedMovies}
              onDelete={handleDeleteMovie}
              onEdit={handleEditMovie}
            />
            <AdminPagination
              currentPage={activePage}
              endItem={endItem}
              onPageChange={setCurrentPage}
              pageSize={moviePageSize}
              startItem={startItem}
              totalItems={selectedMovies.length}
              totalPages={totalPages}
            />
          </div>
        </section>
      </main>
      <AdminFooter />
    </div>
  );
}

export default ManageMovies;
