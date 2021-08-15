import i18n from './i18n';
import i18next from 'i18next';
import renderLanguageSelector from './widgets/languageSelector';

function renderAppInterface() {
  const header = document.createElement('h1');
  header.innerText = i18n.t('title');
  const chart = document.createElement('div');

  document.getElementById('app').replaceChildren(header, chart);
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
