const { getAllProducts } = require("../../functions/products/getAllProducts");

const yotpoFormat = () => {
  return {
    "Product ID": "null",
    "Product Name": "null",
    "Product Description": "null",
    "Product URL": "null",
    "Product Image URL": "null",
    "Product Price": "null",
    Currency: "null",
    "Spec UPC": "null",
    "Spec SKU": "null",
    "Spec Brand": "null",
    "Spec MPN": "null",
    "Spec ISBN": "null",
    "Spec EAN": "null",
    "Product Tags": "null",
    Blacklisted: "null",
    "Product Group": "null",
  };
};
function main() {
    getAllProducts().then(getImages).then(updateUrls).then(yotpoFormat).then(output)
}
