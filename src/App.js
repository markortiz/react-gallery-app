import React, { useEffect }  from 'react';
import './App.css';
import useGlobal from "./store";
import Album from './components/Album/Album';
import SearchForm from './components/SearchForm/SearchForm';

function App() {
  const [globalState, globalActions] = useGlobal();
  const { photoList } = globalState;

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
            <SearchForm />
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
