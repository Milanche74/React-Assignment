import React from 'react';
import PropTypes from 'prop-types';
import dataProvider from '../../dataProvider';
import { useEffect } from 'react';
import i18n from '../../i18n';

const propTypes = {
  city: PropTypes.string,
  handleSelection: PropTypes.func.isRequired,
};

export default function CitySelector({city, handleSelection }) {
  // const cities = ['Beijing', 'Buenos Aires', 'Istanbul'];

  const [selectedCity, setSelectedCity] = React.useState('Choose');
  const [cities, setCities] = React.useState([]);

  useEffect(() => {
    const subscription = dataProvider.selectedCityStream.subscribe((c) => {
      setSelectedCity(c);
      return () => subscription.unsubscribe();
    });
  });
  useEffect(()=> {
    const subscription = dataProvider.citiesStream.subscribe(setCities);
    return () => subscription.unsubscribe()
  });

  return (
    <select onChange={handleSelection} value={selectedCity}>
      <option default hidden>{i18n.t('selection')}</option>
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
