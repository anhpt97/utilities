import axios from "axios";
import { CellValue, Workbook, Worksheet } from "exceljs";
import StylesXform from "exceljs/lib/xlsx/xform/style/styles-xform.js";
import { flatten } from "flat";
import { existsSync } from "fs";
import { mkdir } from "fs/promises";
import imageSize from "image-size";
import { join } from "path";

const { init } = StylesXform.prototype;
StylesXform.prototype.init = function (...args: any[]) {
  init.apply(this, args);
  this._addFont({ size: 11, name: "Arial" });
};

export class ReportService {
  private wb: Workbook;

  private ws: Worksheet;

  private outputDirPath = join(process.cwd(), "output");

  private outputFilePath = join(this.outputDirPath, "file.xlsx");

  private headers = {
    "good.code": "Mã hàng hóa",
    "good.name": "Tên hàng hóa",
    "consignment.name": "Lô hàng",
    "batch.name": "Mẻ hàng",
    "warehouseArea.name": "Khu vực kho",
    "warehouse.name": "Kho",
    inStock: "Tồn kho",
    "good.inventoryData.unit": "Đơn vị",
    manufacturingDate: "Ngày sản xuất",
  };

  private colIndexes = [];

  constructor() {
    this.wb = new Workbook();
    this.ws = this.wb.addWorksheet("Sheet1");
    this.ws.properties = {
      ...this.ws.properties,
      defaultRowHeight: 20,
      defaultColWidth: 20,
    };
    this.ws.columns = Object.keys(this.headers).map((key, i) => {
      this.colIndexes.push(String.fromCharCode(i + 65));
      return {
        header: this.headers[key],
        key,
        numFmt: key === "manufacturingDate" && "dd/mm/yyyy hh:mm:ss",
      };
    });
    if (!existsSync(this.outputDirPath)) {
      mkdir(this.outputDirPath);
    }
  }

  async exportToXlsx(dataSet: Record<string, any>[], imageUrl?: string) {
    this.colIndexes.forEach(
      (colIndex) =>
        (this.ws.getCell(`${colIndex}1`).style = {
          font: { name: "Arial", size: 10, bold: true },
          alignment: { horizontal: "center", vertical: "middle" },
          border: {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          },
          fill: {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "6D9EEB" },
          },
        })
    );

    dataSet.forEach((data, i) => {
      this.ws.addRow(flatten(data));
      this.colIndexes.forEach(
        (colIndex) =>
          (this.ws.getCell(`${colIndex}${i + 2}`).style = {
            alignment: { horizontal: "center", vertical: "middle" },
            border: {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            },
          })
      );
    });

    if (imageUrl) {
      const { data } = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      const ws2 = this.wb.addWorksheet();
      ws2.addImage(this.wb.addImage({ extension: "jpeg", buffer: data }), {
        tl: { col: 0, row: 0 },
        ext: imageSize(data),
      });
    }

    this.wb.xlsx.writeFile(this.outputFilePath);

    /* Service:
      return this.wb.xlsx.writeBuffer();
    */
    /* Controller:
      res.attachment("file.xlsx");
      res.end(buffer);
    */
  }

  async readXlsx(buffer: Buffer) {
    const ws = (await this.wb.xlsx.load(buffer)).getWorksheet();
    const headers = (ws.getRow(1).values as CellValue[]).reduce(
      (acc, value, i) => ({ ...acc, [i]: value }),
      {}
    );
    const dataSet = [];
    for (let i = 2; i <= ws.rowCount; i++) {
      dataSet.push(
        (ws.getRow(i).values as CellValue[]).reduce(
          (acc, value, i) => ({ ...acc, [headers[i]]: value }),
          {}
        )
      );
    }
    console.log(dataSet);
  }
}

new ReportService().exportToXlsx(
  [
    {
      good: { code: "A", name: "B", inventoryData: { unit: "G" } },
      consignment: { name: "C" },
      batch: { name: "D" },
      warehouseArea: { name: "E" },
      warehouse: { name: "F" },
      inStock: 0,
      manufacturingDate: new Date(),
    },
  ],
  "https://doanhnhanplus.vn/wp-content/uploads/2022/06/suni-ha-linh-huong-mua-he-20220629-dnplus-4.jpg"
);

// new ReportService().readXlsx(
//   readFileSync(join(process.cwd(), "output", "file.xlsx"))
// );
