import axios from 'axios';
import moment = require('moment');
require('dotenv').config();

export const getListOfCurrencies = async () => {
  const { data } = await axios.get(`https://openexchangerates.org/api/currencies.json`);
  return data;
}

export const getListOfExchangeRates = async (baseCurrency = 'USD', date?: string) => {
  // For the free plan, the base currency must be USD and up to 1,000 requests/month.
  const { rates } = (await axios.get(
    `https://openexchangerates.org/api/${date && moment(date).isValid() ? `historical/${moment(date).format('YYYY-MM-DD')}.json` : 'latest.json'}`
    + `?app_id=${process.env.OPEN_EXCHANGE_RATES_APP_ID}&base=${baseCurrency}`
  )).data;
  console.log(rates);
  return rates;
}
