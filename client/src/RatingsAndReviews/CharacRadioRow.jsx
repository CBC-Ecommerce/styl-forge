import React from 'react';

export default function CharacRadioRow({ meaning, usrRating, name, id }) {
  const [selectedButton, setSelectedButton] = React.useState(0);

  function handleClick(e, characId) {
    const { value } = e.target;
    setSelectedButton(Number(value));

    console.log(`CharacId: ${characId} and Value: ${value}`);
    // send this value back to the parent to record.
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
          onChange={(event) => { handleClick(event, id); }}
        />
      </label>
    </div>
  );
}
