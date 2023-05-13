import React from 'react';

export default function Social() {
  const linkToMySite = 'https://github.com/Cherry-Blossom-Chasers/front-end-capstone'; // change to deployed url
  const shareToTwitter = function () {
    const url = `https://twitter.com/intent/tweet?text=${linkToMySite}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = function () {
    const url = `https://facebook.com/sharer/sharer.php?u=${linkToMySite}`;
    window.open(url, '_blank');
  };
  return (
    <div>
      <button type="button" onClick={shareToTwitter}>Twitter</button>
      <button type="button" onClick={shareToFacebook}>Facebook</button>
    </div>
  );
}
