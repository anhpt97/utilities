import archiver from "archiver";
import { createWriteStream } from "fs";
// import { writeFile } from "fs/promises";
// import JSZip from "jszip";
import { join } from "path";
// import { gzipSync } from "zlib";

const zip = () => {
  const data = Buffer.from("Hello, World!");
  const filename = "file.txt";

  /* zlib */
  // writeFile(join(process.cwd(), "file.gz"), gzipSync(data));

  /* JSZip */
  // const zip = new JSZip();
  // zip.file(filename, data);

  // zip
  //   .generateNodeStream()
  //   .pipe(createWriteStream(join(process.cwd(), "file.zip")));
  /* Controller:
    res.attachment("file.zip");
    zip.generateNodeStream().pipe(res);
  */

  const archive = archiver("zip");
  archive.append(data, { name: filename });

  archive.pipe(createWriteStream(join(process.cwd(), "file.zip")));
  archive.finalize();
  /* Controller:
    res.attachment("file.zip");
    archive.pipe(res);
    archive.finalize();
  */
};

zip();
