import React, { useState } from 'react';
import axios from 'axios';

// BUG: CANT CHANGE YOUR MIND AND SAY 'CHOOSE FILE' AGAIN AFTER ALREADY SELECTING IMGS
export default function UploadPhotos() {
  const [files, setFiles] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  function convertBase64(filesArray) {
    Promise.all(filesArray.map((file) => (
      new Promise((res, rej) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          res(fileReader.result);
        };

        fileReader.onerror = (err) => {
          rej(err);
        };
      })
    )))
      .then((base64) => {
        setImgPreview(...imgPreview, base64);
        // map over each base64 file and for each file,
          // send to cloudinary on the backend,
          // then when that's done, with the result
         // return the result.secure_url
         // now we should have an array of public urls
        console.log('IMG PREVIEW IS ', imgPreview);
      });
  }

  const handleFileChange = async (e) => {
    const uploaded = Array.from(e.target.files);
    if (uploaded.length > 5) {
      e.preventDefault();
      setErrorMsg('Cannot upload more than 5 photos');
    } else {
      const conformedToURL = await convertBase64(uploaded);
      setFiles(conformedToURL);
      setErrorMsg('');
    }
  };

  function handleUpload() {
    // invoke a callback function to send the files we've conformed
    // back to the Add Review section as the results
  }

  const style = {
    width: '50px',
    height: '50px',
    marginRight: '5px',
  };

  return (
    <div className="upload-container">
      <div className="upload-label">Upload up to 5 photos</div>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>Upload</button>
      {errorMsg && <span className="files-exceeded">{errorMsg}</span>}
      {imgPreview.length > 0 && (
        <div className="img-preview-container">
          {imgPreview.map((img, i) => (
            <img src={img} alt="" style={style} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
