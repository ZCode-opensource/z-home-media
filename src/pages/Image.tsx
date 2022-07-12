import * as React from 'react';
import {useParams} from 'react-router-dom';

/**
 * Image page
 *
 * @returns {React.ReactElement} Image page react element
 */
export default function Image(): React.ReactElement {
  const params = useParams();
  const imageId = parseInt(params.imageId!, 10);

  return (
    <>
      <div className="page-content">
        <img src={'http://localhost:8000/api/image/' + imageId} />
      </div>
    </>
  );
}
