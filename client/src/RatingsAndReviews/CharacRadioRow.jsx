import React from 'react';

export default function CharacRadioRow({ meaning, usrRating, name, updateRow, i }) {
  const [selectedButton, setSelectedButton] = React.useState(0);

  function handleClick(e) {
    const { value } = e.target;
    setSelectedButton(Number(value));
    updateRow(i, Number(value));
  }
  return (
    <div className="single-characteristic">
      <div className="char-meaning">{meaning}</div>
      <label htmlFor={meaning + usrRating}>
        {usrRating}
        <input
          id={meaning + usrRating}
          type="radio"
          value={usrRating}
          name={name}
          defaultChecked={usrRating === selectedButton}
          onChange={(e) => { handleClick(e); }}
        />
      </label>
    </div>
  );
}
