require("../../config/config").config("bf")
const { applyFilter } = require("../../functions/filters/applyFilter");
const { getProductIdByName } = require("../../functions/products/getProductIdByName");

const data = [
  {
    Key: "Skin Concerns",
    Value: "Acne / Blemish",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "",
    "Finca Skin Organics Calming Serum 2": "x",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Anti Pollution",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Dark Circles",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Dry Skin",
    "Finca Skin Organics Calming Serum 1": "x",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "x",
  },
  {
    Key: "Skin Concerns",
    Value: "Dull Skin",
    "Finca Skin Organics Calming Serum 1": "x",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "x",
  },
  {
    Key: "Skin Concerns",
    Value: "Fine Lines",
    "Finca Skin Organics Calming Serum 1": "x",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "x",
  },
  {
    Key: "Skin Concerns",
    Value: "Hyperpigmentation",
    "Finca Skin Organics Calming Serum 1": "x",
    "Finca Skin Organics Moisturising Balm": "",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "x",
  },
  {
    Key: "Skin Concerns",
    Value: "Oiliness",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "",
    "Finca Skin Organics Calming Serum 2": "x",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Pregnancy Safe",
    "Finca Skin Organics Calming Serum 1": "x",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "x",
  },
  {
    Key: "Skin Concerns",
    Value: "Psoriasis",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Redness/ Rosacea",
    "Finca Skin Organics Calming Serum 1": "X",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "X",
    "Finca Skin Organics Anti Redness Primer": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "X",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "X",
  },
  {
    Key: "Skin Concerns",
    Value: "Sensitive Skin",
    "Finca Skin Organics Calming Serum 1": "x",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "x",
    "Finca Skin Organics Anti Redness Primer": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "X",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "X",
  },
  {
    Key: "Skin Concerns",
    Value: "White / Blackheads",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Antioxidants",
    "Finca Skin Organics Calming Serum 1": "x",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "x",
    "Finca Skin Organics Anti Redness Primer": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "x",
  },
  {
    Key: "Key Ingredients",
    Value: "Glycolic Acid",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Hyaluronic Acid",
    "Finca Skin Organics Calming Serum 1": "x",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Retinol",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Salicylic Acid",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Vegan",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "x",
  },
  {
    Key: "Key Ingredients",
    Value: "Vitamin C",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "",
  },
  {
    Key: "Skin Type",
    Value: "Dry Skin",
    "Finca Skin Organics Calming Serum 1": "x",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "x",
  },
  {
    Key: "Skin Type",
    Value: "Dull Skin",
    "Finca Skin Organics Calming Serum 1": "x",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "x",
  },
  {
    Key: "Skin Type",
    Value: "Normal & Combination",
    "Finca Skin Organics Calming Serum 1": "",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "x",
    "Finca Skin Organics Anti Redness Primer": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "x",
  },
  {
    Key: "Skin Type",
    Value: "Sensitive Skin",
    "Finca Skin Organics Calming Serum 1": "x",
    "Finca Skin Organics Moisturising Balm": "x",
    "Finca Skin Organics Calming Serum 2": "",
    "Finca Skin Organics Anti Redness Primer": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Light to Medium": "x",
    "Finca Skin Organics Tinted SPF 30 Sunscreen Medium to Dark": "x",
  },
];


(async function(){
    for(const field of data){
        const products = Object.keys(field).filter(name => name !== "Key" && name !== "Value");
       for(const product of products){
        const id = await getProductIdByName(product.name).catch(console.log);
        if(field[product]){
            const res = await applyFilter(id, field.Key, field.Value).catch(console.log);
            console.log(`${field.Key}=${field.Value} was added to ${product}`, res);
        }
       }
    }
})()