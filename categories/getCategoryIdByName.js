const { getCategoryByName } = require("./getCategoryByName");

exports.getCategoryIdByName = (name) =>
  new Promise((resolve, reject) =>
    getCategoryByName(name)
      .then(({ id }) => resolve(id))
      .catch((err) => reject(err))
  );
