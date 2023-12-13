import { stringify } from "csv-stringify";
import fs from "fs";

export function output(path: string, content: {[key: string]: any}[], header: boolean) {
  return new Promise((resolve, reject) => {
    stringify(content, { header }, function (err: any, output: string) {
      if (err) {
        throw new Error(err);
      }
      fs.writeFile(
        path,
        output,
        { encoding: "utf8" },
        function (err: any) {
          if (err) {
            return reject(err);
          }
          console.log("write out complete");
          resolve(output);
        }
      );
    });
  });
}
