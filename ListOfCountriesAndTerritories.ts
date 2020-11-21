import countries = require('i18n-iso-countries');

export const getListOfCountriesAndTerritories = () => {
  countries.getNames('en').RU = 'Russia Federation';
  countries.getNames('en').GB = 'United Kingdom';
  countries.getNames('en').US = 'United States of America';
  return countries.getNames('en');
};

// export const getListOfCountriesAndTerritories = () => {
//   return Object.keys(countries.getNames('en')).reduce((prev, cur) => {
//     if (Array.isArray(countries.getNames('en')[cur])) {
//       return { ...prev, [cur]: countries.getNames('en')[cur][0] };
//     }
//     return { ...prev, [cur]: countries.getNames('en')[cur] };
//   }, {});
// }
