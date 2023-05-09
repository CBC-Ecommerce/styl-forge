import React from 'react';

export default function RenderStyle({ style }) {
  console.log('style number ' + style.style_id, style);
  return (
    <div>
      <img className="style-selector-thumbnails" src={style.photos[0].thumbnail_url} alt="style-thumbnail" />
    </div>
  );
}
