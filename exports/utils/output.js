const stringify = require("csv-stringify");
const fs = require("fs");
/**
 * outputs data to csv file
 * @param {*} content
 */
const output = (name, content, header=true) => {
    stringify(content, { header }, (err, output) => {
      if (err) {
        throw new Error(err);
      }
      fs.writeFile(`./${name}-ouput.csv`, output, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
    });
  };

  module.exports = output