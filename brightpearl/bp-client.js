const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config("../");
const DATACENTER = process.env.BP_DATACENTER;
const ACCOUNT = process.env.BP_ACCOUNT;

const headers = {
    "brightpearl-app-ref": process.env.BP_APP_REFF,
    "brightpearl-staff-token": process.env.BP_STAFF_TOKEN,
  };

const bpClient = axios.create({
    baseUrl: `https://${DATACENTER}.brightpearlconnect.com/public-api/${ACCOUNT}`,
    headers
})

module.exports = bpClient