import React from 'react';

export default function GetMousePosition({ img }) {
  console.log(img)
  // wait for page to load
  window.addEventListener("mousemove", (e) => {
    // set background image
    document.querySelector('#zoomed-image-container').style.backgroundImage = `url(${img})`;
    // add event listener for mouse movement and move image

    const x = e.pageX;
    const y = e.pageY;
    const pageWidth = e.view.innerWidth;
    const pageHeight = e.view.innerHeight;
    console.log(x, y);
    // set image coordinates
    document.querySelector('#zoomed-image-container').style.setProperty('--x', (x / pageWidth) * 100 + "%");
    document.querySelector('#zoomed-image-container').style.setProperty('--y', (y / pageHeight) * 100 + "%");
  });
}
