import * as React from 'react';
import VideoThumb from '../components/VideoThumb';
import api from '../helpers/api';
import ArrowForwardSVG from '../../assets/svgr/arrow_forward.svg';
import ArrowBackSVG from '../../assets/svgr/arrow_back.svg';

/**
 * @returns {React.ReactElement} SVG
 */
const ArrowForward: React.FC = (): React.ReactElement => (
  <ArrowForwardSVG className='page-arrow' />
);

/**
 * @returns {React.ReactElement} SVG
 */
const ArrowBack: React.FC = (): React.ReactElement => (
  <ArrowBackSVG className='page-arrow' />
);


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
  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    loadVideos();
  }, [page]);

  /**
   *
   */
  const loadVideos = () => {
    api('get', 'videos', {page: page}).then((result) => {
      if (result.response) {
        setItems(result.response[0].items);
        setTotal(result.response[0].total[0].count);
      }
    });
  };

  /**
   *  Handle next page click
   */
  const handleNext = () => {
    setPage(page + 1);
  };

  /**
   *  Handle next page click
   */
  const handleBack = () => {
    setPage(page - 1);
  };

  return (
    <>
      <div className="page-content">
        <div style={thumbsContainer}>
          {items.map((item, index) => (
            <VideoThumb key={index} video={item} />
          ))}
        </div>
        <div className='pagination'>
          <div onClick={handleBack}><ArrowBack/></div>
          <div>{page} of {Math.ceil(total/12)}</div>
          <div onClick={handleNext}><ArrowForward/></div>
        </div>
      </div>
    </>
  );
}
