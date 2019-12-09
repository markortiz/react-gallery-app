import React, { useEffect }  from 'react';
import './App.css';
import useGlobal from "./store";
import Album from './components/Album/Album';

function App() {
  const [globalState, globalActions] = useGlobal();
  const { error, photoList } = globalState;
  const pageSizes = [10, 20, 30, 40, 50];
  const availableOrientation = ['None', 'Landscape', 'Portrait', 'Squarish'];

  const formSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let orientation = data.get('orientation').toLowerCase();
    orientation = orientation === 'none' ? null : orientation;

    globalActions.searchPhotos({ 
      isSearch: true, 
      orientation,
      page: 1,
      perPage: data.get('perPage'),
      query: data.get('query'),
    });
  }
  const showAdvanceForm = (event) => {
    event.preventDefault();

    const form = document.querySelector('#Form-advance-search');
    const isShown = form.classList.contains('show');

    if (isShown) {
      form.classList.remove('show');
    } else {
      form.classList.add('show');
    }
    console.log(isShown);
  }

  useEffect(() => {
    globalActions.searchPhotos({ isSearch: false });
  }, [globalActions]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <h4 className="App-header--logo">.img</h4>
            </div>
          </div>
        </div>
      </header>
      <main role="main">
        <section className="App-highlight jumbotron text-center">
          <div className="container">
            <h1>Find your image.</h1>
            <p className="lead text-muted">Aliquam laoreet urna at lectus imperdiet, non euismod erat dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <form onSubmit={formSubmit}>
              {
                error && <div class="alert alert-danger text-left" role="alert">{error}</div>
              }
              <div className="input-group mb-1">
                <input type="text" 
                  className="form-control"
                  placeholder="Keyword"
                  aria-label="Search"
                  aria-describedby="search-field"
                  name="query"/>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit" id="search-field">
                    Search
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-right">
                  <button className="btn btn-link" onClick={showAdvanceForm}>Advance Search</button>
                </div>
              </div>
              <div className="collapse" id="Form-advance-search">
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="PageSize">Show</label>
                      </div>
                      <select className="custom-select" id="PageSize" name="perPage">
                        {
                          pageSizes.map((item, index) => <option key={`pageSize-${index}`} value={item}>{item}</option>)
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="Orientation">Orientation</label>
                      </div>
                      <select className="custom-select" id="Orientation" name="orientation">
                        {
                          availableOrientation.map((item, index) => <option key={`orientation-${index}`} value={item}>{item}</option>)
                        }
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="Album">
          <Album images={ photoList }/>
        </section>
      </main>
    </div>
  );
}

export default App;
