import exceljs = require('exceljs');
// import imageSize from 'image-size';
// import fs = require('fs');
// import axios from 'axios';

import stylesXform = require('exceljs/lib/xlsx/xform/style/styles-xform.js');
const originalStylesXform = stylesXform.prototype.init;
stylesXform.prototype.init = function () {
  // eslint-disable-next-line prefer-rest-params
  originalStylesXform.apply(this, arguments);
  this._addFont({ name: 'Arial', size: 11 });
};

export class ReportService {
  exportDataToExcel(dataset: any[], imagePath?: string, imageLink?: string) {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    worksheet.properties.defaultRowHeight = 20;

    // const dataset = [
    //   {
    //     id: 1,
    //     name: 'Phan Anh',
    //     age: 23,
    //     hometown: 'Thái Bình',
    //     time: new Date(),
    //   },
    // ];

    worksheet.getCell('A1').value = 'Header';
    worksheet.getCell('A1').font = { name: 'Arial', size: 16, bold: true, color: { argb: 'FF0000' } };
    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle', /* wrapText: true // không để tràn ra các ô ở xung quanh hai bên trái và phải */ };
    worksheet.mergeCells('A1', 'E1');
    worksheet.getCell('A1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const headers = { id: 'ID', name: 'Name', age: 'Age', hometown: 'Hometown', time: 'Time' };
    const columns = ['A', 'B', 'C', 'D', 'E'];

    Object.values(headers).map((tableHeader, i) => {
      worksheet.getCell(`${columns[i]}2`).value = tableHeader;
      worksheet.getCell(`${columns[i]}2`).font = { name: 'Arial', size: 14, bold: true };
      worksheet.getCell(`${columns[i]}2`).alignment = { horizontal: 'center', vertical: 'middle' };
      worksheet.getCell(`${columns[i]}2`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    worksheet.columns = Object.keys(headers).map(header => ({ key: header, width: 16 }));

    let i = 3;
    for (const data of dataset) {
      worksheet.addRow(data);
      columns.map(column => {
        worksheet.getCell(`${column}${i}`).alignment = { horizontal: 'center', vertical: 'middle' };
        worksheet.getCell(`${column}${i}`).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
      i++;
    }

    // if (imagePath) {
    //   const dimensions: any = imageSize(imagePath);

    //   const image = workbook.addImage({
    //     buffer: fs.readFileSync(imagePath),
    //     extension: dimensions.type,
    //   });

    //   const worksheet2 = workbook.addWorksheet('Sheet2');

    //   worksheet2.addImage(image, {
    //     tl: { col: 1, row: 2 },
    //     ext: { width: dimensions.width, height: dimensions.height },
    //   });
    // }

    // if (imageLink) {
    //   const { data } = await axios.get(imageLink, { responseType: 'arraybuffer' });
    //   const dimensions2: any = imageSize(data);
    //   const image2 = workbook.addImage({
    //     buffer: data,
    //     extension: dimensions2.type,
    //   });

    //   const worksheet3 = workbook.addWorksheet('Sheet3');

    //   worksheet3.addImage(image2, {
    //     tl: { col: 1, row: 2 },
    //     ext: { width: dimensions2.width, height: dimensions2.height },
    //   });
    // }

    return workbook.xlsx.writeFile('./file.xlsx');
    // return workbook.xlsx.writeBuffer();
    // res.setHeader('Content-Disposition', 'attachment; filename=file.xlsx');
    // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // res.end(report);
  }
}
