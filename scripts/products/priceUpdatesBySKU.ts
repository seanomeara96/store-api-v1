import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const stores: string[] = ["bf"];

//const no_discount_category_ID = 1493;
const data = [
  { sku: "5048", sale_price: 21.55 },
  { sku: "5050", sale_price: 21.55 },
  { sku: "5051", sale_price: 21.55 },
  { sku: "5052", sale_price: 21.55 },
  { sku: "5053", sale_price: 25.15 },
  { sku: "5055", sale_price: 25.15 },
  { sku: "5056", sale_price: 25.15 },
  { sku: "5057", sale_price: 25.15 },
  { sku: "6085", sale_price: 13.15 },
  { sku: "6258", sale_price: 31.5 },
  { sku: "6259", sale_price: 31.5 },
  { sku: "9011", sale_price: 3 },
  { sku: "9012", sale_price: 4.5 },
  { sku: "9042", sale_price: 3 },
  { sku: "9043", sale_price: 3 },
  { sku: "9044", sale_price: 3.75 },
  { sku: "9045", sale_price: 3.75 },
  { sku: "9046", sale_price: 3 },
  { sku: "9050", sale_price: 3 },
  { sku: "9080", sale_price: 3.75 },
  { sku: "9081", sale_price: 3.75 },
  { sku: "9052", sale_price: 3 },
  { sku: "9717", sale_price: 46.7 },
  { sku: "9718", sale_price: 46.7 },
  { sku: "10144", sale_price: 46.7 },
  { sku: "10124", sale_price: 27.55 },
  { sku: "10257", sale_price: 18.35 },
  { sku: "10257A", sale_price: 39.99 },
  { sku: "10256", sale_price: 17.2 },
  { sku: "10396", sale_price: 3 },
  { sku: "10397", sale_price: 3.75 },
  { sku: "11233", sale_price: 31.5 },
  { sku: "11232", sale_price: 31.5 },
  { sku: "10354a", sale_price: 3.4 },
  { sku: "11359A", sale_price: 50.65 },
  { sku: "11359", sale_price: 26.85 },
  { sku: "11358", sale_price: 23.8 },
  { sku: "11648", sale_price: 26.8 },
  { sku: "12035", sale_price: 60.95 },
  { sku: "13280", sale_price: 68.99 },
  { sku: "6077", sale_price: 25.15 },
  { sku: "12575", sale_price: 75.85 },
  { sku: "12576", sale_price: 88.55 },
  { sku: "12577", sale_price: 75.85 },
  { sku: "12578", sale_price: 88.55 },
  { sku: "12579", sale_price: 75.85 },
  { sku: "12580", sale_price: 88.55 },
  { sku: "12581", sale_price: 56.35 },
  { sku: "12582", sale_price: 56.35 },
  { sku: "11636", sale_price: 54 },
  { sku: "11635", sale_price: 37.99 },
  { sku: "13332", sale_price: 26.8 },
  { sku: "12037", sale_price: 72.75 },
  { sku: "14273", sale_price: 76.5 },
  { sku: "14274", sale_price: 72 },
  { sku: "14275", sale_price: 72 },
  { sku: "14276", sale_price: 72 },
  { sku: "14277", sale_price: 47.25 },
  { sku: "14278", sale_price: 47.25 },
  { sku: "14302", sale_price: 7.5 },
  { sku: "14303", sale_price: 7.5 },
  { sku: "14304", sale_price: 7.5 },
  { sku: "14305", sale_price: 7.5 },
  { sku: "14306", sale_price: 7.5 },
  { sku: "14307", sale_price: 7.5 },
  { sku: "14308", sale_price: 7.5 },
  { sku: "20471", sale_price: 66.99 },
  { sku: "20472", sale_price: 66.99 },
  { sku: "20473", sale_price: 66.99 },
  { sku: "20983", sale_price: 57 },
  { sku: "20981", sale_price: 57 },
  { sku: "20979", sale_price: 53.25 },
  { sku: "20980", sale_price: 57 },
  { sku: "20982", sale_price: 61.15 },
  { sku: "20978", sale_price: 57 },
  { sku: "20986", sale_price: 61.3 },
  { sku: "20984", sale_price: 78.2 },
  { sku: "20801", sale_price: 28.7 },
  { sku: "20800", sale_price: 28.7 },
  { sku: "20985", sale_price: 53.05 },
  { sku: "REDK_P042560", sale_price: 20.55 },
  { sku: "REDK_P042690", sale_price: 29.05 },
  { sku: "REDK_P029530", sale_price: 29.05 },
  { sku: "REDK_P027790", sale_price: 20.55 },
  { sku: "REDK_P027920", sale_price: 22.75 },
  { sku: "5011", sale_price: 20.55 },
  { sku: "5016", sale_price: 18.75 },
  { sku: "5041", sale_price: 29.55 },
  { sku: "6257", sale_price: 52.5 },
  { sku: "6443", sale_price: 24.55 },
  { sku: "5040a", sale_price: 28.9 },
  { sku: "5038a", sale_price: 28.9 },
  { sku: "7608", sale_price: 20 },
  { sku: "7609", sale_price: 22.25 },
  { sku: "7692", sale_price: 22.75 },
  { sku: "8455", sale_price: 45.75 },
  { sku: "8488", sale_price: 19.05 },
  { sku: "8490", sale_price: 29.8 },
  { sku: "8492", sale_price: 22.8 },
  { sku: "8493", sale_price: 22.75 },
  { sku: "8910", sale_price: 11.25 },
  { sku: "8911", sale_price: 11.25 },
  { sku: "8908", sale_price: 11.25 },
  { sku: "8909", sale_price: 11.25 },
  { sku: "8912", sale_price: 11.25 },
  { sku: "8970", sale_price: 40.1 },
  { sku: "8971", sale_price: 40.05 },
  { sku: "9032", sale_price: 15.75 },
  { sku: "9060", sale_price: 6.75 },
  { sku: "9061", sale_price: 6.75 },
  { sku: "9415", sale_price: 3.4 },
  { sku: "9414", sale_price: 4.15 },
  { sku: "9636", sale_price: 16.9 },
  { sku: "9719", sale_price: 42.25 },
  { sku: "9720", sale_price: 72.05 },
  { sku: "9762", sale_price: 24.4 },
  { sku: "9763", sale_price: 24.4 },
  { sku: "9764", sale_price: 24.4 },
  { sku: "9913", sale_price: 25.3 },
  { sku: "8972", sale_price: 42 },
  { sku: "10184", sale_price: 18.65 },
  { sku: "10185", sale_price: 20 },
  { sku: "10359", sale_price: 7.5 },
  { sku: "10360", sale_price: 7.5 },
  { sku: "10447", sale_price: 52.35 },
  { sku: "10453", sale_price: 80.55 },
  { sku: "10454", sale_price: 80.55 },
  { sku: "10455", sale_price: 73.15 },
  { sku: "11052", sale_price: 20 },
  { sku: "11099", sale_price: 15 },
  { sku: "11201", sale_price: 22.25 },
  { sku: "11199", sale_price: 30.65 },
  { sku: "11200", sale_price: 20 },
  { sku: "11099a", sale_price: 15 },
  { sku: "11099c", sale_price: 15 },
  { sku: "11099e", sale_price: 15 },
  { sku: "11650", sale_price: 15 },
  { sku: "11852", sale_price: 48.75 },
  { sku: "11860", sale_price: 40.2 },
  { sku: "11866", sale_price: 38.15 },
  { sku: "11867", sale_price: 30.75 },
  { sku: "11874", sale_price: 35.65 },
  { sku: "11877", sale_price: 41.1 },
  { sku: "12001", sale_price: 23.85 },
  { sku: "12008", sale_price: 20.1 },
  { sku: "12009", sale_price: 20.1 },
  { sku: "12010", sale_price: 20.1 },
  { sku: "12011", sale_price: 20.1 },
  { sku: "12012", sale_price: 20.1 },
  { sku: "12013", sale_price: 20.1 },
  { sku: "12014", sale_price: 20.1 },
  { sku: "12015", sale_price: 19.6 },
  { sku: "12016", sale_price: 20.1 },
  { sku: "12017", sale_price: 20.1 },
  { sku: "12018", sale_price: 20.1 },
  { sku: "12019", sale_price: 20.1 },
  { sku: "12020", sale_price: 20.1 },
  { sku: "12021", sale_price: 23 },
  { sku: "12022", sale_price: 20.1 },
  { sku: "13275", sale_price: 67.5 },
  { sku: "12152", sale_price: 2.05 },
  { sku: "12153", sale_price: 3.75 },
  { sku: "12286", sale_price: 4.5 },
  { sku: "12287", sale_price: 4.5 },
  { sku: "12288", sale_price: 2.25 },
  { sku: "12289", sale_price: 3 },
  { sku: "12290", sale_price: 2.25 },
  { sku: "12626", sale_price: 22.75 },
  { sku: "12627", sale_price: 20 },
  { sku: "12628", sale_price: 26.8 },
  { sku: "12926", sale_price: 41.1 },
  { sku: "12927", sale_price: 58.05 },
  { sku: "12928", sale_price: 38.15 },
  { sku: "12930", sale_price: 41.05 },
  { sku: "12934", sale_price: 45.45 },
  { sku: "12936", sale_price: 41.1 },
  { sku: "12938", sale_price: 38.55 },
  { sku: "13068", sale_price: 24.4 },
  { sku: "13069", sale_price: 29.25 },
  { sku: "13311", sale_price: 22.25 },
  { sku: "13313", sale_price: 22.25 },
  { sku: "13314", sale_price: 20 },
  { sku: "13315", sale_price: 26.8 },
  { sku: "13316", sale_price: 29.05 },
  { sku: "13318", sale_price: 20.55 },
  { sku: "13319", sale_price: 22.75 },
  { sku: "13320", sale_price: 29.05 },
  { sku: "13337", sale_price: 20.55 },
  { sku: "REDK_P042480", sale_price: 18.65 },
  { sku: "REDK_P027970", sale_price: 18.65 },
  { sku: "14141", sale_price: 24.4 },
  { sku: "14142", sale_price: 29.25 },
  { sku: "14143", sale_price: 24.4 },
  { sku: "14144", sale_price: 24.4 },
  { sku: "14279", sale_price: 72.6 },
  { sku: "14280", sale_price: 78 },
  { sku: "14281", sale_price: 61.95 },
  { sku: "14282", sale_price: 59.8 },
  { sku: "14283", sale_price: 61.95 },
  { sku: "14284", sale_price: 59.8 },
  { sku: "14285", sale_price: 40.05 },
  { sku: "14316", sale_price: 7.5 },
  { sku: "14317", sale_price: 7.5 },
  { sku: "14318", sale_price: 7.5 },
  { sku: "14523", sale_price: 102.4 },
  { sku: "14590", sale_price: 53.65 },
  { sku: "14522", sale_price: 53.65 },
  { sku: "14592", sale_price: 78 },
  { sku: "14591", sale_price: 78 },
  { sku: "14770", sale_price: 24.4 },
  { sku: "14771", sale_price: 22.8 },
  { sku: "20191", sale_price: 25.45 },
  { sku: "20192", sale_price: 28.45 },
  { sku: "20193", sale_price: 25.45 },
  { sku: "20194", sale_price: 28.45 },
  { sku: "20285", sale_price: 24.4 },
  { sku: "20286", sale_price: 24.4 },
  { sku: "20287", sale_price: 27 },
  { sku: "20288", sale_price: 26.8 },
  { sku: "20289", sale_price: 26.8 },
  { sku: "20290", sale_price: 26.8 },
  { sku: "20468", sale_price: 63 },
  { sku: "20469", sale_price: 59.99 },
  { sku: "20470", sale_price: 69.99 },
  { sku: "20668", sale_price: 49.7 },
  { sku: "20684", sale_price: 47.45 },
  { sku: "20811", sale_price: 27.75 },
  { sku: "20927", sale_price: 7.5 },
  { sku: "20799", sale_price: 26.25 },
  { sku: "20924", sale_price: 7.5 },
  { sku: "20926", sale_price: 7.5 },
  { sku: "20925", sale_price: 7.5 },
  { sku: "20798", sale_price: 24.7 },
  { sku: "20797", sale_price: 26.25 },
  { sku: "11352", sale_price: 25.95 },
  { sku: "20939", sale_price: 22.35 },
  { sku: "11425", sale_price: 22.95 },
  { sku: "11426", sale_price: 17.7 },
  { sku: "11427", sale_price: 17.7 },
  { sku: "11428", sale_price: 24 },
  { sku: "11429", sale_price: 24 },
  { sku: "11430", sale_price: 22.95 },
  { sku: "11431", sale_price: 22.95 },
  { sku: "11432", sale_price: 22.95 },
  { sku: "11433", sale_price: 22.95 },
  { sku: "11452", sale_price: 14.1 },
  { sku: "11453", sale_price: 16.95 },
  { sku: "11454", sale_price: 23 },
  { sku: "11455", sale_price: 19.35 },
  { sku: "11456", sale_price: 14.1 },
  { sku: "11457", sale_price: 16.95 },
  { sku: "11458", sale_price: 14.1 },
  { sku: "11459", sale_price: 16.95 },
  { sku: "11460", sale_price: 21.9 },
  { sku: "11461", sale_price: 21.9 },
  { sku: "11462", sale_price: 24 },
  { sku: "11463", sale_price: 17.7 },
  { sku: "11464", sale_price: 17.7 },
  { sku: "11465", sale_price: 14.1 },
  { sku: "11466", sale_price: 19.35 },
  { sku: "11468", sale_price: 14.1 },
  { sku: "11469", sale_price: 16.95 },
  { sku: "11470", sale_price: 23 },
  { sku: "11471", sale_price: 14.1 },
  { sku: "11472", sale_price: 16.95 },
  { sku: "11473", sale_price: 23 },
  { sku: "11474", sale_price: 19.35 },
  { sku: "11475", sale_price: 5.4 },
  { sku: "11479", sale_price: 16.95 },
  { sku: "11481", sale_price: 23 },
  { sku: "11483", sale_price: 14.1 },
  { sku: "11484", sale_price: 23 },
  { sku: "11487", sale_price: 38.15 },
  { sku: "11708", sale_price: 16.15 },
  { sku: "11785", sale_price: 7.5 },
  { sku: "11786", sale_price: 6 },
  { sku: "11787", sale_price: 4.5 },
  { sku: "11788", sale_price: 4.5 },
  { sku: "11789", sale_price: 4.5 },
  { sku: "11795", sale_price: 31.05 },
  { sku: "11797", sale_price: 31.8 },
  { sku: "11798", sale_price: 32.6 },
  { sku: "11868", sale_price: 30.05 },
  { sku: "11873", sale_price: 29.45 },
  { sku: "11988", sale_price: 24.2 },
  { sku: "12211", sale_price: 13.6 },
  { sku: "12212", sale_price: 16.15 },
  { sku: "12213", sale_price: 13.25 },
  { sku: "12214", sale_price: 13.25 },
  { sku: "12215", sale_price: 16.15 },
  { sku: "12216", sale_price: 13.95 },
  { sku: "12217", sale_price: 16.15 },
  { sku: "12218", sale_price: 16.15 },
  { sku: "12223", sale_price: 13.6 },
  { sku: "12224", sale_price: 16.15 },
  { sku: "12543", sale_price: 57.5 },
  { sku: "12547", sale_price: 64.95 },
  { sku: "12548", sale_price: 64.95 },
  { sku: "12549", sale_price: 29.99 },
  { sku: "12550", sale_price: 57.5 },
  { sku: "12552", sale_price: 57.5 },
  { sku: "12553", sale_price: 34.5 },
  { sku: "12554", sale_price: 34.5 },
  { sku: "12557", sale_price: 34.5 },
  { sku: "12559", sale_price: 34.5 },
  { sku: "12561", sale_price: 28.3 },
  { sku: "12562", sale_price: 34.5 },
  { sku: "12679", sale_price: 39.3 },
  { sku: "12680", sale_price: 18.15 },
  { sku: "12681", sale_price: 18 },
  { sku: "12682", sale_price: 17.5 },
  { sku: "12683", sale_price: 24.15 },
  { sku: "12684", sale_price: 18.15 },
  { sku: "12685", sale_price: 18.15 },
  { sku: "12686", sale_price: 36.95 },
  { sku: "12771", sale_price: 28.05 },
  { sku: "12924", sale_price: 37.15 },
  { sku: "13142", sale_price: 6 },
  { sku: "13143", sale_price: 6 },
  { sku: "13144", sale_price: 6 },
  { sku: "13213", sale_price: 29.55 },
  { sku: "13214", sale_price: 26.65 },
  { sku: "13216", sale_price: 33.35 },
  { sku: "13217", sale_price: 86.99 },
  { sku: "13218", sale_price: 52.6 },
  { sku: "13219", sale_price: 32 },
  { sku: "13220", sale_price: 95.8 },
  { sku: "13221", sale_price: 52.2 },
  { sku: "13222", sale_price: 75.5 },
  { sku: "13223", sale_price: 53.5 },
  { sku: "13224", sale_price: 38.7 },
  { sku: "13225", sale_price: 44.8 },
  { sku: "13226", sale_price: 79.7 },
  { sku: "13227", sale_price: 86.95 },
  { sku: "13228", sale_price: 35.4 },
  { sku: "13229", sale_price: 49.35 },
  { sku: "13230", sale_price: 34.75 },
  { sku: "13231", sale_price: 53.5 },
  { sku: "13232", sale_price: 42.15 },
  { sku: "13233", sale_price: 99.49 },
  { sku: "13234", sale_price: 51.8 },
  { sku: "13284", sale_price: 22.95 },
  { sku: "14195", sale_price: 82.15 },
  { sku: "14196", sale_price: 58.65 },
  { sku: "14197", sale_price: 55.05 },
  { sku: "14198", sale_price: 32.99 },
  { sku: "14199", sale_price: 49.2 },
  { sku: "14313", sale_price: 7.5 },
  { sku: "14314", sale_price: 7.5 },
  { sku: "14315", sale_price: 7.5 },
  { sku: "14412", sale_price: 33.4 },
  { sku: "14413", sale_price: 27.65 },
  { sku: "12222A", sale_price: 16.15 },
  { sku: "20442", sale_price: 49.99 },
  { sku: "20439", sale_price: 48.99 },
  { sku: "20441", sale_price: 39.99 },
  { sku: "20440", sale_price: 49.99 },
  { sku: "20464", sale_price: 20.25 },
  { sku: "20465", sale_price: 27.4 },
  { sku: "20450", sale_price: 30.15 },
  { sku: "20443", sale_price: 27.2 },
  { sku: "20449", sale_price: 33.4 },
  { sku: "20445", sale_price: 21 },
  { sku: "20447", sale_price: 21 },
  { sku: "20448", sale_price: 30.15 },
  { sku: "20444", sale_price: 21.25 },
  { sku: "20446", sale_price: 21.25 },
  { sku: "20512", sale_price: 216 },
  { sku: "20513", sale_price: 295.5 },
  { sku: "20725", sale_price: 252 },
  { sku: "20726", sale_price: 336 },
  { sku: "12546", sale_price: 32.99 },
  { sku: "20968", sale_price: 50.4 },
  { sku: "20954", sale_price: 45.9 },
  { sku: "20953", sale_price: 60.75 },
  { sku: "20952", sale_price: 63 },
  { sku: "20931", sale_price: 51.15 },
  { sku: "20965", sale_price: 38 },
  { sku: "20933", sale_price: 49.95 },
  { sku: "20936", sale_price: 58.8 },
  { sku: "20947", sale_price: 41.55 },
  { sku: "20967", sale_price: 45 },
  { sku: "20962", sale_price: 45 },
  { sku: "20935", sale_price: 45.9 },
  { sku: "20957", sale_price: 41.55 },
  { sku: "20961", sale_price: 47.6 },
  { sku: "20929", sale_price: 35.4 },
  { sku: "20943", sale_price: 45 },
  { sku: "20915", sale_price: 41.55 },
  { sku: "20941", sale_price: 41.55 },
  { sku: "20948", sale_price: 45 },
  { sku: "20912", sale_price: 44 },
  { sku: "20816", sale_price: 23.65 },
  { sku: "20826", sale_price: 80.65 },
  { sku: "20827", sale_price: 54 },
  { sku: "20828", sale_price: 65.65 },
  { sku: "20818", sale_price: 23.65 },
  { sku: "20955", sale_price: 54.75 },
  { sku: "20814", sale_price: 27.45 },
  { sku: "20817", sale_price: 23.65 },
  { sku: "20820", sale_price: 30.2 },
  { sku: "20940", sale_price: 51.9 },
  { sku: "20932", sale_price: 64.65 },
  { sku: "20815", sale_price: 29.55 },
  { sku: "20942", sale_price: 54.05 },
  { sku: "20825", sale_price: 51 },
  { sku: "20951", sale_price: 52.5 },
  { sku: "20930", sale_price: 40.65 },
  { sku: "20934", sale_price: 156.45 },
  { sku: "20916", sale_price: 76.95 },
  { sku: "20969", sale_price: 73.45 },
  { sku: "20813", sale_price: 23.65 },
  { sku: "20819", sale_price: 35.45 },
  { sku: "20938", sale_price: 127.5 },
  { sku: "20914", sale_price: 33.9 },
  { sku: "20928", sale_price: 7.5 },
  { sku: "20937", sale_price: 72.55 },
  { sku: "20944", sale_price: 73.45 },
  { sku: "20971", sale_price: 33.9 },
  { sku: "20911", sale_price: 36 },
  { sku: "20913", sale_price: 28.2 },
  { sku: "20946", sale_price: 33.9 },
  { sku: "20956", sale_price: 31.05 },
  { sku: "20960", sale_price: 37.15 },
  { sku: "20970", sale_price: 28.2 },
  { sku: "20963", sale_price: 28.2 },
  { sku: "20950", sale_price: 33.9 },
  { sku: "20966", sale_price: 37.15 },
  { sku: "20945", sale_price: 28.2 },
  { sku: "20959", sale_price: 33.9 },
  { sku: "20964", sale_price: 46.05 },
  { sku: "20949", sale_price: 28.2 },
  { sku: "20958", sale_price: 28.2 },
];

enum ExcludeFromDiscountAction {
  Add = "ADD",
  Remove = "REMOVE",
  None = "NONE",
}

const addToNoDiscountCat: ExcludeFromDiscountAction =
  ExcludeFromDiscountAction.Add;

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
