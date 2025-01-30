require("../../config/config").config("ha");
import { updateProduct } from "../../functions/products/updateProduct";
const sort_orders = [
  { id: 1564, sort_order: 1 },
  { id: 1372, sort_order: 2 },
  { id: 692, sort_order: 3 },
  { id: 835, sort_order: 4 },
  { id: 753, sort_order: 5 },
  { id: 621, sort_order: 166 },
  { id: 181, sort_order: 227 },
  { id: 1084, sort_order: 348 },
  { id: 1007, sort_order: 359 },
  { id: 913, sort_order: 380 },
  { id: 736, sort_order: 401 },
  { id: 1373, sort_order: 452 },
  { id: 299, sort_order: 653 },
  { id: 874, sort_order: 674 },
  { id: 919, sort_order: 755 },
  { id: 923, sort_order: 786 },
  { id: 983, sort_order: 917 },
  { id: 1375, sort_order: 928 },
  { id: 183, sort_order: 1009 },
  { id: 473, sort_order: 1070 },
  { id: 489, sort_order: 1201 },
  { id: 1297, sort_order: 1662 },
  { id: 1404, sort_order: 1723 },
  { id: 1511, sort_order: 2154 },
  { id: 1296, sort_order: 2305 },
  { id: 1295, sort_order: 2376 },
  { id: 1225, sort_order: 2467 },
  { id: 172, sort_order: 2748 },
  { id: 1065, sort_order: 2799 },
  { id: 1067, sort_order: 2840 },
  { id: 1244, sort_order: 3071 },
  { id: 1062, sort_order: 3342 },
  { id: 1068, sort_order: 3473 },
  { id: 1069, sort_order: 3874 },
  { id: 962, sort_order: 3895 },
  { id: 510, sort_order: 4156 },
  { id: 1061, sort_order: 4557 },
  { id: 1071, sort_order: 4638 },
  { id: 254, sort_order: 5129 },
  { id: 1073, sort_order: 5250 },
  { id: 253, sort_order: 5591 },
  { id: 195, sort_order: 5772 },
  { id: 313, sort_order: 5903 },
  { id: 702, sort_order: 5914 },
  { id: 1064, sort_order: 6035 },
  { id: 1063, sort_order: 6206 },
  { id: 415, sort_order: 7277 },
  { id: 1405, sort_order: 7748 },
  { id: 283, sort_order: 8769 },
  { id: 1080, sort_order: 9620 },
  { id: 890, sort_order: 10051 },
  { id: 390, sort_order: 10052 },
  { id: 1002, sort_order: 10053 },
  { id: 609, sort_order: 10054 },
  { id: 1083, sort_order: 10055 },
  { id: 1081, sort_order: 10056 },
  { id: 920, sort_order: 10057 },
  { id: 234, sort_order: 10058 },
  { id: 546, sort_order: 10059 },
  { id: 1082, sort_order: 10060 },
  { id: 1508, sort_order: 10061 },
  { id: 1386, sort_order: 10062 },
  { id: 1079, sort_order: 10063 },
  { id: 1320, sort_order: 10064 },
  { id: 712, sort_order: 10065 },
  { id: 126, sort_order: 10066 },
  { id: 451, sort_order: 10067 },
  { id: 427, sort_order: 10198 },
];

async function main() {
  for (let i = 0; i < sort_orders.length; i++) {
    console.log(`${i + 1} / ${sort_orders.length}`);
    const row = sort_orders[i];
    try {
      await updateProduct(row.id, {
        sort_order: row.sort_order,
      });
    } catch (err) {
      if (err) {
        console.log(err);
      }
      continue;
    }
  }
}
main();
