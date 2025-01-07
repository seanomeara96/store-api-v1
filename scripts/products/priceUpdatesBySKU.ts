import { updateProductVariant } from "../../functions/product-variants/updateProductVariant";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
import { getProductBySku } from "../../functions/products/getProductBySKU";
import { updateProduct } from "../../functions/products/updateProduct";

const store: string = "ah";
require("../../config/config").config(store);
//const no_discount_category_ID = 1493;
const data = [
  {
    sku: "6466",
    price: 19.9,
    cost_price: 9.9,
    retail_price: 19.9,
    sale_price: 15.9,
  },
  {
    sku: "6467",
    price: 18.25,
    cost_price: 9.25,
    retail_price: 18.25,
    sale_price: 14.6,
  },
  {
    sku: "6468",
    price: 25.5,
    cost_price: 13.75,
    retail_price: 25.5,
    sale_price: 20.4,
  },
  {
    sku: "6469",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "6470",
    price: 19.9,
    cost_price: 9.9,
    retail_price: 19.9,
    sale_price: 15.9,
  },
  {
    sku: "6471",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "6472",
    price: 19.5,
    cost_price: 10.15,
    retail_price: 19.5,
    sale_price: 15.6,
  },
  {
    sku: "6473",
    price: 16.5,
    cost_price: 8.8,
    retail_price: 16.5,
    sale_price: 13.2,
  },
  {
    sku: "6474",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "6475",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "6476",
    price: 19.9,
    cost_price: 9.9,
    retail_price: 19.9,
    sale_price: 15.9,
  },
  {
    sku: "6477",
    price: 34.5,
    cost_price: 17.9,
    retail_price: 34.5,
    sale_price: 27.6,
  },
  {
    sku: "6478",
    price: 34.5,
    cost_price: 17.9,
    retail_price: 34.5,
    sale_price: 27.6,
  },
  {
    sku: "6479",
    price: 19.5,
    cost_price: 10.15,
    retail_price: 19.5,
    sale_price: 15.6,
  },
  {
    sku: "6481A",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "6482",
    price: 21.5,
    cost_price: 11.9,
    retail_price: 21.5,
    sale_price: 17.2,
  },
  {
    sku: "6483",
    price: 22.25,
    cost_price: 11.75,
    retail_price: 22.25,
    sale_price: 17.8,
  },
  {
    sku: "7682",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "7683",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "7684",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "7685",
    price: 18.25,
    cost_price: 9.25,
    retail_price: 18.25,
    sale_price: 14.6,
  },
  {
    sku: "7686",
    price: 22.67,
    cost_price: 11.64375,
    retail_price: 22.67,
    sale_price: 18.15,
  },
  {
    sku: "7687",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "7688",
    price: 28.5,
    cost_price: 14.5,
    retail_price: 28.5,
    sale_price: 22.8,
  },
  {
    sku: "7689",
    price: 29.9,
    cost_price: 15.5,
    retail_price: 29.9,
    sale_price: 23.9,
  },
  {
    sku: "7999",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "8000",
    price: 17.9,
    cost_price: 9.75,
    retail_price: 17.9,
    sale_price: 14.3,
  },
  {
    sku: "8001",
    price: 17.9,
    cost_price: 9.9,
    retail_price: 17.9,
    sale_price: 14.3,
  },
  {
    sku: "8204",
    price: 34.99,
    cost_price: 20.5,
    retail_price: 34.99,
    sale_price: 28.0,
  },
  {
    sku: "8205",
    price: 34.99,
    cost_price: 20.5,
    retail_price: 34.99,
    sale_price: 28.0,
  },
  {
    sku: "8206",
    price: 34.99,
    cost_price: 20.5,
    retail_price: 34.99,
    sale_price: 28.0,
  },
  {
    sku: "8713",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "8716",
    price: 19.9,
    cost_price: 9.9,
    retail_price: 19.9,
    sale_price: 15.9,
  },
  {
    sku: "8717",
    price: 19.5,
    cost_price: 10.15,
    retail_price: 19.5,
    sale_price: 15.6,
  },
  {
    sku: "8715",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "8719",
    price: 20.9,
    cost_price: 9.9,
    retail_price: 20.9,
    sale_price: 16.7,
  },
  {
    sku: "8718",
    price: 19.5,
    cost_price: 10.15,
    retail_price: 19.5,
    sale_price: 15.6,
  },
  {
    sku: "8714",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "9894",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "9895",
    price: 19.5,
    cost_price: 10.15,
    retail_price: 19.5,
    sale_price: 15.6,
  },
  {
    sku: "9897",
    price: 19.9,
    cost_price: 9.9,
    retail_price: 19.9,
    sale_price: 15.9,
  },
  {
    sku: "9898",
    price: 21.5,
    cost_price: 11.9,
    retail_price: 21.5,
    sale_price: 17.2,
  },
  {
    sku: "9899",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "11038",
    price: 18.9,
    cost_price: 9.75,
    retail_price: 18.9,
    sale_price: 15.1,
  },
  {
    sku: "11040",
    price: 18.9,
    cost_price: 9.9,
    retail_price: 18.9,
    sale_price: 15.1,
  },
  {
    sku: "11041",
    price: 18.9,
    cost_price: 9.9,
    retail_price: 18.9,
    sale_price: 15.1,
  },
  {
    sku: "11042",
    price: 22.25,
    cost_price: 11.75,
    retail_price: 22.25,
    sale_price: 17.8,
  },
  {
    sku: "11043",
    price: 5.9,
    cost_price: 3.85,
    retail_price: 5.9,
    sale_price: 4.7,
  },
  {
    sku: "11044",
    price: 5.9,
    cost_price: 3.85,
    retail_price: 5.9,
    sale_price: 4.7,
  },
  {
    sku: "13491",
    price: 37.0,
    cost_price: 20.15,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13476",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13495",
    price: 37.0,
    cost_price: 20.15,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13505",
    price: 47.0,
    cost_price: 25.5,
    retail_price: 47.0,
    sale_price: 37.6,
  },
  {
    sku: "13480",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13496",
    price: 37.0,
    cost_price: 20.15,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13466",
    price: 34.0,
    cost_price: 19.61,
    retail_price: 34.0,
    sale_price: 27.2,
  },
  {
    sku: "13458",
    price: 32.0,
    cost_price: 17.45,
    retail_price: 32.0,
    sale_price: 25.6,
  },
  {
    sku: "13504",
    price: 46.0,
    cost_price: 25,
    retail_price: 46.0,
    sale_price: 36.8,
  },
  {
    sku: "13492",
    price: 37.0,
    cost_price: 20.15,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13470",
    price: 35.0,
    cost_price: 20.54,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13471",
    price: 34.0,
    cost_price: 18.5,
    retail_price: 34.0,
    sale_price: 27.2,
  },
  {
    sku: "13473",
    price: 35.0,
    cost_price: 20.54,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13478",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13472",
    price: 34.0,
    cost_price: 19.98,
    retail_price: 34.0,
    sale_price: 27.2,
  },
  {
    sku: "13489",
    price: 36.0,
    cost_price: 19.6,
    retail_price: 36.0,
    sale_price: 28.8,
  },
  {
    sku: "13494",
    price: 37.0,
    cost_price: 20.15,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13479",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13459",
    price: 32.0,
    cost_price: 17.45,
    retail_price: 32.0,
    sale_price: 25.6,
  },
  {
    sku: "13497",
    price: 37.0,
    cost_price: 20.15,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13500",
    price: 46.0,
    cost_price: 25,
    retail_price: 46.0,
    sale_price: 36.8,
  },
  {
    sku: "13493",
    price: 37.0,
    cost_price: 20.15,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13501",
    price: 46.0,
    cost_price: 25,
    retail_price: 46.0,
    sale_price: 36.8,
  },
  {
    sku: "13477",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13490",
    price: 36.0,
    cost_price: 19.6,
    retail_price: 36.0,
    sale_price: 28.8,
  },
  {
    sku: "13481",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13487",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13486",
    price: 39.0,
    cost_price: 21.3,
    retail_price: 39.0,
    sale_price: 31.2,
  },
  {
    sku: "13468",
    price: 37.0,
    cost_price: 20.15,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13463",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13484",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13485",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13460",
    price: 32.0,
    cost_price: 17.45,
    retail_price: 32.0,
    sale_price: 25.6,
  },
  {
    sku: "13464",
    price: 33.0,
    cost_price: 17.95,
    retail_price: 33.0,
    sale_price: 26.4,
  },
  {
    sku: "13498",
    price: 37.0,
    cost_price: 20.15,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13503",
    price: 46.0,
    cost_price: 25,
    retail_price: 46.0,
    sale_price: 36.8,
  },
  {
    sku: "13482",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13461",
    price: 32.0,
    cost_price: 17.45,
    retail_price: 32.0,
    sale_price: 25.6,
  },
  {
    sku: "13467",
    price: 34.0,
    cost_price: 19.61,
    retail_price: 34.0,
    sale_price: 27.2,
  },
  {
    sku: "13469",
    price: 34.0,
    cost_price: 18.5,
    retail_price: 34.0,
    sale_price: 27.2,
  },
  {
    sku: "13462",
    price: 32.0,
    cost_price: 17.45,
    retail_price: 32.0,
    sale_price: 25.6,
  },
  {
    sku: "13474",
    price: 34.0,
    cost_price: 18.5,
    retail_price: 34.0,
    sale_price: 27.2,
  },
  {
    sku: "13502",
    price: 46.0,
    cost_price: 25,
    retail_price: 46.0,
    sale_price: 36.8,
  },
  {
    sku: "13475",
    price: 34.0,
    cost_price: 18.5,
    retail_price: 34.0,
    sale_price: 27.2,
  },
  {
    sku: "13499",
    price: 37.0,
    cost_price: 20.15,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13483",
    price: 35.0,
    cost_price: 19.05,
    retail_price: 35.0,
    sale_price: 28.0,
  },
  {
    sku: "13465",
    price: 33.0,
    cost_price: 17.95,
    retail_price: 33.0,
    sale_price: 26.4,
  },
  {
    sku: "13704",
    price: 49.0,
    cost_price: 26.75,
    retail_price: 49.0,
    sale_price: 39.2,
  },
  {
    sku: "13705",
    price: 35.5,
    cost_price: 19.25,
    retail_price: 35.5,
    sale_price: 28.4,
  },
  {
    sku: "13706",
    price: 40.0,
    cost_price: 21.85,
    retail_price: 40.0,
    sale_price: 32.0,
  },
  {
    sku: "13707",
    price: 52.0,
    cost_price: 28,
    retail_price: 52.0,
    sale_price: 41.6,
  },
  {
    sku: "13709",
    price: 40.0,
    cost_price: 21.85,
    retail_price: 40.0,
    sale_price: 32.0,
  },
  {
    sku: "13711",
    price: 31.5,
    cost_price: 17.25,
    retail_price: 31.5,
    sale_price: 25.2,
  },
  {
    sku: "13712",
    price: 36.0,
    cost_price: 19.75,
    retail_price: 36.0,
    sale_price: 28.8,
  },
  {
    sku: "13714",
    price: 33.5,
    cost_price: 18.09,
    retail_price: 33.5,
    sale_price: 26.8,
  },
  {
    sku: "13715",
    price: 35.5,
    cost_price: 19.25,
    retail_price: 35.5,
    sale_price: 28.4,
  },
  {
    sku: "13716",
    price: 40.0,
    cost_price: 21.85,
    retail_price: 40.0,
    sale_price: 32.0,
  },
  {
    sku: "13717",
    price: 42.0,
    cost_price: 22.75,
    retail_price: 42.0,
    sale_price: 33.6,
  },
  {
    sku: "13718",
    price: 49.0,
    cost_price: 26.75,
    retail_price: 49.0,
    sale_price: 39.2,
  },
  {
    sku: "13719",
    price: 62.0,
    cost_price: 33.75,
    retail_price: 62.0,
    sale_price: 49.6,
  },
  {
    sku: "13720",
    price: 49.0,
    cost_price: 26.75,
    retail_price: 49.0,
    sale_price: 39.2,
  },
  {
    sku: "13721",
    price: 35.5,
    cost_price: 19.25,
    retail_price: 35.5,
    sale_price: 28.4,
  },
  {
    sku: "13722",
    price: 40.0,
    cost_price: 21.85,
    retail_price: 40.0,
    sale_price: 32.0,
  },
  {
    sku: "13723",
    price: 49.0,
    cost_price: 26.75,
    retail_price: 49.0,
    sale_price: 39.2,
  },
  {
    sku: "13724",
    price: 42.0,
    cost_price: 22.75,
    retail_price: 42.0,
    sale_price: 33.6,
  },
  {
    sku: "13725",
    price: 50.0,
    cost_price: 27,
    retail_price: 50.0,
    sale_price: 40.0,
  },
  {
    sku: "13727",
    price: 37.0,
    cost_price: 20.16,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13728",
    price: 38.0,
    cost_price: 21.06,
    retail_price: 38.0,
    sale_price: 30.4,
  },
  {
    sku: "13729",
    price: 38.0,
    cost_price: 21.06,
    retail_price: 38.0,
    sale_price: 30.4,
  },
  {
    sku: "13730",
    price: 31.0,
    cost_price: 17.11,
    retail_price: 31.0,
    sale_price: 24.8,
  },
  {
    sku: "13731",
    price: 37.0,
    cost_price: 20.25,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13732",
    price: 31.0,
    cost_price: 17,
    retail_price: 31.0,
    sale_price: 24.8,
  },
  {
    sku: "13733",
    price: 31.0,
    cost_price: 17.11,
    retail_price: 31.0,
    sale_price: 24.8,
  },
  {
    sku: "13734",
    price: 37.0,
    cost_price: 20.25,
    retail_price: 37.0,
    sale_price: 29.6,
  },
  {
    sku: "13735",
    price: 38.0,
    cost_price: 20.74,
    retail_price: 38.0,
    sale_price: 30.4,
  },
  {
    sku: "13736",
    price: 25.5,
    cost_price: 13.91,
    retail_price: 25.5,
    sale_price: 20.4,
  },
  {
    sku: "13737",
    price: 29.0,
    cost_price: 15.69,
    retail_price: 29.0,
    sale_price: 23.2,
  },
  {
    sku: "13738",
    price: 29.0,
    cost_price: 15.9,
    retail_price: 29.0,
    sale_price: 23.2,
  },
  {
    sku: "13739",
    price: 34.0,
    cost_price: 18.5,
    retail_price: 34.0,
    sale_price: 27.2,
  },
  {
    sku: "13740",
    price: 25.5,
    cost_price: 13.91,
    retail_price: 25.5,
    sale_price: 20.4,
  },
  {
    sku: "13741",
    price: 29.0,
    cost_price: 15.69,
    retail_price: 29.0,
    sale_price: 23.2,
  },
  {
    sku: "13742",
    price: 29.0,
    cost_price: 15.9,
    retail_price: 29.0,
    sale_price: 23.2,
  },
  {
    sku: "13743",
    price: 34.0,
    cost_price: 18.5,
    retail_price: 34.0,
    sale_price: 27.2,
  },
  {
    sku: "13744",
    price: 30.0,
    cost_price: 16.47,
    retail_price: 30.0,
    sale_price: 24.0,
  },
  {
    sku: "13745",
    price: 30.0,
    cost_price: 16.47,
    retail_price: 30.0,
    sale_price: 24.0,
  },
  {
    sku: "13746",
    price: 32.5,
    cost_price: 17.85,
    retail_price: 32.5,
    sale_price: 26.0,
  },
  {
    sku: "13747",
    price: 32.5,
    cost_price: 17.64,
    retail_price: 32.5,
    sale_price: 26.0,
  },
  {
    sku: "13748",
    price: 31.0,
    cost_price: 16.85,
    retail_price: 31.0,
    sale_price: 24.8,
  },
  {
    sku: "13750",
    price: 31.0,
    cost_price: 17,
    retail_price: 31.0,
    sale_price: 24.8,
  },
  {
    sku: "14054",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "14052",
    price: 25.5,
    cost_price: 13.7,
    retail_price: 25.5,
    sale_price: 20.4,
  },
  {
    sku: "14050",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "14051",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "14053",
    price: 16.5,
    cost_price: 8.8,
    retail_price: 16.5,
    sale_price: 13.2,
  },
  {
    sku: "14686",
    price: 25.5,
    cost_price: 13.7,
    retail_price: 25.5,
    sale_price: 20.4,
  },
  {
    sku: "14526",
    price: 49.0,
    cost_price: 26.75,
    retail_price: 49.0,
    sale_price: 39.2,
  },
  {
    sku: "14524",
    price: 30.0,
    cost_price: 16.45,
    retail_price: 30.0,
    sale_price: 24.0,
  },
  {
    sku: "20109",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "20110",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "20111",
    price: 20.6,
    cost_price: 10.9,
    retail_price: 20.6,
    sale_price: 16.5,
  },
  {
    sku: "20112",
    price: 20.6,
    cost_price: 10.9,
    retail_price: 20.6,
    sale_price: 16.5,
  },
  {
    sku: "13708B",
    price: 38.0,
    cost_price: 20.52,
    retail_price: 38.0,
    sale_price: 30.4,
  },
  {
    sku: "14057",
    price: 34.5,
    cost_price: 17.9,
    retail_price: 34.5,
    sale_price: 27.6,
  },
  {
    sku: "20720",
    price: 14.9,
    cost_price: 7.75,
    retail_price: 14.9,
    sale_price: 11.9,
  },
  {
    sku: "20721",
    price: 13.5,
    cost_price: 6.9,
    retail_price: 13.5,
    sale_price: 10.8,
  },
  {
    sku: "20722",
    price: 19.75,
    cost_price: 10.5,
    retail_price: 19.75,
    sale_price: 15.8,
  },
  {
    sku: "20723",
    price: 15.9,
    cost_price: 7.9,
    retail_price: 15.9,
    sale_price: 12.7,
  },
  {
    sku: "20724",
    price: 13.75,
    cost_price: 7.7,
    retail_price: 13.75,
    sale_price: 11.0,
  },
  {
    sku: "20214",
    price: 15.9,
    cost_price: 8.15,
    retail_price: 15.9,
    sale_price: 12.7,
  },
];

enum ExcludeFromDiscountAction {
  Add = "ADD",
  Remove = "REMOVE",
  None = "NONE",
}

const addToNoDiscountCat: ExcludeFromDiscountAction =
  ExcludeFromDiscountAction.Remove;

async function main() {
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    console.log(`${i + 1} / ${data.length} Updating prices for sku ${row.sku}`);
    try {
      /**
       *priceupdate fields
       */
      let updates = {
        price: row.price,
        cost_price: row.cost_price,
        retail_price: row.retail_price,
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
            updatedCategories = updatedCategories.filter((id) => id !== catID);
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
  console.log("done");
}
main();
