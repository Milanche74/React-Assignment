import { of, fromEvent } from 'rxjs';
import { distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import i18next from 'i18next';

export default function renderLanguageSelector() {
  const languageSelector = document.createElement('div');
  const buttons = ['en-US', 'hu-HU', 'sr-RS'].map((locale) => {
    const button = document.createElement('button'); 
    button.innerText = locale;
    button.setAttribute('lang', locale);
    languageSelector.appendChild(button);
    return button;
  });

  of(buttons)
    .pipe(
      mergeMap((button) => fromEvent(button, 'click')),
      map((event) => event.target.getAttribute('lang')),
      distinctUntilChanged()
    )
    .subscribe((lang) => i18next.changeLanguage(lang));

  return languageSelector;
}
