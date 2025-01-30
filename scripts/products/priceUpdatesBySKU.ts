import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["bf", "ah", "bsk", "px"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "9661", price: 65.4, sale_price: 65.4 },
  { sku: "9078", price: 54.75, sale_price: 49.75 },
  { sku: "20661", price: 51.79, sale_price: 37.8 },
  { sku: "20677", price: 48.79, sale_price: 37.8 },
  { sku: "20662", price: 51.79, sale_price: 37.8 },
  { sku: "20678", price: 48.79, sale_price: 37.8 },
  { sku: "14763", price: 79.8, sale_price: 79.8 },
  { sku: "14758", price: 73.8, sale_price: 73.8 },
  { sku: "14760", price: 73.2, sale_price: 73.2 },
  { sku: "14759", price: 78.2, sale_price: 78.2 },
  { sku: "14761", price: 66.3, sale_price: 66.3 },
  { sku: "14762", price: 68.2, sale_price: 68.2 },
  { sku: "14764", price: 83.0, sale_price: 78.0 },
  { sku: "9804", price: 35.8, sale_price: 35.8 },
  { sku: "9805", price: 39.0, sale_price: 39.0 },
  { sku: "20660", price: 45.79, sale_price: 31.8 },
  { sku: "20676", price: 42.79, sale_price: 31.8 },
  { sku: "9803", price: 31.8, sale_price: 31.8 },
  { sku: "20656", price: 45.79, sale_price: 31.8 },
  { sku: "20672", price: 42.79, sale_price: 31.8 },
  { sku: "20651", price: 31.8, sale_price: 26.8 },
  { sku: "20657", price: 45.79, sale_price: 31.8 },
  { sku: "20673", price: 42.79, sale_price: 31.8 },
  { sku: "13038", price: 52.3, sale_price: 52.3 },
  { sku: "20650", price: 31.8, sale_price: 26.8 },
  { sku: "20658", price: 45.79, sale_price: 31.8 },
  { sku: "20674", price: 42.79, sale_price: 31.8 },
  { sku: "9802", price: 34.0, sale_price: 34.0 },
  { sku: "9806", price: 44.0, sale_price: 44.0 },
  { sku: "20652", price: 35.0, sale_price: 30.0 },
  { sku: "20663", price: 49.79, sale_price: 35.8 },
  { sku: "20679", price: 46.79, sale_price: 35.8 },
  { sku: "11076", price: 60.0, sale_price: 60.0 },
  { sku: "11074", price: 37.8, sale_price: 37.8 },
  { sku: "11075", price: 37.8, sale_price: 32.8 },
  { sku: "8756", price: 52.0, sale_price: 47.0 },
  { sku: "14137", price: 82.0, sale_price: 68.8 },
  { sku: "14136", price: 31.8, sale_price: 31.8 },
  { sku: "9954", price: 109.35, sale_price: 104.35 },
  { sku: "8760", price: 47.7, sale_price: 37.7 },
  { sku: "10377", price: 51.7, sale_price: 51.7 },
  { sku: "9955", price: 103.6, sale_price: 98.6 },
  { sku: "8759", price: 47.7, sale_price: 37.7 },
  { sku: "9956", price: 95.45, sale_price: 80.75 },
  { sku: "8758", price: 50.05, sale_price: 40.05 },
  { sku: "9087", price: 56.0, sale_price: 50.0 },
  { sku: "9229", price: 45.8, sale_price: 40.8 },
  { sku: "9907", price: 51.7, sale_price: 51.7 },
  { sku: "9908", price: 41.4, sale_price: 36.4 },
  { sku: "9906", price: 92.7, sale_price: 92.7 },
  { sku: "8757", price: 51.7, sale_price: 51.7 },
  { sku: "9801", price: 44.4, sale_price: 44.4 },
  { sku: "20659", price: 45.79, sale_price: 31.8 },
  { sku: "20675", price: 42.79, sale_price: 31.8 },
  { sku: "20200", price: 73.0, sale_price: 63.0 },
  { sku: "20199", price: 31.8, sale_price: 26.8 },
  { sku: "10688A", price: 53.0, sale_price: 35.0 },
  { sku: "10731A", price: 36.0, sale_price: 9.99 },
  { sku: "20527", price: 83.0, sale_price: 35.0 },
  { sku: "20528", price: 82.0, sale_price: 42.0 },
  { sku: "20533", price: 53.0, sale_price: 25.0 },
  { sku: "11849", price: 26.0, sale_price: 26.0 },
  { sku: "11865", price: 28.0, sale_price: 28.0 },
  { sku: "11863", price: 31.99, sale_price: 31.99 },
  { sku: "12900", price: 22.0, sale_price: 22.0 },
  { sku: "12901", price: 22.0, sale_price: 22.0 },
  { sku: "11859", price: 28.5, sale_price: 28.5 },
  { sku: "13037", price: 59.0, sale_price: 59.0 },
  { sku: "7822", price: 106.5, sale_price: 99.5 },
  { sku: "7823", price: 107.0, sale_price: 97.0 },
  { sku: "8787", price: 50.0, sale_price: 50.0 },
  { sku: "11497", price: 75.0, sale_price: 75.0 },
  { sku: "11498", price: 74.0, sale_price: 74.0 },
  { sku: "7820", price: 80.0, sale_price: 75.0 },
  { sku: "9230", price: 84.0, sale_price: 79.0 },
  { sku: "11499", price: 95.0, sale_price: 90.0 },
  { sku: "11500", price: 131.0, sale_price: 124.0 },
  { sku: "8985", price: 144.5, sale_price: 119.99 },
  { sku: "14744", price: 238.0, sale_price: 170.0 },
  { sku: "14743", price: 367.0, sale_price: 317.0 },
  { sku: "14745", price: 386.0, sale_price: 349.99 },
  { sku: "10308", price: 273.0, sale_price: 225.0 },
  { sku: "10310", price: 112.0, sale_price: 100.0 },
  { sku: "10306", price: 232.0, sale_price: 200.0 },
  { sku: "10305", price: 232.0, sale_price: 199.0 },
  { sku: "10307", price: 232.0, sale_price: 190.0 },
  { sku: "10309", price: 183.0, sale_price: 149.99 },
  { sku: "10139", price: 45.0, sale_price: 45.0 },
  { sku: "13673", price: 36.45, sale_price: 36.45 },
  { sku: "13643", price: 36.99, sale_price: 31.99 },
  { sku: "20523", price: 22.0, sale_price: 18.0 },
  { sku: "20525", price: 38.0, sale_price: 28.0 },
  { sku: "20524", price: 41.0, sale_price: 31.0 },
  { sku: "8841", price: 49.0, sale_price: 44.0 },
  { sku: "9231", price: 70.5, sale_price: 70.5 },
  { sku: "12123", price: 43.0, sale_price: 38.0 },
  { sku: "10569", price: 73.8, sale_price: 68.8 },
  { sku: "12124", price: 43.0, sale_price: 38.0 },
  { sku: "10303", price: 9.9, sale_price: 9.9 },
  { sku: "12125", price: 43.0, sale_price: 38.0 },
  { sku: "9656", price: 40.8, sale_price: 35.8 },
  { sku: "12126", price: 39.8, sale_price: 34.8 },
  { sku: "10209", price: 90.2, sale_price: 85.2 },
  { sku: "10211", price: 62.3, sale_price: 57.3 },
  { sku: "12127", price: 39.8, sale_price: 34.8 },
  { sku: "11170", price: 63.5, sale_price: 57.99 },
  { sku: "10142", price: 201.3, sale_price: 181.99 },
  { sku: "11166", price: 62.9, sale_price: 56.99 },
  { sku: "14246", price: 129.6, sale_price: 116.99 },
  { sku: "11862", price: 74.8, sale_price: 64.8 },
  { sku: "14268", price: 129.6, sale_price: 116.99 },
  { sku: "14244", price: 94.0, sale_price: 84.99 },
  { sku: "14290", price: 184.4, sale_price: 165.99 },
  { sku: "14289", price: 268.6, sale_price: 241.99 },
  { sku: "14291", price: 333.2, sale_price: 299.99 },
  { sku: "14288", price: 223.6, sale_price: 201.99 },
  { sku: "20670", price: 88.79, sale_price: 74.8 },
  { sku: "20686", price: 85.79, sale_price: 74.8 },
  { sku: "14230", price: 129.6, sale_price: 116.99 },
  { sku: "14234", price: 114.0, sale_price: 102.99 },
  { sku: "11850", price: 74.8, sale_price: 67.99 },
  { sku: "14217", price: 107.3, sale_price: 96.99 },
  { sku: "14225", price: 129.6, sale_price: 116.99 },
  { sku: "14245", price: 129.6, sale_price: 116.99 },
  { sku: "14267", price: 114.0, sale_price: 102.99 },
  { sku: "14203", price: 74.8, sale_price: 67.99 },
  { sku: "14216", price: 87.3, sale_price: 78.99 },
  { sku: "14254", price: 129.6, sale_price: 116.99 },
  { sku: "14271", price: 142.1, sale_price: 127.99 },
  { sku: "14242", price: 114.0, sale_price: 102.99 },
  { sku: "14250", price: 126.5, sale_price: 113.99 },
  { sku: "14224", price: 77.0, sale_price: 69.99 },
  { sku: "14233", price: 87.3, sale_price: 78.99 },
  { sku: "14266", price: 220.5, sale_price: 198.99 },
  { sku: "14265", price: 181.3, sale_price: 163.99 },
  { sku: "14237", price: 153.2, sale_price: 137.99 },
  { sku: "10194A", price: 302.0, sale_price: 271.99 },
  { sku: "10401", price: 259.7, sale_price: 233.99 },
  { sku: "10400", price: 165.7, sale_price: 149.99 },
  { sku: "10399", price: 153.2, sale_price: 137.99 },
  { sku: "14257", price: 129.6, sale_price: 116.99 },
  { sku: "14247", price: 114.0, sale_price: 102.99 },
  { sku: "11855", price: 65.0, sale_price: 58.99 },
  { sku: "11878", price: 65.95, sale_price: 59.99 },
  { sku: "11870", price: 84.6, sale_price: 76.99 },
  { sku: "14272", price: 109.6, sale_price: 98.99 },
  { sku: "14201", price: 74.8, sale_price: 67.99 },
  { sku: "12908", price: 65.0, sale_price: 58.99 },
  { sku: "14221", price: 65.0, sale_price: 58.99 },
  { sku: "14255", price: 109.6, sale_price: 98.99 },
  { sku: "12911", price: 109.6, sale_price: 98.99 },
  { sku: "14213", price: 114.0, sale_price: 102.99 },
  { sku: "14229", price: 223.6, sale_price: 201.99 },
  { sku: "14202", price: 99.0, sale_price: 89.99 },
  { sku: "11167", price: 63.5, sale_price: 57.99 },
  { sku: "11857", price: 74.8, sale_price: 64.8 },
  { sku: "12913", price: 87.3, sale_price: 78.99 },
  { sku: "11389", price: 87.3, sale_price: 78.99 },
  { sku: "11353", price: 134.1, sale_price: 120.99 },
  { sku: "11388", price: 111.8, sale_price: 100.99 },
  { sku: "11350", price: 199.1, sale_price: 179.99 },
  { sku: "11872", price: 87.3, sale_price: 78.99 },
  { sku: "20671", price: 88.79, sale_price: 74.8 },
  { sku: "20687", price: 85.79, sale_price: 74.8 },
  { sku: "14204", price: 129.6, sale_price: 116.99 },
  { sku: "14263", price: 104.0, sale_price: 93.99 },
  { sku: "14138", price: 174.3, sale_price: 156.99 },
  { sku: "12914", price: 59.0, sale_price: 53.99 },
  { sku: "14249", price: 177.1, sale_price: 159.99 },
  { sku: "12915", price: 76.0, sale_price: 68.99 },
  { sku: "12916", price: 104.0, sale_price: 93.99 },
  { sku: "8967", price: 68.45, sale_price: 61.99 },
  { sku: "14260", price: 122.3, sale_price: 110.99 },
  { sku: "14259", price: 136.3, sale_price: 122.99 },
  { sku: "20669", price: 81.49, sale_price: 67.5 },
  { sku: "14493", price: 69.5, sale_price: 62.99 },
  { sku: "14494", price: 106.0, sale_price: 95.99 },
  { sku: "14495", price: 88.4, sale_price: 79.99 },
  { sku: "14521", price: 329.6, sale_price: 296.99 },
  { sku: "11876", price: 76.0, sale_price: 68.99 },
  { sku: "14219", price: 78.4, sale_price: 70.99 },
  { sku: "14293", price: 81.5, sale_price: 73.99 },
  { sku: "14294", price: 223.6, sale_price: 201.99 },
  { sku: "14214", price: 122.3, sale_price: 110.99 },
  { sku: "8965", price: 67.5, sale_price: 59.5 },
  { sku: "14215", price: 106.7, sale_price: 96.99 },
  { sku: "14236", price: 65.0, sale_price: 58.99 },
  { sku: "14261", price: 109.6, sale_price: 98.99 },
  { sku: "12918", price: 87.3, sale_price: 78.99 },
  { sku: "14220", price: 140.2, sale_price: 126.99 },
  { sku: "11864", price: 105.8, sale_price: 95.99 },
  { sku: "14243", price: 106.0, sale_price: 95.99 },
  { sku: "11869", price: 59.0, sale_price: 53.99 },
  { sku: "14231", price: 65.0, sale_price: 58.99 },
  { sku: "12921", price: 65.0, sale_price: 58.99 },
  { sku: "14264", price: 109.6, sale_price: 98.99 },
  { sku: "14238", price: 160.4, sale_price: 144.99 },
  { sku: "14241", price: 129.6, sale_price: 116.99 },
  { sku: "14258", price: 129.6, sale_price: 116.99 },
  { sku: "12339", price: 259.2, sale_price: 233.99 },
  { sku: "14207", price: 74.8, sale_price: 67.99 },
  { sku: "14212", price: 74.8, sale_price: 67.99 },
  { sku: "14270", price: 87.3, sale_price: 78.99 },
  { sku: "14269", price: 87.3, sale_price: 78.99 },
  { sku: "14253", price: 87.3, sale_price: 78.99 },
  { sku: "14252", price: 87.3, sale_price: 78.99 },
  { sku: "14239", price: 74.8, sale_price: 67.99 },
  { sku: "14240", price: 74.8, sale_price: 67.99 },
  { sku: "14206", price: 74.8, sale_price: 67.99 },
  { sku: "20640", price: 144.0, sale_price: 144.0 },
  { sku: "20625", price: 58.0, sale_price: 58.0 },
  { sku: "20631", price: 59.0, sale_price: 59.0 },
  { sku: "20628", price: 66.0, sale_price: 66.0 },
  { sku: "20626", price: 58.0, sale_price: 58.0 },
  { sku: "20630", price: 58.0, sale_price: 58.0 },
  { sku: "20627", price: 66.0, sale_price: 66.0 },
  { sku: "20629", price: 66.0, sale_price: 66.0 },
  { sku: "20623", price: 58.0, sale_price: 58.0 },
  { sku: "20637", price: 105.0, sale_price: 105.0 },
  { sku: "20624", price: 66.0, sale_price: 66.0 },
  { sku: "13216", price: 48.88, sale_price: 33.35 },
  { sku: "13218", price: 79.33, sale_price: 52.6 },
  { sku: "13217", price: 139.49, sale_price: 86.99 },
  { sku: "11868", price: 42.4, sale_price: 30.05 },
  { sku: "13222", price: 105.0, sale_price: 75.5 },
  { sku: "13221", price: 71.75, sale_price: 52.2 },
  { sku: "13220", price: 134.1, sale_price: 95.8 },
  { sku: "13224", price: 56.48, sale_price: 38.7 },
  { sku: "11795", price: 41.4, sale_price: 31.99 },
  { sku: "14199", price: 67.2, sale_price: 49.2 },
  { sku: "14196", price: 78.65, sale_price: 58.65 },
  { sku: "14197", price: 73.4, sale_price: 62.4 },
  { sku: "12924", price: 49.5, sale_price: 37.5 },
  { sku: "13229", price: 67.65, sale_price: 49.35 },
  { sku: "13226", price: 109.7, sale_price: 79.7 },
  { sku: "13225", price: 59.8, sale_price: 44.8 },
  { sku: "13227", price: 116.95, sale_price: 86.95 },
  { sku: "13228", price: 49.4, sale_price: 35.4 },
  { sku: "20512", price: 288.0, sale_price: 258.0 },
  { sku: "11797", price: 42.4, sale_price: 32.4 },
  { sku: "13234", price: 70.8, sale_price: 51.8 },
  { sku: "13232", price: 56.2, sale_price: 42.2 },
  { sku: "13230", price: 51.55, sale_price: 34.75 },
  { sku: "11749", price: 295.0, sale_price: 265.0 },
  { sku: "9631B", price: 332.0, sale_price: 299.99 },
  { sku: "11750", price: 317.35, sale_price: 299.99 },
  { sku: "10320", price: 40.0, sale_price: 30.0 },
  { sku: "11077A", price: 134.7, sale_price: 114.7 },
  { sku: "11077", price: 134.7, sale_price: 120.2 },
  { sku: "10127", price: 94.0, sale_price: 84.0 },
  { sku: "10128", price: 112.7, sale_price: 112.7 },
  { sku: "10129", price: 42.9, sale_price: 42.9 },
  { sku: "8070", price: 56.15, sale_price: 56.15 },
  { sku: "20666", price: 58.9, sale_price: 44.91 },
  { sku: "20682", price: 55.99, sale_price: 45.0 },
  { sku: "10133", price: 66.5, sale_price: 59.85 },
  { sku: "9092", price: 54.85, sale_price: 39.85 },
  { sku: "20667", price: 58.9, sale_price: 44.91 },
  { sku: "20683", price: 55.99, sale_price: 45.0 },
  { sku: "12750", price: 57.4, sale_price: 42.9 },
  { sku: "10135", price: 85.2, sale_price: 69.2 },
  { sku: "10137", price: 150.5, sale_price: 53.55 },
  { sku: "10143", price: 81.8, sale_price: 73.62 },
  { sku: "11152", price: 30.0, sale_price: 27.0 },
  { sku: "10443", price: 29.95, sale_price: 26.96 },
  { sku: "10552", price: 59.0, sale_price: 53.1 },
  { sku: "11851", price: 57.0, sale_price: 51.3 },
  { sku: "10097", price: 198.0, sale_price: 178.2 },
  { sku: "8875", price: 88.5, sale_price: 79.65 },
  { sku: "11861", price: 57.0, sale_price: 51.3 },
  { sku: "14301", price: 192.0, sale_price: 172.8 },
  { sku: "11858", price: 59.0, sale_price: 53.1 },
  { sku: "10098", price: 86.5, sale_price: 77.85 },
  { sku: "12263", price: 198.0, sale_price: 188.0 },
  { sku: "8874", price: 59.0, sale_price: 53.1 },
  { sku: "11338", price: 59.0, sale_price: 53.1 },
  { sku: "8876", price: 145.5, sale_price: 130.95 },
  { sku: "10145", price: 113.95, sale_price: 103.95 },
  { sku: "11359A", price: 67.55, sale_price: 54.04 },
  { sku: "9717", price: 62.25, sale_price: 47.25 },
  { sku: "14278", price: 63.0, sale_price: 50.5 },
  { sku: "10144", price: 62.25, sale_price: 49.75 },
  { sku: "9718", price: 62.25, sale_price: 49.75 },
  { sku: "12337", price: 142.0, sale_price: 132.0 },
  { sku: "14279", price: 96.8, sale_price: 84.3 },
  { sku: "14280", price: 104.0, sale_price: 91.5 },
  { sku: "10455", price: 97.5, sale_price: 85.0 },
  { sku: "11852", price: 65.0, sale_price: 55.0 },
  { sku: "14523", price: 136.5, sale_price: 116.5 },
  { sku: "14590", price: 71.5, sale_price: 61.5 },
  { sku: "14522", price: 71.5, sale_price: 61.5 },
  { sku: "14592", price: 104.0, sale_price: 91.5 },
  { sku: "14591", price: 104.0, sale_price: 91.5 },
  { sku: "12926", price: 54.8, sale_price: 44.8 },
  { sku: "12927", price: 77.4, sale_price: 67.4 },
  { sku: "8970", price: 53.45, sale_price: 43.45 },
  { sku: "12928", price: 50.9, sale_price: 42.9 },
  { sku: "14281", price: 82.6, sale_price: 70.1 },
  { sku: "14282", price: 79.7, sale_price: 69.7 },
  { sku: "9719", price: 56.35, sale_price: 48.35 },
  { sku: "9720", price: 96.05, sale_price: 81.64 },
  { sku: "12934", price: 60.6, sale_price: 52.6 },
  { sku: "12936", price: 54.8, sale_price: 46.8 },
  { sku: "20668", price: 66.29, sale_price: 52.3 },
  { sku: "20684", price: 63.29, sale_price: 52.3 },
  { sku: "11866", price: 50.9, sale_price: 42.9 },
  { sku: "8971", price: 53.4, sale_price: 43.4 },
  { sku: "14283", price: 82.6, sale_price: 70.1 },
  { sku: "14284", price: 79.7, sale_price: 67.2 },
  { sku: "11877", price: 54.8, sale_price: 46.8 },
  { sku: "14285", price: 53.4, sale_price: 43.4 },
  { sku: "14414", price: 139.0, sale_price: 124.0 },
  { sku: "13041", price: 355.4, sale_price: 299.4 },
  { sku: "13039", price: 173.0, sale_price: 133.0 },
  { sku: "7785", price: 28.5, sale_price: 28.5 },
  { sku: "11853", price: 19.99, sale_price: 19.99 },
  { sku: "11854", price: 18.0, sale_price: 18.0 },
  { sku: "6834", price: 56.3, sale_price: 56.3 },
  { sku: "7783", price: 63.1, sale_price: 63.1 },
  { sku: "12335", price: 180.7, sale_price: 135.0 },
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
