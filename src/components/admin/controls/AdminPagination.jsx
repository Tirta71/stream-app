function getPageNumbers(totalPages) {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

function AdminPagination({
  currentPage,

  onPageChange,
  pageSize,

  totalItems,
  totalPages,
}) {
  if (totalItems === 0) {
    return null;
  }

  const pageNumbers = getPageNumbers(totalPages);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#181a1c] px-5 py-4 text-sm text-[#c1c2c4] shadow-[0_18px_48px_rgba(0,0,0,0.18)] max-[640px]:px-4 max-[420px]:justify-center max-[420px]:text-center">
      <p className="max-[420px]:w-full">
        <span className="font-bold text-white">{totalItems}</span> movie
        <span className="text-[#8f969a]"> ({pageSize} per halaman)</span>
      </p>

      <div className="flex flex-wrap items-center justify-end gap-2 max-[420px]:justify-center">
        <button
          className="inline-flex min-h-9 items-center rounded-full border border-white/15 px-3 text-xs font-bold text-white transition-[background,border-color] duration-150 hover:border-white/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          type="button"
        >
          Prev
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            className={[
              "grid h-9 w-9 place-items-center rounded-full border text-xs font-bold transition-[background,border-color] duration-150",
              pageNumber === currentPage
                ? "border-[#3254ff] bg-[#3254ff] text-white"
                : "border-white/15 text-white hover:border-white/50 hover:bg-white/10",
            ].join(" ")}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            type="button"
          >
            {pageNumber}
          </button>
        ))}

        <button
          className="inline-flex min-h-9 items-center rounded-full border border-white/15 px-3 text-xs font-bold text-white transition-[background,border-color] duration-150 hover:border-white/50 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminPagination;
