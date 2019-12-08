import React from 'react';
import './Album.css';
import useGlobal from "../../store";
import InfiniteScroll from 'react-infinite-scroll-component'
import Gallery from '../Gallery/Gallery';



function Album({ images }) {
  const [globalState, globalActions] = useGlobal();
  const { photosPage } = globalState;

  const fetchImages = () => {
    const nextPage = photosPage + 1;

    globalActions.fetchPhotos(nextPage);
  }
  return (
    <div className="Album container">
        <InfiniteScroll
          className="row"
          dataLength={images.length}
          next={fetchImages}
          hasMore={true}
          loader={<h4 className="col-12 text-center">Loading...</h4>}>
          <Gallery images={images} />
        </InfiniteScroll>
    </div>
  );
}

export default Album;
