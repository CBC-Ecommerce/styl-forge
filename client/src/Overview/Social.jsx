import React from 'react';

export default function Social({ id }) {
  const linkToMySite = 'https://github.com/Cherry-Blossom-Chasers/front-end-capstone'; // change to deployed url with id as input
  const shareToTwitter = function () {
    const url = `https://twitter.com/intent/tweet?text=${linkToMySite}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = function () {
    const url = `https://facebook.com/sharer/sharer.php?u=${linkToMySite}`;
    window.open(url, '_blank');
  };
  return (
    <div className="social-buttons">
      <div>Share this product:</div>
      <button className="share-button" type="button" onClick={shareToTwitter}><i className="fa-brands fa-twitter"></i></button>
      <button className="share-button" type="button" onClick={shareToFacebook}><i className="fa-brands fa-facebook"></i></button>
    </div>
  );
}
