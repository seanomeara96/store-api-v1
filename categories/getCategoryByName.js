const { getAllCategories } = require("./getAllCategories");
/**
 * Fetches a category object by name, if there are multiple it will reject
 * @param {*} name
 * @returns
 */
exports.getCategoryByName = (name) =>
  new Promise((resolve, reject) =>
    getAllCategories({ name })
      .then((res) => {
        if (res.length > 1)
          return reject("there are multiple categories with this name");
        resolve(res[0]);
      })
      .catch((err) => reject(err))
  );
