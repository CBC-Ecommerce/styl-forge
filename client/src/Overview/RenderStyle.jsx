import React from 'react';

export default function RenderStyle({ style, selectedStyle, styleSelectClickHandler }) {
  return (
    <div>
      <button className="style-thumbnail-buttons" id={style.style_id} type="button" onClick={(e) => {
        styleSelectClickHandler(e);
      }}
      >
        <div className="checkmark">
          {(selectedStyle.style_id.toString() === style.style_id.toString()) && (
            <>
              <p className="style-name">{style.name}</p>
              <i className="fa-solid fa-check" />
              <i className="empty-circle" />
            </>
          )}
        </div>
        <img className="style-selector-thumbnails" id={style.style_id} src={style.photos[0].thumbnail_url} alt="style-thumbnail" />
      </button>
    </div>
  );
}
