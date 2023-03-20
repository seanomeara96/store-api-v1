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
    limit: "250",
    identifier: "Kerastase",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6455/14693/Kerastase_Genesis_Bain_Hydra-Fortifiant_80ml_GWP__90016.1673432977.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6455/14693/Kerastase_Genesis_Bain_Hydra-Fortifiant_80ml_GWP__90016.1673432977.jpg?c=2&imbypass=on",
    headline: "Free Genesis Bain Hydra-Fortifiant 80ml",
    worth: 10,
    condition: "When you spend €60 or more on Kerastase",
    sku: "8779B",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/kerastase",
  },
  {
    type: "category",
    store: "bf",
    limit: "stock",
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
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/brands/redken",
  },
  {
    type: "category",
    store: "bf",
    limit: "stock",
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
    type: "category",
    store: "bf",
    limit: "52",
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
    limit: "199",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6640/15170/Jocio_Weekend_Hair_Dry_Shampoo_53ml_1__54832.1676892656.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6640/15170/Jocio_Weekend_Hair_Dry_Shampoo_53ml_1__54832.1676892656.jpg?c=2&imbypass=on",
    headline: "Free Dynamic Skin Recovery SPF50 7ml",
    worth: 18,
    condition: "When you spend €80 on Dermalogica",
    sku: "7806A",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/Dermalogica.html",
  },
  {
    type: "brand",
    store: "bf",
    limit: "",
    identifier: "The Inkey List",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6509/14665/Inkey_List_-_Oat_Cleansing_Balm_50ml_GWP_1__09100.1673354704.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6509/14665/Inkey_List_-_Oat_Cleansing_Balm_50ml_GWP_1__09100.1673354704.jpg?c=2&imbypass=on",
    headline: "Free Inkey List Oat Cleansing Balm 50ml worth €6",
    worth: 6,
    condition: "When you spend €25 on The Inkey List",
    sku: "12207",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/the-inkey-list/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "250",
    identifier: "Matrix",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6421/14697/Matrix_Total_Results_Miracle_Creator_20_Multi-Tasking_Treatment_Spray30ml_GWP_1__21293.1673438853.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6421/14697/Matrix_Total_Results_Miracle_Creator_20_Multi-Tasking_Treatment_Spray30ml_GWP_1__21293.1673438853.jpg?c=2&imbypass=on",
    headline: "Free Miracle Creator 20 Multi-Tasking Treatment 30ml",
    worth: 2,
    condition: "When you spend €40 on Matrix",
    sku: "12108",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/matrix/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "250",
    identifier: "Matrix",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6418/14694/Matrix_Total_Results_Brass_Off_Blue_Toning_Shampoo_50ml_GWP_1__38388.1673433375.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6418/14694/Matrix_Total_Results_Brass_Off_Blue_Toning_Shampoo_50ml_GWP_1__38388.1673433375.jpg?c=2&imbypass=on",
    headline: "Free Total Results Brass Off Blue Toning Shampoo 50ml",
    worth: 3,
    condition: "When you buy the Blue Toning Shampoo & Conditioner",
    sku: "12105",
    sku_type: "product",
    display: "TRUE",
    destination_url:
      "https://www.beautyfeatures.ie/matrix-total-results-brass-off-blue-toning-trio-giftset/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "250",
    identifier: "Matrix",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6419/14695/_Matrix_Total_Results_Dark_Envy_Toning_Shampoo_50ml_GWP_1__00484.1673433679.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6419/14695/_Matrix_Total_Results_Dark_Envy_Toning_Shampoo_50ml_GWP_1__00484.1673433679.jpg?c=2&imbypass=on",
    headline: "Free Matrix Dark Envy Shampoo Travel Mini",
    worth: 3,
    condition: "When you buy a Dark Envy Shampoo",
    sku: "12106",
    sku_type: "product",
    display: "TRUE",
    destination_url:
      "https://www.beautyfeatures.ie/matrix-total-results-dark-envy-shampoo-300ml/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "250",
    identifier: "Matrix",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6420/14696/Matrix_Total_Results_Dark_Envy_Conditioner_50ml_GWP_1__86685.1673438007.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6420/14696/Matrix_Total_Results_Dark_Envy_Conditioner_50ml_GWP_1__86685.1673438007.jpg?c=2&imbypass=on",
    headline: "Free Matrix Dark Envy Conditioner Travel Mini",
    worth: 3,
    condition: "When you buy a Dark Envy Conditioner",
    sku: "12107",
    sku_type: "product",
    display: "TRUE",
    destination_url:
      "https://www.beautyfeatures.ie/matrix-total-results-dark-envy-conditioner-300ml/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "18",
    identifier: "Pestle & Mortar",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5943/12321/Chocolate_Bronze__47559.1653643497.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5943/12321/Chocolate_Bronze__47559.1653643497.jpg?c=2&imbypass=on",
    headline: "Free Pestle &amp; Mortar Glow Drops worth €40",
    worth: 21,
    condition: "When you spend €120 on Pestle &amp; Mortar",
    sku: "11417",
    sku_type: "product",
    display: "FALSE",
    destination_url:
      "https://www.beautyfeatures.ie/brands/Pestle-%26-Mortar.html",
  },
  {
    type: "brand",
    store: "bf",
    limit: "100",
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
    limit: "30",
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
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/carter-beauty/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "stock",
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
    limit: "47",
    identifier: "Shiseido",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6480/14510/Shiseido_WASO_Shikulime_Mega_Hydrating_Moisturiser_15ml_GWP_1__29172.1671005916.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6480/14510/Shiseido_WASO_Shikulime_Mega_Hydrating_Moisturiser_15ml_GWP_1__29172.1671005916.jpg?c=2&imbypass=on",
    headline: "Free WASO Shikulime Hydrating Moisturiser 15ml worrth €11",
    worth: 11,
    condition: "When you spend €80 on Shiseido",
    sku: "12169",
    sku_type: "product",
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/shiseido/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "stock",
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
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/nak/",
  },
  {
    type: "brand",
    store: "bf",
    limit: "stock",
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
    limit: "199",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6640/15170/Jocio_Weekend_Hair_Dry_Shampoo_53ml_1__54832.1676892656.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6640/15170/Jocio_Weekend_Hair_Dry_Shampoo_53ml_1__54832.1676892656.jpg?c=2&imbypass=on",
    headline: "Free Dynamic Skin Recovery SPF50 7ml",
    worth: 18,
    condition: "When you spend €80 on Dermalogica",
    sku: "7806A",
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
