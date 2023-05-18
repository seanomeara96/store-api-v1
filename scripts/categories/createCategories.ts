import { getAllCategories } from "../../functions/categories/getAllCategories";
import { addCatToProduct } from "../../functions/products/addCatToProduct";
import { getProductIdFromSku } from "../../functions/products/getProductIdFromSku";

require("../../config/config").config("bf");

const data = [
  {
    sku: "12736",
    cat_1: "Complexion",
    cat_2: "Blusher",
    cat_3: "Bronzer",
  },
  {
    sku: "12784",
    cat_1: "Complexion",
    cat_2: "Primer",
    cat_3: "",
  },
  {
    sku: "12785",
    cat_1: "Complexion",
    cat_2: "Primer",
    cat_3: "",
  },
  {
    sku: "12786",
    cat_1: "Beauty Accessories",
    cat_2: "Scissors",
    cat_3: "False Lashes/Eyelash Glue",
  },
  {
    sku: "12786",
    cat_1: "Beauty Accessories",
    cat_2: "Scissors",
    cat_3: "Eyes",
  },
  {
    sku: "12787",
    cat_1: "Eyes",
    cat_2: "False Lashes/Eyelash Glue",
    cat_3: "",
  },
  {
    sku: "12788",
    cat_1: "Eyes",
    cat_2: "False Lashes/Eyelash Glue",
    cat_3: "",
  },
  {
    sku: "12789",
    cat_1: "Eyes",
    cat_2: "False Lashes/Eyelash Glue",
    cat_3: "",
  },
  {
    sku: "12790",
    cat_1: "Eyes",
    cat_2: "False Lashes/Eyelash Glue",
    cat_3: "",
  },
  {
    sku: "12791",
    cat_1: "Eyes",
    cat_2: "False Lashes/Eyelash Glue",
    cat_3: "",
  },
  {
    sku: "12792",
    cat_1: "Complexion",
    cat_2: "Contouring",
    cat_3: "",
  },
  {
    sku: "12793",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12794",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12795",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12796",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12797",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12798",
    cat_1: "Complexion",
    cat_2: "Face Powder",
    cat_3: "",
  },
  {
    sku: "12799",
    cat_1: "Brows",
    cat_2: "Brow Pencils",
    cat_3: "",
  },
  {
    sku: "12800",
    cat_1: "Brows",
    cat_2: "Brow Pencils",
    cat_3: "",
  },
  {
    sku: "12801",
    cat_1: "Brows",
    cat_2: "Brow Gel",
    cat_3: "",
  },
  {
    sku: "12802",
    cat_1: "Eyes",
    cat_2: "Eyeliner/Kohl Pencils",
    cat_3: "",
  },
  {
    sku: "12804",
    cat_1: "Lips",
    cat_2: "Lipsticks",
    cat_3: "",
  },
  {
    sku: "12805",
    cat_1: "Lips",
    cat_2: "Lip Liners",
    cat_3: "",
  },
  {
    sku: "12806",
    cat_1: "Lips",
    cat_2: "Lipsticks",
    cat_3: "",
  },
  {
    sku: "12807",
    cat_1: "Lips",
    cat_2: "Lip Liners",
    cat_3: "",
  },
  {
    sku: "12808",
    cat_1: "Lips",
    cat_2: "Lipsticks",
    cat_3: "",
  },
  {
    sku: "12809",
    cat_1: "Lips",
    cat_2: "Lip Liners",
    cat_3: "",
  },
  {
    sku: "12810",
    cat_1: "Lips",
    cat_2: "Lip Glosses",
    cat_3: "",
  },
  {
    sku: "12811",
    cat_1: "Lips",
    cat_2: "Lip Glosses",
    cat_3: "",
  },
  {
    sku: "12812",
    cat_1: "Lips",
    cat_2: "Lip Glosses",
    cat_3: "",
  },
  {
    sku: "12824",
    cat_1: "Eyes",
    cat_2: "False Lashes/Eyelash Glue",
    cat_3: "",
  },
  {
    sku: "12825",
    cat_1: "Eyes",
    cat_2: "False Lashes/Eyelash Glue",
    cat_3: "",
  },
  {
    sku: "12840",
    cat_1: "Lips",
    cat_2: "Lipsticks",
    cat_3: "",
  },
  {
    sku: "12841",
    cat_1: "Lips",
    cat_2: "Lipsticks",
    cat_3: "",
  },
  {
    sku: "12842",
    cat_1: "Lips",
    cat_2: "Lip Liners",
    cat_3: "",
  },
  {
    sku: "12843",
    cat_1: "Lips",
    cat_2: "Lip Liners",
    cat_3: "",
  },
  {
    sku: "12844",
    cat_1: "Lips",
    cat_2: "Lip Liners",
    cat_3: "",
  },
  {
    sku: "12845",
    cat_1: "Lips",
    cat_2: "Lip Glosses",
    cat_3: "",
  },
  {
    sku: "12846",
    cat_1: "Lips",
    cat_2: "Lip Glosses",
    cat_3: "",
  },
  {
    sku: "12847",
    cat_1: "Lips",
    cat_2: "Lipsticks",
    cat_3: "",
  },
  {
    sku: "12848",
    cat_1: "Complexion",
    cat_2: "Primer",
    cat_3: "",
  },
  {
    sku: "12849",
    cat_1: "Complexion",
    cat_2: "Primer",
    cat_3: "",
  },
  {
    sku: "12850",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12851",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12852",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12853",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12854",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12855",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12856",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12857",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12858",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12859",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12860",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12861",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12862",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12863",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12864",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12865",
    cat_1: "Complexion",
    cat_2: "Blusher",
    cat_3: "",
  },
  {
    sku: "12866",
    cat_1: "Complexion",
    cat_2: "Blusher",
    cat_3: "",
  },
  {
    sku: "12867",
    cat_1: "Complexion",
    cat_2: "Blusher",
    cat_3: "",
  },
  {
    sku: "12868",
    cat_1: "Complexion",
    cat_2: "Bronzer",
    cat_3: "",
  },
  {
    sku: "12869",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Complexion Brushes",
    cat_3: "",
  },
  {
    sku: "12870",
    cat_1: "Eyes",
    cat_2: "False Lashes/Eyelash Glue",
    cat_3: "",
  },
  {
    sku: "12871",
    cat_1: "Eyes",
    cat_2: "False Lashes/Eyelash Glue",
    cat_3: "",
  },
  {
    sku: "12872",
    cat_1: "Eyes",
    cat_2: "False Lashes/Eyelash Glue",
    cat_3: "",
  },
  {
    sku: "12941",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Concealer Brushes",
    cat_3: "",
  },
  {
    sku: "12942",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Concealer Brushes",
    cat_3: "",
  },
  {
    sku: "12943",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Complexion Brushes",
    cat_3: "",
  },
  {
    sku: "12944",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Eye Brushes",
    cat_3: "",
  },
  {
    sku: "12945",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Eye Brushes",
    cat_3: "",
  },
  {
    sku: "12946",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Eye Brushes",
    cat_3: "",
  },
  {
    sku: "12947",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Eye Brushes",
    cat_3: "",
  },
  {
    sku: "12948",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Brush Cleaners",
    cat_3: "",
  },
  {
    sku: "12949",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Brush Cleaners",
    cat_3: "Miscellaneous",
  },
  {
    sku: "12949",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Brush Cleaners",
    cat_3: "Beauty Accessories",
  },
  {
    sku: "12950",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Brush Cleaners",
    cat_3: "",
  },
  {
    sku: "12951",
    cat_1: "Beauty Accessories",
    cat_2: "Miscellaneous",
    cat_3: "Brush Cleaners",
  },
  {
    sku: "12951",
    cat_1: "Beauty Accessories",
    cat_2: "Miscellaneous",
    cat_3: "Makeup Brushes & Applicators",
  },
  {
    sku: "12960",
    cat_1: "Eyes",
    cat_2: "Mascara",
    cat_3: "",
  },
  {
    sku: "12961",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12962",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12963",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12964",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12965",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12966",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12967",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12968",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12969",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12970",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12971",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12972",
    cat_1: "Lips",
    cat_2: "Lipsticks",
    cat_3: "",
  },
  {
    sku: "12973",
    cat_1: "Lips",
    cat_2: "Lipsticks",
    cat_3: "",
  },
  {
    sku: "12974",
    cat_1: "Lips",
    cat_2: "Lipsticks",
    cat_3: "",
  },
  {
    sku: "12975",
    cat_1: "Lips",
    cat_2: "Lipsticks",
    cat_3: "",
  },
  {
    sku: "12976",
    cat_1: "Complexion",
    cat_2: "Primer",
    cat_3: "",
  },
  {
    sku: "12977",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12978",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12979",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12980",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12981",
    cat_1: "Complexion",
    cat_2: "Foundation",
    cat_3: "",
  },
  {
    sku: "12982",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12983",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12984",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12985",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12986",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12987",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12988",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12989",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12990",
    cat_1: "Complexion",
    cat_2: "Concealer",
    cat_3: "",
  },
  {
    sku: "12991",
    cat_1: "Makeup Brushes & Applicators",
    cat_2: "Makeup Sponges",
    cat_3: "",
  },
  {
    sku: "12992",
    cat_1: "Complexion",
    cat_2: "Primer",
    cat_3: "",
  },
  {
    sku: "12993",
    cat_1: "Eyes",
    cat_2: "Eye Shadow",
    cat_3: "",
  },
  {
    sku: "12994",
    cat_1: "Eyes",
    cat_2: "Mascara",
    cat_3: "",
  },
];
async function main() {
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    console.log(`${i + 1}/${data.length}`);

    if (row.cat_3 == "") {
      continue;
    }

    const res = await getAllCategories({
      name: row.cat_3,
    });

    if (res.length > 1 || res.length < 1) {
      continue;
    }

    const [category] = res;

    let productId: number;

    try {
      productId = (await getProductIdFromSku(row.sku)) as number;
    } catch (err) {
      console.log(err);
      continue;
    }

    try {
      await addCatToProduct(productId, category.id);
      console.log(`added cat ${row.cat_3} to product ${productId}`);
    } catch (err) {
      console.log(err);
    }
  }
}

main();

async function check() {
  const level: string[] = [];
  for (let i = 0; i < data.length; i++) {
    console.log(`pass ${i + 1}/${data.length}`);
    const row = data[i];
    if (!level.includes(row.cat_3) && row.cat_3 !== "") {
      level.push(row.cat_3);
    }
  }

  for (let i = 0; i < level.length; i++) {
    const catName = level[i];
    const res = await getAllCategories({ name: catName });
    console.log(catName, res.length);
  }
}
