const api = require("./config/config");
api.config("bf");
api.store
  .get("/storefront/redirects")
  .then((res) => console.log(res.data.length))
  .catch((err) => console.log(err));
