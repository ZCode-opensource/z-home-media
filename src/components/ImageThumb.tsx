import * as React from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * Image Thumbmail component
 *
 * @param {object[]} props React props object
 * @param {string} props.imageId UUID of the image
 * @returns {React.ReactElement} The thumbnail component
 */
export default function ImageThumb(props: {
  imageId: string;
}): React.ReactElement {
  const imageId = props.imageId;
  const navigate = useNavigate();

  /**
   *
   * @param {string} imageId UUID of the image
   */
  function gotoImage(imageId: string) {
    navigate('/image/' + imageId);
  }

  return (
    <>
      <img
        src={'http://localhost:8000/api/image/' + imageId}
        onClick={() => gotoImage(imageId)}
      />
    </>
  );
}
