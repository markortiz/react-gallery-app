import React, { useEffect }  from 'react';
import './App.css';
import useGlobal from "./store";
import Album from './components/Album/Album';

function App() {
  const [globalState, globalActions] = useGlobal();
  const { photos } = globalState;

  useEffect(() => {
    globalActions.fetchPhotos();
  }, [globalActions]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <h4>Album</h4>
            </div>
          </div>
        </div>
      </header>
      <main role="main">
        <section className="App-highlight jumbotron text-center">
          <div className="container">
            <h1>Album example</h1>
            <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Keyword" aria-label="Search" aria-describedby="button-addon2" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
              </div>
            </div>
          </div>
        </section>

        <section className="Album">
          <Album images={ photos }/>
        </section>
      </main>
    </div>
  );
}

export default App;
