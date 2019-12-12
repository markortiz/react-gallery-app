import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App.js', () => {
  let headers, mockSuccessResponse;

  beforeEach(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const clientID = `Client-ID ${API_KEY}` || null;

    headers = { 
      'Authorization': clientID,
      'Accept-Version': 'v1',
      'Content-Type': 'application/json',
    };
    mockSuccessResponse = [
      { 
        "id":"jQ6HxTqSgfU",
        "description":null,
        "alt_description":"six assorted Honest cosmetic packs",
        "urls":{ 
          "raw":"https://images.unsplash.com/photo-1562886889-0d7ec2bc333e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "full":"https://images.unsplash.com/photo-1562886889-0d7ec2bc333e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "regular":"https://images.unsplash.com/photo-1562886889-0d7ec2bc333e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "small":"https://images.unsplash.com/photo-1562886889-0d7ec2bc333e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "thumb":"https://images.unsplash.com/photo-1562886889-0d7ec2bc333e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ"
        }
      },
      { 
        "id":"HqJlUs3-aQw",
        "description":null,
        "alt_description":null,
        "urls":{ 
          "raw":"https://images.unsplash.com/photo-1576084428642-829df2521a89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "full":"https://images.unsplash.com/photo-1576084428642-829df2521a89?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "regular":"https://images.unsplash.com/photo-1576084428642-829df2521a89?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "small":"https://images.unsplash.com/photo-1576084428642-829df2521a89?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "thumb":"https://images.unsplash.com/photo-1576084428642-829df2521a89?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ"
        }
      },
      { 
        "id":"TKXBzFMw6cc",
        "description":null,
        "alt_description":null,
        "urls":{ 
          "raw":"https://images.unsplash.com/photo-1576044648797-500ea694f72e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "full":"https://images.unsplash.com/photo-1576044648797-500ea694f72e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "regular":"https://images.unsplash.com/photo-1576044648797-500ea694f72e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "small":"https://images.unsplash.com/photo-1576044648797-500ea694f72e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ",
          "thumb":"https://images.unsplash.com/photo-1576044648797-500ea694f72e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ"
        },
        "links":{ 
          "self":"https://api.unsplash.com/photos/TKXBzFMw6cc",
          "html":"https://unsplash.com/photos/TKXBzFMw6cc",
          "download":"https://unsplash.com/photos/TKXBzFMw6cc/download",
          "download_location":"https://api.unsplash.com/photos/TKXBzFMw6cc/download"
        }
      }
    ]
    });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('fetches photos from server on load', (done) => {
    const mockFetchPromise = Promise.resolve({
      json: () => mockSuccessResponse,
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
