require("../../config/config").config("pb")

const data:any[] = [];

function validateFields(obj){
    ["Page Title ", "Meta Description"].forEach(i => {
        if(!obj.hasOwnProperty(i)){
            throw new Error(`Missing Property ${i}`)
        }
    })
}

data.forEach(validateFields)


const { updateBrand } = require("../../functions/brands/updateBrand");

(async () => {

    for (const x of data){

        console.log(`Updating ${x.name}...`)
        
        const res = await updateBrand(x.id, {
            page_title: x["Page Title "],
            meta_description: x["Meta Description"]
        }).catch(err => {
            throw new Error(err)
        })

        console.log("success");
    }

})()