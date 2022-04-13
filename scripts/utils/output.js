const { stringify } = require("csv-stringify");
const fs = require("fs");
/**
 * outputs data to csv file
 * @param {*} content
 */
const output = (name, content, header = true) =>
  new Promise((resolve, reject) => {
    stringify(content, { header }, (err, output) => {
      if (err) {
        throw new Error(err);
      }
      fs.writeFile(
        `./${name}-ouput.csv`,
        output,
        { encoding: "utf8" },
        (err) => {
          if (err) {
            return reject(err);
          }
          console.log("write out complete");
          resolve(output);
        }
      );
    });
  });

exports.output = output;
