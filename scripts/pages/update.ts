require("../../config/config").config("bf")
import { getAllPages } from "../../functions/pages/getAllPages";



function update(){
    getAllPages().then(console.log)
}
update()