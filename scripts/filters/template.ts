require("../../config/config").config("bf");

import { applyCustomField } from "../../functions/custom-fields/applyCustomField";
import { getProductByName } from "../../functions/products/getProductByName";

const data: any[] = [
  {
    Key: "Skin Concerns",
    Value: "Acne / Blemish",
    "Bioderma Sensibio Gel Moussant / Foaming Gel (Pump) - 200ml": "",
    "Bioderma Sensibio Defensive Active Soothing Cream 40ml": "",
    "Bioderma Sensibio AR Anti Redness Cream 40ml": "",
    "Bioderma Sensibio AR BB Anti Redness Cream 40ml": "",
    "Bioderma Hydrabio Radiance Booster SPF 30 40ml": "",
    "Bioderma Photoderm Max Cream SPF 50+ 40ml": "",
    "Bioderma Photoderm Max Aquafluide SPF 50+ 40ml": "",
    "Bioderma Photoderm Spot Age SPF 50+ 40ml": "",
    "Bioderma Photoderm AR SPF 50+ 30ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR + Sensibio Foaming Gel 500ml": "",
    "Bioderma #FreeFromRedness: Sensibio AR BB + Sensibio AR H2O 250ml": "",
    "Bioderma Pigmentbio Daily Care Spf 50+ 40ml": "",
  },
];

(async function () {
  for (const field of data) {
    const products = Object.keys(field).filter(function (name) {
      return name !== "Key" && name !== "Value";
    });
    for (const product of products) {
      if (field[product].toLowerCase() === "x") {
        try {
          const { id } = await getProductByName(product.trim());
          if (!id || typeof id !== "number") {
            console.log("failed to fetch ID");
            return;
          }
          try {
            const res = await applyCustomField(id, field.Key, field.Value);
            console.log(
              `${field.Key}=${field.Value} was ${
                res ? "" : "not "
              }added to ${product}`,
            );
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
})();
