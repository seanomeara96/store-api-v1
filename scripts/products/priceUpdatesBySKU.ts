import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";
const stores: string[] = ["bsk"];
//const no_discount_category_ID = 1493;
const data: {
  sku: string;
  sale_price: number;
  price?: number;
  exclude: "TRUE" | "FALSE" | null;
}[] = [
  { sku: "8755", sale_price: 46.45, exclude: "FALSE" },
  { sku: "21748", sale_price: 165, exclude: "FALSE" },
  { sku: "20457", sale_price: 81.2, exclude: "FALSE" },
  { sku: "11694", sale_price: 16, exclude: "FALSE" },
  { sku: "111006", sale_price: 67.99, exclude: "TRUE" },
  { sku: "110631", sale_price: 64.99, exclude: "TRUE" },
  { sku: "110622", sale_price: 53.99, exclude: "FALSE" },
  { sku: "110621", sale_price: 29.25, exclude: "TRUE" },
  { sku: "111598", sale_price: 64.99, exclude: "FALSE" },
  { sku: "110625", sale_price: 65.25, exclude: "TRUE" },
  { sku: "101306", sale_price: 46.85, exclude: "TRUE" },
  { sku: "101304", sale_price: 29.25, exclude: "TRUE" },
  { sku: "GWP19", sale_price: 26.25, exclude: "TRUE" },
  { sku: "6244", sale_price: 49.99, exclude: "FALSE" },
  { sku: "4930", sale_price: 12.25, exclude: "TRUE" },
  { sku: "20866", sale_price: 78, exclude: "FALSE" },
  { sku: "110628", sale_price: 27.75, exclude: "TRUE" },
  { sku: "5760", sale_price: 67.99, exclude: "FALSE" },
  { sku: "3826B", sale_price: 16.5, exclude: "TRUE" },
  { sku: "20864", sale_price: 111, exclude: "FALSE" },
  { sku: "111064", sale_price: 42.03, exclude: "FALSE" },
  { sku: "104403", sale_price: 59.99, exclude: "FALSE" },
  { sku: "12746", sale_price: 53.99, exclude: "FALSE" },
  { sku: "11260", sale_price: 69.99, exclude: "FALSE" },
  { sku: "110548", sale_price: 51.99, exclude: "FALSE" },
  { sku: "110106", sale_price: 31.99, exclude: "TRUE" },
  { sku: "110711", sale_price: 45, exclude: "TRUE" },
  { sku: "105302", sale_price: 44.99, exclude: "TRUE" },
  { sku: "110723", sale_price: 51.15, exclude: "TRUE" },
  { sku: "106403", sale_price: 8.25, exclude: "TRUE" },
  { sku: "110725", sale_price: 27.75, exclude: "TRUE" },
  { sku: "106613", sale_price: 43.65, exclude: "TRUE" },
  { sku: "103032", sale_price: 28.6, exclude: "TRUE" },
  { sku: "110902", sale_price: 30.2, exclude: "TRUE" },
  { sku: "109013", sale_price: 31.99, exclude: "TRUE" },
  { sku: "110717", sale_price: 26.8, exclude: "TRUE" },
  { sku: "110626", sale_price: 37.5, exclude: "TRUE" },
  { sku: "109402", sale_price: 21.99, exclude: "TRUE" },
  { sku: "110012", sale_price: 18.99, exclude: "TRUE" },
  { sku: "110681", sale_price: 27.75, exclude: "TRUE" },
  { sku: "107011", sale_price: 33.99, exclude: "FALSE" },
  { sku: "107012", sale_price: 33.99, exclude: "FALSE" },
  { sku: "107013", sale_price: 33.99, exclude: "FALSE" },
  { sku: "107014", sale_price: 33.99, exclude: "FALSE" },
  { sku: "107015", sale_price: 33.99, exclude: "FALSE" },
  { sku: "107016", sale_price: 33.99, exclude: "FALSE" },
  { sku: "107017", sale_price: 33.99, exclude: "FALSE" },
  { sku: "107018", sale_price: 33.99, exclude: "FALSE" },
  { sku: "110677", sale_price: 59.99, exclude: "FALSE" },
  { sku: "110724", sale_price: 27.75, exclude: "TRUE" },
  { sku: "21751", sale_price: 87, exclude: "FALSE" },
  { sku: "20865", sale_price: 148, exclude: "FALSE" },
  { sku: "105411", sale_price: 72.75, exclude: "TRUE" },
  { sku: "7796", sale_price: 132.99, exclude: "FALSE" },
  { sku: "7216", sale_price: 60.99, exclude: "FALSE" },
  { sku: "110551", sale_price: 61.99, exclude: "FALSE" },
  { sku: "110594", sale_price: 8.99, exclude: "TRUE" },
  { sku: "7601", sale_price: 68.99, exclude: "FALSE" },
  { sku: "110304", sale_price: 14.99, exclude: "TRUE" },
  { sku: "110404", sale_price: 16.99, exclude: "TRUE" },
  { sku: "110609", sale_price: 37.45, exclude: "TRUE" },
  { sku: "110104", sale_price: 69.99, exclude: "FALSE" },
  { sku: "110820", sale_price: 15, exclude: "TRUE" },
  { sku: "110940", sale_price: 15, exclude: "TRUE" },
  { sku: "110950", sale_price: 15, exclude: "TRUE" },
  { sku: "110960", sale_price: 17.65, exclude: "TRUE" },
  { sku: "110980", sale_price: 20.25, exclude: "TRUE" },
  { sku: "110990", sale_price: 22.9, exclude: "TRUE" },
  { sku: "110916", sale_price: 14.25, exclude: "TRUE" },
  { sku: "110905", sale_price: 37.99, exclude: "FALSE" },
  { sku: "111047", sale_price: 37.05, exclude: "TRUE" },
  { sku: "100796", sale_price: 14.55, exclude: "TRUE" },
  { sku: "110630", sale_price: 42.99, exclude: "FALSE" },
  { sku: "5127", sale_price: 30, exclude: "TRUE" },
  { sku: "5291", sale_price: 59.99, exclude: "TRUE" },
  { sku: "5292", sale_price: 79.99, exclude: "TRUE" },
  { sku: "5293", sale_price: 52.99, exclude: "TRUE" },
  { sku: "5294", sale_price: 19.9, exclude: "TRUE" },
  { sku: "100792", sale_price: 60.99, exclude: "TRUE" },
  { sku: "21750", sale_price: 144, exclude: "FALSE" },
  { sku: "103605", sale_price: 84.99, exclude: "FALSE" },
  { sku: "110542a", sale_price: 45.75, exclude: "TRUE" },
  { sku: "101306a", sale_price: 46.7, exclude: "TRUE" },
  { sku: "110622a", sale_price: 46.7, exclude: "TRUE" },
  { sku: "101602a", sale_price: 32.75, exclude: "TRUE" },
  { sku: "110641", sale_price: 52.99, exclude: "FALSE" },
  { sku: "5931", sale_price: 19.15, exclude: "TRUE" },
  { sku: "6143", sale_price: 69.9, exclude: "TRUE" },
  { sku: "6144", sale_price: 60.5, exclude: "TRUE" },
  { sku: "6146", sale_price: 19.99, exclude: "TRUE" },
  { sku: "5354a", sale_price: 52.9, exclude: "TRUE" },
  { sku: "5354b", sale_price: 78.75, exclude: "TRUE" },
  { sku: "5354c", sale_price: 131.25, exclude: "TRUE" },
  { sku: "5354d", sale_price: 52.5, exclude: "TRUE" },
  { sku: "5354e", sale_price: 78.75, exclude: "TRUE" },
  { sku: "101106x", sale_price: 104, exclude: "TRUE" },
  { sku: "101511", sale_price: 44.99, exclude: "FALSE" },
  { sku: "GWP1", sale_price: 22.5, exclude: "TRUE" },
  { sku: "GWP2", sale_price: 52.5, exclude: "TRUE" },
  { sku: "11259", sale_price: 80, exclude: "FALSE" },
  { sku: "110624", sale_price: 43.99, exclude: "FALSE" },
  { sku: "GWP5", sale_price: 33.75, exclude: "TRUE" },
  { sku: "GWP6", sale_price: 52.5, exclude: "TRUE" },
  { sku: "21752", sale_price: 76, exclude: "FALSE" },
  { sku: "7802", sale_price: 17.99, exclude: "FALSE" },
  { sku: "6820", sale_price: 4.99, exclude: "TRUE" },
  { sku: "GWP7", sale_price: 49.5, exclude: "TRUE" },
  { sku: "6843", sale_price: 27.75, exclude: "TRUE" },
  { sku: "6844", sale_price: 63, exclude: "TRUE" },
  { sku: "GWP8", sale_price: 27, exclude: "TRUE" },
  { sku: "110542", sale_price: 62.99, exclude: "FALSE" },
  { sku: "6990", sale_price: 64.5, exclude: "TRUE" },
  { sku: "6991", sale_price: 62.55, exclude: "TRUE" },
  { sku: "6992", sale_price: 59.5, exclude: "TRUE" },
  { sku: "6993", sale_price: 72.55, exclude: "TRUE" },
  { sku: "XXXX", sale_price: 11.25, exclude: "TRUE" },
  { sku: "GWP9", sale_price: 35.25, exclude: "TRUE" },
  { sku: "6816", sale_price: 3, exclude: "TRUE" },
  { sku: "10307", sale_price: 190, exclude: "FALSE" },
  { sku: "10309", sale_price: 149.99, exclude: "FALSE" },
  { sku: "100851", sale_price: 22.99, exclude: "FALSE" },
  { sku: "GWP10", sale_price: 24.75, exclude: "TRUE" },
  { sku: "GWP11", sale_price: 51, exclude: "TRUE" },
  { sku: "GWP12", sale_price: 37.5, exclude: "TRUE" },
  { sku: "6798a", sale_price: 23.5, exclude: "FALSE" },
  { sku: "10121", sale_price: 137.99, exclude: "FALSE" },
  { sku: "7603", sale_price: 29.99, exclude: "FALSE" },
  { sku: "GWP13", sale_price: 35, exclude: "FALSE" },
  { sku: "GWP14", sale_price: 15, exclude: "TRUE" },
  { sku: "7797", sale_price: 13.99, exclude: "FALSE" },
  { sku: "GWP15", sale_price: 37.5, exclude: "TRUE" },
  { sku: "GWP16", sale_price: 37.5, exclude: "TRUE" },
  { sku: "GWP17", sale_price: 21.4, exclude: "TRUE" },
  { sku: "10308", sale_price: 225, exclude: "FALSE" },
  { sku: "12740", sale_price: 89.99, exclude: "FALSE" },
  { sku: "6798", sale_price: 23.99, exclude: "FALSE" },
  { sku: "12384", sale_price: 119.99, exclude: "FALSE" },
  { sku: "110722", sale_price: 39.99, exclude: "FALSE" },
  { sku: "7998", sale_price: 69.99, exclude: "FALSE" },
  { sku: "12737", sale_price: 72.99, exclude: "FALSE" },
  { sku: "101602", sale_price: 46.99, exclude: "FALSE" },
  { sku: "7806", sale_price: 23.99, exclude: "FALSE" },
  { sku: "7826", sale_price: 97.5, exclude: "TRUE" },
  { sku: "7725", sale_price: 147.99, exclude: "FALSE" },
  { sku: "102321", sale_price: 63.99, exclude: "FALSE" },
  { sku: "GWP18", sale_price: 13.5, exclude: "TRUE" },
  { sku: "12210", sale_price: 91.99, exclude: "FALSE" },
  { sku: "101106", sale_price: 64.99, exclude: "FALSE" },
  { sku: "10378", sale_price: 64.99, exclude: "FALSE" },
  { sku: "106053", sale_price: 66.99, exclude: "FALSE" },
  { sku: "8281", sale_price: 40.99, exclude: "FALSE" },
  { sku: "8282", sale_price: 83.99, exclude: "FALSE" },
  { sku: "GWP22", sale_price: 30.75, exclude: "TRUE" },
  { sku: "GWP23", sale_price: 27, exclude: "TRUE" },
  { sku: "10608", sale_price: 39.99, exclude: "FALSE" },
  { sku: "GWP26", sale_price: 27, exclude: "TRUE" },
  { sku: "GWP28", sale_price: 27, exclude: "TRUE" },
  { sku: "GWP29", sale_price: 22.5, exclude: "TRUE" },
  { sku: "GWP20", sale_price: 37, exclude: "FALSE" },
  { sku: "9193", sale_price: 86.99, exclude: "FALSE" },
  { sku: "6508", sale_price: 91.99, exclude: "FALSE" },
  { sku: "9009", sale_price: 4.99, exclude: "FALSE" },
  { sku: "9073", sale_price: 3.99, exclude: "FALSE" },
  { sku: "110541", sale_price: 40.99, exclude: "FALSE" },
  { sku: "7215", sale_price: 40.99, exclude: "FALSE" },
  { sku: "9537", sale_price: 5, exclude: "FALSE" },
  { sku: "GWP32", sale_price: 23, exclude: "FALSE" },
  { sku: "9893", sale_price: 16.99, exclude: "FALSE" },
  { sku: "5354", sale_price: 64.99, exclude: "FALSE" },
  { sku: "10281", sale_price: 41.99, exclude: "FALSE" },
  { sku: "102021", sale_price: 47.99, exclude: "FALSE" },
  { sku: "10305", sale_price: 199, exclude: "FALSE" },
  { sku: "6341", sale_price: 84.99, exclude: "FALSE" },
  { sku: "14033", sale_price: 84.99, exclude: "FALSE" },
  { sku: "10310", sale_price: 100, exclude: "FALSE" },
  { sku: "10311", sale_price: 77.6, exclude: "FALSE" },
  { sku: "GWP33", sale_price: 23, exclude: "FALSE" },
  { sku: "11141", sale_price: 61.99, exclude: "FALSE" },
  { sku: "6797", sale_price: 24.99, exclude: "FALSE" },
  { sku: "10306", sale_price: 200, exclude: "FALSE" },
  { sku: "7803", sale_price: 18.99, exclude: "FALSE" },
  { sku: "GWP34", sale_price: 56, exclude: "FALSE" },
  { sku: "10282", sale_price: 56.99, exclude: "FALSE" },
  { sku: "110700", sale_price: 65.99, exclude: "FALSE" },
  { sku: "12743", sale_price: 98.99, exclude: "FALSE" },
  { sku: "GWP35", sale_price: 72, exclude: "FALSE" },
  { sku: "10643", sale_price: 36, exclude: "FALSE" },
  { sku: "14519", sale_price: 79.99, exclude: "FALSE" },
  { sku: "7453", sale_price: 66.99, exclude: "FALSE" },
  { sku: "GWP36", sale_price: 72, exclude: "FALSE" },
  { sku: "7829", sale_price: 34.99, exclude: "FALSE" },
  { sku: "106202", sale_price: 43.99, exclude: "FALSE" },
  { sku: "10197", sale_price: 256, exclude: "FALSE" },
  { sku: "101104", sale_price: 41.99, exclude: "FALSE" },
  { sku: "11310", sale_price: 48.99, exclude: "FALSE" },
  { sku: "14520", sale_price: 139.99, exclude: "FALSE" },
  { sku: "7830", sale_price: 36.99, exclude: "FALSE" },
  { sku: "11347", sale_price: 52, exclude: "FALSE" },
  { sku: "GWP37", sale_price: 32, exclude: "FALSE" },
  { sku: "11311", sale_price: 66.99, exclude: "FALSE" },
  { sku: "7801", sale_price: 14.99, exclude: "FALSE" },
  { sku: "9309", sale_price: 23.99, exclude: "FALSE" },
  { sku: "11234", sale_price: 23.99, exclude: "FALSE" },
  { sku: "8068A", sale_price: 39.99, exclude: "FALSE" },
  { sku: "10380", sale_price: 58.99, exclude: "FALSE" },
  { sku: "11030", sale_price: 59, exclude: "FALSE" },
  { sku: "12741", sale_price: 103.5, exclude: "FALSE" },
  { sku: "12742", sale_price: 230, exclude: "FALSE" },
  { sku: "22243", sale_price: 148, exclude: "FALSE" },
  { sku: "14745", sale_price: 349.99, exclude: "FALSE" },
  { sku: "12747", sale_price: 59, exclude: "FALSE" },
  { sku: "110910", sale_price: 19.99, exclude: "FALSE" },
  { sku: "10379", sale_price: 39.99, exclude: "FALSE" },
  { sku: "13168", sale_price: 70, exclude: "FALSE" },
  { sku: "11773", sale_price: 12, exclude: "FALSE" },
  { sku: "11990", sale_price: 28.99, exclude: "FALSE" },
  { sku: "10280", sale_price: 30.99, exclude: "FALSE" },
  { sku: "9193A", sale_price: 99, exclude: "FALSE" },
  { sku: "7806A", sale_price: 18, exclude: "FALSE" },
  { sku: "9454", sale_price: 99.99, exclude: "FALSE" },
  { sku: "9033", sale_price: 12, exclude: "FALSE" },
  { sku: "12760", sale_price: 50, exclude: "FALSE" },
  { sku: "12759", sale_price: 46, exclude: "FALSE" },
  { sku: "110616", sale_price: 44.99, exclude: "FALSE" },
  { sku: "12738", sale_price: 92, exclude: "FALSE" },
  { sku: "12739", sale_price: 89.99, exclude: "FALSE" },
  { sku: "8069", sale_price: 51.99, exclude: "FALSE" },
  { sku: "9310", sale_price: 26.99, exclude: "FALSE" },
  { sku: "13147", sale_price: 69.99, exclude: "FALSE" },
  { sku: "5887", sale_price: 14.99, exclude: "FALSE" },
  { sku: "12745", sale_price: 43.99, exclude: "TRUE" },
  { sku: "7799", sale_price: 14.99, exclude: "FALSE" },
  { sku: "7804", sale_price: 17.99, exclude: "FALSE" },
  { sku: "7805", sale_price: 17.99, exclude: "FALSE" },
  { sku: "12884", sale_price: 35, exclude: "FALSE" },
  { sku: "20366", sale_price: 105, exclude: "FALSE" },
  { sku: "11694A", sale_price: 7, exclude: "FALSE" },
  { sku: "20195", sale_price: 125, exclude: "FALSE" },
  { sku: "13101", sale_price: 37.99, exclude: "FALSE" },
  { sku: "11758", sale_price: 4.2, exclude: "FALSE" },
  { sku: "11759", sale_price: 3.9, exclude: "FALSE" },
  { sku: "11760", sale_price: 5, exclude: "FALSE" },
  { sku: "13285", sale_price: 26, exclude: "FALSE" },
  { sku: "13148", sale_price: 17, exclude: "FALSE" },
  { sku: "11761", sale_price: 10, exclude: "FALSE" },
  { sku: "11762", sale_price: 10, exclude: "FALSE" },
  { sku: "11763", sale_price: 17, exclude: "FALSE" },
  { sku: "11764", sale_price: 4.5, exclude: "FALSE" },
  { sku: "14683", sale_price: 40, exclude: "FALSE" },
  { sku: "14743", sale_price: 317, exclude: "FALSE" },
  { sku: "14744", sale_price: 170, exclude: "FALSE" },
  { sku: "11765", sale_price: 4.99, exclude: "FALSE" },
  { sku: "14746", sale_price: 10, exclude: "FALSE" },
  { sku: "11766", sale_price: 5.4, exclude: "FALSE" },
  { sku: "20196", sale_price: 20, exclude: "FALSE" },
  { sku: "GWP38", sale_price: 32, exclude: "FALSE" },
  { sku: "GWP39", sale_price: 32, exclude: "FALSE" },
  { sku: "11767", sale_price: 19, exclude: "FALSE" },
  { sku: "20390", sale_price: 24.99, exclude: "FALSE" },
  { sku: "20452", sale_price: 59.2, exclude: "FALSE" },
  { sku: "11768", sale_price: 20, exclude: "FALSE" },
  { sku: "11769", sale_price: 7.5, exclude: "FALSE" },
  { sku: "11770", sale_price: 6.5, exclude: "FALSE" },
  { sku: "11771", sale_price: 5, exclude: "FALSE" },
  { sku: "11772", sale_price: 14, exclude: "FALSE" },
  { sku: "20389", sale_price: 39.99, exclude: "FALSE" },
  { sku: "12761", sale_price: 15, exclude: "FALSE" },
  { sku: "13146", sale_price: 29, exclude: "FALSE" },
  { sku: "9033A", sale_price: 12, exclude: "FALSE" },
  { sku: "13882", sale_price: 25, exclude: "FALSE" },
  { sku: "20504", sale_price: 20, exclude: "FALSE" },
  { sku: "21058", sale_price: 27, exclude: "FALSE" },
  { sku: "20505", sale_price: 51, exclude: "FALSE" },
  { sku: "20756", sale_price: 144, exclude: "FALSE" },
  { sku: "20755", sale_price: 106, exclude: "FALSE" },
  { sku: "20842", sale_price: 17, exclude: "FALSE" },
  { sku: "21057", sale_price: 95, exclude: "FALSE" },
  { sku: "20738", sale_price: 9, exclude: "FALSE" },
  { sku: "21345", sale_price: 168, exclude: "FALSE" },
  { sku: "21495", sale_price: 56, exclude: "FALSE" },
  { sku: "21496", sale_price: 88, exclude: "FALSE" },
  { sku: "21346", sale_price: 145, exclude: "FALSE" },
  { sku: "21498", sale_price: 15, exclude: "FALSE" },
  { sku: "21350", sale_price: 19, exclude: "FALSE" },
  { sku: "21351", sale_price: 36, exclude: "FALSE" },
  { sku: "21348", sale_price: 32, exclude: "FALSE" },
  { sku: "21352", sale_price: 39, exclude: "FALSE" },
  { sku: "21684", sale_price: 35, exclude: "FALSE" },
  { sku: "21349", sale_price: 42, exclude: "FALSE" },
  { sku: "21343", sale_price: 48, exclude: "FALSE" },
  { sku: "21344", sale_price: 77, exclude: "FALSE" },
  { sku: "21347", sale_price: 84, exclude: "FALSE" },
  { sku: "21497", sale_price: 24, exclude: "FALSE" },
  { sku: "21749", sale_price: 109, exclude: "FALSE" },
  { sku: "21880", sale_price: 51, exclude: "FALSE" },
  { sku: "21928", sale_price: 34, exclude: "FALSE" },
  { sku: "21988", sale_price: 149, exclude: "FALSE" },
  { sku: "22244", sale_price: 83, exclude: "FALSE" },
  { sku: "21753", sale_price: 22, exclude: "FALSE" },
];
enum ExcludeFromDiscountAction {
  Add = "ADD",
  Remove = "REMOVE",
  None = "NONE",
}

