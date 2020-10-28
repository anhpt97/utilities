import fs = require('fs');
import extractZip = require('extract-zip');

export const extract = async (filePath: string) => {
  fs.writeFileSync('./sample.zip', fs.readFileSync(filePath)); // ghi file ra một chỗ khác
  await extractZip('./sample.zip', { dir: `${process.cwd()}/sample` });
  fs.unlinkSync('./sample.zip');
}

import archiver = require('archiver');

export const compress = () => {
  const archive = archiver('zip', { zlib: { level: 9 } }); // level must be >= -1 and <= 9
  archive.append(Buffer.from('Hello World!'), { name: 'HelloWorld.txt' });
  archive.finalize();
  archive.pipe(fs.createWriteStream('./sample.rar'));
  // archive.pipe(res.attachment(`${Date.now()}.zip`));
}

import AdmZip = require('adm-zip');

export const extract2 = (filePath: string) => {
  fs.writeFileSync('./sample.zip', fs.readFileSync(filePath)); // ghi file ra một chỗ khác
  new AdmZip('./sample.zip').extractAllTo(`${process.cwd()}/sample`);
  fs.unlinkSync('./sample.zip');
}
