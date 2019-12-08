import React from 'react';
import './Thumbnail.css';

function Thumbnail() {
  return (
    <div className="Thumbnail">
      <div className="card mb-4 shadow-sm">
        <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c"></rect>
          <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
        </svg>
        <div className="card-body">
          <p className="card-text">Add description here...</p>
          <div className="d-flex justify-content-between align-items-center">
            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thumbnail;
