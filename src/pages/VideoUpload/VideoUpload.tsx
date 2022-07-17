import * as React from 'react';
import axios from 'axios';
import styles from './VideoUpload.module.css';
import {formatBytes} from '../../helpers/utils';
import CloudUploadSVG from '../../../assets/svgr/cloud_upload.svg';

/**
 * @returns {React.ReactElement} SVG
 */
const CloudUpload: React.FC = (): React.ReactElement => (
  <CloudUploadSVG className={styles.cloudIcon} />
);

/**
 * Home page
 *
 * @returns {React.ReactElement} Home react element
 */
export default function VideoUpload(): React.ReactElement {
  const [file, setFile] = React.useState<File>();
  const [perc, setPerc] = React.useState(0);
  const [dropCls, setDropCls] = React.useState({
    border: '1px solid rgba(0, 0, 0, 0.25)',
  });
  const [showBar, setShowBar] = React.useState(false);
  const [showZone, setShowZone] = React.useState(true);
  const [showTip, setShowTip] = React.useState(true);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('Upload');
  const [uploadDisabled, setUploadDisabled] = React.useState(false);

  /**
   *
   * @param {any} event Drag event
   */
  const dragOverHandler = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setDropCls(
      event.type === 'dragover' ?
        {border: '1px solid rgb(51, 128, 56)'} :
        {border: '1px solid rgba(0, 0, 0, 0.25)'},
    );
  };

  /**
   *
   * @param {any} event Event on file selected
   */
  const onFileChange = (event: any) => {
    if (!!event.target.files[0].type.match('video.*')) {
      setFile(event.target.files[0]);
    }
  };

  /**
   *
   * @param {any} event Drop event
   */
  const dropHandler = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    if (!!event.dataTransfer.files[0].type.match('video.*')) {
      setDropCls({border: '1px solid rgba(0, 0, 0, 0.25)'});
      setFile(event.dataTransfer.files[0]);
    }
  };

  /**
   *
   */
  const onFileUpload = () => {
    if (file) {
      setUploadDisabled(true);
      setShowSpinner(true);
      setShowBar(true);
      setButtonText('Uploading...');
      setShowZone(false);
      const formData = new FormData();

      formData.append('myFile', file, file.name);

      axios.post('http://localhost:8000/api/video/upload', formData, {
        withCredentials: true,
        /**
         * @param {any} progressEvent Axios progress event
         */
        onUploadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
          );

          setPerc(percentCompleted);
        },
      }).then((response) => {
        setShowSpinner(false);
        setButtonText('Done');
        setShowTip(false);
      });
    }
  };

  /**
   * @returns {React.ReactElement} react element containing file details
   */
  const fileData = (): React.ReactElement => {
    if (file) {
      return (
        <div className={styles.fileInfo}>
          <p>
            <span>File name:</span>{' '}
            {file.name.length > 55 ?
              file.name.substring(0, 55) + '...' :
              file.name}
          </p>
          <p>
            <span>File type:</span> {file.type}
          </p>
          <p>
            <span>File size:</span> {formatBytes(file.size)}
          </p>
        </div>
      );
    } else {
      return <></>;
    }
  };

  /**
   * @returns {React.ReactElement} Dropzone react element
   */
  const dropZone = (): React.ReactElement => {
    if (showZone) {
      return (
        <label
          className={styles.dropzone}
          style={dropCls}
          onDragOver={dragOverHandler}
          onDragLeave={dragOverHandler}
          onDrop={dropHandler}
          htmlFor="file-upload"
        >
          <CloudUpload />
          <div>select video or drop here</div>
          <div className={styles.selectButton}>Select a file</div>
        </label>
      );
    }

    return <></>;
  };

  /**
   *  @returns {React.ReactElement} Tooltip react element
   */
  const toolTip = (): React.ReactElement => {
    if (showTip) {
      return (
        <div className={styles.tip} style={{left: perc + '%'}}>
          {perc}%
        </div>
      );
    }

    return <></>;
  };

  /**
   * @returns {React.ReactElement} Progress bar react element
   */
  const progressBar = (): React.ReactElement => {
    if (showBar) {
      return (
        <div className={styles.progress}>
          <div className={styles.bar} style={{width: perc + '%'}}></div>
          {toolTip()}
        </div>
      );
    }

    return <></>;
  };

  /**
   * @returns {React.ReactElement} Hourglass spinner react element
   */
  const spinner = (): React.ReactElement => {
    if (showSpinner) {
      return (<div className={styles.hourGlass}></div>);
    }

    return <></>;
  };

  return (
    <>
      <div className={styles.uploader}>
        <input
          type="file"
          onChange={onFileChange}
          accept="video/*"
          id="file-upload"
        />
        <div className={styles.title}>
          <h2>VIDEO UPLOAD</h2>
        </div>
        <div className={styles.body}>
          {dropZone()}
          {fileData()}
          {progressBar()}
          <div className={styles.uploadButtonContainer}>
            <button className={styles.uploadButton} onClick={onFileUpload}
              disabled={uploadDisabled}>
              {spinner()}
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
