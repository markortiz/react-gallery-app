const url = "https://api.unsplash.com";
const clientID = 'Client-ID 8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b';
const headers = { 
  'Authorization': clientID,
  'Accept-Version': 'v1',
  'Content-Type': 'application/json',
};
const fetchPhotos = (store, page = 1) => {
  fetch(`${url}/photos?page=${page}`, { headers }).then((response) => response.json())
    .then((response) => {
      // Let's check if response is an Array.
      if(response && response.constructor === Array) {
        const { photos } = store.state;

        store.setState({
          photos: [ ...photos, ...response ],
          photosPage: page,
        });
      } else {
        store.setState({
          error: "Something went wrong..."
        });
      }
    })
    .catch((error) => {
      alert('Something went wrong...');
    });
}

export {
  fetchPhotos,
}