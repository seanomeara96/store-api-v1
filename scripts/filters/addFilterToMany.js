require("../../config/config").config("bf");
const {
  applyFilterToMany,
} = require("../../functions/filters/applyFilterToMany");

const products = [
  { "Product ID": 4543 },
  { "Product ID": 5869 },
  { "Product ID": 5870 },
];

const skinConcerns = "Skin Concerns";

const keyIngredients = "Key Ingredients";

const drySkin = "Dry Skin";

const oiliness = "Oiliness";

const dullness = "Dull Skin";

const fineLines = "Fine Lines";

const spf = "SPF";

const retinol = "Retinol";

const vitaminC = "Vitamin C";

const hyaluronicAcid = "Hyaluronic Acid";

applyFilterToMany(products, keyIngredients, hyaluronicAcid)
  .then(console.log)
  .catch(console.log);
