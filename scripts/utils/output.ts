import { stringify } from "csv-stringify";
import fs from "fs";

export function output(
  path: string,
  content: { [key: string]: any }[],
  header: boolean
): Promise<string> {
  return new Promise(function (resolve, reject) {
    stringify(content, { header }, function (err: any, output: string) {
      if (err) return reject(err);

      fs.writeFile(path, output, { encoding: "utf8" }, function (err: any) {
        if (err) {
          return reject(err);
        }
        resolve(output);
      });
    });
  });
}
