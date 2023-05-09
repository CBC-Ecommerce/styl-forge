import React from 'react';
import RenderStyle from './RenderStyle.jsx';

export default function StyleSelector({ styles }) {
  return (
    <div className="style-selector">
      { styles.results.map((style) => <RenderStyle style={style} key={style.id} />)}
    </div>
  );
}
