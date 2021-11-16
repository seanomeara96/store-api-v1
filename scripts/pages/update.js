require("../../config/config").config("bf")
const { getAllPages } = require("../../functions/pages/getAllPages");

const filterForPage = () => {}

function update(){
    getAllPages().then(console.log)
}
update()