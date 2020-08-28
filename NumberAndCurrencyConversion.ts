import accounting = require('accounting');
import numeral = require('numeral');

console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(123456789));
// $123,456,789.00

console.log(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(123456789));
// 123.456.789 ₫

console.log(accounting.formatMoney(123456789));
// $123,456,789.00

console.log(accounting.formatMoney(123456789, '$ ', 2));
// $ 123,456,789.00 ('$ ' + '123,456,789' + '.00')

console.log(accounting.formatMoney(123456789, '$ ', 2, '.', ','));
// $ 123.456.789,00 ('$ ' + '123(.)456(.)789' + '(,)00')

console.log(accounting.formatMoney(123456789, { symbol: 'USD', format: '%v %s' }));
// 123,456,789.00 USD ('123,456,789.00' (%v = value) + ' ' + 'USD' (%s = symbol))

console.log(accounting.formatNumber(123456789, 2, ',', '.'));
// '123(,)456(,)789' + '().)00'

console.log(accounting.unformat('£ 1,234,567.89 - GBP'));
// 1234567.89 (number)

console.log(numeral(123456789).format('0,0.00 $'));
// 123,456,789.00 $

console.log(numeral(1234).format('($ 0.00a)'));
// $ 123.46 m
