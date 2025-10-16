const Pagination = ({ page, setPage, totalPages, totalUsers, itemsPerPage }) => {
  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(page * itemsPerPage, totalUsers);

  return (
    <div className="grid grid-cols-3 p-4 border-t bg-base-200">
      {/* Left side - Results info */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Result {startIndex}-{endIndex} of {totalUsers}</span>
      </div>

      {/* Right side - Page navigation */}
      <div className="flex items-center gap-2">
        <button
          className="btn btn-sm btn-ghost text-base-content gap-1"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        {/* Page numbers */}
        <div className="flex gap-1">
          {/* Always show first page */}
          <button
            className={`btn btn-sm ${page === 1 ? "btn-active bg-base-200 border-2 border-gray-800" : "btn-ghost bg-base-200"}`}
            onClick={() => setPage(1)}
          >
            1
          </button>

          {/* Show pages around current page */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((pageNum) => {
              return pageNum !== 1 && pageNum !== totalPages && pageNum >= page - 1 && pageNum <= page + 1;
            })
            .map((pageNum) => (
              <button
                key={pageNum}
                className={`btn btn-sm ${page === pageNum ? "btn-active bg-base-200 border-2 border-gray-800" : "btn-ghost bg-base-200"}`}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}

          {/* Show dots if current page is far from end */}
          {page < totalPages - 2 && (
            <span className="btn btn-sm btn-ghost bg-base-200 pointer-events-none">...</span>
          )}

          {/* Always show last page if there's more than 1 page */}
          {totalPages > 1 && (
            <button
              className={`btn btn-sm ${page === totalPages ? "btn-active bg-base-200 border-2 border-gray-800" : "btn-ghost bg-base-200"}`}
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>
          )}
        </div>

        <button
          className="btn btn-sm btn-ghost text-base-content gap-1"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
