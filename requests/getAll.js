const store = require("../config/axios-config");
/**
 * Get-all function to retrieve all info from a given url
 * @param {*} URL supply url for get request
 * @returns
 */
exports.getAll =
  (URL) =>
  (params = {}) =>
    new Promise((resolve, reject) => {
      let pageNumber = 1;
      let aggregatedData = [];
      async function getData() {
        try {
          const { data } = await store.get(URL, {
            params: {
              limit: 250,
              page: pageNumber,
              ...params,
            },
          });
          if (data.data === undefined) return reject("data is undefined");
          let dataArray = data.data;
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
