import currencyCodes = require('currency-codes');

export const getListOfCurrencyCodes = () => {
  return currencyCodes.codes();
}
