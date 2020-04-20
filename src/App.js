import React, { useEffect }  from 'react';
import './App.css';
import useGlobal from "./store";
import { Album } from './components/Album';
import { SearchForm } from './components/SearchForm';

function App() {
  const [globalState, globalActions] = useGlobal();
  const { currentPage, error, hasNextPage, photoList } = globalState;
  const fecthNextPage = () => {
    const nextPage = currentPage + 1;

    globalActions.searchPhotos({ ...globalState, ...{ page:nextPage } });
  }
  const searchPhotos = (payload) => {
    globalActions.searchPhotos(payload);
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
              <a className="App-header--link" href="https://devken.net/" title="Back to home">
                <h4 className="App-header--logo">Home</h4>
              </a>
            </div>
          </div>
        </div>
      </header>
      <main role="main">
        <section className="App-highlight jumbotron text-center">
          <div className="container">
            <h1>Find your image.</h1>
            <p className="lead text-muted">Aliquam laoreet urna at lectus imperdiet, non euismod erat dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <SearchForm error={error} onSubmit={searchPhotos} />
          </div>
        </section>

        <section className="Album">
          <Album
            hasNextPage={ hasNextPage }
            images={ photoList }
            onNextPage={ fecthNextPage }/>
        </section>
      </main>
    </div>
  );
}

export default App;
