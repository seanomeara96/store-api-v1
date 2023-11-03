import { updateProduct } from "../../functions/products/updateProduct";
(async () => {
  require("../../config/config").config("ch");

  const data = [
    { sort_order: 1, id: 1334 },
    { sort_order: 2, id: 1312 },
    { sort_order: 3, id: 1456 },
    { sort_order: 4, id: 1455 },
    { sort_order: 5, id: 1288 },
    { sort_order: 6, id: 913 },
    { sort_order: 7, id: 349 },
    { sort_order: 8, id: 525 },
    { sort_order: 9, id: 927 },
    { sort_order: 10, id: 861 },
    { sort_order: 11, id: 308 },
    { sort_order: 12, id: 315 },
    { sort_order: 13, id: 435 },
    { sort_order: 14, id: 255 },
    { sort_order: 15, id: 567 },
    { sort_order: 16, id: 941 },
    { sort_order: 17, id: 698 },
    { sort_order: 18, id: 1132 },
    { sort_order: 19, id: 1133 },
    { sort_order: 20, id: 1135 },
    { sort_order: 21, id: 1131 },
    { sort_order: 22, id: 728 },
    { sort_order: 23, id: 191 },
    { sort_order: 24, id: 356 },
    { sort_order: 25, id: 365 },
    { sort_order: 26, id: 889 },
    { sort_order: 27, id: 386 },
    { sort_order: 28, id: 546 },
    { sort_order: 29, id: 682 },
    { sort_order: 30, id: 924 },
    { sort_order: 31, id: 144 },
  ];

  try {
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      await updateProduct(p.id, {
        sort_order: p.sort_order,
      });
      console.log(`Updated ${i + 1}/${data.length}`);
    }
  } catch (err) {
    console.log(err);
  }
})();
