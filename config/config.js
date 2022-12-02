const dotenv = require("dotenv");
const path = require("path");
const axios = require("axios");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
let api = {
  store: undefined,
  config: (storeInitials, version = 3) => {
    api.store = undefined;
    if (typeof storeInitials !== "string") {
      throw new Error(
        `Must supply store initials of type string. Recieved type ${typeof storeInitials} instead...`
      );
    }
    console.log("config called");
    storeInitials = storeInitials.toUpperCase();
    const storeToken = process.env[`${storeInitials}_XAUTHTOKEN`];
    const storeHash = process.env[`${storeInitials}_STORE_HASH`];

    if (!storeHash || !storeToken) {
      throw new Error(
        `You Dont Have keys for store wih initials of ${storeInitials}`
      );
    }
    api.store = axios.create({
      baseURL: `https://api.bigcommerce.com/stores/${storeHash}/v${version}`,
      headers: { "x-auth-token": storeToken },
    });
  },
};

module.exports = api;
