import { negate, isUndefined } from 'lodash';
import { BehaviorSubject, combineLatest, map, filter } from 'rxjs';
import { uniq } from 'lodash';
import csv from '../../data/city-populations-to-2035.csv';

const loading = new BehaviorSubject(true);
const data = new BehaviorSubject([]);
const selectedCity = new BehaviorSubject();
// since this file acts as a server, I decided to extract an array of
// city names from data because in real-life situation,
// I wouldn't do data manipulation on client side
const cities = new BehaviorSubject([]);

const comparisonCity = new BehaviorSubject();

(async function init() {
  setTimeout(() => {
    loading.next(false);
    data.next(csv);
    let extractedCities = uniq(data._value.map(({ city }) => city));
    cities.next(extractedCities);

  }, 3000); // Simulate network request
})();

const populationForSelectedCity = combineLatest([
  data.pipe(filter(negate(isUndefined))),
  selectedCity,
]).pipe(
  map(([data, selectedCity]) => {
    return data.filter(({ city }) => city === selectedCity);
  })
);
const dataForComparisonCity = combineLatest([
  data.pipe(filter(negate(isUndefined))),
  comparisonCity,
  selectedCity,
]).pipe(
  map(([data, comparisonCity, selectedCity]) => {
    return [
      data.filter(({ city }) => city === selectedCity),
      data.filter(({city})=> city === comparisonCity)
    ];
  })
);

export default {
  loadingStream: loading,
  dataStream: data,
  selectedCityStream: selectedCity,
  populationForSelectedCity,
  citiesStream: cities,
  comparisonCityStream: comparisonCity,
  dataForComparisonCity
};
