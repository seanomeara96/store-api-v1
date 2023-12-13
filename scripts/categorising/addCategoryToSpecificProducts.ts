import { addCatToProduct } from "../../functions/products/addCatToProduct";

require("../../config/config").config("bf");

const productIds = [
  {
    "Product ID": 7091,
  },
  {
    "Product ID": 7468,
  },
  {
    "Product ID": 3404,
  },
  {
    "Product ID": 7466,
  },
  {
    "Product ID": 7102,
  },
  {
    "Product ID": 3307,
  },
  {
    "Product ID": 6292,
  },
  {
    "Product ID": 7214,
  },
  {
    "Product ID": 5872,
  },
  {
    "Product ID": 6370,
  },
  {
    "Product ID": 6306,
  },
  {
    "Product ID": 7175,
  },
  {
    "Product ID": 7176,
  },
  {
    "Product ID": 7026,
  },
  {
    "Product ID": 1534,
  },
  {
    "Product ID": 1772,
  },
  {
    "Product ID": 6366,
  },
  {
    "Product ID": 6362,
  },
  {
    "Product ID": 5507,
  },
  {
    "Product ID": 6303,
  },
  {
    "Product ID": 6297,
  },
  {
    "Product ID": 7484,
  },
  {
    "Product ID": 6753,
  },
  {
    "Product ID": 6979,
  },
  {
    "Product ID": 6980,
  },
  {
    "Product ID": 6981,
  },
  {
    "Product ID": 6999,
  },
  {
    "Product ID": 7121,
  },
  {
    "Product ID": 7122,
  },
  {
    "Product ID": 7123,
  },
  {
    "Product ID": 7124,
  },
  {
    "Product ID": 7184,
  },
  {
    "Product ID": 7188,
  },
  {
    "Product ID": 4163,
  },
  {
    "Product ID": 6363,
  },
  {
    "Product ID": 6361,
  },
  {
    "Product ID": 4159,
  },
  {
    "Product ID": 6365,
  },
  {
    "Product ID": 6367,
  },
  {
    "Product ID": 7194,
  },
  {
    "Product ID": 6368,
  },
];


(async () => {
  try {
    for (let i = 0; i < productIds.length; i++) {
      const p_id = Object.values(productIds[i])[0];
      try {
        await addCatToProduct(p_id, 640);
        console.log(`updated ${i + 1} of ${productIds.length}`);
      } catch (err: any) {
        if (err.status === 429) {
          console.log("too many requests");
          await new Promise((resolve) => setTimeout(resolve, 10000));
          i--;
          continue;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
