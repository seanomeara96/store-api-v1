const api = require("../config/config");
const output  = require("./utils/output");
api.config("bf", 2);
const instance = api.store;
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

getAllCoupons()
  .then((res) => {
    console.log(res);
    output("coupons", res);
  })
  .catch((err) => console.log(err));
