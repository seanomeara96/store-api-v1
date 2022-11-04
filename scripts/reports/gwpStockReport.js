require("../../config/config").config("bf");
const {
  getManyProductsBySKU,
} = require("../../functions/products/getManyProductsBySKU");
const sgMail = require("@sendgrid/mail");
const {
  default: getStoreSKUs,
} = require("../../functions/products/getStoreSKUs");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const campaigns = [
  {
    type: "brand",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "Alfaparf",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/attribute_rule_images/4652_source_1618495687.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/attribute_rule_images/4652_source_1618495687.jpg",
    headline: "Free Cristalli Liquidi 15ml worth €13.40",
    worth: 13,
    condition: "When you spend €100 or more on Alfaparf",
    sku: "6481A",
    sku_type: "config",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/Alfaparf.html",
  },
  {
    type: "brand",
    store: "bf",
    limit: "800",
    uses: "0",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6453/14399/Dermalogica_Meet_Dermalogica_Amenity_Pack__71372__45368.1666781201.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6453/14399/Dermalogica_Meet_Dermalogica_Amenity_Pack__71372__45368.1666781201.jpg?c=2&imbypass=on",
    headline: "Free Meet Dermalogica Amenity Kit worth €35",
    worth: 35,
    condition: "When you spend €85 on Dermalogica",
    sku: "GWP13 ",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/Dermalogica.html",
  },
  {
    type: "category",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "Top Brands/Redken/Extreme",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/395/9605/Redken_-_Extreme_Shampoo_300ml__40188.1623162199.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/395/9605/Redken_-_Extreme_Shampoo_300ml__40188.1623162199.jpg",
    headline: "Free Redken Extreme Travel Size",
    worth: 5,
    condition: "When you spend €40 on the Redken Extreme range",
    sku: "11099e",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/redken",
  },
  {
    type: "category",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "Top Brands/Redken/All Soft",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5917/11577/Redken_-_All_Soft_Shampoo_300ml__47580.1620983464.1280.1280__46003.1651581747.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5917/11577/Redken_-_All_Soft_Shampoo_300ml__47580.1620983464.1280.1280__46003.1651581747.jpg",
    headline: "Free Redken All Soft Travel Size",
    worth: 5,
    condition: "When you spend €40 on the Redken All Soft range",
    sku: "11099a",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/redken",
  },
  {
    type: "category",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "Top Brands/Redken/Color Extend",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5918/11579/Redken_-_Colour_Extend_Shampoo_300ml__31943.1622627138.1280.1280__35477.1651582462.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5918/11579/Redken_-_Colour_Extend_Shampoo_300ml__31943.1622627138.1280.1280__35477.1651582462.jpg",
    headline: "Free Redken Color Extend Travel Size",
    worth: 5,
    condition: "When you spend €40 on the Redken Color Extend range",
    sku: "11099c",
    sku_type: "product",
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/brands/redken",
  },
  {
    type: "brand",
    store: "bf",
    limit: "205",
    uses: "",
    identifier: "Decleor",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6141/13492/Decleor_Essentials_to_Show_You_Care_GWP__89334.1656402224.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6141/13492/Decleor_Essentials_to_Show_You_Care_GWP__89334.1656402224.jpg?c=2&imbypass=on",
    headline: "Free Decleor Essentials to Show You Care Kit worth €78",
    worth: 78,
    condition: "When you spend €80 on Decleor",
    sku: "11651",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/Decleor.html",
  },
  {
    type: "category",
    store: "bf",
    limit: "52",
    uses: "-",
    identifier: "Top Brands/L'Oreal/Pro Longer",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6237/13700/Pro_Longer_Shampoo__39476.1658476870.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6237/13700/Pro_Longer_Shampoo__39476.1658476870.jpg?c=2&imbypass=on",
    headline: "Free Pro Longer Shampoo 100ml",
    worth: 5,
    condition: "When you spend €40 on the L'Oreal Pro Longer range",
    sku: "11789",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/pro-longer/",
  },
  {
    type: "category",
    store: "bf",
    limit: "200",
    uses: "",
    identifier: "Top Brands/L'Oreal/Absolut Repair",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6236/13701/Absolut_Repair_Shampoo__26110.1658477016.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6236/13701/Absolut_Repair_Shampoo__26110.1658477016.jpg?c=2&imbypass=on",
    headline: "Free Absolut Repair Shampoo 100ml",
    worth: 5,
    condition: "When You Spend €40 on the L'Oreal Absolut Repair range",
    sku: "11788",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/absolut-repair/",
  },
  {
    type: "category",
    store: "bf",
    limit: "300",
    uses: "",
    identifier: "Top Brands/L'Oreal/Vitamino Color",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6235/13702/Vitamino_Color_Shampoo__70909.1658477078.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6235/13702/Vitamino_Color_Shampoo__70909.1658477078.jpg?c=2&imbypass=on",
    headline: "Free Vitamino Color Shampoo 100ml",
    worth: 5,
    condition: "When you spend €40 on the L'Oreal Vitamino Color range",
    sku: "11787",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/vitamino-color/",
  },
  {
    type: "category",
    store: "bf",
    limit: "200",
    uses: "",
    identifier: "Top Brands/L'Oreal/Metal Detox",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6233/13659/Copy_of_Copy_of_Template_49_1__06600.1658409766.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6233/13659/Copy_of_Copy_of_Template_49_1__06600.1658409766.jpg?c=2&imbypass=on",
    headline: "Free Metal Detox Shampoo 100ml",
    worth: 8,
    condition: "When you spend €40 on the L'Oreal Metal Detox Range",
    sku: "11785",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/metal-detox/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "18",
    uses: "2",
    identifier: "Pestle & Mortar",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5943/12321/Chocolate_Bronze__47559.1653643497.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5943/12321/Chocolate_Bronze__47559.1653643497.jpg?c=2&imbypass=on",
    headline: "Free Pestle &amp; Mortar Glow Drops worth €40",
    worth: 40,
    condition: "When you spend €120 on Pestle &amp; Mortar",
    sku: "11417",
    sku_type: "product",
    display: "TRUE",
    destination_url:
      "https://www.beautyfeatures.ie/brands/Pestle-%26-Mortar.html",
  },
  {
    type: "brand",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "Pureology",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5876/12105/Pureology_Color_Fanatic_Leave-In_Spray_30ml_1_1__65886.1652780450.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5876/12105/Pureology_Color_Fanatic_Leave-In_Spray_30ml_1_1__65886.1652780450.jpg?c=2&imbypass=on",
    headline: "Free Pureology Color Fanatic Travel Size",
    worth: 4,
    condition: "When you spend €40 on Pureology",
    sku: "10354a",
    sku_type: "product",
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/brands/pureology",
  },
  {
    type: "brand",
    store: "bf",
    limit: "100",
    uses: "0",
    identifier: "Hollywood Browzer",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6185/13593/500_8__03915.1657876031.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6185/13593/500_8__03915.1657876031.jpg?c=2&imbypass=on",
    headline: "Free Hollywood Browzer Vanity Case worth €20",
    worth: 20,
    condition: "When you spend €40 on Hollywood Browzer",
    sku: "11717",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/hollywood-browzer/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "100",
    uses: "0",
    identifier: "Embryolisse",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6192/13599/Embryolisse_Tube_Squeezer_GWP_1__47566.1657879679.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6192/13599/Embryolisse_Tube_Squeezer_GWP_1__47566.1657879679.jpg?c=2&imbypass=on",
    headline: "Free Embryolisse Tube Squeezer Gift",
    worth: null,
    condition: "When you spend €30 or more on Embryolisse",
    sku: "11739",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/embryolisse/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "19",
    uses: "-",
    identifier: "Caudalie",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6062/13304/caudalie_gwp__55233.1654870532.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6062/13304/caudalie_gwp__55233.1654870532.jpg?c=2&imbypass=on",
    headline: "Free Caudalie Vinoperfect Skincare Trio worth €20",
    worth: 20,
    condition: "When you spend €60 on Caudalie",
    sku: "11554",
    sku_type: "product",
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/caudalie/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "139",
    uses: "-",
    identifier: "Moroccanoil",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5115/9368/moro-comb__36575.1620814825.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5115/9368/moro-comb__36575.1620814825.jpg?c=2&imbypass=on",
    headline: "Free Moroccanoil Detangling Comb Worth €20",
    worth: 20,
    condition: "When you spend €100 or more on Moroccanoil",
    sku: "10151",
    sku_type: "product",
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/brands/Moroccanoil.html",
  },
  {
    type: "brand",
    store: "bf",
    limit: "30",
    uses: "",
    identifier: "Carter Beauty",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6139/13493/Carter_Beauty_Wispie_False_Lashes_GWP_1__24409.1656402643.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6139/13493/Carter_Beauty_Wispie_False_Lashes_GWP_1__24409.1656402643.jpg?c=2&imbypass=on",
    headline: "Free Carter Beauty Wispie False Lashes worth €5",
    worth: 5,
    condition: "When you spend €10 on Carter Beauty",
    sku: "11649",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/carter-beauty/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "stock",
    uses: "2",
    identifier: "Carter Beauty",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5611/10596/Carter_Beauty_Revitalise_Retinol_Collagen_Mask__55306.1643022301.png",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5611/10596/Carter_Beauty_Revitalise_Retinol_Collagen_Mask__55306.1643022301.png",
    headline: "Free Revitalise Retinol & Collagen Mask worth €8",
    worth: 8,
    condition: "When you spend €15 on Carter Beauty",
    sku: "11026",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/carter-beauty/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "Issey Miyake",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5636/10623/Issey_Miyake_Pour_Homme_Toiletry_Bag_and_Shower_Gel_GWP__32404.1643801777.png",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5636/10623/Issey_Miyake_Pour_Homme_Toiletry_Bag_and_Shower_Gel_GWP__32404.1643801777.png",
    headline: "Free Toiletry Bag and Shower Gel",
    worth: 25,
    condition: "When you spend €80 or more on Issey Miyake",
    sku: "11051",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/issey-miyake/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "NAK",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5709/10693/NAK_Platinum_Blonde_Anti-Yellow_Shampoo_100ml_4_1__75150.1645707093.png",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5709/10693/NAK_Platinum_Blonde_Anti-Yellow_Shampoo_100ml_4_1__75150.1645707093.png",
    headline: "Free Platinum Blonde Bundle worth €16",
    worth: 16,
    condition: "When you spend €80 or more on NAK",
    sku: "11152",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/nak/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "SVR",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5508/11746/Gift_with_purchase_20__24675.1651824657.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5508/11746/Gift_with_purchase_20__24675.1651824657.jpg",
    headline: "Free SVR Sebiaclear Gel Moussant",
    worth: 4,
    condition: "When you spend €30 or more on SVR",
    sku: "10662",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/svr/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "NUXE",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5310/9925/NUXE_Very_Rose_3-in-1_Soothing_Micellar_Water_100ml_1__81400.1629367978.png",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5310/9925/NUXE_Very_Rose_3-in-1_Soothing_Micellar_Water_100ml_1__81400.1629367978.png",
    headline: "Free Very Rose 3-in-1 Soothing Micellar Water 100ml",
    worth: 11,
    condition: "When you spend €60 or more on NUXE",
    sku: "10442",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/nuxe/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "103",
    uses: "",
    identifier: "Mama Mio",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5143/9400/tummy_rub_butter_30ml__72562.1627456816.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5143/9400/tummy_rub_butter_30ml__72562.1627456816.jpg?c=2&imbypass=on",
    headline: "Free Mama Mio Tummy Rub Butter 30ml",
    worth: null,
    condition: "With every Mama Mio Purchase",
    sku: "9013",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/Mama-Mio/",
  },
  {
    type: "brand",
    store: "bsk",
    limit: "800",
    uses: "0",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6453/14399/Dermalogica_Meet_Dermalogica_Amenity_Pack__71372__45368.1666781201.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6453/14399/Dermalogica_Meet_Dermalogica_Amenity_Pack__71372__45368.1666781201.jpg?c=2&imbypass=on",
    headline: "Free Meet Dermalogica Amenity Kit worth €35",
    worth: 35,
    condition: "When you spend €85 on Dermalogica",
    sku: "GWP13 ",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyskincare.ie/dermalogica",
  },
];

const skuArray = campaigns.filter(
  (campaign) => campaign.sku_type === "product"
);

function ascendingInventory(a, b) {
  return a.inventory_level - b.inventory_level;
}

function emailFormat({ sku, inventory_level }) {
  const alert = inventory_level < 21 ? "style='color:red;'" : "";
  return /*html*/ `<p>
    SKU: ${sku}<br>
    Inventory: <strong ${alert}>${inventory_level}</strong>
  </p>`;
}
function confirmEmailDespatch() {
  console.log("Email sent");
}
function flagEmailError(error) {
  console.error(error);
}

getStoreSKUs(400)
  .then((res) => {
    const skus = campaigns.map((c) => c.sku);
    const data = res
      .filter((d) => skus.includes(d.sku))
      .sort(ascendingInventory)
      .map(emailFormat)
      .join("\n");
    const msg = {
      to: "sean@beautyfeatures.ie",
      from: "sean@beautyfeatures.ie",
      subject: "GWP Stock Report",
      text: "GWP Stock Report",
      html: data,
    };
    sgMail.send(msg).then(confirmEmailDespatch).catch(flagEmailError);
  })
  .catch(console.log);
