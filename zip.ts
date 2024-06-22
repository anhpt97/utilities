import archiver from "archiver";
import { createWriteStream, existsSync, mkdirSync } from "fs";
// import { writeFile } from "fs/promises";
// import JSZip from "jszip";
import { join } from "path";
// import { gzipSync } from "zlib";

const outputDirPath = join(process.cwd(), "output");

if (!existsSync(outputDirPath)) {
  mkdirSync(outputDirPath);
}

const zip = () => {
  const data = Buffer.from("Hello, World!");

  /* zlib */
  // writeFile(join(outputDirPath, "file.gz"), gzipSync(data));

  /* JSZip */
  // const zip = new JSZip();
  // zip.file("file.txt", data);

  // zip
  //   .generateNodeStream()
  //   .pipe(createWriteStream(join(outputDirPath, "file.zip")));
  /* Controller:
    zip.generateNodeStream().pipe(res.attachment("file.zip"));
  */

  const archive = archiver("zip");
  archive.append(data, { name: "file.txt" });

  archive.pipe(createWriteStream(join(outputDirPath, "file.zip")));
  archive.finalize();
  /* Controller:
    archive.pipe(res.attachment("file.zip"));
    archive.finalize();
  */
};

zip();
