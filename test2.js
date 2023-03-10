const {
  updateProductVariant,
} = require("./functions/product-variants/updateProductVariant");
const { addCatToProduct } = require("./functions/products/addCatToProduct");
const {
  getProductIdFromSku,
} = require("./functions/products/getProductIdFromSku");
const {
  getProductVariants,
} = require("./functions/products/getProductVariants");
const { updateProduct } = require("./functions/products/updateProduct");

require("./config/config").config("ih");
const data = [
  {
    sku: "11026",
    cost: "0",
    sale_price: "0.00",
  },
  {
    sku: "10114",
    cost: "10.89",
    sale_price: "15.76",
  },
  {
    sku: "10109",
    cost: "10.89",
    sale_price: "15.76",
  },
  {
    sku: "5822",
    cost: "14.64",
    sale_price: "21.18",
  },
  {
    sku: "10113",
    cost: "13.61",
    sale_price: "19.69",
  },
  {
    sku: "100270",
    cost: "3.0769",
    sale_price: "4.45",
  },
  {
    sku: "10402",
    cost: "0",
    sale_price: "0.00",
  },
  {
    sku: "5819",
    cost: "23.9",
    sale_price: "34.58",
  },
  {
    sku: "10590",
    cost: "19.07",
    sale_price: "27.60",
  },
  {
    sku: "10662",
    cost: "0",
    sale_price: "0.00",
  },
  {
    sku: "9515",
    cost: "0.38",
    sale_price: "0.55",
  },
  {
    sku: "6340",
    cost: "0.16",
    sale_price: "0.23",
  },
  {
    sku: "11649",
    cost: "0",
    sale_price: "0.00",
  },
  {
    sku: "9516",
    cost: "0.9",
    sale_price: "1.30",
  },
  {
    sku: "9194",
    cost: "2.25",
    sale_price: "3.26",
  },
  {
    sku: "9370",
    cost: "4.31",
    sale_price: "6.24",
  },
  {
    sku: "9318",
    cost: "11.96",
    sale_price: "17.31",
  },
  {
    sku: "9317",
    cost: "11.96",
    sale_price: "17.31",
  },
  {
    sku: "9367",
    cost: "8.65",
    sale_price: "12.52",
  },
  {
    sku: "12057",
    cost: "14.23",
    sale_price: "20.59",
  },
  {
    sku: "12058",
    cost: "15.93",
    sale_price: "23.05",
  },
  {
    sku: "9707",
    cost: "17.5",
    sale_price: "25.32",
  },
  {
    sku: "11345",
    cost: "16",
    sale_price: "23.15",
  },
  {
    sku: "11450",
    cost: "13.62",
    sale_price: "19.71",
  },
  {
    sku: "9701",
    cost: "12.5",
    sale_price: "18.09",
  },
  {
    sku: "11108",
    cost: "8.86",
    sale_price: "12.82",
  },
  {
    sku: "11449",
    cost: "13.62",
    sale_price: "19.71",
  },
  {
    sku: "9700",
    cost: "11",
    sale_price: "15.92",
  },
  {
    sku: "9201",
    cost: "17.07",
    sale_price: "24.70",
  },
  {
    sku: "9195",
    cost: "4.52",
    sale_price: "6.54",
  },
  {
    sku: "11722",
    cost: "13.2967",
    sale_price: "19.24",
  },
  {
    sku: "10161",
    cost: "7.9",
    sale_price: "11.43",
  },
  {
    sku: "7001",
    cost: "2.6264",
    sale_price: "3.80",
  },
  {
    sku: "7004",
    cost: "2.6264",
    sale_price: "3.80",
  },
  {
    sku: "10155",
    cost: "7.9",
    sale_price: "11.43",
  },
  {
    sku: "11451",
    cost: "10.9",
    sale_price: "15.77",
  },
  {
    sku: "5825",
    cost: "25.94",
    sale_price: "37.54",
  },
  {
    sku: "4429",
    cost: "8.06",
    sale_price: "11.66",
  },
  {
    sku: "8518",
    cost: "6.53",
    sale_price: "9.45",
  },
  {
    sku: "10239",
    cost: "7.9",
    sale_price: "11.43",
  },
  {
    sku: "9534",
    cost: "2.41",
    sale_price: "3.49",
  },
  {
    sku: "9536",
    cost: "7.68",
    sale_price: "11.11",
  },
  {
    sku: "7042",
    cost: "1.98",
    sale_price: "2.87",
  },
  {
    sku: "11411",
    cost: "15.95",
    sale_price: "23.08",
  },
  {
    sku: "11412",
    cost: "15.95",
    sale_price: "23.08",
  },
  {
    sku: "8501",
    cost: "7.2",
    sale_price: "10.42",
  },
  {
    sku: "11448",
    cost: "5.22",
    sale_price: "7.55",
  },
  {
    sku: "11727",
    cost: "44.19",
    sale_price: "63.95",
  },
  {
    sku: "11726",
    cost: "44.19",
    sale_price: "63.95",
  },
  {
    sku: "10615",
    cost: "4.63",
    sale_price: "6.70",
  },
  {
    sku: "9697",
    cost: "7.75",
    sale_price: "11.21",
  },
  {
    sku: "11720",
    cost: "8.7033",
    sale_price: "12.59",
  },
  {
    sku: "11721",
    cost: "8.7033",
    sale_price: "12.59",
  },
  {
    sku: "8237",
    cost: "8.17",
    sale_price: "11.82",
  },
  {
    sku: "10235",
    cost: "7.9",
    sale_price: "11.43",
  },
  {
    sku: "10153",
    cost: "7.9",
    sale_price: "11.43",
  },
  {
    sku: "6999",
    cost: "3.2967",
    sale_price: "4.77",
  },
  {
    sku: "7006",
    cost: "2.6374",
    sale_price: "3.82",
  },
  {
    sku: "11407",
    cost: "17.5",
    sale_price: "25.32",
  },
  {
    sku: "10619",
    cost: "4.63",
    sale_price: "6.70",
  },
  {
    sku: "10617",
    cost: "4.63",
    sale_price: "6.70",
  },
  {
    sku: "10613",
    cost: "4.63",
    sale_price: "6.70",
  },
  {
    sku: "10508",
    cost: "8.29",
    sale_price: "12.00",
  },
  {
    sku: "10510",
    cost: "5.18",
    sale_price: "7.50",
  },
  {
    sku: "10513",
    cost: "5.39",
    sale_price: "7.80",
  },
  {
    sku: "10515",
    cost: "9.95",
    sale_price: "14.40",
  },
  {
    sku: "9706",
    cost: "17.5",
    sale_price: "25.32",
  },
  {
    sku: "9703",
    cost: "12.5",
    sale_price: "18.09",
  },
  {
    sku: "10565",
    cost: "9.75",
    sale_price: "14.11",
  },
  {
    sku: "9554",
    cost: "35.33",
    sale_price: "51.12",
  },
  {
    sku: "9545",
    cost: "54.55",
    sale_price: "78.94",
  },
  {
    sku: "9539",
    cost: "45.61",
    sale_price: "66.00",
  },
  {
    sku: "9555",
    cost: "38.01",
    sale_price: "55.00",
  },
  {
    sku: "7041",
    cost: "2.25",
    sale_price: "3.26",
  },
  {
    sku: "10001",
    cost: "57.89",
    sale_price: "83.77",
  },
  {
    sku: "9991",
    cost: "90.41",
    sale_price: "130.83",
  },
  {
    sku: "10115",
    cost: "10.89",
    sale_price: "15.76",
  },
  {
    sku: "10118",
    cost: "13.61",
    sale_price: "19.69",
  },
  {
    sku: "10620",
    cost: "4.63",
    sale_price: "6.70",
  },
  {
    sku: "10614",
    cost: "4.63",
    sale_price: "6.70",
  },
  {
    sku: "7205",
    cost: "3.35",
    sale_price: "4.85",
  },
  {
    sku: "5824",
    cost: "37.07",
    sale_price: "53.64",
  },
  {
    sku: "9514",
    cost: "14.95",
    sale_price: "21.63",
  },
  {
    sku: "9850",
    cost: "20.68",
    sale_price: "29.93",
  },
  {
    sku: "10511",
    cost: "4.98",
    sale_price: "7.21",
  },
  {
    sku: "10514",
    cost: "6.22",
    sale_price: "9.00",
  },
  {
    sku: "11903",
    cost: "23.3407",
    sale_price: "33.78",
  },
  {
    sku: "9704",
    cost: "11",
    sale_price: "15.92",
  },
  {
    sku: "10559",
    cost: "14.9",
    sale_price: "21.56",
  },
  {
    sku: "9563",
    cost: "14",
    sale_price: "20.26",
  },
  {
    sku: "9558",
    cost: "12",
    sale_price: "17.36",
  },
  {
    sku: "9562",
    cost: "12",
    sale_price: "17.36",
  },
  {
    sku: "9556",
    cost: "13",
    sale_price: "18.81",
  },
  {
    sku: "8762",
    cost: "14.95",
    sale_price: "21.63",
  },
  {
    sku: "9553",
    cost: "42.03",
    sale_price: "60.82",
  },
  {
    sku: "9551",
    cost: "47.85",
    sale_price: "69.24",
  },
  {
    sku: "9541",
    cost: "61.71",
    sale_price: "89.30",
  },
  {
    sku: "11917",
    cost: "6.54",
    sale_price: "9.46",
  },
  {
    sku: "8242",
    cost: "3.27",
    sale_price: "4.73",
  },
  {
    sku: "10167",
    cost: "5.26",
    sale_price: "7.61",
  },
  {
    sku: "10165",
    cost: "5.26",
    sale_price: "7.61",
  },
  {
    sku: "10154",
    cost: "7.9",
    sale_price: "11.43",
  },
  {
    sku: "10152",
    cost: "7.9",
    sale_price: "11.43",
  },
  {
    sku: "10163",
    cost: "2.5",
    sale_price: "3.62",
  },
  {
    sku: "9525",
    cost: "3.12",
    sale_price: "4.51",
  },
  {
    sku: "9524",
    cost: "3.01",
    sale_price: "4.36",
  },
  {
    sku: "9533",
    cost: "2.41",
    sale_price: "3.49",
  },
  {
    sku: "9532",
    cost: "2.41",
    sale_price: "3.49",
  },
  {
    sku: "11107",
    cost: "8.86",
    sale_price: "12.82",
  },
  {
    sku: "10861",
    cost: "4.52",
    sale_price: "6.54",
  },
  {
    sku: "5782",
    cost: "29.8",
    sale_price: "43.12",
  },
  {
    sku: "11409",
    cost: "15.95",
    sale_price: "23.08",
  },
  {
    sku: "9990",
    cost: "90.41",
    sale_price: "130.83",
  },
  {
    sku: "11839",
    cost: "25.56",
    sale_price: "36.99",
  },
  {
    sku: "8505",
    cost: "10.4",
    sale_price: "15.05",
  },
  {
    sku: "8506",
    cost: "10.4",
    sale_price: "15.05",
  },
  {
    sku: "11725",
    cost: "31.3",
    sale_price: "45.29",
  },
  {
    sku: "7554",
    cost: "29.99",
    sale_price: "43.40",
  },
  {
    sku: "7557",
    cost: "27",
    sale_price: "39.07",
  },
  {
    sku: "7557A",
    cost: "27",
    sale_price: "39.07",
  },
  {
    sku: "10618",
    cost: "4.63",
    sale_price: "6.70",
  },
  {
    sku: "10616",
    cost: "4.63",
    sale_price: "6.70",
  },
  {
    sku: "5834",
    cost: "22.44",
    sale_price: "32.47",
  },
  {
    sku: "9513",
    cost: "14.95",
    sale_price: "21.63",
  },
  {
    sku: "9858",
    cost: "8.08",
    sale_price: "11.69",
  },
  {
    sku: "11918",
    cost: "7",
    sale_price: "10.13",
  },
  {
    sku: "11920",
    cost: "12.49",
    sale_price: "18.07",
  },
  {
    sku: "11921",
    cost: "10",
    sale_price: "14.47",
  },
  {
    sku: "10507",
    cost: "10.37",
    sale_price: "15.01",
  },
  {
    sku: "11915",
    cost: "11.0989",
    sale_price: "16.06",
  },
  {
    sku: "10534",
    cost: "10.36",
    sale_price: "14.99",
  },
  {
    sku: "10537",
    cost: "10.36",
    sale_price: "14.99",
  },
  {
    sku: "10538",
    cost: "10.36",
    sale_price: "14.99",
  },
  {
    sku: "10525",
    cost: "10.36",
    sale_price: "14.99",
  },
  {
    sku: "10522",
    cost: "10.36",
    sale_price: "14.99",
  },
  {
    sku: "10536",
    cost: "10.36",
    sale_price: "14.99",
  },
  {
    sku: "10521",
    cost: "10.36",
    sale_price: "14.99",
  },
  {
    sku: "10519",
    cost: "10.36",
    sale_price: "14.99",
  },
  {
    sku: "11707A",
    cost: "1.25",
    sale_price: "1.81",
  },
  {
    sku: "11719",
    cost: "18.1319",
    sale_price: "26.24",
  },
  {
    sku: "10561",
    cost: "9.75",
    sale_price: "14.11",
  },
  {
    sku: "9557",
    cost: "12",
    sale_price: "17.36",
  },
  {
    sku: "9559",
    cost: "12",
    sale_price: "17.36",
  },
  {
    sku: "9560",
    cost: "12",
    sale_price: "17.36",
  },
  {
    sku: "9544",
    cost: "57.68",
    sale_price: "83.47",
  },
  {
    sku: "9552",
    cost: "46.95",
    sale_price: "67.94",
  },
  {
    sku: "9542",
    cost: "51.42",
    sale_price: "74.41",
  },
  {
    sku: "8516",
    cost: "4.36",
    sale_price: "6.31",
  },
  {
    sku: "8512",
    cost: "8.17",
    sale_price: "11.82",
  },
  {
    sku: "10169",
    cost: "7.9",
    sale_price: "11.43",
  },
  {
    sku: "10158",
    cost: "4.2",
    sale_price: "6.08",
  },
  {
    sku: "10157",
    cost: "7.9",
    sale_price: "11.43",
  },
  {
    sku: "11155",
    cost: "4.82",
    sale_price: "6.97",
  },
  {
    sku: "9523",
    cost: "2.41",
    sale_price: "3.49",
  },
  {
    sku: "9528",
    cost: "3",
    sale_price: "4.34",
  },
  {
    sku: "7002",
    cost: "1.8462",
    sale_price: "2.67",
  },
  {
    sku: "6784",
    cost: "39.02",
    sale_price: "56.46",
  },
  {
    sku: "11410",
    cost: "14.1",
    sale_price: "20.40",
  },
  {
    sku: "6027",
    cost: "10",
    sale_price: "14.47",
  },
  {
    sku: "10255",
    cost: "70.89",
    sale_price: "102.58",
  },
  {
    sku: "10254",
    cost: "0",
    sale_price: "0.00",
  },
  {
    sku: "9989",
    cost: "90.41",
    sale_price: "130.83",
  },
  {
    sku: "9993",
    cost: "104.07",
    sale_price: "150.60",
  },
  {
    sku: "10000",
    cost: "82.61",
    sale_price: "119.54",
  },
  {
    sku: "9197",
    cost: "6.08",
    sale_price: "8.80",
  },
  {
    sku: "10112",
    cost: "13.61",
    sale_price: "19.69",
  },
  {
    sku: "10117",
    cost: "10.89",
    sale_price: "15.76",
  },
  {
    sku: "10119",
    cost: "13.61",
    sale_price: "19.69",
  },
  {
    sku: "5177",
    cost: "68.74",
    sale_price: "99.47",
  },
  {
    sku: "7553",
    cost: "29.99",
    sale_price: "43.40",
  },
  {
    sku: "8835",
    cost: "12.5",
    sale_price: "18.09",
  },
  {
    sku: "8837",
    cost: "25.2",
    sale_price: "36.47",
  },
  {
    sku: "9854",
    cost: "5.09",
    sale_price: "7.37",
  },
  {
    sku: "10509",
    cost: "7.88",
    sale_price: "11.40",
  },
  {
    sku: "12157",
    cost: "6.04",
    sale_price: "8.74",
  },
  {
    sku: "10516",
    cost: "7.05",
    sale_price: "10.20",
  },
  {
    sku: "10535",
    cost: "10.36",
    sale_price: "14.99",
  },
  {
    sku: "10520",
    cost: "10.36",
    sale_price: "14.99",
  },
  {
    sku: "10529",
    cost: "15.24",
    sale_price: "22.05",
  },
  {
    sku: "10527",
    cost: "15.24",
    sale_price: "22.05",
  },
  {
    sku: "9702",
    cost: "12.5",
    sale_price: "18.09",
  },
];
async function main() {
  // identify product ids
  // reduce to 15% margin
  // add to clearance sections
  const clearance_id = 1485;
  for (const row of data) {
    try {
      console.log(`finding product id for sku: ${row.sku}...`);
      const p_id = await getProductIdFromSku(row.sku);
      const variants = await getProductVariants(p_id);
      console.log("adding product to clearance section", p_id);
      await addCatToProduct(p_id, clearance_id).catch(console.log);
      if (variants.length === 1 && variants[0].sku_id === null) {
        console.log("only one base variant. updating product");
        // update product
        await updateProduct(p_id, {
          sale_price: row.sale_price,
        });
      } else {
        console.log("looking for variant");
        const variant = variants.find((v) => v.sku === row.sku);
        if (variant) {
          console.log("variant found");
          // update variant
          await updateProductVariant(p_id, variant.id, {
            price: row.sale_price,
          });
        }
      }
      console.log(`updated product with sku: ${row.sku}`);
    } catch (err) {
      console.log(err);
      continue;
    }
  }
  console.log("done");
}
main();
