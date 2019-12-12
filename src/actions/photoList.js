import { setPhotoList, setError } from '../reducer';

const baseUrl = "https://api.unsplash.com";
const API_KEY = process.env.REACT_APP_API_KEY;
const clientID = `Client-ID ${API_KEY}` || null;
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
      if(response && (response.constructor === Array || response.constructor === Object)) {
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
        console.error('ERROR: Got invalid response.', response);
        setError(store, 'Something went wrong...');
      }
    })
    .catch((error) => {
      setError(store, 'Something went wrong...');
      console.error('ERROR: ', error);
    });
}

export {
  searchPhotos,
}