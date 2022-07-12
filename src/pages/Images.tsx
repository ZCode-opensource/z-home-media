import * as React from 'react';
import ImageThumb from '../components/ImageThumb';

/**
 * Images page
 *
 * @returns {React.ReactElement} Images page react element
 */
export default function Images(): React.ReactElement {
  return (
    <>
      <div className="page-content">
        <ImageThumb imageId={'1'} />
      </div>
    </>
  );
}
