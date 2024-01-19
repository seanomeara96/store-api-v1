/**
 * Get-all function to retrieve all info from a given url
 * @param {string} URL supply url for get request
 * @returns
 */
export const getAll =
  (URL: string) =>
  (params = {}): Promise<any[]> =>
    new Promise((resolve, reject) => {
      let pageNumber = 1;
      let aggregatedData: any[] = [];
      async function getData() {
        try {
          const { data } = await require("../../config/config").store.get(URL, {
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
        } catch (err: any) {
          if (err.response) return reject(err.response.data);
          return reject(err);
        }
      }
      getData();
    });

export async function all(
  params: any,
  getManyFn: (params: any) => any
) {
  try {
    const all = [];
    let page = 1;
    while (true) {
      const { data } = await getManyFn({
        params: {
          limit: 250,
          page: page,
          ...params,
        },
      });

      let batch;
      if (data.data === undefined) {
        batch = data;
      } else {
        batch = data.data;
      }

      if (batch.length) {
        all.push(...batch);
        page++;
        continue;
      } else {
        return all;
      }
    }
  } catch (err) {
    throw err;
  }
}
