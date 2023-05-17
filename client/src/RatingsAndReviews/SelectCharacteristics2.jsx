import React from 'react';

export default function SelectCharacteristics({ prodCharac, characObj }) {
  const [selectedButton, setSelectedButton] = React.useState(0);

  const isRadioSelected = (value) => (value === selectedButton);

  function handleClick(e, id) {
    e.preventDefault();
    const { value } = e.target;
    console.log('passed value is', value);
    setSelectedButton(Number(value));

    // console.log('ID IS ', id);
    // console.log('VALUE IS ', value);
    // send this value back to the parent to record.
  }
  // split components into rows that share a state.
  // renderRow => row (has state) => items
  return (
    <div>
      {prodCharac.map((charac) => {
        const oneThroughFive = [];
        if (charac === 'Size') {
          oneThroughFive.push('A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big');
        } else if (charac === 'Width') {
          oneThroughFive.push('Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide');
        } else if (charac === 'Comfort') {
          oneThroughFive.push('Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect');
        } else if (charac === 'Quality') {
          oneThroughFive.push('Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect');
        } else if (charac === 'Length') {
          oneThroughFive.push('Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long');
        } else {
          oneThroughFive.push('Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly loose', 'Runs loose');
        }
        return (
          <div className="characteristic-selection-container" key={charac}>
            <div className="characteristic-title">{charac}</div>
            <div className="char-meaning-row">
              {oneThroughFive.map((meaning, index) => {
                const rating = index + 1;
                return (
                  <div className="single-characteristic">
                    <div className="char-meaning">{meaning}</div>
                    <label htmlFor={meaning + rating}>
                      {rating}
                      <input
                        id={meaning + rating}
                        type="radio"
                        value={rating}
                        name="characteristic-select"
                        checked={isRadioSelected(rating)}
                        // onChange={(e) => { handleClick(e, characObj[charac].id); }}
                        onClick={(e) => { handleClick(e, characObj[charac].id); }}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
