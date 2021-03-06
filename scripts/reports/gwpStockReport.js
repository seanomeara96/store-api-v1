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
    limit: "stock",
    uses: "-",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5874/11225/Template__49690.1649932314.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5874/11225/Template__49690.1649932314.jpg",
    headline: "Free Dermalogica Active Skin Essentials Kit worth €21",
    worth: 21,
    condition: "When you spend €60 on Dermalogica",
    sku: "GWP36",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/dermalogica",
  },
  {
    type: "tag",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "redken-extreme",
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
    type: "tag",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "redken-all-soft",
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
    type: "tag",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "redken-color-extend",
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
    limit: "100",
    uses: "48",
    identifier: "Kerastase",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/4207/11244/Kerastase_Nutritive_Nectar_Thermique_Blow-Dry_Primer_150ml_1__95211.1650028222.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/4207/11244/Kerastase_Nutritive_Nectar_Thermique_Blow-Dry_Primer_150ml_1__95211.1650028222.jpg",
    headline: "Free Kerastase Blow-Dry Primer 150ml worth €31",
    worth: 31,
    condition: "When you spend €100 on Kerastase",
    sku: "9053",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/kerastase",
  },
  {
    type: "brand",
    store: "bf",
    limit: "stock",
    uses: "-",
    identifier: "Kerastase",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5892/11581/Kerastase_Resistance_Masque_Extentioniste_75ml_1__48084.1651588521.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5892/11581/Kerastase_Resistance_Masque_Extentioniste_75ml_1__48084.1651588521.jpg",
    headline: "Free Kerastase hair mask travel size worth €16",
    worth: 16,
    condition: "When you spend €50 on Kerastase",
    sku: "11370",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/kerastase",
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
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/pureology",
  },
  {
    type: "brand",
    store: "bf",
    limit: "33",
    uses: "8",
    identifier: "Pureology",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5251/11245/Pureology_Color_Fanatic_Leave-In_Spray_200ml_1__40670.1650028399.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5251/11245/Pureology_Color_Fanatic_Leave-In_Spray_200ml_1__40670.1650028399.jpg",
    headline: "Free Pureology Color Fanatic 200ml worth €30",
    worth: 30,
    condition: "When you spend €70 on Pureology",
    sku: "10354",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/pureology",
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
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/Moroccanoil.html",
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
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/caudalie/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "stock",
    uses: "57",
    identifier: "Decleor",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5723/11585/Decleor_Hydrate_Glow_GWP_1__42110.1651667588.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5723/11585/Decleor_Hydrate_Glow_GWP_1__42110.1651667588.jpg",
    headline: "Free Decleor Hydrate & Glow Kit worth €58",
    worth: 58,
    condition: "When you spend €80 on Decleor",
    sku: "11178",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/decleor",
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
    store: "bsk",
    limit: "800",
    uses: "0",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-7f87b/images/stencil/75x75/products/535/1086/resurface_and_replenish__78180.1656491703.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-7f87b/images/stencil/300x300/products/535/1086/resurface_and_replenish__78180.1656491703.jpg?c=2&imbypass=on",
    headline: "Free Dermalogica Resurface & Replenish Kit worth €35",
    worth: 35,
    condition: "When you spend €85 on Dermalogica",
    sku: "GWP37",
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
