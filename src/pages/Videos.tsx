import * as React from 'react';
import {useEffect, useState} from 'react';
import VideoThumb from '../components/VideoThumb';
import api from '../helpers/api';

const thumbsContainer = {
  display: 'flex',
  flexWrap: 'wrap' as 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  gap: '5px 10px',
};

/**
 * @returns {React.ReactElement} Videos page react element
 */
export default function Videos(): React.ReactElement {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  /**
   *
   */
  const loadVideos = () => {
    api('get', 'videos').then((result) => {
      if (result.items) {
        setItems(result.items);
      }
    });
  };

  return (
    <>
      <div className="page-content">
        <div style={thumbsContainer}>
          {items.map((item, index) => (
            <VideoThumb key={index} video={item} />
          ))}
        </div>
      </div>
    </>
  );
}
