/**
 *
 * @returns url string of current site
 */
exports.getSiteUrl = () => {
  return new Promise((resolve, reject) => {
    require("../config/config")
      .store.get("/sites")
      .then((sites) => resolve(sites.data.data[0].url))
      .catch((err) => {
        if (err.response.data.status === 403) {
          console.log(
            "you did not have permission to access this so the siteUrl will remain empty"
          );
          resolve("");
        } else {
          reject(err);
        }
      });
  });
};
