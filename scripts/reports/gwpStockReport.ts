require("../../config/config").config("bf");
import sgMail from "@sendgrid/mail";
import { getStoreSKUs } from "../../functions/products/getStoreSKUs";
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
const campaigns: any[] = [
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
    condition: "When you spend €60 or more on Alfaparf",
    sku: "6481A",
    sku_type: "config",
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/brands/Alfaparf.html",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/8153/20706/Dermalogica_Skin_Awakening_Heroes_GWP__26146.1712307051.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/8153/20706/Dermalogica_Skin_Awakening_Heroes_GWP__26146.1712307051.jpg?c=2&imbypass=on",
    headline: "Free Skin Awakening Heroes Set",
    worth: 34,
    condition: "When you spend €100 or more on Dermalogica",
    sku: "14683",
    sku_type: "product",
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/brands/Dermalogica.html",
  },
  {
    type: "brand",
    store: "bsk",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/8153/20706/Dermalogica_Skin_Awakening_Heroes_GWP__26146.1712307051.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/8153/20706/Dermalogica_Skin_Awakening_Heroes_GWP__26146.1712307051.jpg?c=2&imbypass=on",
    headline: "Free Skin Awakening Heroes Set",
    worth: 34,
    condition: "When you spend €100 or more on Dermalogica",
    sku: "14683",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyskincare.ie/brands/Dermalogica.html",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "Kerastase",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/7806/19358/Kerastase_Elixir_Ultime_LHuile_Original_Deluxe_15ml__1__14433.1706609796.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/7806/19358/Kerastase_Elixir_Ultime_LHuile_Original_Deluxe_15ml__1__14433.1706609796.jpg?c=2&imbypass=on",
    headline: "Free Elixir Ultime L'Huile Original Deluxe 15ml​",
    worth: 8,
    condition: "When you spend €60 or more on Kerastase",
    sku: "12267",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/kerastase",
  },
  {
    type: "category",
    store: "bf",
    identifier: "MakeUp",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/7763/19318/Premium_Makeup_Blending_Sponge_By_BeautyFeatures__71801.1706091513.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/7763/19318/Premium_Makeup_Blending_Sponge_By_BeautyFeatures__71801.1706091513.jpg?c=2&imbypass=on",
    headline: "Free Premium Makeup Blending Sponge",
    worth: null,
    condition: "When you spend €40 or more on Makeup",
    sku: "14032A",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/makeup/",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "Nuxe",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/8275/20657/Mini_Ultra_AntiAge_Global_15ml__92914.1712243004.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/8275/20657/Mini_Ultra_AntiAge_Global_15ml__92914.1712243004.jpg?c=2&imbypass=on",
    headline: "Free NUXE Nuxuriance Ultra Mini GWP",
    worth: 19,
    condition: "When you spend €40 or more on Nuxe",
    sku: "14681",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/nuxe/",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "Caudalie",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/8118/19669/Caudalie_-_Shower_Gel_The_des_vignes_200ml__96266.1709134294.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/8118/19669/Caudalie_-_Shower_Gel_The_des_vignes_200ml__96266.1709134294.jpg?c=2&imbypass=on",
    headline: "Free Caudalie - Shower Gel The des vignes ",
    worth: 10,
    condition: "When you spend €30 or more on Caudalie",
    sku: "9345A",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/caudalie/",
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
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/7034/17021/Bare_By_Vogue_Water_Bottle_GWP_2_1__46273.1692181937.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/7034/17021/Bare_By_Vogue_Water_Bottle_GWP_2_1__46273.1692181937.jpg?c=2&imbypass=on",
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
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6240/13707/Loreal_Professional_Mini_Collection_1__50255.1658477606.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6240/13707/Loreal_Professional_Mini_Collection_1__50255.1658477606.jpg?c=2&imbypass=on",
    headline: "L'Oreal Professionnel Absolut Repair Mask 75ml",
    worth: 8,
    condition: "When you spend €30 on the L'Oreal Vitamino Color range",
    sku: "11792",
    sku_type: "product",
    display: "FALSE",
    destination_url:
      "https://www.beautyfeatures.ie/loreal-makeup-hair-fragrance-and-skincare/",
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
    type: "brand",
    store: "bf",
    identifier: "Zadig & Voltaire",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/6729/17036/Zadig_Voltaire_Tote_Bag_GWP_1__78679.1692692498.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/6729/17036/Zadig_Voltaire_Tote_Bag_GWP_1__78679.1692692498.jpg?c=2&imbypass=on",
    headline: "Free Zadig & Voltaire Tote Bag",
    worth: null,
    condition: "When you buy 2 or more Zadig & Voltaire products",
    sku: "12539",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/zadig-voltaire/",
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
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/svr/",
  },
  {
    type: "brand",
    store: "bf",
    identifier: "Pestle & Mortar",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/4985/21291/Milkshake_Silver_Shine_Conditioner_250ml_1__78028.1715244047.png?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/4985/21291/Milkshake_Silver_Shine_Conditioner_250ml_1__78028.1715244047.png?c=2&imbypass=on",
    headline: "Free Pestle & Mortar Hydrate Moisturiser",
    worth: 28,
    condition: "When you spend €50 or more on Pestle & Mortar",
    sku: "8902",
    sku_type: "product",
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/brands/Pestle-Mortar",
  },
];

async function report() {
  try {
    const productVariants = await getStoreSKUs(400);

    for (let i = 0; i < campaigns.length; i++) {
      try {
        const variant = productVariants.find((o) => o.sku === campaigns[i].sku);
        if (!variant) throw "No mathing variant.";
        campaigns[i].inventory_level = variant.inventory_level;
      } catch (err) {
        console.log(campaigns[i]);
        throw `${err}. Issue with sku: ${campaigns[i].sku}`;
      }
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
  } catch (err: any) {
    try {
      console.log(err);
      const msg = {
        to: "sean@beautyfeatures.ie",
        from: "sean@beautyfeatures.ie",
        subject: "GWP Stock Report Failure",
        text: err.toString ? err.toString() : err,
      };
      await sgMail.send(msg);
    } catch (err) {
      console.log("failed to send error email");
      console.log(err);
    }
  }
}
report();
