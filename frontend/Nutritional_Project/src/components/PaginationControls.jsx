function getVisiblePages(totalPages, currentPage) {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5, 'ellipsis-right', totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis-left', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }

  return [
    1,
    'ellipsis-left',
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    'ellipsis-right',
    totalPages,
  ]
}

function PaginationControls({ currentPage, totalPages, onPrevious, onNext, onPageSelect }) {
  const visiblePages = getVisiblePages(totalPages, currentPage)

  return (
    <div className="pagination-row">
      <button type="button" onClick={onPrevious} disabled={currentPage === 1}>
        Previous
      </button>
      {visiblePages.map((pageToken) =>
        typeof pageToken === 'number' ? (
          <button
            type="button"
            key={pageToken}
            className={pageToken === currentPage ? 'page-button active' : 'page-button'}
            onClick={() => onPageSelect(pageToken)}
          >
            {pageToken}
          </button>
        ) : (
          <span key={pageToken} className="pagination-ellipsis">
            ...
          </span>
        ),
      )}
      <button type="button" onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}

export default PaginationControls
