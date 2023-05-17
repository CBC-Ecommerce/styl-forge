import React from 'react';

export default function GetMousePosition() {
  // get zoomed image Id
  let zoomedImage = document.getElementById('zoom-view');
  // add event listener for mouse movement
  document.addEventListener("mousemove", moveImage);

  // change position of image based on clientX, clientY
  function moveImage(e) {
    let x = e.clientX;
    let y = e.clientY;
    // set image coordinates
    // zoomedImage.left = x + 'px';
    // zoomedImage.top = y + 'px';
  }
}
