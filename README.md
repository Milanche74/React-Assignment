# Set up

Make sure You have nvm installed and run `nvm use` to have the correct node/npm version.

## Try to run demo

1. Run `npm install`
2. Run `npm run dev`

![Demo page](/docs/app.png)

## Tasks

### i18n

- [x] Rename the `Title` to `City population by time`
- [x] Add a new local (sr-RS)
- [x] Chart legend contains string `Projected` which is not translated. Add it to translations.

### Webpack

- [x] Configure webpack to be able loading css files
- [x] Load main.css to the App (`import "main.css";` in `src/index.js`)

### React

- [x] Show loading spinner while data is loading (hint: `<div class="lds-hourglass"></div>`)
- [x] In chart, show projected population in a different line. Test the function which extracts the data.
- [x] Cities are hardcoded in `citySelector`. Load them dynamically.
- [x] Istanbul is hardcoded for the default selected city. Initially show a message that User has to select a city.
- [ ] Create a new component, a bar chart, which will allow comparing two cities population.
