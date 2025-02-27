import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["ah", "px"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "KER_44015370", sale_price: 41.6, price: 52 },
  { sku: "KER_4402020", sale_price: 31.35, price: 39.2 },
  { sku: "KER_4402026", sale_price: 23.6, price: 29.5 },
  { sku: "KER_4402082", sale_price: 23.6, price: 29.5 },
  { sku: "KER_4402185", sale_price: 26, price: 32.5 },
  { sku: "KER_E046500", sale_price: 30.4, price: 38 },
  { sku: "REDK_P042560", sale_price: 21.9, price: 27.4 },
  { sku: "REDK_P042690", sale_price: 30.95, price: 38.7 },
  { sku: "REDK_P029530", sale_price: 30.95, price: 38.7 },
  { sku: "REDK_P027790", sale_price: 21.9, price: 27.4 },
  { sku: "REDK_P027920", sale_price: 24.25, price: 30.3 },
  { sku: "KER_E029600", sale_price: 41.6, price: 52 },
  { sku: "KER_E072640", sale_price: 137.75, price: 172.2 },
  { sku: "KER_E1023000", sale_price: 26, price: 32.5 },
  { sku: "9132", sale_price: 43.85, price: 54.8 },
  { sku: "9128", sale_price: 26, price: 32.5 },
  { sku: "KER_E1490200", sale_price: 42.3, price: 52.9 },
  { sku: "5011", sale_price: 21.9, price: 27.4 },
  { sku: "5041", sale_price: 31.5, price: 39.4 },
  { sku: "5048", sale_price: 23, price: 28.75 },
  { sku: "5050", sale_price: 23, price: 28.75 },
  { sku: "5051", sale_price: 23, price: 28.75 },
  { sku: "5052", sale_price: 23, price: 28.75 },
  { sku: "5053", sale_price: 26.8, price: 33.5 },
  { sku: "5055", sale_price: 26.8, price: 33.5 },
  { sku: "5056", sale_price: 26.8, price: 33.5 },
  { sku: "5057", sale_price: 26.8, price: 33.5 },
  { sku: "6258", sale_price: 33.6, price: 42 },
  { sku: "6259", sale_price: 33.6, price: 42 },
  { sku: "6729", sale_price: 26, price: 32.5 },
  { sku: "6730", sale_price: 33.85, price: 42.3 },
  { sku: "6731", sale_price: 43.85, price: 54.8 },
  { sku: "6732", sale_price: 43.85, price: 54.8 },
  { sku: "7608", sale_price: 21.35, price: 26.7 },
  { sku: "7609", sale_price: 23.7, price: 29.65 },
  { sku: "7692", sale_price: 24.25, price: 30.3 },
  { sku: "8246", sale_price: 12.55, price: 15.7 },
  { sku: "8247", sale_price: 12.55, price: 15.7 },
  { sku: "8248", sale_price: 12.55, price: 15.7 },
  { sku: "8249", sale_price: 12.55, price: 15.7 },
  { sku: "8250", sale_price: 12.55, price: 15.7 },
  { sku: "8251", sale_price: 12.55, price: 15.7 },
  { sku: "8252", sale_price: 15.3, price: 19.1 },
  { sku: "8253", sale_price: 14.95, price: 18.7 },
  { sku: "8255", sale_price: 14.95, price: 18.7 },
  { sku: "8256", sale_price: 14.95, price: 18.7 },
  { sku: "8258", sale_price: 14.95, price: 18.7 },
  { sku: "8488", sale_price: 20.3, price: 25.4 },
  { sku: "8490", sale_price: 31.75, price: 39.7 },
  { sku: "8492", sale_price: 24.3, price: 30.4 },
  { sku: "8493", sale_price: 24.25, price: 30.3 },
  { sku: "8722", sale_price: 26, price: 32.5 },
  { sku: "8774", sale_price: 26, price: 32.5 },
  { sku: "8776", sale_price: 33.85, price: 42.3 },
  { sku: "8777", sale_price: 31.35, price: 39.2 },
  { sku: "8778", sale_price: 43.85, price: 54.8 },
  { sku: "8779", sale_price: 26, price: 32.5 },
  { sku: "8780", sale_price: 26, price: 32.5 },
  { sku: "8781", sale_price: 33.85, price: 42.3 },
  { sku: "8782", sale_price: 43.85, price: 54.8 },
  { sku: "8783", sale_price: 31.35, price: 39.2 },
  { sku: "8784", sale_price: 48.9, price: 61.1 },
  { sku: "8785", sale_price: 43.85, price: 54.8 },
  { sku: "8975", sale_price: 30.8, price: 38.5 },
  { sku: "8976", sale_price: 49.35, price: 61.7 },
  { sku: "8977", sale_price: 40.1, price: 50.1 },
  { sku: "9122", sale_price: 43.85, price: 54.8 },
  { sku: "9127", sale_price: 64.15, price: 80.2 },
  { sku: "9130", sale_price: 43.85, price: 54.8 },
  { sku: "9133", sale_price: 43.85, price: 54.8 },
  { sku: "9134", sale_price: 26, price: 32.5 },
  { sku: "9135", sale_price: 33.85, price: 42.3 },
  { sku: "9140", sale_price: 26, price: 32.5 },
  { sku: "9142", sale_price: 43.85, price: 54.8 },
  { sku: "9143", sale_price: 43.85, price: 54.8 },
  { sku: "9144", sale_price: 33.85, price: 42.3 },
  { sku: "9224", sale_price: 43.85, price: 54.8 },
  { sku: "9225", sale_price: 43.85, price: 54.8 },
  { sku: "9226", sale_price: 43.85, price: 54.8 },
  { sku: "9299", sale_price: 25.3, price: 31.6 },
  { sku: "9300", sale_price: 30.5, price: 38.1 },
  { sku: "9636", sale_price: 18, price: 22.5 },
  { sku: "9649", sale_price: 14.95, price: 18.7 },
  { sku: "9650", sale_price: 14.95, price: 18.7 },
  { sku: "9651", sale_price: 16.3, price: 20.4 },
  { sku: "9652", sale_price: 15.9, price: 19.9 },
  { sku: "9653", sale_price: 31.35, price: 39.2 },
  { sku: "9762", sale_price: 26, price: 32.5 },
  { sku: "9763", sale_price: 26, price: 32.5 },
  { sku: "9764", sale_price: 26, price: 32.5 },
  { sku: "9799", sale_price: 26, price: 32.5 },
  { sku: "10124", sale_price: 29.35, price: 36.7 },
  { sku: "10184", sale_price: 19.9, price: 24.9 },
  { sku: "10185", sale_price: 21.35, price: 26.7 },
  { sku: "10188", sale_price: 26, price: 32.5 },
  { sku: "10189", sale_price: 33.85, price: 42.3 },
  { sku: "10190", sale_price: 43.85, price: 54.8 },
  { sku: "10191", sale_price: 31.35, price: 39.2 },
  { sku: "10192", sale_price: 43.85, price: 54.8 },
  { sku: "10193", sale_price: 31.35, price: 39.2 },
  { sku: "10194", sale_price: 31.35, price: 39.2 },
  { sku: "10919", sale_price: 47.35, price: 59.2 },
  { sku: "10918", sale_price: 43.85, price: 54.8 },
  { sku: "11031", sale_price: 26, price: 32.5 },
  { sku: "11032", sale_price: 26, price: 32.5 },
  { sku: "11033", sale_price: 33.85, price: 42.3 },
  { sku: "11034", sale_price: 43.85, price: 54.8 },
  { sku: "11035", sale_price: 43.85, price: 54.8 },
  { sku: "11036", sale_price: 31.35, price: 39.2 },
  { sku: "11037", sale_price: 43.85, price: 54.8 },
  { sku: "11052", sale_price: 21.35, price: 26.7 },
  { sku: "11233", sale_price: 33.6, price: 42 },
  { sku: "11232", sale_price: 33.6, price: 42 },
  { sku: "11201", sale_price: 23.7, price: 29.65 },
  { sku: "11199", sale_price: 32.7, price: 40.9 },
  { sku: "11200", sale_price: 21.35, price: 26.7 },
  { sku: "11378", sale_price: 43.85, price: 54.8 },
  { sku: "11374", sale_price: 26, price: 32.5 },
  { sku: "11377", sale_price: 32.1, price: 40.1 },
  { sku: "11376", sale_price: 31.35, price: 39.2 },
  { sku: "11375", sale_price: 26, price: 32.5 },
  { sku: "11352", sale_price: 27.7, price: 34.6 },
  { sku: "11351", sale_price: 23.85, price: 29.8 },
  { sku: "11359", sale_price: 28.65, price: 35.8 },
  { sku: "11358", sale_price: 25.4, price: 31.75 },
  { sku: "11425", sale_price: 24.5, price: 30.6 },
  { sku: "11426", sale_price: 18.9, price: 23.6 },
  { sku: "11427", sale_price: 18.9, price: 23.6 },
  { sku: "11428", sale_price: 25.6, price: 32 },
  { sku: "11429", sale_price: 25.6, price: 32 },
  { sku: "11430", sale_price: 24.5, price: 30.6 },
  { sku: "11431", sale_price: 24.5, price: 30.6 },
  { sku: "11432", sale_price: 24.5, price: 30.6 },
  { sku: "11433", sale_price: 24.5, price: 30.6 },
  { sku: "11452", sale_price: 15.05, price: 18.8 },
  { sku: "11453", sale_price: 18.1, price: 22.6 },
  { sku: "11454", sale_price: 24.55, price: 30.7 },
  { sku: "11455", sale_price: 20.65, price: 25.8 },
  { sku: "11456", sale_price: 15.05, price: 18.8 },
  { sku: "11457", sale_price: 18.1, price: 22.6 },
  { sku: "11458", sale_price: 15.05, price: 18.8 },
  { sku: "11459", sale_price: 18.1, price: 22.6 },
  { sku: "11460", sale_price: 23.35, price: 29.2 },
  { sku: "11461", sale_price: 23.35, price: 29.2 },
  { sku: "11462", sale_price: 25.6, price: 32 },
  { sku: "11463", sale_price: 18.9, price: 23.6 },
  { sku: "11464", sale_price: 18.9, price: 23.6 },
  { sku: "11465", sale_price: 15.05, price: 18.8 },
  { sku: "11466", sale_price: 20.65, price: 25.8 },
  { sku: "11468", sale_price: 15.05, price: 18.8 },
  { sku: "11469", sale_price: 18.1, price: 22.6 },
  { sku: "11470", sale_price: 24.55, price: 30.7 },
  { sku: "11471", sale_price: 15.05, price: 18.8 },
  { sku: "11472", sale_price: 18.1, price: 22.6 },
  { sku: "11473", sale_price: 24.55, price: 30.7 },
  { sku: "11474", sale_price: 20.65, price: 25.8 },
  { sku: "11479", sale_price: 18.1, price: 22.6 },
  { sku: "11481", sale_price: 24.55, price: 30.7 },
  { sku: "11483", sale_price: 15.05, price: 18.8 },
  { sku: "11484", sale_price: 24.55, price: 30.7 },
  { sku: "11648", sale_price: 28.55, price: 35.7 },
  { sku: "11702", sale_price: 41.6, price: 52 },
  { sku: "11703", sale_price: 31.35, price: 39.2 },
  { sku: "11704", sale_price: 31.35, price: 39.2 },
  { sku: "11708", sale_price: 17.2, price: 21.5 },
  { sku: "11741", sale_price: 12.55, price: 15.7 },
  { sku: "11744", sale_price: 30.5, price: 38.1 },
  { sku: "11988", sale_price: 25.85, price: 32.3 },
  { sku: "11991", sale_price: 18.5, price: 23.1 },
  { sku: "11992", sale_price: 12.55, price: 15.7 },
  { sku: "11993", sale_price: 18.5, price: 23.1 },
  { sku: "11994", sale_price: 31.85, price: 39.8 },
  { sku: "12008", sale_price: 21.45, price: 26.8 },
  { sku: "12009", sale_price: 21.45, price: 26.8 },
  { sku: "12010", sale_price: 21.45, price: 26.8 },
  { sku: "12011", sale_price: 21.45, price: 26.8 },
  { sku: "12012", sale_price: 21.45, price: 26.8 },
  { sku: "12013", sale_price: 21.45, price: 26.8 },
  { sku: "12014", sale_price: 21.45, price: 26.8 },
  { sku: "12016", sale_price: 21.45, price: 26.8 },
  { sku: "12017", sale_price: 21.45, price: 26.8 },
  { sku: "12018", sale_price: 21.45, price: 26.8 },
  { sku: "12019", sale_price: 21.45, price: 26.8 },
  { sku: "12020", sale_price: 21.45, price: 26.8 },
  { sku: "12021", sale_price: 24.55, price: 30.7 },
  { sku: "12022", sale_price: 21.45, price: 26.8 },
  { sku: "12109", sale_price: 300.8, price: 376 },
  { sku: "12211", sale_price: 14.5, price: 18.1 },
  { sku: "12212", sale_price: 17.2, price: 21.5 },
  { sku: "12213", sale_price: 14.15, price: 17.7 },
  { sku: "12214", sale_price: 14.15, price: 17.7 },
  { sku: "12215", sale_price: 17.2, price: 21.5 },
  { sku: "12216", sale_price: 14.9, price: 18.6 },
  { sku: "12217", sale_price: 17.2, price: 21.5 },
  { sku: "12218", sale_price: 17.2, price: 21.5 },
  { sku: "12223", sale_price: 14.5, price: 18.1 },
  { sku: "12233", sale_price: 15.1, price: 18.9 },
  { sku: "12234", sale_price: 15.1, price: 18.9 },
  { sku: "12244", sale_price: 30.5, price: 38.1 },
  { sku: "12247", sale_price: 25.3, price: 31.6 },
  { sku: "12248", sale_price: 25.3, price: 31.6 },
  { sku: "12249", sale_price: 25.3, price: 31.6 },
  { sku: "12250", sale_price: 25.3, price: 31.6 },
  { sku: "12251", sale_price: 25.3, price: 31.6 },
  { sku: "12254", sale_price: 30.5, price: 38.1 },
  { sku: "12255", sale_price: 33.85, price: 42.3 },
  { sku: "12256", sale_price: 26, price: 32.5 },
  { sku: "12257", sale_price: 26, price: 32.5 },
  { sku: "12258", sale_price: 33.85, price: 42.3 },
  { sku: "12259", sale_price: 43.85, price: 54.8 },
  { sku: "12260", sale_price: 43.85, price: 54.8 },
  { sku: "6077", sale_price: 26.8, price: 33.5 },
  { sku: "8793A", sale_price: 26, price: 32.5 },
  { sku: "12626", sale_price: 24.25, price: 30.3 },
  { sku: "12627", sale_price: 21.35, price: 26.7 },
  { sku: "12628", sale_price: 28.55, price: 35.7 },
  { sku: "12679", sale_price: 41.9, price: 52.4 },
  { sku: "12680", sale_price: 19.35, price: 24.2 },
  { sku: "12681", sale_price: 19.2, price: 24 },
  { sku: "12682", sale_price: 18.65, price: 23.3 },
  { sku: "12683", sale_price: 25.75, price: 32.2 },
  { sku: "12684", sale_price: 19.35, price: 24.2 },
  { sku: "12685", sale_price: 19.35, price: 24.2 },
  { sku: "12686", sale_price: 39.45, price: 49.3 },
  { sku: "12771", sale_price: 29.9, price: 37.4 },
  { sku: "12827", sale_price: 43.85, price: 54.8 },
  { sku: "12828", sale_price: 43.85, price: 54.8 },
  { sku: "12829", sale_price: 31.35, price: 39.2 },
  { sku: "11170a", sale_price: 15.5, price: 19.4 },
  { sku: "11167a", sale_price: 15.5, price: 19.4 },
  { sku: "11169a", sale_price: 15.5, price: 19.4 },
  { sku: "13068", sale_price: 26, price: 32.5 },
  { sku: "13069", sale_price: 31.2, price: 39 },
  { sku: "13213", sale_price: 31.5, price: 39.4 },
  { sku: "13214", sale_price: 28.4, price: 35.5 },
  { sku: "13236", sale_price: 43.85, price: 54.8 },
  { sku: "13284", sale_price: 24.5, price: 30.6 },
  { sku: "13311", sale_price: 23.7, price: 29.65 },
  { sku: "13312", sale_price: 26, price: 32.5 },
  { sku: "13313", sale_price: 23.7, price: 29.65 },
  { sku: "13314", sale_price: 21.35, price: 26.7 },
  { sku: "13315", sale_price: 28.55, price: 35.7 },
  { sku: "13316", sale_price: 30.95, price: 38.7 },
  { sku: "13318", sale_price: 21.9, price: 27.4 },
  { sku: "13319", sale_price: 24.25, price: 30.3 },
  { sku: "13320", sale_price: 30.95, price: 38.7 },
  { sku: "13321", sale_price: 31.35, price: 39.2 },
  { sku: "13323", sale_price: 23.6, price: 29.5 },
  { sku: "13324", sale_price: 41.6, price: 52 },
  { sku: "13325", sale_price: 31.35, price: 39.2 },
  { sku: "13332", sale_price: 28.55, price: 35.7 },
  { sku: "13333", sale_price: 16.3, price: 20.4 },
  { sku: "13334", sale_price: 14.95, price: 18.7 },
  { sku: "13336", sale_price: 26, price: 32.5 },
  { sku: "13337", sale_price: 21.9, price: 27.4 },
  { sku: "13373", sale_price: 38.15, price: 47.7 },
  { sku: "14035", sale_price: 54, price: 67.5 },
  { sku: "14036", sale_price: 30.8, price: 38.5 },
  { sku: "14037", sale_price: 39.9, price: 49.9 },
  { sku: "14038", sale_price: 49.35, price: 61.7 },
  { sku: "14039", sale_price: 48.95, price: 61.2 },
  { sku: "14040", sale_price: 40.65, price: 50.8 },
  { sku: "KER_4401984", sale_price: 30.4, price: 38 },
  { sku: "REDK_P042480", sale_price: 19.9, price: 24.9 },
  { sku: "REDK_P027970", sale_price: 19.9, price: 24.9 },
  { sku: "14141", sale_price: 26, price: 32.5 },
  { sku: "14142", sale_price: 31.2, price: 39 },
  { sku: "14143", sale_price: 26, price: 32.5 },
  { sku: "14144", sale_price: 26, price: 32.5 },
  { sku: "14412", sale_price: 35.6, price: 44.5 },
  { sku: "14413", sale_price: 29.5, price: 36.9 },
  { sku: "14770", sale_price: 26, price: 32.5 },
  { sku: "14771", sale_price: 24.3, price: 30.4 },
  { sku: "14788", sale_price: 52, price: 65 },
  { sku: "14789", sale_price: 40, price: 50 },
  { sku: "14790", sale_price: 25.2, price: 31.5 },
  { sku: "20285", sale_price: 26, price: 32.5 },
  { sku: "20286", sale_price: 26, price: 32.5 },
  { sku: "20288", sale_price: 28.55, price: 35.7 },
  { sku: "20289", sale_price: 28.55, price: 35.7 },
  { sku: "20290", sale_price: 28.55, price: 35.7 },
  { sku: "12222A", sale_price: 17.2, price: 21.5 },
  { sku: "20367", sale_price: 45.45, price: 56.8 },
  { sku: "20368", sale_price: 45.45, price: 56.8 },
  { sku: "20369", sale_price: 41.1, price: 51.4 },
  { sku: "20370", sale_price: 45.45, price: 56.8 },
  { sku: "20372", sale_price: 38.25, price: 47.8 },
  { sku: "20373", sale_price: 38.25, price: 47.8 },
  { sku: "20374", sale_price: 34.95, price: 43.7 },
  { sku: "20375", sale_price: 38.25, price: 47.8 },
  { sku: "20376", sale_price: 34.95, price: 43.7 },
  { sku: "20377", sale_price: 52, price: 65 },
  { sku: "20378", sale_price: 40, price: 50 },
  { sku: "20379", sale_price: 52, price: 65 },
  { sku: "20380", sale_price: 40, price: 50 },
  { sku: "20381", sale_price: 52, price: 65 },
  { sku: "20382", sale_price: 40, price: 50 },
  { sku: "20465", sale_price: 29.2, price: 36.5 },
  { sku: "20450", sale_price: 32.15, price: 40.2 },
  { sku: "20443", sale_price: 29.05, price: 36.3 },
  { sku: "20449", sale_price: 35.6, price: 44.5 },
  { sku: "20445", sale_price: 22.4, price: 28 },
  { sku: "20447", sale_price: 22.4, price: 28 },
  { sku: "20448", sale_price: 32.15, price: 40.2 },
  { sku: "20444", sale_price: 22.65, price: 28.3 },
  { sku: "20446", sale_price: 22.65, price: 28.3 },
  { sku: "KER_E057430", sale_price: 23.6, price: 29.5 },
  { sku: "8775", sale_price: 26, price: 32.5 },
  { sku: "11644", sale_price: 43.85, price: 54.8 },
];

