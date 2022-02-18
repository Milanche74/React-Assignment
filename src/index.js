import i18n from './i18n';
import i18next from 'i18next';
import renderLanguageSelector from './widgets/languageSelector';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './widgets/chart';
import CitySelector from './widgets/citySelector';
import ComparePopulation from './widgets/comparePopulation';
import dataProvider from './dataProvider';
import './main.css';

function renderAppInterface() {
  const header = document.createElement('h1');
  header.innerText = i18n.t('title');
  const oneCityChart = document.createElement('section');
  const cityComparison = document.createElement('section')
  const citySelector1 = document.createElement('div');
  const citySelector2 = document.createElement('div');
  const chartContainer = document.createElement('div');
  const compare = document.createElement('div');

  oneCityChart.append(citySelector1, chartContainer);
  cityComparison.append(citySelector2, compare);

  document
    .getElementById('app')
    .replaceChildren(header, oneCityChart, cityComparison);

  ReactDOM.render(
    <CitySelector
      role="first-selection"
      handleSelection={(event) => {
        dataProvider.selectedCityStream.next(event.target.value);
      }}
    />,
    citySelector1
  );
  ReactDOM.render(
    <CitySelector
      role="second-selection"
      handleSelection={(event) => {
        dataProvider.comparisonCityStream.next(event.target.value);
      }}
    />,
    citySelector2
  );

  ReactDOM.render(<Chart />, chartContainer);
  ReactDOM.render(<ComparePopulation />, compare);

 
}

function renderRoot() {
  const root = document.createElement('div');
  root.id = 'root';

  const langSelector = renderLanguageSelector();
  root.appendChild(langSelector);

  const app = document.createElement('div');
  app.id = 'app';
  root.appendChild(app);

  return root;
}

i18next.on('languageChanged', () => {
  renderAppInterface();
});

document.body.appendChild(renderRoot());

renderAppInterface();
