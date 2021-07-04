const api = require("./config/config")
api.config("bf");
api.store.get("/sites").then(sites => console.log(sites.data.data[0].url))

