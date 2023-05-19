import React from 'react';
import RenderStyle from './RenderStyle.jsx';

export default function StyleSelector({ styles, selectedStyle, styleSelectClickHandler }) {
  return (
    <div>
    <div><h2 className="style-name">Style: {selectedStyle.name}</h2></div>
    <div className="style-selector" data-testid="stylSelect">
      { styles.results.map((style) => (

        <RenderStyle
          style={style}
          selectedStyle={selectedStyle}
          styleSelectClickHandler={styleSelectClickHandler}
          key={style.style_id}
        />

      ))}
    </div>
    </div>
  );
}
