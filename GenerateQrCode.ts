import qrCode = require('qrcode');

export const generateQrCode = async (text: string, width = 1024) => {
  await qrCode.toFile(`${process.cwd()}/qr.png`, text, { width });
}

// const a = [1, 2, 3, 4, 5, 6, 7, 8];

// const b = a.reduce((prev, cur, i) => {
//   if (i % 2 === 1) {
//     return { ...prev };
//   }
//   return { ...prev, [cur]: cur + 1 };
// }, {});
// console.log(b);

// const c = a.reduce((prev, cur) => prev + cur, 0);
// console.log(c);

// const d = a.reduce((prev, cur) => {
//   return [...prev, cur * 2];
// }, []);
// console.log(d);

// const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
// const e = a.reduce((prev, cur, i) => {
//   return { ...prev, [arr[i]]: cur };
// }, {});
// console.log(e);
