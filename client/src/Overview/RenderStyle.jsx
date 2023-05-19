import React from 'react';

export default function RenderStyle({ style, selectedStyle, styleSelectClickHandler }) {
  return (
    <div>
      {(selectedStyle.style_id.toString() === style.style_id.toString()) ? (
        <button className="style-thumbnail-buttons" id={style.style_id} type="button" onClick={(e) => {
          styleSelectClickHandler(e);
        }}>
          <img className="style-selector-thumbnails" style={{ border: 'solid', transform: 'scale(1.1)' }} id={style.style_id} src={style.photos[0].thumbnail_url ? style.photos[0].thumbnail_url : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="style-thumbnail" />
        </button>
      ) : (
        <button className="style-thumbnail-buttons" id={style.style_id} type="button" onClick={(e) => {
          styleSelectClickHandler(e);
        }}>
          <img className="style-selector-thumbnails" id={style.style_id} src={style.photos[0].thumbnail_url ? style.photos[0].thumbnail_url : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'} alt="style-thumbnail" />
        </button>
      )}

    </div>
  );
}