enum ExcludeFromDiscountAction {
  Add = "ADD",
  Remove = "REMOVE",
  None = "NONE",
}

const addToNoDiscountCat: ExcludeFromDiscountAction =
  ExcludeFromDiscountAction.None;

async function main() {
  for (let j = 0; j < stores.length; j++) {
    const store = stores[j];
    require("../../config/config").config(store);
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      console.log(
        `${store} ${i + 1} / ${data.length} Updating prices for sku ${row.sku}`
      );
      try {
        /**
         *priceupdate fields
         */
        let updates = {
          price: row.price,
          retail_price: row.price,
          sale_price: row.sale_price,
        };

        const vars = await getAllProductVariants({ sku: row.sku });
        const expect = 1;
        if (vars.length !== expect) {
          throw `Incorrect number of variants for sku ${row.sku}. Expected ${expect}, received ${vars.length}.`;
        }

        const variantToUpdate = vars[0];
        await updateProductVariant(
          variantToUpdate.product_id,
          variantToUpdate.id,
          updates
        );
        if (addToNoDiscountCat !== ExcludeFromDiscountAction.None) {
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

            if (!catID) {
              throw "No catId for nodiscountcat of current store " + store;
            }

            let updatedCategories = [...product.categories];
            if (addToNoDiscountCat == ExcludeFromDiscountAction.Add) {
              updatedCategories = [...product.categories, catID];
            } else if (addToNoDiscountCat == ExcludeFromDiscountAction.Remove) {
              updatedCategories = updatedCategories.filter(
                (id) => id !== catID
              );
            }

            await updateProduct(product.id, {
              categories: updatedCategories,
            });
          }
        }
      } catch (err) {
        console.log(err);
        continue;
      }
      /**
       * wait 1.5s
       */
      //await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
  console.log("done");
}
main();
