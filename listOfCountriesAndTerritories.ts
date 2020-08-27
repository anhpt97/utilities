import countries = require('i18n-iso-countries');

export const getListOfCountriesAndTerritories = () => {
  countries.getNames('en')['RU'] = 'Russia Federation';
  return countries.getNames('en');
}
