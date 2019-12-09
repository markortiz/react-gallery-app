const setPhotoList = ( store, payload={} ) => {
  const { currentPage, isSearch, perPage, orientation, query, response } = payload;
  const { photoList } = store.state;

  if (isSearch) {
    const { results, total, total_pages } = response;
    const newPhotoList = currentPage > 1 ? [ ...photoList, ...results ] : results;
    const hasNextPage = currentPage < total_pages;

    store.setState({
      currentPage,
      error: '',
      isSearch,
      hasNextPage,
      perPage,
      orientation,
      total,
      query,
      photoList: newPhotoList,
      totalPages: total_pages,
    });
  } else {
    store.setState({
      currentPage,
      error: '',
      isSearch,
      photoList: [ ...photoList, ...response ],
    });
  }
}

const setError = ( store, payload='' ) => {
  store.setState({
    error: payload,
    hasNextPage: false,
  })
}

export {
  setError,
  setPhotoList,
}