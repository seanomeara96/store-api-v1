// 1086 Wingback Armchair Red remove option set 18

const {config} = require("./config/config")

config("ha", 2);


const {store} = require("./config/config")

store.get(`/option_sets`).then(res => console.log(res.data));