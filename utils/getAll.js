/**
 * Get-all function to retrieve all info from a given url
 * @param {string} URL supply url for get request
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
          const { data } = await require("../config/config").store.get(URL, {
            params: {
              limit: 250,
              page: pageNumber,
              ...params,
            },
          });
          let dataArray;
          if (data.data === undefined) {
            dataArray = data;
          } else {
            dataArray = data.data;
          }
          if (dataArray.length) {
            aggregatedData.push(...dataArray);
            pageNumber++;
            getData();
          } else {
            resolve(aggregatedData);
          }
        } catch (err) {
          reject(err.response.data);
        }
      }
      getData();
    });
