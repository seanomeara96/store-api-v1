const fs = require("fs");
/**
 * prints string to out.txt by default
 * @param {*} text 
 * @param {*} filename 
 */
export function simplePrint(text: string, filename="out"){
    fs.writeFile(`${filename}.txt`, text, (err: any) => {
        if(err) console.log(err);
        console.log("printed")
    })
}
