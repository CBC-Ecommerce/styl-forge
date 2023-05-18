import React from 'react';

export default function GetMousePosition() {
  // get zoomed image Id
  let zoomedImage = document.getElementById('#zoom-view');

  // wait for page to load
  window.addEventListener("DOMContentLoaded", (e) => {
    // change position of image based on clientX, clientY
    function moveImage(e) {
      let x = e.clientX;
      let y = e.clientY;
      console.log(x, y);
      // set image coordinates
      zoomedImage.style.left = x + 'px';
      zoomedImage.style.top = y + 'px';
    }
    // add event listener for mouse movement
    document.addEventListener("mousemove", moveImage);
  });
}
