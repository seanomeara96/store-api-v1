require("./config/config").config("bf", 2);

require("./config/config").store.get('/payments/methods').then(console.log).catch(console.log)