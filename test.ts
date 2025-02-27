import { getAllProducts } from "./functions/products/getAllProducts";
import { getAllProductVariants } from "./functions/products/getAllProductVariants";
import { getProductBySku } from "./functions/products/getProductBySKU";
import { Product } from "./functions/products/Product";
import { updateProduct } from "./functions/products/updateProduct";

const skus = [
  {
    sku: "1000546A",
    total_sort: 1,
    name: "Chiavari Limewash Chair (Standard)",
    ch_sort: 1,
    ha_sort: 1,
  },
  {
    sku: "1000546",
    total_sort: 2,
    name: "Chiavari Chair Limewash (deluxe)",
    ch_sort: 2,
    ha_sort: 2,
  },
  {
    sku: "1000567",
    total_sort: 3,
    name: "Chiavari Chair Gold",
    ch_sort: 3,
    ha_sort: 3,
  },
  {
    sku: "CRY01",
    total_sort: 4,
    name: "Chiavari Chair Crystal with White Pad",
    ch_sort: 4,
    ha_sort: 4,
  },
  {
    sku: "1000564",
    total_sort: 5,
    name: "Chiavari Chair Mahogany",
    ch_sort: 5,
    ha_sort: 5,
  },
  {
    sku: "1000565",
    total_sort: 6,
    name: "Chiavari Chair Black",
    ch_sort: 6,
    ha_sort: 6,
  },
  {
    sku: "BTWOOD",
    total_sort: 7,
    name: "Bentwood Rustic Oak Chair",
    ch_sort: 11,
    ha_sort: 7,
  },
  {
    sku: "PADBLUE01",
    total_sort: 8,
    name: "Padded Banquet Chair Blue",
    ch_sort: 12,
    ha_sort: 8,
  },
  {
    sku: "PADRED01",
    total_sort: 9,
    name: "Padded Banquet Chair Red",
    ch_sort: 13,
    ha_sort: 9,
  },
  {
    sku: "1000547",
    total_sort: 10,
    name: "All Seasons Padded Chair",
    ch_sort: 16,
    ha_sort: 10,
  },
  {
    sku: "1000569",
    total_sort: 11,
    name: "Folding White Chair",
    ch_sort: 18,
    ha_sort: 11,
  },
  {
    sku: "333A",
    total_sort: 12,
    name: "Folding Chair Burgundy",
    ch_sort: 20,
    ha_sort: 12,
  },
  {
    sku: "1000536",
    total_sort: 13,
    name: "Folding Chair Blue For Hire",
    ch_sort: 22,
    ha_sort: 13,
  },
  {
    sku: "F002",
    total_sort: 14,
    name: "Chameleon Chair Gold & Bronze with Black Legs",
    ch_sort: 24,
    ha_sort: 14,
  },
  {
    sku: "F001",
    total_sort: 15,
    name: "Chameleon Chair Silver Back with White Pad",
    ch_sort: 26,
    ha_sort: 15,
  },
  {
    sku: "F025",
    total_sort: 16,
    name: "Chameleon Charcoal Suede Chair",
    ch_sort: 28,
    ha_sort: 16,
  },
  {
    sku: "F016",
    total_sort: 17,
    name: "Chameleon Black Suede Chair",
    ch_sort: 33,
    ha_sort: 17,
  },
  {
    sku: "F017",
    total_sort: 18,
    name: "Chameleon Cocoa Brown Suede Chair",
    ch_sort: 35,
    ha_sort: 18,
  },
  {
    sku: "F015",
    total_sort: 19,
    name: "Chameleon White Suede Chair",
    ch_sort: 37,
    ha_sort: 19,
  },
  {
    sku: "230224",
    total_sort: 20,
    name: "Ronda Chair",
    ch_sort: 39,
    ha_sort: 20,
  },
  {
    sku: "VOLTBCH",
    total_sort: 21,
    name: "Volt Chair Black",
    ch_sort: 41,
    ha_sort: 21,
  },
  {
    sku: "ST001",
    total_sort: 22,
    name: "Salt White Chair",
    ch_sort: 43,
    ha_sort: 22,
  },
  {
    sku: "F018A",
    total_sort: 23,
    name: "Chloe Ivory Chameleon Chair",
    ch_sort: 45,
    ha_sort: 23,
  },
  {
    sku: "F018",
    total_sort: 24,
    name: "Chloe White Chameleon Chair",
    ch_sort: 47,
    ha_sort: 28,
  },
  {
    sku: "F019",
    total_sort: 25,
    name: "Chloe White Chameleon Chair (Full Cover)",
    ch_sort: 48,
    ha_sort: 29,
  },
  {
    sku: "OH02",
    total_sort: 26,
    name: "Highback Dining Chair White",
    ch_sort: 50,
    ha_sort: 30,
  },
  {
    sku: "1000937",
    total_sort: 27,
    name: "Zeus Bar Stool Black",
    ch_sort: 347,
    ha_sort: 32,
  },
  {
    sku: "1000691",
    total_sort: 28,
    name: "Zeus Bar Stool with Royal Blue Pad Cover",
    ch_sort: 548,
    ha_sort: 34,
  },
  {
    sku: "1000690",
    total_sort: 29,
    name: "Zeus Bar Stool with Red Pad Cover",
    ch_sort: 799,
    ha_sort: 36,
  },
  {
    sku: "1000797",
    total_sort: 30,
    name: "Zeus Bar Stool with Silver Pad Cover",
    ch_sort: 910,
    ha_sort: 38,
  },
  {
    sku: "FLOW16",
    total_sort: 31,
    name: "Cube Black Bar Stool",
    ch_sort: 1051,
    ha_sort: 40,
  },
  {
    sku: "FLOW15",
    total_sort: 32,
    name: "Cube White Bar Stool",
    ch_sort: 1492,
    ha_sort: 42,
  },
  {
    sku: "FLOW08",
    total_sort: 33,
    name: "Cube Black Bar Stool (Small)",
    ch_sort: 1743,
    ha_sort: 44,
  },
  {
    sku: "VOLTW",
    total_sort: 34,
    name: "Volt Barstool White",
    ch_sort: 1774,
    ha_sort: 46,
  },
  {
    sku: "BS1003",
    total_sort: 35,
    name: "Volt Barstool Black",
    ch_sort: 1905,
    ha_sort: 49,
  },
  {
    sku: "CHST",
    total_sort: 36,
    name: "Chiavari Bar Stool - Limewash",
    ch_sort: 2106,
    ha_sort: 52,
  },
  {
    sku: "BS1000",
    total_sort: 37,
    name: "Milan High Back Bar Stool - White",
    ch_sort: 2217,
    ha_sort: 54,
  },
  {
    sku: "BS1001",
    total_sort: 38,
    name: "Milan High Back Bar Stool - Black",
    ch_sort: 2398,
    ha_sort: 56,
  },
  {
    sku: "AURORAWH",
    total_sort: 39,
    name: "Aurora Bar Stool White",
    ch_sort: 3049,
    ha_sort: 58,
  },
  {
    sku: "AURBL",
    total_sort: 40,
    name: "Aurora Black Stool",
    ch_sort: 3300,
    ha_sort: 450,
  },
  {
    sku: "BARWOOD",
    total_sort: 41,
    name: "Traditional Wooden Bar Stool",
    ch_sort: 3461,
    ha_sort: 461,
  },
  {
    sku: "210224",
    total_sort: 42,
    name: "Alice Bar Stool Rose Gold",
    ch_sort: 4252,
    ha_sort: 622,
  },
  {
    sku: "BS1004",
    total_sort: 43,
    name: "Zoey Bar Stool",
    ch_sort: 4263,
    ha_sort: 623,
  },
  {
    sku: "1000150",
    total_sort: 44,
    name: "Button Bar Stool Black",
    ch_sort: 4614,
    ha_sort: 624,
  },
  {
    sku: "1000961",
    total_sort: 45,
    name: "Button Bar Stool Mint Green",
    ch_sort: 4635,
    ha_sort: 625,
  },
  {
    sku: "1000962",
    total_sort: 46,
    name: "Button Bar Stool Red",
    ch_sort: 5006,
    ha_sort: 626,
  },
  {
    sku: "11181W",
    total_sort: 47,
    name: "Button Bar Stool White",
    ch_sort: 5147,
    ha_sort: 917,
  },
  {
    sku: "1083C",
    total_sort: 48,
    name: "Smartie Bench Fuscia (5 seater)",
    ch_sort: 5308,
    ha_sort: 1238,
  },
  {
    sku: "1083A",
    total_sort: 49,
    name: "Smartie Bench Grey (5 seater)",
    ch_sort: 6659,
    ha_sort: 1419,
  },
  {
    sku: "1083E",
    total_sort: 50,
    name: "Smartie Bench Lime Green (5 seater)",
    ch_sort: 6750,
    ha_sort: 1540,
  },
  {
    sku: "1083",
    total_sort: 51,
    name: "Smartie Bench White (5 seater)",
    ch_sort: 6781,
    ha_sort: 2571,
  },
  {
    sku: "1083D",
    total_sort: 52,
    name: "Smartie Bench Yellow (5 seater)",
    ch_sort: 6972,
    ha_sort: 2842,
  },
  {
    sku: "SL1011",
    total_sort: 53,
    name: "Pop Bench - Flame Red",
    ch_sort: 7143,
    ha_sort: 3243,
  },
  {
    sku: "SL1010",
    total_sort: 54,
    name: "Pop Bench - Jet Black",
    ch_sort: 7674,
    ha_sort: 3994,
  },
  {
    sku: "SL1013",
    total_sort: 55,
    name: "Pop Bench - Lime Green",
    ch_sort: 7885,
    ha_sort: 4855,
  },
  {
    sku: "SL1012",
    total_sort: 56,
    name: "Pop Bench - Milky white",
    ch_sort: 9296,
    ha_sort: 5076,
  },
  {
    sku: "SL1014",
    total_sort: 57,
    name: "Pop Bench - Saffron Yellow",
    ch_sort: 9357,
    ha_sort: 5287,
  },
  {
    sku: "SL1008",
    total_sort: 58,
    name: "Wow bench - Saffron yellow",
    ch_sort: 9398,
    ha_sort: 6038,
  },
  {
    sku: "SL1009",
    total_sort: 59,
    name: "Wow bench- Lime green",
    ch_sort: 10129,
    ha_sort: 6199,
  },
  {
    sku: "SL1004",
    total_sort: 60,
    name: "Candy Lounge Armchair - Soft yellow",
    ch_sort: 10140,
    ha_sort: 6280,
  },
  {
    sku: "SL1005",
    total_sort: 61,
    name: "Candy Ottoman Grey - Large",
    ch_sort: 10601,
    ha_sort: 6411,
  },
  {
    sku: "SL1006",
    total_sort: 62,
    name: "Candy Ottoman Grey - Small",
    ch_sort: 10692,
    ha_sort: 6432,
  },
  {
    sku: "SL1007",
    total_sort: 63,
    name: "Candy Ottoman Yellow - Small",
    ch_sort: 10733,
    ha_sort: 6973,
  },
  {
    sku: "IL10",
    total_sort: 64,
    name: "Half Moon Bench Illuminated",
    ch_sort: 100064,
    ha_sort: 7114,
  },
  {
    sku: "IL07",
    total_sort: 65,
    name: "Snake Bench Illuminated",
    ch_sort: 100065,
    ha_sort: 8075,
  },
  {
    sku: "IL08",
    total_sort: 66,
    name: "Star Bench Illuminated",
    ch_sort: 100066,
    ha_sort: 8096,
  },
  {
    sku: "R003",
    total_sort: 67,
    name: "Rustic  Wooden Bench with Foldable legs",
    ch_sort: 100067,
    ha_sort: 8147,
  },
  {
    sku: "269",
    total_sort: 68,
    name: "Milano Conference Chair",
    ch_sort: 100068,
    ha_sort: 8238,
  },
  {
    sku: "1084D",
    total_sort: 69,
    name: "Office Chair Black",
    ch_sort: 100069,
    ha_sort: 8509,
  },
  {
    sku: "1000999",
    total_sort: 70,
    name: "Baby High Chair",
    ch_sort: 100070,
    ha_sort: 8740,
  },
  {
    sku: "371",
    total_sort: 71,
    name: "Children's Chair Blue",
    ch_sort: 100071,
    ha_sort: 9081,
  },
  {
    sku: "370",
    total_sort: 72,
    name: "Children's Chair Pink",
    ch_sort: 100072,
    ha_sort: 9142,
  },
  {
    sku: "CH01",
    total_sort: 73,
    name: "Children's Chair Wooden White",
    ch_sort: 100073,
    ha_sort: 9173,
  },
  {
    sku: "1000550",
    total_sort: 74,
    name: "Children's Stool Dark Blue",
    ch_sort: 100074,
    ha_sort: 9284,
  },
  {
    sku: "1000552",
    total_sort: 75,
    name: "Children's Stool Dark Pink",
    ch_sort: 100075,
    ha_sort: 9905,
  },
  {
    sku: "1000583",
    total_sort: 76,
    name: "Children's Stool Lime Green",
    ch_sort: 100076,
    ha_sort: 10046,
  },
  {
    sku: "1000584",
    total_sort: 77,
    name: "Children's Stool White",
    ch_sort: 100077,
    ha_sort: 10077,
  },
  {
    sku: "1000572",
    total_sort: 78,
    name: "Children's Wooden Picnic Bench",
    ch_sort: 100078,
    ha_sort: 10078,
  },
  {
    sku: "FB03",
    total_sort: 79,
    name: "Mighty B Beanbag - Black",
    ch_sort: 100079,
    ha_sort: 10079,
  },
  {
    sku: "FB08",
    total_sort: 80,
    name: "Mighty B Beanbag - Lime Green",
    ch_sort: 100080,
    ha_sort: 10080,
  },
  {
    sku: "FB09",
    total_sort: 81,
    name: "Mighty B Beanbag - Orange",
    ch_sort: 100081,
    ha_sort: 10081,
  },
  {
    sku: "FB07",
    total_sort: 82,
    name: "Mighty B Beanbag - Red",
    ch_sort: 100082,
    ha_sort: 10082,
  },
  {
    sku: "FB06",
    total_sort: 83,
    name: "Mighty B Beanbag Grey",
    ch_sort: 100083,
    ha_sort: 10083,
  },
  {
    sku: "ALICE0026",
    total_sort: 84,
    name: "Toadstool Green and White",
    ch_sort: 100084,
    ha_sort: 10084,
  },
  {
    sku: "ALICE0027",
    total_sort: 85,
    name: "Toadstool Purple and White",
    ch_sort: 100085,
    ha_sort: 10085,
  },
  {
    sku: "ALICE0024",
    total_sort: 86,
    name: "Toadstool Red and White",
    ch_sort: 100086,
    ha_sort: 10226,
  },
  {
    sku: "ALICE0017",
    total_sort: 87,
    name: "Toadstool Table Red and White",
    ch_sort: 100087,
    ha_sort: 10547,
  },
];

