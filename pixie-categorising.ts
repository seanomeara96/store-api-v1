import { addCatToProduct } from "./functions/products/addCatToProduct";
import { getAllProducts } from "./functions/products/getAllProducts";

const cats = {
  skincare: 237,
  serumsAndBoosters: 238,
  antiAgeing: 239,
  moisturisers: 248,
  hair: 249,
  masks: 251,
  conditioner: 254,
  treatments: 257,
  hairHealth: 259,
  shampoo: 261,
  hairOilsAndSerums: 267,
  sulphateFreeHaircare: 282,
  hairToolsAndAccessories: 298,
  cleansers: 313,
  neckAndDecollete: 314,
  tanningAndSuncare: 321,
  acneAndProblemSkin: 325,
  masksAndPeels: 326,
  nightCreams: 327,
  eyeCareAndCreams: 328,
  supersizes: 329,
  toners: 337,
  hairColourAndRootCoverup: 338,
  skincareGiftSets: 380,
  dermalogica: 384,
  exfoliants: 386,
  eyeAndLipTreatments: 390,
  serumAndBoosters: 393,
  primersAndTints: 395,
  disable: 396,
  mensRange: 399,
  toolsAndAccessories: 417,
  lipCare: 419,
  dummy: 445,
  exfoliators: 448,
  productRange: 449,
  skinConcern: 450,
  mediBacClearingAcneTreatments: 451,
  ageSmart: 452,
  vegan: 453,
  dailySkinHealth: 455,
  glutenFree: 456,
  daylightDefense: 457,
  activeClearing: 458,
  ultraCalmingSensitiveSkin: 459,
  clearStartSkincareForTeenagers: 460,
  oilySkin: 461,
  sensitivityAndRedness: 462,
  drynessAndDehydration: 463,
  dermalogicaSpeedMapping: 464,
  acneAndBreakouts: 465,
  unevenSkinTone: 466,
  signsOfAgeing: 467,
  christmasShop: 468,
  hairProducts: 469,
  discover: 470,
  damagedHair: 471,
  hairLossAndThinning: 472,
  scalpCareAndAntiDandruff: 473,
  hairVitaminsAndSupplements: 474,
  hairBrushes: 475,
  hairCurlersAndWavers: 476,
  hairDryers: 477,
  hairStraighteners: 478,
  skinProducts: 479,
  skinHealth: 481,
  productType: 482,
  haircareBundles: 483
};

async function test() {
  try {
    require("./config/config").config("px");
    const destination: number = cats.haircareBundles;
    const products = await getAllProducts({ "categories:in": cats.hair });
    console.log("products.length", products.length)
    for (const p of products) {
      if (p.name.toLowerCase().includes("") && !p.categories.includes(destination)) {
        console.log(`added ${p.name} to ${destination}`)
        await addCatToProduct(p.id, destination);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
test();
