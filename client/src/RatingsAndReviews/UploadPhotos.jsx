import React, { useState } from 'react';
import axios from 'axios';

// BUG: CANT CHANGE YOUR MIND AND SAY 'CHOOSE FILE' AGAIN AFTER ALREADY SELECTING IMGS
export default function UploadPhotos() {
  const [files, setFiles] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  function convertToURL(filesArr) {
    const formData = new FormData();
    filesArr.forEach((file) => {
      formData.append('file', file);
    });
    formData.append('upload_preset', 'ge9rke5o');
    axios.post('https://api.cloudinary.com/v1_1/dnr41r1lq/image/upload', formData)
      .then((results) => {
        console.log('RESULTS BACK FROM CLOUDINARY ARE ', results.data.secure_url);
        setFiles(...files, results.data.secure_url);
      })
      .catch((err) => { console.log(err); });
  }

  const handleFileChange = (e) => {
    const uploaded = Array.from(e.target.files);
    if (uploaded.length > 5) {
      e.preventDefault();
      setErrorMsg('Cannot upload more than 5 photos');
    } else {
      setImgPreview(e.target.files[0]);
      // convertToURL(uploaded);
      // setErrorMsg('');
    }
  };

  const handleUpload = async (e) => {
    // invoke a callback function to send the files we've conformed
    // back to the Add Review section as the results
    e.preventDefault();
    await files;
    console.log('FILES TO SHIP SHOULD BE URL ARRAY ', files);
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
