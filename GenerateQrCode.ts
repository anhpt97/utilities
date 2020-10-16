import qrCode = require('qrcode');

export const generateQrCode = async (text: string, width = 1024) => {
  await qrCode.toFile(`${process.cwd()}/qr.png`, text, { width });
}
