import React from 'react';
import './Gallery.css';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

function Gallery({ images, scrollPosition }) {
  return (
    <div className="Gallery row">
      {
        images && images.map(({ alt_description, urls }, index) => (
          <div key={index} className="Gallery-card col-md-4">
            <LazyLoadImage
              className="Gallery-image mb-4 shadow-lg"
              alt={alt_description}
              effect="blur"
              scrollPosition={scrollPosition}
              src={urls.small}/>
          </div>
        ))
      }
    </div>
  );
}

export default trackWindowScroll(Gallery);
