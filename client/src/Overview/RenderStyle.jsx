import React from 'react';

export default function RenderStyle({ style, selectedStyle, styleSelectClickHandler }) {
  return (
    <div>
      {(selectedStyle.style_id.toString() === style.style_id.toString()) ? (
        <button className="style-thumbnail-buttons" id={style.style_id} type="button" onClick={(e) => {
          styleSelectClickHandler(e);
        }}>
          <img className="style-selector-thumbnails" style={{ border: 'solid', transform: 'scale(1.1)' }} id={style.style_id} src={style.photos[0].thumbnail_url} alt="style-thumbnail" />
        </button>
      ) : (
        <button className="style-thumbnail-buttons" id={style.style_id} type="button" onClick={(e) => {
          styleSelectClickHandler(e);
        }}>
          <img className="style-selector-thumbnails" id={style.style_id} src={style.photos[0].thumbnail_url} alt="style-thumbnail" />
        </button>
      )}

        {/* <div className="checkmark">
          {(selectedStyle.style_id.toString() === style.style_id.toString()) && (
            <>
              <i className="fa-solid fa-check" />
              <i className="empty-circle" />
            </>
          )}
        </div> */}
    </div>
  );
}
