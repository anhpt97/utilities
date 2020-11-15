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
  // archive.file('/home/anhphan/Downloads/sample.jpg', { name: 'sample.jpg' }); // append local file
  archive.pipe(fs.createWriteStream('./sample.zip'));
  // res.attachment('sample.zip');
  // archive.pipe(res);
  archive.finalize();
}

import AdmZip = require('adm-zip');

export const extract2 = (filePath: string) => {
  fs.writeFileSync('./sample.zip', fs.readFileSync(filePath)); // ghi file nén ra một chỗ khác
  const zip = new AdmZip('./sample.zip');
  // const zipEntries = zip.getEntries();
  // zipEntries.map(zipEntry => zipEntry.entryName); // lấy danh sách tên các file có trong file nén
  // zip.extractEntryTo('HelloWorld.txt', `${process.cwd()}/sample`); // trích xuất một file cụ thể có trong file nén
  zip.extractAllTo(`${process.cwd()}/sample`);
  fs.unlinkSync('./sample.zip');
}

export const compress2 = () => {
  const zip = new AdmZip();
  zip.addFile('HelloWorld.txt', Buffer.from('Hello World!'));
  // zip.addLocalFile('/home/anhphan/Downloads/sample.jpg'); // append local file
  zip.writeZip('./sample.zip');
  // res.send(zip.toBuffer());
}
