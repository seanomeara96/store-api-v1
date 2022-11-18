const fs = require("fs");
/**
 * prints string to out.txt by default
 * @param {*} text 
 * @param {*} filename 
 */
function simplePrint(text, filename="out"){
    fs.writeFile(`${filename}.txt`, text, (err) => {
        if(err) console.log(err);
        console.log("printed")
    })
}

module.exports = simplePrint;