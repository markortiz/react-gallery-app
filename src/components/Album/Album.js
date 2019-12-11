import React from 'react';
import useGlobal from "../../store";
import InfiniteScroll from 'react-infinite-scroll-component'
import Gallery from '../Gallery/Gallery';

function Album({ images }) {
  const [globalState, globalActions] = useGlobal();
  const { currentPage, hasNextPage } = globalState;
  
  const fetchImages = () => {
    const nextPage = currentPage + 1;

    globalActions.searchPhotos({ ...globalState, ...{ page:nextPage } });
  }


  return (
    <div className="Album container">
        <InfiniteScroll
          className="row"
          dataLength={images.length}
          next={fetchImages}
          hasMore={hasNextPage}
          loader={<h4 className="col-12 text-center">Loading...</h4>}>
          <Gallery images={images} />
          
        </InfiniteScroll>
    </div>
  );
}

export default Album;
