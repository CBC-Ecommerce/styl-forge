import React, { useState, useEffect } from 'react';
import axios from 'axios';

// BUG: CANT CHANGE YOUR MIND AND SAY 'CHOOSE FILE' AGAIN AFTER ALREADY SELECTING IMGS
export default function UploadPhotos({ callback }) {
  const [files, setFiles] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [underFive, setUnderFive] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // function convertToURL(filesArr) {
  //   const formData = new FormData();
  //   filesArr.forEach((file) => {
  //     formData.append('file', file);
  //   });
  //   formData.append('upload_preset', 'ge9rke5o');
  //   axios.post('https://api.cloudinary.com/v1_1/dnr41r1lq/image/upload', formData)
  //     .then((results) => {
  //       console.log('RESULTS BACK FROM CLOUDINARY ARE ', results.data.secure_url);
  //       setFiles(...files, results.data.secure_url);
  //     })
  //     .catch((err) => { console.log(err); });
  // }

  // const handleFileChange = (e) => {
  //   const uploaded = Array.from(e.target.files);
  //   if (uploaded.length > 5) {
  //     e.preventDefault();
  //     setErrorMsg('Cannot upload more than 5 photos');
  //   } else {
  //     setImgPreview(e.target.files[0]);
  //     // convertToURL(uploaded);
  //     // setErrorMsg('');
  //   }
  // };

  // converts to base64 to support better image preview of thumbnails
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
      });
  }

  function conformFiles(pictures) {
    const formData = new FormData();
    formData.append('upload_preset', 'ge9rke5o');
    Promise.all(pictures.map((pic) => {
      formData.append('file', pic);
      return axios.post('https://api.cloudinary.com/v1_1/dnr41r1lq/image/upload', formData)
        .then((results) => (
          results.data.secure_url
        ))
        .catch((err) => { console.log(err); });
    }))
    // If we just can't get anything back from the upload button, send parent this working urlArr
    // callback(urlArray)
      .then((urlArray) => (callback(urlArray)));
  }

  const handleFileChange = async (e) => {
    const uploaded = Array.from(e.target.files);
    if (uploaded.length > 5) {
      e.preventDefault();
      setUnderFive(false);
      setErrorMsg('Cannot upload more than 5 photos');
    } else {
      convertBase64(uploaded);
      // Cloudinary *can take base64 but it was difficult, so keepin it raw:
      await setFiles(uploaded);
      setUnderFive(true);
      setErrorMsg('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    await conformFiles(files);
  };

  const style = {
    width: '50px',
    height: '50px',
    marginRight: '5px',
  };

  return (
    <div className="upload-container">
      <div className="upload-label">Upload up to 5 photos</div>
      <input type="file" multiple onChange={handleFileChange} />
      {underFive && <button type="button" onClick={handleUpload}>Upload</button>}
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
