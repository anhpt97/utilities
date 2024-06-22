import { formatMoney, formatNumber, unformat } from "accounting";
import { Big } from "big.js";
import numeral from "numeral";

console.log(
  Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    123456789
  )
);
// "$123,456,789.00"

console.log(
  Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    123456789
  )
);
// "123.456.789 ₫"

console.log(formatMoney(123456789));
// "$123,456,789.00"

console.log(formatMoney(123456789, "$ ", 2));
// "$ 123,456,789.00" ("$ " + "123,456,789" + ".00")

console.log(formatMoney(123456789, "$ ", 2, ".", ","));
// "$ 123.456.789,00" ("$ " + "123(.)456(.)789" + "(,)00")

console.log(formatMoney(123456789, { symbol: "USD", format: "%v %s" }));
// "123,456,789.00 USD" ("123,456,789.00" (%v: value) + " " + "USD" (%s: symbol))

console.log(formatNumber(123456789, 2, ",", "."));
// "123,456,789.00" ("123(,)456(,)789" + "(.)00")

console.log(unformat("£ 1,234,567.89 - GBP"));
// 1234567.89

console.log(numeral(123456789).format("0,0.00 $"));
// "123,456,789.00 $"

console.log(numeral(1234).format("$ 0.00a"));
// "$ 1.23k"

console.log(numeral(123456789).format("$ 0.00a"));
// "$ 123.46m"

console.log(Big(0.01).add(0.02).toNumber());
// 0.03

console.log(`${Big(0.07).times(100).toNumber()}%`);
// "7%"
