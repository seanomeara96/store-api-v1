require("../../config/config").config("bf");
import { applyCustomFieldToMany } from "../../functions/custom-fields/applyCustomFieldsToMany";


const products = [
  { "Product ID": 5933 },
  { "Product ID": 5934 },
  { "Product ID": 5935 },
  { "Product ID": 5936 },
  { "Product ID": 5937 },
  { "Product ID": 5938 },
];
applyCustomFieldToMany(products.map(p => p["Product ID"]), "", "")
  .then(console.log)
  .catch(console.log);
