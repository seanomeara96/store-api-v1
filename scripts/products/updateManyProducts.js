(async () => {
  const { updateProduct } = require("../../functions/products/updateProduct");

  require("../../config/config").config("bf");

  const data = [{"Product ID":6847},
  {"Product ID":6848},
  {"Product ID":6849},
  {"Product ID":6850},
  {"Product ID":6851},
  {"Product ID":6852},
  {"Product ID":6853},
  {"Product ID":6854},
  {"Product ID":6855},
  {"Product ID":6856},
  {"Product ID":6857},
  {"Product ID":6858},
  {"Product ID":6859},
  {"Product ID":6860},
  {"Product ID":6861},
  {"Product ID":6862},
  {"Product ID":6863},
  {"Product ID":6864},
  {"Product ID":6865},
  {"Product ID":6866},
  {"Product ID":6867},
  {"Product ID":6868},
  {"Product ID":6869},
  {"Product ID":6870},
  {"Product ID":6871}];
  let count = 1;
  try {
    for (const p of data) {
      console.clear();
      console.log("Updating " + p["Product ID"]);
      await updateProduct(p["Product ID"], {
        brand_id: 220,
      });
      console.log(`Updated ${count}/${data.length}`);
      count++;
    }
  } catch (err) {
    console.log(err);
  }
})();
