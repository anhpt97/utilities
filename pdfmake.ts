import axios from "axios";
import { Big } from "big.js";
import { createWriteStream, existsSync } from "fs";
import { mkdir } from "fs/promises";
import numeral from "numeral";
import { join } from "path";
import PdfPrinter from "pdfmake";
import { TDocumentDefinitions, TableCell } from "pdfmake/interfaces";
import standardPageSizes from "pdfmake/src/standardPageSizes";
import { dataSet } from "./common/dataSet";

enum Style {
  CELL_1 = "cell1",
  CELL_2 = "cell2",
  CELL_3 = "cell3",
  TABLE = "table",
  TABLE_HEADER = "tableHeader",
}

export class ReportService {
  private printer: PdfPrinter;

  private fontsDirPath = join(process.cwd(), "fonts");

  private outputDirPath = join(process.cwd(), "output");

  private imagePath = join(process.cwd(), "images", "logo.png");

  private outputFilePath = join(this.outputDirPath, "file.pdf");

  private headers = {
    period: "Kỳ",
    openingBalance: "Dư nợ đầu kỳ",
    principalPayment: "Trả gốc trong kỳ",
    interestPayment: "Trả lãi trong kỳ",
    totalMonthlyPayment: "Tổng số trả trong kỳ",
    closingBalance: "Dư nợ cuối kỳ",
  };

  constructor() {
    this.printer = new PdfPrinter({
      Roboto: {
        normal: join(this.fontsDirPath, "Roboto-Regular.ttf"),
        bold: join(this.fontsDirPath, "Roboto-Medium.ttf"),
        italics: join(this.fontsDirPath, "Roboto-Italic.ttf"),
        bolditalics: join(this.fontsDirPath, "Roboto-MediumItalic.ttf"),
      },
    });
    if (!existsSync(this.outputDirPath)) {
      mkdir(this.outputDirPath);
    }
  }

  async exportToPdf(
    principalAmount: number,
    interestRate: number,
    dataSet: Record<string, any>[],
    imageUrls?: string[]
  ) {
    // const { width, height } = imageSize(
    //   await sharp(
    //     (
    //       await axios.get(
    //         "https://doanhnhanplus.vn/wp-content/uploads/2022/06/suni-ha-linh-huong-mua-he-20220629-dnplus-4.jpg",
    //         { responseType: "arraybuffer" }
    //       )
    //     ).data
    //   )
    //     .rotate()
    //     .toBuffer()
    // );
    // console.log(width, height);
    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          table: {
            body: [
              [
                existsSync(this.imagePath)
                  ? {
                      image: this.imagePath,
                      width: 96,
                      height: 39.525,
                    }
                  : {},
                {
                  alignment: "center",
                  text: [
                    { text: "Số tiền cần vay: ", style: Style.CELL_1 },
                    {
                      text: `${numeral(principalAmount).format("0,0")} ₫`,
                      style: Style.CELL_2,
                    },
                  ],
                },
                {
                  alignment: "right",
                  text: [
                    { text: "Lãi suất ưu đãi: ", style: Style.CELL_1 },
                    {
                      text: `${Big(interestRate).times(100)} %`,
                      style: Style.CELL_2,
                    },
                  ],
                },
              ],
            ],
            widths: Array(3).fill("*"),
          },
          layout: "noBorders",
          style: Style.TABLE,
        },
        {
          table: {
            body: [
              Object.values(this.headers).map(
                (header) =>
                  ({
                    noWrap: true,
                    text: header,
                    style: Style.TABLE_HEADER,
                  } as TableCell)
              ),
              ...dataSet.map((data) =>
                Object.keys(this.headers).map(
                  (header) =>
                    ({
                      text: numeral(Math.round(data[header])).format("0,0"),
                      style: Style.CELL_3,
                    } as TableCell)
                )
              ),
            ],
            widths: [30, ...Array(5).fill("*")],
            headerRows: 1,
          },
          style: Style.TABLE,
        },
        imageUrls?.length && {
          table: {
            body: [
              (
                await Promise.all(
                  imageUrls.map(
                    (url) =>
                      url && axios.get(url, { responseType: "arraybuffer" })
                  )
                )
              ).map(
                (response) =>
                  (response
                    ? {
                        alignment: "center",
                        image: `data:image/jpeg;base64,${Buffer.from(
                          response.data
                        ).toString("base64")}`,
                        width: standardPageSizes["A5"][0] / imageUrls.length,
                        style: Style.CELL_3,
                      }
                    : {}) as TableCell
              ),
            ],
            widths: Array(imageUrls.length).fill("*"),
          },
        },
      ],
      styles: {
        [Style.CELL_1]: {
          fontSize: 9,
        },
        [Style.CELL_2]: {
          fontSize: 9,
          bold: true,
          color: "#0000FF",
        },
        [Style.CELL_3]: {
          alignment: "center",
        },
        [Style.TABLE]: {
          margin: [0, -5, 0, 30],
        },
        [Style.TABLE_HEADER]: {
          fontSize: 9,
          bold: true,
          alignment: "center",
          color: "#0000FF",
        },
      },
    };

    const pdfDoc = this.printer.createPdfKitDocument(docDefinition);
    // void writeFile(
    //   this.outputFilePath,
    //   await new Promise((resolve) => {
    //     const chunks = [];
    //     pdfDoc.on("data", (chunk) => chunks.push(chunk));
    //     pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
    //     pdfDoc.end();
    //   })
    // );
    pdfDoc.pipe(createWriteStream(this.outputFilePath));
    pdfDoc.end();

    /* Service:
      return this.printer.createPdfKitDocument(docDefinition);
    */
    /* Controller:
      res.attachment("file.pdf"); // For preview: res.set({ "Content-Disposition": 'inline; filename="file.pdf"', "Content-Type": "application/pdf" });
      pdfDoc.pipe(res);
      pdfDoc.end();
    */
  }
}

new ReportService().exportToPdf(2400000000, 0.07, dataSet, [
  "https://doanhnhanplus.vn/wp-content/uploads/2022/06/suni-ha-linh-huong-mua-he-20220629-dnplus-4.jpg",
  "https://vov2-media.solidtech.vn/sites/default/files/styles/large/public/2022-07/qmg_8951.jpg",
  "https://sohanews.sohacdn.com/160588918557773824/2022/7/3/qmg9004-16568222172131271583801.jpg",
  null,
]);
