import React from 'react';

export default function RenderStyle({ style }) {
  const handleClick = (e) => {
    console.log(e.target.id);
  };

  return (
    <div>
      <button className="style-thumbnail-buttons" id={style.style_id} type="button" onClick={handleClick}>
        <img className="style-selector-thumbnails" id={style.style_id} src={style.photos[0].thumbnail_url} alt="style-thumbnail" />
      </button>
    </div>
  );
}
