const api = require("./config/config");
api.config("bf", 2);
const instance = api.store;
const stringify = require("csv-stringify");
const fs = require("fs");
const getAll =
  (URL) =>
  (params = {}) =>
    new Promise((resolve, reject) => {
      let pageNumber = 1;
      let aggregatedData = [];
      async function getData() {
        try {
          const { data } = await instance.get(URL, {
            params: {
              limit: 250,
              page: pageNumber,
              ...params,
            },
          });
          let dataArray = data;
          if (dataArray.length) {
            aggregatedData.push(...dataArray);
            pageNumber++;
            getData();
          } else {
            resolve(aggregatedData);
          }
        } catch (err) {
          reject(err);
        }
      }
      getData();
    });

const getAllCoupons = getAll("/coupons");
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


getAllCoupons()
  .then((res) => {
    console.log(res)
    output("coupons", res)
  })
  .catch((err) => console.log(err));
