import React, { useState } from 'react';
import SingleImage from './SingleImage.jsx';
import './css/Carousel.css';

export default function CarouselV2({ nameOfImageClass }) {
  // Select all slides
  const allImages = document.querySelectorAll(nameOfImageClass);

  // wait for page to load
  window.addEventListener("DOMContentLoaded", (event) => {
    // loop through slides and set each slides translateX property to index * 100%
    allImages.forEach((image, index) => {
      image.style.transform = `translateX(${index * 100}%)`;
    });
  });
}
