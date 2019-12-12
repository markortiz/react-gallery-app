import React, { createRef, forwardRef } from 'react';
import './Gallery.css';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

/**
 * Dumb component that contains `LazyLoadImage`.
 */
const LazyImage = forwardRef((props, ref) => (
  <div className="Gallery-card col-md-4">
    <LazyLoadImage { ...props } ref={ref} />
  </div>
))

/**
 * This will create a list of lazy loaded images.
 * @param {Object} props contains list of `images` and `scrollPosition`
 * for better performance of `LazyLoadImage`.
 */
function Gallery({ images, scrollPosition }) {
  return (
    <div className="Gallery row">
      {
        images && images.map(({ alt_description, urls }, index) => {
          const imageRef = createRef();
          return (
            <LazyImage 
              key={`LazyImage-${index}`}
              ref={imageRef}
              className="Gallery-image mb-4 shadow-lg"
              effect="blur"
              alt={alt_description}
              scrollPosition={scrollPosition}
              src={urls.small} />
          )
        })
      }
    </div>
  );
}

const TrackedGallery = trackWindowScroll(Gallery)

export { TrackedGallery as Gallery };
