import { ProductVariant } from "./newclient/products/variants";
import { deleteProduct } from "./functions/products/deleteProduct";

const data = [
  {
    store: "bf",
    ids: [
      8443, 6567, 6568, 6572, 6706, 6898, 6928, 7029, 7032, 7047, 7236, 7237,
      7253, 7472, 7756, 7899, 8013, 8177, 8292,
    ],
  },
  {
    store: "ih",
    ids: [4624, 4079, 4080, 4081, 4137, 4311, 4312, 4318],
  },
  {
    store: "pb",
    ids: [1289, 1290, 1291, 1315, 1452, 1453, 1457],
  },
  {
    store: "bs",
    ids: [1136, 1137, 1143],
  },
  {
    store: "hie",
    ids: [258, 259, 260],
  },
];

async function test() {
  try {
    for(const d of data){
      require("./config/config").config(d.store)
      for(const id of d.ids){
        await deleteProduct(id, false)
      }
    }
  } catch (err) {
    console.log(err);
  }
}

test();

function getDiscount(v: ProductVariant): number {
  if (!v.sale_price) return 0;
  return (v.price - v.sale_price) / v.price;
}
