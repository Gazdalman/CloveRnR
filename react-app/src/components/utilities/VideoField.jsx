import React, { useState, useRef } from 'react';

const VideoField = ({ setVideo, video, videoURL, setVideoURL }) => {
  const [filename, setFilename] = useState("")

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (
        file.type.endsWith("mp4") ||
        file.type.endsWith("avi")
      ) {
        // console.log(file.type);
        setVideo(file)
        const reader = new FileReader();
        reader.onload = (e) => {
          setVideoURL(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];
    if (!tempFile) {
      return
    }
    // Check for max video size of 1GB
    if (tempFile && tempFile.size > 1250000000) {
      window.alert("Selected video exceeds the maximum file size of 1Gb"); // "Selected video exceeds the maximum file size of 5Mb"
      return
    }

    const newVideoURL = URL.createObjectURL(tempFile); // Generate a local URL to render the video file inside of the <img> tag.
    setVideoURL(newVideoURL);
    setVideo(tempFile)
    setFilename(tempFile.name);
  }

  const fileInputRef = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click();
  };

  const removeVideo = (e) => {
    e.preventDefault()
    setVideoURL("")
    setVideo("")
  }

  return (
    <>
      <div
        className="drag-drop-box"
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {videoURL ? (
          <video src={videoURL} className="thumbnails-noname"></video>
        ) : (
          <p>Drag & Drop Video Here</p>
        )}
        <div id="photo-field-buttons">
          ... or <button id="choose-file" onClick={handleButtonClick}>Choose File</button>
          <button id="remove-file" onClick={removeVideo} style={!video ? { "display": "none" } : { "display": "block" }}>Remove Video</button>
          <input
            type="file"
            ref={fileInputRef}
            accept='.mp4, .avi'
            style={{ display: 'none' }}
            onChange={fileWrap}
          />
        </div>
      </div>
    </>
  );
};

export default VideoField;