async function test() {
  try {
    for (let i = 0; i < skus.length; i++) {
      try {
        console.log(i, skus.length);
        {
          require("./config/config").config("ch");
          let product = await getProductBySku(skus[i].sku);
          if (!product) {
            let products = await getAllProducts({ "sku:in": skus[i].sku });
            if (!products.length) {
              console.log(`no product found for ${skus[i].sku} on caterhire`);
              continue;
            }
            product = products[0];
          }
          await updateProduct(product.id, {
            sort_order: skus[i].ch_sort,
          });
        }
        {
          require("./config/config").config("ha");
          let product = await getProductBySku(skus[i].sku);
          if (!product) {
            let products = await getAllProducts({ "sku:in": skus[i].sku });
            if (!products.length) {
              console.log(`no product found for ${skus[i].sku} on hireall`);
              continue;
            }
            product = products[0];
          }
          await updateProduct(product.id, {
            sort_order: skus[i].ha_sort,
          });
        }
      } catch (err: any) {
        if (err.status === 429) {
          i--;
          await new Promise((resolve) => setTimeout(resolve, 2000));
          continue;
        }
        if (err.status === 422) {
          console.log(`SKU: ${skus[i].sku} ` + err.response.data.title);
          continue;
        }
        throw err;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

const categories = [
  { name: "chairs", id: 138 },
  { name: "tables", id: 34 },
  { name: "lounge_furniture", id: 77 },
  { name: "kids_furniture", id: 62 },
  { name: "outdoor_furniture", id: 33 },
  { name: "illuminated_furniture", id: 28 },
];

async function other() {
  try {
    require("./config/config").config("ch");
    const products = (await getAllProducts({
      "categories:in": categories.map((c) => c.id).join(","),
    })).sort((a,b)=> a.sort_order-b.sort_order);

    const sortedProducts: Product[] = [];
    for (const category of categories) {
      for (const product of products) {
        if (
          product.categories.includes(category.id) &&
          !sortedProducts.find((p) => p.id === product.id)
        ) {
          sortedProducts.push(product)
        }
      }
    }
    for(let i = 0; i< sortedProducts.length; i++){
      console.log(i, sortedProducts.length)
      const product = sortedProducts[i]
      await updateProduct(product.id, {sort_order: i+1})
    }
  } catch (err) {
    console.log(err);
  }
}
other();
