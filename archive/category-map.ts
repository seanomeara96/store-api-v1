import { Product } from "../functions/products/Product";
import { getAllProducts } from "../functions/products/getAllProducts";
import { getProductBySku } from "../functions/products/getProductBySKU";
import { updateProduct } from "../functions/products/updateProduct";

interface ProductWithRelevantCategories extends Product {
  relevantCategories: number[];
  pixieCategories: number[];
}

(async () => {
  try {
    const data = [
      { name: "Skincare", px_id: 237, bf_id: 11 },
      { name: "Serums & Boosters", px_id: 238, bf_id: 24 },
      { name: "Anti-Ageing", px_id: 239, bf_id: 25 },
      { name: "Moisturisers", px_id: 248, bf_id: 21 },
      { name: "Hair", px_id: 249, bf_id: 12 },
      { name: "Masks", px_id: 251, bf_id: 427 },
      { name: "Conditioner", px_id: 254, bf_id: 36 },
      { name: "Treatments", px_id: 257, bf_id: 37 },
      { name: "Hair Health", px_id: 259, bf_id: 726 },
      { name: "Shampoo", px_id: 261, bf_id: 35 },
      { name: "Hair Oils & Serums", px_id: 267, bf_id: 435 },
      { name: "Styling", px_id: 279, bf_id: 39 },
      { name: "Sulphate Free Haircare", px_id: 282, bf_id: 438 },
      { name: "Hair Tools & Accessories", px_id: 298, bf_id: 442 },
      { name: "Cleansers", px_id: 313, bf_id: 22 },
      { name: "Neck & Decollete", px_id: 314, bf_id: 30 },
      { name: "Tanning & Suncare", px_id: 321, bf_id: 27 },
      { name: "Acne & Problem Skin", px_id: 325, bf_id: 26 },
      { name: "Masks and Peels", px_id: 326, bf_id: 231 },
      { name: "Night Creams", px_id: 327, bf_id: 232 },
      { name: "Eye Care & Creams", px_id: 328, bf_id: 641 },
      { name: "Supersizes", px_id: 329, bf_id: 445 },
      { name: "Toners", px_id: 337, bf_id: 23 },
      { name: "Hair Colour & Root Coverup", px_id: 338, bf_id: 446 },
      { name: "Skincare Gift Sets", px_id: 380, bf_id: 527 },
      { name: "Men's Range", px_id: 399, bf_id: 568 },
      { name: "Oils", px_id: 407, bf_id: 38 },
      { name: "Tools & Accessories", px_id: 417, bf_id: 613 },
      { name: "Lip Care", px_id: 419, bf_id: 28 },
      { name: "Exfoliators", px_id: 448, bf_id: 23 },
    ];

    const bfCategories = data.map((i) => i.bf_id);

    const bfBrands = [
      { name: "Matrix", id: 191 },
      { name: "Biolage", id: 192 },
      { name: "The Ordinary", id: 152 },
    ];

    const brand = bfBrands[2];
    // get matrix products from beautyfeatures
    require("./config/config").config("bf");

    const products = (await getAllProducts({
      brand_id: brand.id,
    })) as ProductWithRelevantCategories[];

    require("./config/config").config("px");

    // for each product, filter cat array for only bsk_ids above
    for (let i = 0; i < products.length; i++) {
      console.log(`updating product ${i + 1} / ${products.length}`);
      const product = products[i];
      product.relevantCategories = product.categories.filter((id: number) =>
        bfCategories.includes(id)
      );

      // for each product, create a new cat array with equivalent px_ids above

      product.pixieCategories = [];
      for (const id of product.relevantCategories) {
        const matchingRecord = data.find((x) => x.bf_id === id);
        if (matchingRecord) {
          product.pixieCategories.push(matchingRecord.px_id);
        }
      }

      if (!product.pixieCategories.length) {
        product.pixieCategories = [445];
      }

      // for each product find the matching product on pixie loves and update the categories
      try {
        const pixieProduct = (await getProductBySku(product.sku)) as any;
        console.log(`updating ${pixieProduct.name}`, pixieProduct.id);
        try {
          await updateProduct(pixieProduct.id, {
            categories: product.pixieCategories,
          });
          console.log(`success`);
        } catch (err) {
          console.log(
            `something went wrong updating ${pixieProduct.name}`,
            pixieProduct.id
          );
        }
      } catch (err) {
        console.log(`could not find product: ${product.name}`, product.id, err);
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
