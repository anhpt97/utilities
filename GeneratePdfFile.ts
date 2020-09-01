import PdfPrinter = require('pdfmake');
import moment = require('moment');
import fs = require('fs');

const header = ['ID', 'Name', 'Age', 'Hometown'];

const dataset = [
  {
    id: 1,
    name: 'Phan Anh',
    age: 23,
    hometown: 'Thái Bình',
  },
];

const fonts = {
  Roboto: {
    normal: 'fonts/arial.ttf',
    bold: 'fonts/arialbd.ttf',
    italics: 'fonts/ariali.ttf',
    bolditalics: 'fonts/arialbi.ttf',
  },
};

const printer = new PdfPrinter(fonts);

const setHeaderRow = (header: string[]) => {
  return header.map(ele => ({ text: ele, style: 'tableHeader' }));
};

const insertData = (dataset: any[]) => {
  return dataset.map(data => {
    console.log(data);
  });
}

const docDefinition: any = {
  content: [
    { text: 'Header', style: 'header' }, // pageBreak: 'before' (ngắt và chuyển sang trang mới)
    `Publish time: ${moment().format('LLL')}`,
    {
      style: 'table',
      table: {
        // headerRows: 1, // giữ header của table ở trang đầu tiên cho các trang sau (nếu có nhiều hơn 1 trang)
        widths: ['*', '*', '*', '*'], // standard width: 504
        body: [
          setHeaderRow(header),
          insertData(dataset),
        ],
      },
    },
    {
      style: 'table',
      table: {
        widths: ['*', 'auto'],
        body: [
          ['Xã hội này, chỉ có làm, chịu khó, cần cù thì bù siêng năng, chỉ có làm thì mới có ăn. Những cái loại không làm mà đòi có ăn thì ăn ...', { text: 'noWrap: true', noWrap: true /* không xuống dòng */ }],
        ],
      },
    },
  ],
  styles: {
    header: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    table: {
      margin: [0, 15, 0, 5],
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black',
      alignment: 'center',
    },
    dataCell: {
      alignment: 'center',
    }
  },
  // defaultStyle: {
  //   alignment: 'center',
  // }
};

const doc = printer.createPdfKitDocument(docDefinition);
doc.pipe(fs.createWriteStream('file.pdf'));
doc.end();
