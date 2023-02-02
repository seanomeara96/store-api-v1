require("./config/config")
const { fetchCustomers } = require("./yotpo/fetchCustomers");

fetchCustomers().then(console.log).catch(console.log);
