require("../../config/config").config("bf");
const {
  applyFilterToMany,
} = require("../../functions/filters/applyFilterToMany");

const products = [{"Product ID":5933},
{"Product ID":5934},
{"Product ID":5935},
{"Product ID":5936},
{"Product ID":5937},
{"Product ID":5938}]

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

const redness = 'Redness/ Rosacea';

applyFilterToMany(products, skinConcerns, redness)
  .then(console.log)
  .catch(console.log);
