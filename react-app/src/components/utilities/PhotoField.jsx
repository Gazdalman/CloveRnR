import React, { useState, useRef } from 'react';

const PhotoField = ({ image, setImage, imageURL, setImageURL, extraClass }) => {
  const [filename, setFilename] = useState("")

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // console.log(file.type);
      if (
        file.type.endsWith("jpg") ||
        file.type.endsWith("jpeg") ||
        file.type.endsWith("png") ||
        file.type.endsWith("gif")
      ) {
        setImage(file)
        const reader = new FileReader();
        reader.onload = (event) => {
          setImageURL(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];

    // Check for max image size of 5Mb
    if (tempFile.size > 5000000) {
      setFilename("Selected image exceeds the maximum file size of 5Mb"); // "Selected image exceeds the maximum file size of 5Mb"
      return
    }

    const newImageURL = URL.createObjectURL(tempFile); // Generate a local URL to render the image file inside of the <img> tag.
    setImageURL(newImageURL);
    setImage(tempFile);
    setFilename(tempFile.name);
  }

  const fileInputRef = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    event.preventDefault()
    const selectedFile = event.target.files[0];
    fileWrap(event)
    // console.log('Selected file:', selectedFile);
  };

  const removeImage = (e) => {
    e.preventDefault();
    setImageURL("");
    setImage("");
    setFilename("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  }

  return (
    <div
      className={`drag-drop-box ${extraClass ? extraClass : ""}`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {imageURL ? (
        <img src={imageURL} className="thumbnails-noname"></img>
      ) : (
        <p id="no-image-there">Drag & Drop Image Here</p>
      )}
      <div id="photo-field-buttons">
        ... or <button id="choose-file" onClick={handleButtonClick}>Choose File</button>
        <button id="remove-file" onClick={removeImage} style={!image ? {"display": "none"} : {"display": "block"}}>Remove Photo</button>
        <input
          type="file"
          accept=".jpeg, .jpg, .gif, .png"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default PhotoField;
