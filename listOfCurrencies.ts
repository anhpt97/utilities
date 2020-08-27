import currencyCodes = require('currency-codes');

export const getListOfCurrencies = () => {
  return currencyCodes.codes();
}
