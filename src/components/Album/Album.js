import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import { Gallery } from '../Gallery';

// Dumb component to show loading.
const Loading = () => <h4 className="col-12 text-center">Loading...</h4>

// Dumb component to be display if no images.
const NoImages = () => <p className="col-12 text-center">No images found.</p>


/**
 * Displays images list with infinite scroll.
 * @param {Object} props contains list of images, and indication if have next page.
 */
function Album({ hasNextPage, images, onNextPage }) {
  return (
    <div className="Album container">
      {
        images && images.length 
        ? (
            <InfiniteScroll
              className="Album-infinite-scroll row"
              dataLength={images.length}
              next={onNextPage}
              hasMore={hasNextPage}
              loader={<Loading />}>
                <Gallery images={images} />
            </InfiniteScroll>
          )
        : ( <NoImages /> )
      }
    </div>
  );
}

export { Album };
