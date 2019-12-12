import { 
  searchPhotos,
} from './photoList';

describe('Actions/photoList.js', () => {
  describe('searchPhotos', () => {
    let headers, store, mockSuccessResponse;

    beforeEach(() => {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const clientID = `Client-ID ${API_KEY}` || null;

      headers = { 
        'Authorization': clientID,
        'Accept-Version': 'v1',
        'Content-Type': 'application/json',
      };
      store = {
        state: {
          photoList: [],
        },
        setState: jest.fn().mockReturnThis(),
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
          }
        }
      ];
    });

    afterEach(() => {
      global.fetch.mockClear();
    });
    
    it('fetch photos from API', async (done) => {
      // Setting up mocks.
      const mockPromise = Promise.resolve({
        json: () => mockSuccessResponse,
      });

      // Spying and mock `fetch`
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await searchPhotos(store);

      // Check if fetch was called.
      expect(global.fetch).toHaveBeenCalledTimes(1);
      // Check if url and headers are correct.
      expect(global.fetch).toHaveBeenCalledWith('https://api.unsplash.com/photos?page=1&per_page=10', { headers });

      process.nextTick(() => {
        done();
      });
    });

    it('catch if server returns invalid response', async (done) => {
      // Setting up mocks.
      const mockFailedResponse = 'This is unexpected response.';
      const mockPromise = Promise.resolve({
        json: () => mockFailedResponse
      });

      // Spying and mock `fetch`
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await searchPhotos(store);

      const fetch = global.fetch.mock.calls[0];
      expect(fetch[0]).toBe('https://api.unsplash.com/photos?page=1&per_page=10');

      process.nextTick(() => {
        expect(store.setState).toHaveBeenCalledWith({
          error: `Something went wrong...`,
          hasNextPage: false,
        });
        done();
      });
    });

    it('catch failed API calls', async (done) => {
      // Setting up mocks.
      const mockFailedResponse = 'Invalid request.';
      const mockPromise = Promise.reject(mockFailedResponse); 
      
      // Spying and mock `fetch`
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await searchPhotos(store);

      const fetch = global.fetch.mock.calls[0];
      expect(fetch[0]).toBe('https://api.unsplash.com/photos?page=1&per_page=10');

      process.nextTick(() => {
        expect(store.setState).toHaveBeenCalledWith({
          error: `Something went wrong...`,
          hasNextPage: false,
        });
        done();
      });
    });

    it('can accept search parameters', async (done) => {
      // Setting up mocks.
      const mockSuccessSearchResponse = {
        results: [ ...mockSuccessResponse ],
        total: 1230,
        total_pages: 123,
      }
      const mockParams = { 
        isSearch: true,
        page: 2,
        perPage: 20,
        query: 'animals',
        orientation: 'landscape',
      };
      const mockPromise = Promise.resolve({
        json: () => mockSuccessSearchResponse
      });

      // Spying and mock `fetch`
      jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

      await searchPhotos(store, mockParams);

      const fetch = global.fetch.mock.calls[0];
      expect(fetch[0]).toBe('https://api.unsplash.com/search/photos?orientation=landscape&page=2&per_page=20&query=animals');

      process.nextTick(() => {
        // Check if response was set to state.
        expect(store.setState).toHaveBeenCalledWith({
          "currentPage": mockParams.page,
          "error": '',
          "hasNextPage": true,
          "isSearch": true,
          "perPage": mockParams.perPage,
          "photoList": mockSuccessSearchResponse.results,
          "orientation": mockParams.orientation,
          "query": mockParams.query,
          "total": mockSuccessSearchResponse.total,
          "totalPages": mockSuccessSearchResponse.total_pages
        });
        done();
      });
    });
  });
});
