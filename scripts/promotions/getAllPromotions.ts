import { getAllPromotions } from "../../functions/promotions/promotions"

async function getAllPromos(){
    try {
        require("../../config/config").config("bf")
        const promos = await getAllPromotions({redemption_type: "automatic", status: "ENABLED"})
        for(const p of promos) console.log(p.name, p.rules[0])
    } catch(err) {
        console.log(err)
    }
}
getAllPromos()