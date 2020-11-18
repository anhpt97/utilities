import screenshot = require('screenshot-desktop');
// import fs = require('fs');

// Note: For Linux: Install "imagemagick" first.
export const takeScreenshot = async () => {
  // fs.writeFileSync('./Screenshot.png', await screenshot({ format: 'png' }));
  return screenshot({ filename: './Screenshot.png' });
}
