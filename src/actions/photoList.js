import { setPhotoList, setError } from '../reducer';

const baseUrl = "https://api.unsplash.com";
const clientID = '';
const headers = { 
  'Authorization': clientID,
  'Accept-Version': 'v1',
  'Content-Type': 'application/json',
};

const constructUrlParams = (url, params) => {
  let strParams = '';
  // Convert params object to array to loop.
  Object.entries(params)
        .forEach(([key, value]) => {
          // If has a value add to strParams.
          if(value) {
             strParams += `&${key}=${value}`;
          }
        })
  const urlWithParams = url + `?${strParams.substr(1)}`;

  return urlWithParams;
}

const searchPhotos = (store, params = {}) => {
  const { isSearch, page, perPage, query, orientation } = params;
  const currentPage = page || 1;
  const urlParams = {
    orientation: orientation || '',
    page: currentPage,
    per_page: perPage || 10,
    query: query || '',
  };
  const url = isSearch ? constructUrlParams(`${baseUrl}/search/photos`, urlParams)
                       : constructUrlParams(`${baseUrl}/photos`, urlParams);

  fetch(url, { headers }).then((response) => response.json())
    .then((response) => {
      if(response && response.constructor === Array) {
        const payload = {
          isSearch,
          currentPage,
          perPage,
          orientation,
          query,
          response,
        };

        setPhotoList(store, payload);
      } else {
        setError(store, 'Something went wrong...');
      }
    })
    .catch((error) => {
      setError(store, 'Something went wrong...');
      console.error(error);
    });
}

export {
  searchPhotos,
}