import React from 'react';

export default function GetMousePosition() {
  // get zoomed image Id
  let zoomedImage = document.getElementById('#zoom-view');
  // add event listener for mouse movement
  document.addEventListener("mousemove", moveImage);

  // change position of image based on clientX, clientY
  function moveImage(e) {
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y);
    // set image coordinates
    // zoomedImage.style.left = x + 'px';
    // zoomedImage.top = y + 'px';
    zoomedImage.removeEventListener('click');
  }
}
