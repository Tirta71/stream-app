import {
  AdminPagination,
  MovieForm,
  MovieTable,
} from "../../components/admin/manageMovies";
import AdminFooter from "../../components/admin/layout/AdminFooter.jsx";
import AdminNavbar from "../../components/admin/layout/AdminNavbar.jsx";
import AdminPageHeader from "../../components/admin/layout/AdminPageHeader.jsx";
import useManageMovies from "../../hooks/admin/useManageMovies.js";

const pageFilterOptions = [
  { label: "Home", value: "home" },
  { label: "Series", value: "series" },
  { label: "Movie", value: "movie" },
];

const sectionFilterOptions = {
  home: [
    { label: "Semua section", value: "all" },
    { label: "Melanjutkan Tonton", value: "continueWatching" },
    { label: "Premium", value: "premiumContents" },
    { label: "Top Rating", value: "topRatedMovies" },
    { label: "Trending", value: "trendingMovies" },
    { label: "Rilis Baru", value: "newReleases" },
  ],
  movie: [
    { label: "Semua section", value: "all" },
    { label: "Melanjutkan Tonton Film", value: "continueWatching" },
    { label: "Film Persembahan Chill", value: "premiumContents" },
    { label: "Top Rating Film", value: "topRatedMovies" },
    { label: "Film Trending", value: "trendingMovies" },
    { label: "Rilis Baru", value: "newReleases" },
  ],
  series: [
    { label: "Semua section", value: "all" },
    { label: "Melanjutkan Tonton Series", value: "continueWatching" },
    { label: "Series Persembahan Chill", value: "premiumContents" },
    { label: "Top Rating Series", value: "topRatedMovies" },
    { label: "Series Trending", value: "trendingMovies" },
    { label: "Rilis Baru", value: "newReleases" },
  ],
};

const filterSelectClassName =
  "min-h-10 rounded-lg border border-white/15 bg-[#202326] px-3 text-sm font-semibold text-white outline-none transition-[border-color,box-shadow] duration-150 focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]";

function ManageMovies() {
  const {
    activePage,
    editingMovie,
    errorMessage,
    handleCancelEdit,
    handleDeleteMovie,
    handleEditMovie,
    handlePageFilterChange,
    handleSectionFilterChange,
    handleSubmitMovie,
    isLoading,
    isSubmitting,
    moviePageSize,
    pageFilter,
    paginatedMovies,
    sectionFilter,
    setCurrentPage,
    statusMessage,
    totalPages,
    totalVisibleMovies,
  } = useManageMovies();

  return (
    <div className="min-h-svh min-w-[320px] bg-[#181a1c] text-[rgba(255,255,255,0.96)]">
      <AdminNavbar />
      <main className="bg-[#181a1c] px-20 py-12 max-[900px]:px-5 max-[640px]:px-4 max-[640px]:py-6">
        <AdminPageHeader
          description="Kelola data movie dan series dari backend."
          title="Manage Movies"
        />

        <section className="mt-10 grid items-stretch gap-6 max-[640px]:mt-6 max-[640px]:gap-4 lg:grid-cols-2">
          <div className="flex h-full flex-col gap-6 max-[640px]:gap-4">
            <MovieForm
              editingMovie={editingMovie}
              isSubmitting={isSubmitting}
              key={editingMovie?.id ?? "new"}
              onCancel={handleCancelEdit}
              onSubmit={handleSubmitMovie}
            />
          </div>

          <div className="flex h-full flex-col rounded-xl border border-white/10 bg-[#181a1c] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.22)] max-[640px]:p-4">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-white max-[640px]:text-xl">
                  Data Movie
                </h2>
                <p className="mt-1 text-sm text-[#c1c2c4]">
                  Kelola data berdasarkan halaman dan filter tampilan.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-[640px]:w-full">
                <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8f969a]">
                  Page
                  <select
                    className={filterSelectClassName}
                    onChange={(event) =>
                      handlePageFilterChange(event.target.value)
                    }
                    value={pageFilter}
                  >
                    {pageFilterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8f969a]">
                  Section
                  <select
                    className={filterSelectClassName}
                    onChange={(event) =>
                      handleSectionFilterChange(event.target.value)
                    }
                    value={sectionFilter}
                  >
                    {sectionFilterOptions[pageFilter].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {errorMessage ? (
              <div className="mb-4 rounded-xl border border-[#ff7775]/30 bg-[#b71f1d]/15 p-4 text-sm font-semibold text-[#ffb1af]">
                {errorMessage}
              </div>
            ) : null}

            {statusMessage ? (
              <div className="mb-4 rounded-xl border border-[#3254ff]/30 bg-[#3254ff]/15 p-4 text-sm font-semibold text-[#c8d1ff]">
                {statusMessage}
              </div>
            ) : null}

            {isLoading ? (
              <div className="rounded-xl border border-white/10 bg-[#181a1c] p-8 text-center text-[#c1c2c4]">
                Memuat data movie...
              </div>
            ) : (
              <>
                <MovieTable
                  isBusy={isSubmitting}
                  movies={paginatedMovies}
                  onDelete={handleDeleteMovie}
                  onEdit={handleEditMovie}
                />
                <AdminPagination
                  currentPage={activePage}
                  onPageChange={setCurrentPage}
                  pageSize={moviePageSize}
                  totalItems={totalVisibleMovies}
                  totalPages={totalPages}
                />
              </>
            )}
          </div>
        </section>
      </main>
      <AdminFooter />
    </div>
  );
}

export default ManageMovies;
