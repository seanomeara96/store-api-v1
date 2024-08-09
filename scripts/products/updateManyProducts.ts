import { getProductById } from "../../functions/products/getProductById";
import { updateProduct } from "../../functions/products/updateProduct";
(async () => {
  require("../../config/config").config("bf");

  const data = [
    { cat_id: 1040, product_id: 3613 },
    { cat_id: 1040, product_id: 3616 },
    { cat_id: 1040, product_id: 3617 },
    { cat_id: 1040, product_id: 3631 },
    { cat_id: 1040, product_id: 7048 },
    { cat_id: 1040, product_id: 3622 },
    { cat_id: 1040, product_id: 8535 },
    { cat_id: 1040, product_id: 4928 },
    { cat_id: 1041, product_id: 3629 },
    { cat_id: 1041, product_id: 3630 },
    { cat_id: 1041, product_id: 6132 },
    { cat_id: 1041, product_id: 6133 },
    { cat_id: 1041, product_id: 4966 },
    { cat_id: 1041, product_id: 7046 },
    { cat_id: 1041, product_id: 8525 },
    { cat_id: 1041, product_id: 8537 },
    { cat_id: 1042, product_id: 3626 },
    { cat_id: 1042, product_id: 3627 },
    { cat_id: 1042, product_id: 4215 },
    { cat_id: 1042, product_id: 8531 },
    { cat_id: 1042, product_id: 4929 },
    { cat_id: 1043, product_id: 3633 },
    { cat_id: 1043, product_id: 3634 },
    { cat_id: 1043, product_id: 8521 },
    { cat_id: 1043, product_id: 8522 },
    { cat_id: 1044, product_id: 3624 },
    { cat_id: 1044, product_id: 8530 },
    { cat_id: 1044, product_id: 8526 },
    { cat_id: 1044, product_id: 8529 },
    { cat_id: 1045, product_id: 3614 },
    { cat_id: 1045, product_id: 3618 },
    { cat_id: 1046, product_id: 3610 },
    { cat_id: 1046, product_id: 3615 },
    { cat_id: 1046, product_id: 3620 },
    { cat_id: 1046, product_id: 3622 },
    { cat_id: 1046, product_id: 3619 },
    { cat_id: 1046, product_id: 3622 },
    { cat_id: 1046, product_id: 3623 },
    { cat_id: 1046, product_id: 3655 },
    { cat_id: 1046, product_id: 3635 },
    { cat_id: 1046, product_id: 8534 },
    { cat_id: 1046, product_id: 6495 },
    { cat_id: 1046, product_id: 8532 },
    { cat_id: 1046, product_id: 8533 },
    { cat_id: 1047, product_id: 3656 },
    { cat_id: 1047, product_id: 6507 },
    { cat_id: 1047, product_id: 8519 },
    { cat_id: 1047, product_id: 8520 },
    { cat_id: 1047, product_id: 8524 },
    { cat_id: 1047, product_id: 8523 },
    { cat_id: 1048, product_id: 3625 },
    { cat_id: 1048, product_id: 3628 },
    { cat_id: 1049, product_id: 8539 },
    { cat_id: 1049, product_id: 8540 },
    { cat_id: 1049, product_id: 8541 },
    { cat_id: 1049, product_id: 8542 },
    { cat_id: 1049, product_id: 8543 },
    { cat_id: 1049, product_id: 8544 },
  ];

  try {
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      const product = await getProductById(p.product_id)
      product.categories.push(p.cat_id)
      await updateProduct(p.product_id, {
        categories: product.categories
      });
      console.log(`Updated ${i + 1}/${data.length}`);
    }
  } catch (err) {
    console.log(err);
  }
})();
