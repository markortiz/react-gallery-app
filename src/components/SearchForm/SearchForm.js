import React from 'react';
import useGlobal from "../../store";

function SearchForm() {
  const [globalState, globalActions] = useGlobal();
  const { error } = globalState;
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
  }


  return (
    <form className="Search" onSubmit={formSubmit}>
      {
        error && <div className="alert alert-danger text-left" role="alert">{error}</div>
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
  );
}

export default SearchForm;
