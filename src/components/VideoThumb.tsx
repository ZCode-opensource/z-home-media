import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {format, parseISO} from 'date-fns';

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
    if (date !== undefined) {
      const dateObj = parseISO(date);
      return format(dateObj, 'yyyy-MM-dd HH:mm');
    }

    return '';
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

  /**
   * @param {string} duration String with the duration in seconds
   * @returns {string} String with the formated duration
   */
  const displayDuration = (duration: string) => {
    const minutes = Math.floor(Number(duration) / 60);
    const seconds = Math.floor(Number(duration) - minutes * 60);

    const finalTime =
    strPadLeft(minutes, '0', 2) + ':' + strPadLeft(seconds, '0', 2);

    return finalTime;
  };

  /**
   *
   * @param {string} string String
   * @param {string} pad Pad
   * @param {number} length Length
   * @returns {string} String
   */
  function strPadLeft(string: number, pad: string, length: number): string {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  return (
    <>
      <div className='video-thumb'>
        <div className='img-container'>
          <img
            src={'http://localhost:8000/api/videos/thumb/' + video._id}
            onClick={() => gotoVideo(video._id)}
          />

          <div className='top-info'>
            <div>{video.width}x{video.height}</div>
            <div>{Math.floor(video.bitrate/1000)} Kbps</div>
          </div>

          <div className='bottom-info'>
            <div>{video.fps} fps</div>
            <div>{displayDuration(video.duration)}</div>
          </div>
        </div>

        <div>
          <div>{dateFormat(video.date)}</div>
          <div>{displayTags(video.tags)}</div>
        </div>
      </div>
    </>
  );
}
