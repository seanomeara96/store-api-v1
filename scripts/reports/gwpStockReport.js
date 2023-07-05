require("../../config/config").config("bf");
const sgMail = require("@sendgrid/mail");
const {
  default: getStoreSKUs,
} = require("../../functions/products/getStoreSKUs");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const campaigns = [
  {
    type: "brand",
    store: "bf",
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
    identifier: "Kerastase",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5687/10648/Krastase_Chroma_Absolu_Bain_Riche_Chroma_Respect_80ml_1__89345.1644404708.png?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5687/10648/Krastase_Chroma_Absolu_Bain_Riche_Chroma_Respect_80ml_1__89345.1644404708.png?c=2&imbypass=on",
    headline: "Free Kerastase Chroma Absolu Shampoo",
    worth: 10,
    condition: "When you spend €60 or more on Kerastase",
    sku: "11101",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/kerastase",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "Moroccanoil",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5115/9368/moro-comb__36575.1620814825.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5115/9368/moro-comb__36575.1620814825.jpg?c=2&imbypass=on",
    headline: "Free Moroccanoil Detangling Comb",
    worth: 20,
    condition: "When you spend €100 on Moroccanoil",
    sku: "10151",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/Moroccanoil.html",
  },
  {
    type: "brand",
    store: "bf ",
    identifier: "Luna By Lisa",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/7035/16758/Luna_By_Lisa_Compact_Mirror_GWP__24710.1686657720.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/7035/16758/Luna_By_Lisa_Compact_Mirror_GWP__24710.1686657720.jpg?c=2&imbypass=on",
    headline: "Free Luna By Lisa Compact Mirror",
    worth: 20,
    condition: "When you spend €30 on Luna By Lisa",
    sku: "13060",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/luna-by-lisa/",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "Bare By Vogue",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/7034/16761/Bare_By_Vogue_Water_Bottle_GWP_1__91000.1686665235.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/7034/16761/Bare_By_Vogue_Water_Bottle_GWP_1__91000.1686665235.jpg?c=2&imbypass=on",
    headline: "Free Bare By Vogue Water Bottle",
    worth: 20,
    condition: "When you spend €30 on Bare By Vogue",
    sku: "13059",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/bare-by-vogue/",
  },
  {
    type: "category",
    store: "bf",
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
    identifier: "Top Brands/Redken/Extreme",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6606/16586/extreme_anti_snap_shampoo_gwp__89299.1685096398.png?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6606/16586/extreme_anti_snap_shampoo_gwp__89299.1685096398.png?c=2&imbypass=on",
    headline: "Free Redken Extreme Anti Snap Treatment 50ml",
    worth: 6,
    condition: "When you spend €30 on the Redken Extreme range",
    sku: "12286",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/redken",
  },
  {
    type: "category",
    store: "bf",
    identifier: "Top Brands/Redken/All Soft",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6609/16587/All_soft_Shampoo_gwp__07498.1685096481.png?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6609/16587/All_soft_Shampoo_gwp__07498.1685096481.png?c=2&imbypass=on",
    headline: "Free Redken All Soft Shampoo 50ml",
    worth: 6,
    condition: "When you spend €40 on the Redken All Soft range",
    sku: "12289",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/redken",
  },
  {
    type: "category",
    store: "bf",
    identifier: "Top Brands/Redken/All Soft",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6610/16588/All_soft_conditioner_gwp__80447.1685096494.png?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6610/16588/All_soft_conditioner_gwp__80447.1685096494.png?c=2&imbypass=on",
    headline: "Free Redken All Soft Conditioner 30ml",
    worth: 6,
    condition: "When you spend €40 on the Redken All Soft range",
    sku: "12289",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/redken",
  },
  {
    type: "category",
    store: "bf",
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
    type: "category",
    store: "bf",
    identifier: "Top Brands/L'Oreal/Vitamino Color",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6234/13703/Vitamino_Color_Mask__57243.1658477125.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6234/13703/Vitamino_Color_Mask__57243.1658477125.jpg?c=2&imbypass=on",
    headline: "Free L'Oreal Professionnel Vitamino Color Mask 75ml",
    worth: 8,
    condition: "When you spend €30 on the L'Oreal Vitamino Color range",
    sku: "11786",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/vitamino-color/",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "L'Oreal Professionnel",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6238/13692/LOreal_Professionnel_Absolut_Repair_Oil_30ml_1__86612.1658474966.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6238/13692/LOreal_Professionnel_Absolut_Repair_Oil_30ml_1__86612.1658474966.jpg?c=2&imbypass=on",
    headline: "Free L'Oreal Professionnel Absolut Repair Oil 30ml",
    worth: 10,
    condition: "When you spend €40 on L'Oreal Professionnel",
    sku: "11790",
    sku_type: "product",
    display: "TRUE",
    destination_url:
      "https://www.beautyfeatures.ie/loreal-makeup-hair-fragrance-and-skincare/",
  },
  {
    type: "category",
    store: "bf",
    identifier: "Top Brands/L'Oreal/Absolut Repair",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6239/13785/LOreal_Professionnel_Absolut_Repair_Golden_Lightweight_Mask_75ml_1__75912.1659008615.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6239/13785/LOreal_Professionnel_Absolut_Repair_Golden_Lightweight_Mask_75ml_1__75912.1659008615.jpg?c=2&imbypass=on",
    headline:
      "L'Oreal Professionnel Absolut Repair Golden Lightweight Mask 75ml",
    worth: 8,
    condition: "When You Spend €30 on the L'Oreal Absolut Repair range",
    sku: "11791",
    sku_type: "product",
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/absolut-repair/",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "L'Oreal Professionnel",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6240/13707/Loreal_Professional_Mini_Collection_1__50255.1658477606.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6240/13707/Loreal_Professional_Mini_Collection_1__50255.1658477606.jpg?c=2&imbypass=on",
    headline: "L'Oreal Professionnel Absolut Repair Mask 75ml",
    worth: 8,
    condition: "When you spend €30 on L'Oreal Professionnel",
    sku: "11792",
    sku_type: "product",
    display: "TRUE",
    destination_url:
      "https://www.beautyfeatures.ie/loreal-makeup-hair-fragrance-and-skincare/",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "L'Oreal Professionnel",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6241/13788/LOreal_Professionnel_Metal_Detox_Anti-Deposit_Protector_Mask_75ml_1__25822.1659009370.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6241/13788/LOreal_Professionnel_Metal_Detox_Anti-Deposit_Protector_Mask_75ml_1__25822.1659009370.jpg?c=2&imbypass=on",
    headline:
      "L'Oreal Professionnel Metal Detox Anti-Deposit Protector Mask 75ml",
    worth: 9,
    condition: "When you spend €20 on L'Oreal Professionnel",
    sku: "11793",
    sku_type: "product",
    display: "TRUE",
    destination_url:
      "https://www.beautyfeatures.ie/loreal-makeup-hair-fragrance-and-skincare/",
  },
  {
    type: "category",
    store: "bf",
    identifier: "Top Brands/L'Oreal/Pro Longer",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6242/13791/LOreal_Professionnel_Pro_Longer_Professional_Mask_75ml_1__39092.1659010462.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6242/13791/LOreal_Professionnel_Pro_Longer_Professional_Mask_75ml_1__39092.1659010462.jpg?c=2&imbypass=on",
    headline: "L'Oreal Professionnel Pro Longer Professional Mask 75ml",
    worth: 8,
    condition: "When You Spend €30 on the L'Oreal Pro Longer range",
    sku: "11794",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/pro-longer/",
  },
  {
    type: "brand",
    store: "bf",
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
    type: "category",
    store: "bf",
    identifier: "Shop/Skincare/Masks and Peels",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5611/10596/Carter_Beauty_Revitalise_Retinol_Collagen_Mask__55306.1643022301.png",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5611/10596/Carter_Beauty_Revitalise_Retinol_Collagen_Mask__55306.1643022301.png",
    headline: "Free Revitalise Retinol & Collagen Mask worth €8",
    worth: 8,
    condition: "When you spend €15 on Masks and Peels",
    sku: "11026",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/carter-beauty/",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "Shiseido",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6479/14704/Shiseido_WASO_Yuzu-C_Beauty_Sleeping_Mask_15ml_GWP_1__29363.1673441326.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6479/14704/Shiseido_WASO_Yuzu-C_Beauty_Sleeping_Mask_15ml_GWP_1__29363.1673441326.jpg?c=2&imbypass=on",
    headline: "Free WASO Yuzu-C Beauty Sleeping Mask worth €12",
    worth: 12,
    condition: "When you spend €80 on Shiseido",
    sku: "12168",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/shiseido/",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "Shiseido",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6480/14510/Shiseido_WASO_Shikulime_Mega_Hydrating_Moisturiser_15ml_GWP_1__29172.1671005916.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6480/14510/Shiseido_WASO_Shikulime_Mega_Hydrating_Moisturiser_15ml_GWP_1__29172.1671005916.jpg?c=2&imbypass=on",
    headline: "Free WASO Shikulime Hydrating Moisturiser 15ml worth €11",
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
    identifier: "NUXE",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5638/10654/NUXE_Bougie_Candle_GWP_1__10111.1644575162.png?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5638/10654/NUXE_Bougie_Candle_GWP_1__10111.1644575162.png?c=2&imbypass=on",
    headline: "Free Bougie Candle worth €19",
    worth: 19,
    condition: "When you spend €40 or more on NUXE",
    sku: "10935",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/nuxe/",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "NUXE",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5242/9744/NUXE_Reve_De_Miel_Lip_Balm_15g__47769.1625566345.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/5242/9744/NUXE_Reve_De_Miel_Lip_Balm_15g__47769.1625566345.jpg?c=2&imbypass=on",
    headline: "NUXE Reve De Miel Lip Balm 15g worth €12.50",
    worth: 12.5,
    condition: "When You Spend €50 or more on NUXE",
    sku: "10356",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/nuxe/",
  },
  {
    type: "brand",
    store: "bf",
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

getStoreSKUs(400)
  .then(async function (productVariants) {
    try {
      for (let i = 0; i < campaigns.length; i++) {
        const variant = productVariants.find((o) => o.sku === campaigns[i].sku);
        campaigns[i].inventory_level = variant.inventory_level;
      }

      campaigns.sort(function ascendingInventory(a, b) {
        return a.inventory_level - b.inventory_level;
      });

      let email = "";

      for (let i = 0; i < campaigns.length; i++) {
        const data = campaigns[i];
        const alert = data.inventory_level < 21 ? "style='color:red;'" : "";
        email += /*html*/ `<p>
            <div><strong>${data.headline}</strong></div>
            <span style="padding-right: 20px">SKU: ${data.sku}</span>
            <span style="padding-right: 20px">Display: ${data.display}</span>
            <span>Inventory: <strong ${alert}>${data.inventory_level}</strong></span>
        </p>`;
      }

      const msg = {
        to: "sean@beautyfeatures.ie",
        from: "sean@beautyfeatures.ie",
        subject: "GWP Stock Report",
        text: "GWP Stock Report",
        html: email,
      };

      await sgMail.send(msg);
      console.log("Done");
    } catch (err) {
      try {
        console.log(err);
        const msg = {
          to: "sean@beautyfeatures.ie",
          from: "sean@beautyfeatures.ie",
          subject: "GWP Stock Report Failure",
          text: err.toString(),
        };
        await sgMail.send(msg);
      } catch (err) {
        console.log("failed to send error email");
        console.log(err);
      }
    }
  })
  .catch(console.log);