let retries = 0;
async function main() {
  for (let j = 0; j < stores.length; j++) {
    const store = stores[j];
    require("../../config/config").config(store);
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      console.log(
        `${store} ${i + 1} / ${data.length} Updating prices for sku ${row.sku}`,
      );
      try {
        let addToNoDiscountCat: ExcludeFromDiscountAction =
          ExcludeFromDiscountAction.None;
        if (row.exclude === "TRUE") {
          addToNoDiscountCat = ExcludeFromDiscountAction.Add;
        }
        if (row.exclude === "FALSE") {
          addToNoDiscountCat = ExcludeFromDiscountAction.Remove;
        }

        /**
         *priceupdate fields
         */
        let updates: any = {
          sale_price: row.sale_price,
        };

        if (row.price) {
          updates.retail_price = row.price;
          updates.price = row.price;
        }

        const vars = await getAllProductVariants({
          sku: row.sku,
        });
        const expect = 1;
        if (vars.length !== expect) {
          console.log(
            `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`,
          );
          continue;
        }

        const variantToUpdate = vars[0];
        await updateProductVariant(
          variantToUpdate.product_id,
          variantToUpdate.id,
          updates,
        );
        if (
          addToNoDiscountCat == ExcludeFromDiscountAction.Add ||
          addToNoDiscountCat == ExcludeFromDiscountAction.Remove
        ) {
          const product = await getProductBySku(row.sku);

          if (product) {
            let catID: number | undefined;

            console.log(product?.id, product.name);

            if (store === "bf") {
              catID = 640;
            }

            if (store === "ih") {
              catID = 1493;
            }

            if (store === "bsk") {
              catID = 108;
            }

            if (store === "ah") {
              catID = 233;
            }

            if (store === "pb") {
              catID = 187;
            }

            if (store === "hie") {
              catID = 41;
            }

            if (store === "px") {
              catID = 484;
            }

            if (store === "bs") {
              catID = 90;
            }

            if (!catID) {
              throw "No catId for no discount cat of current store";
            }

            let updatedCategories = [...product.categories];
            if (addToNoDiscountCat == ExcludeFromDiscountAction.Add) {
              updatedCategories = [...product.categories, catID];
            } else if (addToNoDiscountCat == ExcludeFromDiscountAction.Remove) {
              updatedCategories = updatedCategories.filter(
                (id) => id !== catID,
              );
            }

            await updateProduct(product.id, {
              categories: updatedCategories,
            });
          }
        }
      } catch (err: any) {
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err);
        }

        if (JSON.stringify(err).includes("nodiscountcat")) {
          console.log("fatal err");
          return;
        }

        if (retries < 3) {
          i--;
          retries++;
          await new Promise((r) => setTimeout(r, 5000));
        }
        continue;
      }
      /**
       * wait 1.5s
       */
      await new Promise((r) => setTimeout(r, 500));
      retries = 0;
    }
  }
  console.log("done");
}
main();
