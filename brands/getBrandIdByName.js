const { getBrandByName } = require("./getBrandByName");
/**
 * Fetches brand id by name & resolves with a number
 * @param {*} name
 * @returns
 */
exports.getBrandIdByName = (name) =>
  new Promise((resolve, reject) => {
    getBrandByName(name)
      .then(({ id }) => resolve(id))
      .catch((err) => reject(err));
  });
