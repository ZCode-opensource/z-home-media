import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {format, parseISO} from 'date-fns';

const thumbnail = {
  width: '320px',
  height: '180px',
};

/**
 * Video thumbnaail component
 *
 * @param {object[]} props React props object
 * @param {object} props.video Video object
 * @returns {React.ReactElement} Custom video component
 */
export default function VideoThumb(props: {video: any}): React.ReactElement {
  const video = props.video;
  const navigate = useNavigate();

  /**
   *
   * @param {string} videoId UUID of the video
   */
  const gotoVideo = (videoId: string) => {
    navigate('/video/' + videoId);
  };

  /**
   *
   * @param {string} date Date of the video from the database
   * @returns {string} Date formated
   */
  const dateFormat = (date: string): string => {
    const dateObj = parseISO(date);
    return format(dateObj, 'yyyy-MM-dd HH:mm');
  };

  /**
   *
   * @param {string[]} tags Object containing an array with the video tags
   * @returns {React.ReactElement} React component with the tags
   */
  const displayTags = (tags: string[]): React.ReactElement => {
    let render = <></>;

    if (tags !== undefined) {
      render = (
        <>
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </>
      );
    }

    return render;
  };

  return (
    <>
      <div>
        <img
          style={thumbnail}
          src={'http://localhost:8000/api/videos/thumb/' + video._id}
          onClick={() => gotoVideo(video._id)}
        />
        <div>{dateFormat(video.date)}</div>
        <div>{displayTags(video.tags)}</div>
      </div>
    </>
  );
}
