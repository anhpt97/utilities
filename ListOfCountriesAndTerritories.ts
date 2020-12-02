import countries = require('i18n-iso-countries');

export const getListOfCountriesAndTerritories = () => {
  return countries.getNames('en');
};
