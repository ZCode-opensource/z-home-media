import * as React from 'react';
import videojs, {VideoJsPlayer} from 'video.js';
import './Video.css';
import {useParams} from 'react-router-dom';
import styles from './Video.module.css';

/**
 * Video page for showing a single video information and player
 *
 * @returns {React.ReactElement} Video page react element
 */
export default function VideoPage(): any {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef<VideoJsPlayer|null>(null);

  const params = useParams();
  const videoId = params.videoId;

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const options = {
        controls: true,
        fill: true,
        playbackRates: [0.2, 0.5, 1, 2, 8, 16],
        sources: [
          {
            src: 'http://localhost:8000/api/video/' + videoId,
            type: 'video/mp4',
          },
        ],
      };

      playerRef.current = videojs(videoElement, options, () => {});
    }
  }, []);

  return (
    <>
      <div className="page-content">
        <div className={styles.videoContainer}>
          <div data-vjs-player>
            <video className="video-js" ref={videoRef} />
          </div>
        </div>
      </div>
    </>
  );
}
