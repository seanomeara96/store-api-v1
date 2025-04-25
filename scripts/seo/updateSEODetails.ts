import { updateBrand } from "../../functions/brands/updateBrand";
import { updateCategory } from "../../functions/categories/updateCategory";

const updates = [
  {
    id: 408,
    store: "bf",
    type: "brand",
    page_title: "L.A. Girl: Affordable, Quality Makeup Used By Makeup Artists",
    meta_description:
      "Shop affordable, high quality makeup loved by both beginners and makeup artists! Enjoy free next day delivery nationwide when you order before 2pm!",
  },
  {
    id: 1112,
    store: "bf",
    type: "category",
    page_title: "Joico Youth Lock : Haircare For Mature, Aging Hair",
    meta_description:
      "Shop Joico Youth Lock, the haircare range for aging hair with collagen-infused formulas. Enjoy free next day delivery nationwide when you order before 2pm!",
  },
  {
    id: 1113,
    store: "bf",
    type: "category",
    page_title: "Joico Joifull : Volumizing Haircare for Fuller, Bouncy Hair",
    meta_description:
      "Shop Joico Joifull, the volumizing haircare for fuller, bouncy hair with lasting body. Enjoy free next day delivery nationwide when you order before 2pm!",
  },
  {
    id: 1114,
    store: "bf",
    type: "category",
    page_title: "Joico Colorful : Vibrant Hair Colour Protection & Care",
    meta_description:
      "Keep your hair colour vibrant and protected with Joico Colorful. Enjoy free next day delivery nationwide when you order before 2pm!",
  },
  {
    id: 111,
    store: "bsk",
    type: "category",
    page_title: "Dermalogica Multivitamin Power : For Aging Skin",
    meta_description:
      "Discover Dermalogica Multivitamin Power, the skincare designed for aging skin to boost radiance. Free next day delivery nationwide when you order before 2pm!",
  },
  {
    id: 355,
    store: "ah",
    type: "category",
    page_title: "Bundles : Shop Curated Haircare Bundles From Top Brands",
    meta_description:
      "Shop curated haircare bundles from top brands at fabulous prices for every hair need. Free next day delivery nationwide when you order before 2pm!",
  },
  {
    id: 357,
    store: "ah",
    type: "category",
    page_title: "Alfaparf Bundles :  Salon Quality Haircare For Less!",
    meta_description:
      "Shop our curated Alfaparf bundles at unbeatable prices. Enjoy free next day delivery nationwide when you order before 2pm!",
  },
  {
    id: 358,
    store: "ah",
    type: "category",
    page_title: "Color Wow Bundles : Bold, Brilliant Hair Colour Solutions",
    meta_description:
      "Shop our Color WOW Bundles for vibrant, lasting shine. Enjoy free next day delivery nationwide when you order before 2pm!",
  },
  {
    id: 359,
    store: "ah",
    type: "category",
    page_title: "Kerastase Bundles : Curated Luxury Haircare Solutions",
    meta_description:
      "Discover our Kerastase Bundles, curated for all hair types. Enjoy Free Next Working Day Delivery when you order before 2pm!",
  },
  {
    id: 360,
    store: "ah",
    type: "category",
    page_title: "L'Oreal Bundles : Professional Haircare at Great Prices!",
    meta_description:
      "Shop our L'Oreal Prfoessionnel Bundles for professional haircare at great prices! Enjoy free next working day delivery nationwide when you order before 2pm!",
  },
  {
    id: 361,
    store: "ah",
    type: "category",
    page_title: "milk_shake Bundles : Salon Grade Haircare Bundles",
    meta_description:
      "Discover salon_grade hair care with our milk_shake bundles, crafted for various hair types. Enjoy Next Working Day Delivery when you place your order before 2pm",
  },
  {
    id: 362,
    store: "ah",
    type: "category",
    page_title: "Moroccanoil Bundles : Argan Infused Haircare Bundles",
    meta_description:
      "Discover our variety of Moroccanoil Haircare Bundles at fabulous prices. Enjoy Next Working Day Delivery when you place your order before 2pm!",
  },
  {
    id: 363,
    store: "ah",
    type: "category",
    page_title: "Pureology Bundles :  Vegan Haircare for Colour Treated Hair",
    meta_description:
      "Discover our variety of Pureology Haircare Bundles at fabulous prices. Enjoy Next Working Day Delivery when you place your order before 2pm!",
  },
  {
    id: 364,
    store: "ah",
    type: "category",
    page_title: "Redken Bundles : Curated Professional Haircare Bundles",
    meta_description:
      "Discover our variety of Redken Haircare Bundles at fabulous prices. Enjoy Next Working Day Delivery when you place your order before 2pm!",
  },
  {
    id: 365,
    store: "ah",
    type: "category",
    page_title: "Free Hairbrush : Enjoy A FREE Hairbrush In Select Bundles!",
    meta_description:
      "Discover our variety of Free Hairbrush Bundles at fabulous prices. Enjoy Next Working Day Delivery when you place your order before 2pm!",
  },
];

(async () => {
  try {
    for (let i = 0; i < updates.length; i++) {
      console.log(i, updates.length);
      const update = updates[i];
      require("../../config/config").config(update.store);

      if (update.type === "category") {
        await updateCategory(update.id, {
          page_title: update.page_title,
          meta_description: update.meta_description,
        });
      }

      if (update.type === "brand") {
        await updateBrand(update.id, {
          page_title: update.page_title,
          meta_description: update.meta_description,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
