import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App.js', () => {
  let headers, mockSuccessResponse;

  beforeEach(() => {
    headers = { 
      'Authorization': '',
      'Accept-Version': 'v1',
      'Content-Type': 'application/json',
    };
    mockSuccessResponse = {
      "result": true,
      "response": [{
          "id": "e4ae2a63-44d3-4bbb-8168-c6741932a08a",
          "name": "Work",
          "fullName": "Berlin, Germany",
          "location": {
              "lat": 52.52000659999999,
              "lng": 13.404954
          }
      }]
    };
  });

  // afterEach(() => {
  //   global.fetch.mockClear();
  // });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('fetches photos from server on load', (done) => {
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
                        
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://api.unsplash.com/photos?page=1&per_page=10', { headers });

    process.nextTick(() => {
      global.fetch.mockClear();
      done();
    });
  });
});
