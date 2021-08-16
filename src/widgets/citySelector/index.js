import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  city: PropTypes.string,
  handleSelection: PropTypes.func.isRequired,
};

export default function CitySelector({ city, handleSelection }) {
  const cities = ['Beijing', 'Buenos Aires', 'Istanbul'];
  return (
    <select onChange={handleSelection} value={city}>
      {cities.map((c) => {
        return (
          <option key={c} value={c}>
            {c}
          </option>
        );
      })}
    </select>
  );
}

CitySelector.propTypes = propTypes;
