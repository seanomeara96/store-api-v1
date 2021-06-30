const { applySpecificFilters } = require("./modules/create");
require("../config/config").config("bf");
const data = [
  {
    Key: "Skin Concerns",
    Value: "Acne / Blemish",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Anti Pollution",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Dark Circles",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "x",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Dry Skin",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "x",
  },
  {
    Key: "Skin Concerns",
    Value: "Dull Skin",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "x",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "x",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "x",
  },
  {
    Key: "Skin Concerns",
    Value: "Fine Lines",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "x",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Hyperpigmentation",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "x",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "x",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "x",
  },
  {
    Key: "Skin Concerns",
    Value: "Oiliness",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "x",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Pregnancy Safe",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Psoriasis",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Redness/ Rosacea",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "x",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "Sensitive Skin",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "x",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Skin Concerns",
    Value: "White / Blackheads",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Antioxidants",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "x",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "x",
  },
  {
    Key: "Key Ingredients",
    Value: "Glycolic Acid",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Hyaluronic Acid",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "x",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Retinol",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Salicylic Acid",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Vegan",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Key Ingredients",
    Value: "Vitamin C",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "x",
  },
  {
    Key: "Skin Type",
    Value: "Dry Skin",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "x",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "x",
  },
  {
    Key: "Skin Type",
    Value: "Dull Skin",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "x",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "x",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "x",
  },
  {
    Key: "Skin Type",
    Value: "Normal & Combination",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "x",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
  {
    Key: "Skin Type",
    Value: "Sensitive Skin",
    "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
    "The INKEY list Alpha Hydroxy Acid 30ml": "",
    "The INKEY list Caffeine 15ml": "",
    "The Inkey List Fulvic Acid Cleanser 150ml": "x",
    "The INKEY list Hemp Oil 30ml": "",
    "The Inkey List Snow Mushroom Moisturiser 30ml": "x",
    "The Inkey List Symbright Moisturiser 50ml": "",
  },
]; // data goes here

applySpecificFilters(data)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
