import React from 'react';
import RenderStyle from './RenderStyle.jsx';

export default function StyleSelector({ styles, selectedStyle, styleSelectClickHandler }) {
  return (
    <div className="style-selector">
      { styles.results.map((style) => (
        <RenderStyle
          style={style}
          selectedStyle={selectedStyle}
          styleSelectClickHandler={styleSelectClickHandler}
          key={style.style_id}
        />
      ))}
    </div>
  );
}
