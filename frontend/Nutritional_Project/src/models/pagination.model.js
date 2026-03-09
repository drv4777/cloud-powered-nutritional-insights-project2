/**
 * Model for filter + pagination request state.
 */
export const filterPaginationModel = {
  searchDietType: '',
  selectedDietType: 'all',
  currentPage: 1,
  pageSize: 10,
}

/**
 * Model for paged API response metadata.
 */
export const pageMetaModel = {
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
}
