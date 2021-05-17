const axios = require("axios");
const config = require("./config");
const store = axios.create({
  baseURL: `https://api.bigcommerce.com/stores/${config.bf}/v3`,
  headers: config.bf_xAuthTokenHeader,
});
module.exports = store;
