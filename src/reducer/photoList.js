const setPhotoList = (store, payload = {}) => {
  const { currentPage, isSearch, perPage, orientation, query, response } = payload;
  const { photoList } = store.state;

  if (isSearch) {
    const { results, total, total_pages } = response;
    const newPhotoList = currentPage > 1 ? [ ...photoList, ...results ] : results;

    store.setState({
      currentPage,
      isSearch,
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
      isSearch,
      photoList: [ ...photoList, ...response ],
    });
  }
}

export {
  setPhotoList,
}