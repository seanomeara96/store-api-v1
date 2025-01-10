require("../../config/config").config("bf");
import sgMail from "@sendgrid/mail";
import { getAllProductVariants } from "../../functions/products/getAllProductVariants";
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
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/8668/22951/Dermalogica_Best_Sellers_GWP__39346.1731580425.jpg?c=2&imbypass=on",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/300x300/products/8668/22951/Dermalogica_Best_Sellers_GWP__39346.1731580425.jpg?c=2&imbypass=on",
    headline: "Best Sellers Minis Gift",
    worth: 32,
    condition: "When you spend €100 or more on Dermalogica",
    sku: "20504",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/Dermalogica.html",
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
    condition: "When you spend €50 or more on Makeup",
    sku: "14032A",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/makeup/",
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
    headline: "Free Issey Miyake Toiletry Bag and Shower Gel",
    worth: 25,
    condition: "When you spend €80 or more on Issey Miyake",
    sku: "11051",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/issey-miyake/",
  },
];

let text = ``;
async function report() {
  try {
    for (let i = 0; i < campaigns.length; i++) {
      try {
        const vars = await getAllProductVariants({ sku: campaigns[i].sku });
        if (!vars || !vars.length)
          throw `no product matches ${campaigns[i].sku}`;
        let variant = vars[0];
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

      text += `${data.headline} SKU:${data.sku} Display:${data.display} Inventory:${data.inventory_level}\n`;
    }

    const msg = {
      to: "sean@beautyfeatures.ie",
      from: "sean@beautyfeatures.ie",
      subject: "GWP Stock Report",
      text: "GWP Stock Report",
      html: email,
    };

    await sgMail.send(msg);
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
      console.log(text);
    }
  }
}
report();
