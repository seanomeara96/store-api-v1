import { htmlToText } from "html-to-text";
import { getProductBySku } from "./functions/products/getProductBySKU";
import OpenAI from "openai";
import { marked } from "marked";
import { updateProduct } from "./functions/products/updateProduct";

let bundleData = [
  {
    bundle_sku: "20500",
    bundle_name: "Hair, Brow & Skin Essentials Beauty Box",
    component_sku: "11286",
    component_name: "Olaplex No 9 Bond Serum 90ml",
    qty: 1,
  },
  {
    bundle_sku: "20500",
    bundle_name: "Hair, Brow & Skin Essentials Beauty Box",
    component_sku: "11566",
    component_name: "Hollywood Browzer - Brow Perfector - Black",
    qty: 1,
  },
  {
    bundle_sku: "20500",
    bundle_name: "Hair, Brow & Skin Essentials Beauty Box",
    component_sku: "14032C",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 5pk",
    qty: 1,
  },
  {
    bundle_sku: "20500",
    bundle_name: "Hair, Brow & Skin Essentials Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    qty: 1,
  },
  {
    bundle_sku: "20500",
    bundle_name: "Hair, Brow & Skin Essentials Beauty Box",
    component_sku: "9678",
    component_name: "La Roche-Posay Effaclar Clarifying Toner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20502",
    bundle_name: "Beloved Brands Beauty Box",
    component_sku: "13142",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Discomfort Shampoo 100ml GWP",
    qty: 1,
  },
  {
    bundle_sku: "20502",
    bundle_name: "Beloved Brands Beauty Box",
    component_sku: "13297",
    component_name: "Joico Defy Damage Seasonal Kit",
    qty: 1,
  },
  {
    bundle_sku: "20502",
    bundle_name: "Beloved Brands Beauty Box",
    component_sku: "14032C",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 5pk",
    qty: 1,
  },
  {
    bundle_sku: "20502",
    bundle_name: "Beloved Brands Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    qty: 1,
  },
  {
    bundle_sku: "20502",
    bundle_name: "Beloved Brands Beauty Box",
    component_sku: "mor_mo0042",
    component_name: "Moroccanoil light Treatment Oil 125ml",
    qty: 1,
  },
  {
    bundle_sku: "20503",
    bundle_name: "Day To Night Radiance Beauty Box",
    component_sku: "13144",
    component_name:
      "Loreal Professionnel Scalp Advanced Anti-Oiliness Shampoo 100ml GWP",
    qty: 1,
  },
  {
    bundle_sku: "20503",
    bundle_name: "Day To Night Radiance Beauty Box",
    component_sku: "13456",
    component_name: "SOSU Kissmass Lip Trio",
    qty: 1,
  },
  {
    bundle_sku: "20503",
    bundle_name: "Day To Night Radiance Beauty Box",
    component_sku: "14032C",
    component_name: "Premium Makeup Blending Sponge By BeautyFeatures 5pk",
    qty: 1,
  },
  {
    bundle_sku: "20503",
    bundle_name: "Day To Night Radiance Beauty Box",
    component_sku: "20510",
    component_name: "Beauty Box Regular Sleeve",
    qty: 1,
  },
  {
    bundle_sku: "20503",
    bundle_name: "Day To Night Radiance Beauty Box",
    component_sku: "9141A",
    component_name: "Kerastase Elixir L'Huile Legere Pride Edition 2022 100ml",
    qty: 1,
  },
  {
    bundle_sku: "20522",
    bundle_name: "Isoclean Cleanse & Smooth Bundle",
    component_sku: "13664",
    component_name: "e.l.f. Holy Hydration! Makeup Melting Cleansing Balm",
    qty: 1,
  },
  {
    bundle_sku: "20522",
    bundle_name: "Isoclean Cleanse & Smooth Bundle",
    component_sku: "20117",
    component_name: "ISOCLEAN Cotton Cleansing Towels - 60 Pack",
    qty: 1,
  },
  {
    bundle_sku: "20522",
    bundle_name: "Isoclean Cleanse & Smooth Bundle",
    component_sku: "20122",
    component_name: "ISOCLEAN Facial Dermablade Razor",
    qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "13297",
    component_name: "Joico Defy Damage Seasonal Kit",
    qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "14090",
    component_name: "Ziaja Goats Milk Milky Face Wash 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "20295",
    component_name: "Large Black Box",
    qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "20511",
    component_name: "Beauty Box Large Sleeve",
    qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "20518",
    component_name: "BeautyFeatures Silk Heatless Curler",
    qty: 1,
  },
  {
    bundle_sku: "20529",
    bundle_name: "BeautyFeatures Hair & Skin Night In Beauty Box",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20632",
    bundle_name: "Kevin Murphy Healthy Scalp Bundle",
    component_sku: "20568",
    component_name: "Kevin Murphy Scalp Spa Wash 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20632",
    bundle_name: "Kevin Murphy Healthy Scalp Bundle",
    component_sku: "20569",
    component_name: "Kevin Murphy Scalp Spa Treatment 170ml",
    qty: 1,
  },
  {
    bundle_sku: "20632",
    bundle_name: "Kevin Murphy Healthy Scalp Bundle",
    component_sku: "20570",
    component_name: "Kevin Murphy Scalp Spa Serum 45ml",
    qty: 1,
  },
  {
    bundle_sku: "20632",
    bundle_name: "Kevin Murphy Healthy Scalp Bundle",
    component_sku: "20571",
    component_name: "Kevin Murphy Scalp Spa Scrub 180ml",
    qty: 1,
  },
  {
    bundle_sku: "20634",
    bundle_name: "Kevin Murphy Bundle for Aging & Brittle Hair",
    component_sku: "20535",
    component_name: "Kevin Murphy Young Again Masque 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20634",
    bundle_name: "Kevin Murphy Bundle for Aging & Brittle Hair",
    component_sku: "20536",
    component_name: "Kevin Murphy Young Again Leave-in Treatment 100ml",
    qty: 1,
  },
  {
    bundle_sku: "20634",
    bundle_name: "Kevin Murphy Bundle for Aging & Brittle Hair",
    component_sku: "20537",
    component_name: "Kevin Murphy Young Again Dry Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20634",
    bundle_name: "Kevin Murphy Bundle for Aging & Brittle Hair",
    component_sku: "20556",
    component_name: "Kevin Murphy Young Again Wash 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20634",
    bundle_name: "Kevin Murphy Bundle for Aging & Brittle Hair",
    component_sku: "20557",
    component_name: "Kevin Murphy Young Again Rinse 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20664",
    bundle_name:
      "Olaplex No. 4 Shampoo & No.5 Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20664",
    bundle_name:
      "Olaplex No. 4 Shampoo & No.5 Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "7179",
    component_name: "Olaplex No.4 Bond Maintenance Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20664",
    bundle_name:
      "Olaplex No. 4 Shampoo & No.5 Conditioner Duo with FREE Detangling Hairbrush",
    component_sku: "7180",
    component_name: "Olaplex No.5 Bond Maintenance Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20665",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Detangling Hairbrush",
    component_sku: "10490",
    component_name: "Olaplex No.4P Blonde Enhancer Toning Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20665",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Detangling Hairbrush",
    component_sku: "13296",
    component_name: "Olaplex No.5P Blonde Enhancing Toning Conditioner",
    qty: 1,
  },
  {
    bundle_sku: "20665",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20681",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Micro Fibre Hair Towel",
    component_sku: "10490",
    component_name: "Olaplex No.4P Blonde Enhancer Toning Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20681",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Micro Fibre Hair Towel",
    component_sku: "13296",
    component_name: "Olaplex No.5P Blonde Enhancing Toning Conditioner",
    qty: 1,
  },
  {
    bundle_sku: "20681",
    bundle_name:
      "Olaplex No.4P Blonde Shampoo & No.5P Blonde Conditioner with FREE Micro Fibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20821",
    bundle_name: "Kerastase Gloss Absolu Bundle - The Full Routine",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20821",
    bundle_name: "Kerastase Gloss Absolu Bundle - The Full Routine",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20821",
    bundle_name: "Kerastase Gloss Absolu Bundle - The Full Routine",
    component_sku: "20809",
    component_name:
      "Kerastase Gloss Absolu Anti-Frizz Glaze Milk All In 1 Spray 190ml",
    qty: 1,
  },
  {
    bundle_sku: "20821",
    bundle_name: "Kerastase Gloss Absolu Bundle - The Full Routine",
    component_sku: "20810",
    component_name: "Kerastase Gloss Absolu Glaze Drops Hair Oil 45ml",
    qty: 1,
  },
  {
    bundle_sku: "20822",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Leave in Spray Bundle",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20822",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Leave in Spray Bundle",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20822",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Leave in Spray Bundle",
    component_sku: "20809",
    component_name:
      "Kerastase Gloss Absolu Anti-Frizz Glaze Milk All In 1 Spray 190ml",
    qty: 1,
  },
  {
    bundle_sku: "20823",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Hair Oil Bundle",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20823",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Hair Oil Bundle",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20823",
    bundle_name:
      "Kerastase Gloss Absolu Shampoo, Conditioner & Hair Oil Bundle",
    component_sku: "20810",
    component_name: "Kerastase Gloss Absolu Glaze Drops Hair Oil 45ml",
    qty: 1,
  },
  {
    bundle_sku: "20824",
    bundle_name: "Kerastase Gloss Absolu Shampoo & Conditioner Duo",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20824",
    bundle_name: "Kerastase Gloss Absolu Shampoo & Conditioner Duo",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20825",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo & Mask Duo",
    component_sku: "20814",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Rinse Off Hair Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20825",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo & Mask Duo",
    component_sku: "20819",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 500ml",
    qty: 1,
  },
  {
    bundle_sku: "20826",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo, Mask & Serum Bundle",
    component_sku: "20813",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20826",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo, Mask & Serum Bundle",
    component_sku: "20814",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Rinse Off Hair Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20826",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo, Mask & Serum Bundle",
    component_sku: "20815",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Glass Shine Serum 50ml",
    qty: 1,
  },
  {
    bundle_sku: "20827",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml & Refill Pack",
    component_sku: "20813",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20827",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 300ml & Refill Pack",
    component_sku: "20820",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo Refill Pack 500ml",
    qty: 1,
  },
  {
    bundle_sku: "20828",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 500ml & Refill Pack",
    component_sku: "20819",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 500ml",
    qty: 1,
  },
  {
    bundle_sku: "20828",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo 500ml & Refill Pack",
    component_sku: "20820",
    component_name:
      "L'Oréal Professionnel Vitamino Color Spectrum Shampoo Refill Pack 500ml",
    qty: 1,
  },
  {
    bundle_sku: "20836",
    bundle_name: "Kérastase Gloss Absolu Shampoo Duo",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20837",
    bundle_name: "Kérastase Gloss Absolu Conditioner Duo",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20840",
    bundle_name:
      "Alfaparf Density Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20840",
    bundle_name:
      "Alfaparf Density Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20648",
    component_name: "Alfaparf Semi Di Lino Density Christmas Gift Set 2024",
    qty: 1,
  },
  {
    bundle_sku: "20841",
    bundle_name:
      "Alfaparf Reconstruction Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20841",
    bundle_name:
      "Alfaparf Reconstruction Gift Set with FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20649",
    component_name:
      "Alfaparf Semi Di Lino Reconstruction Christmas Gift Set 2024",
    qty: 1,
  },
  {
    bundle_sku: "20844",
    bundle_name: "Kerastase Resistance Shampoo & Conditioner Duo",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20844",
    bundle_name: "Kerastase Resistance Shampoo & Conditioner Duo",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20845",
    bundle_name: "Kerastase Resistance Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_E029600",
    component_name: "Kerastase Masque Force Architecte 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20845",
    bundle_name: "Kerastase Resistance Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20845",
    bundle_name: "Kerastase Resistance Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20846",
    bundle_name: "Kerastase Resistance Bundle - The Full Routine",
    component_sku: "KER_4402020",
    component_name: "Kerastase  Resistance Ciment Thermique 150ml",
    qty: 1,
  },
  {
    bundle_sku: "20846",
    bundle_name: "Kerastase Resistance Bundle - The Full Routine",
    component_sku: "KER_E029600",
    component_name: "Kerastase Masque Force Architecte 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20846",
    bundle_name: "Kerastase Resistance Bundle - The Full Routine",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20846",
    bundle_name: "Kerastase Resistance Bundle - The Full Routine",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20847",
    bundle_name: "Kerastase Resistance Bain Force Architecte Shampoo 250ml Duo",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20848",
    bundle_name:
      "Kerastase Resistance Shampoo & Conditioner Duo With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20848",
    bundle_name:
      "Kerastase Resistance Shampoo & Conditioner Duo With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20849",
    bundle_name:
      "Kerastase Resistance Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20849",
    bundle_name:
      "Kerastase Resistance Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_E029600",
    component_name: "Kerastase Masque Force Architecte 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20849",
    bundle_name:
      "Kerastase Resistance Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_E046500",
    component_name: "Kerastase Resistance Ciment Anti Usure 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20849",
    bundle_name:
      "Kerastase Resistance Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_E057430",
    component_name: "Kerastase Bain De Force Architecte 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20850",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle",
    component_sku: "14035",
    component_name:
      "Kérastase Première Decalcifying Repairing Pre-Shampoo Treatment 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20850",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20850",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20850",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle",
    component_sku: "14038",
    component_name:
      "Kérastase Première Anti-Breakage Reparative Filler Mask 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20851",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle With FREE Hair Towel",
    component_sku: "14035",
    component_name:
      "Kérastase Première Decalcifying Repairing Pre-Shampoo Treatment 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20851",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle With FREE Hair Towel",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20851",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle With FREE Hair Towel",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20851",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle With FREE Hair Towel",
    component_sku: "14038",
    component_name:
      "Kérastase Première Anti-Breakage Reparative Filler Mask 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20851",
    bundle_name:
      "Kerastase Premiere Pre-Shampoo, Shampoo, Conditioner & Mask Bundle With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20852",
    bundle_name: "Kerastase Premiere Pre Shampoo, Shampoo & Mask Bundle",
    component_sku: "14035",
    component_name:
      "Kérastase Première Decalcifying Repairing Pre-Shampoo Treatment 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20852",
    bundle_name: "Kerastase Premiere Pre Shampoo, Shampoo & Mask Bundle",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20852",
    bundle_name: "Kerastase Premiere Pre Shampoo, Shampoo & Mask Bundle",
    component_sku: "14038",
    component_name:
      "Kérastase Première Anti-Breakage Reparative Filler Mask 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20853",
    bundle_name: "Kerastase Premiere Shampoo, Conditioner & Repairing Oil Trio",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20853",
    bundle_name: "Kerastase Premiere Shampoo, Conditioner & Repairing Oil Trio",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20853",
    bundle_name: "Kerastase Premiere Shampoo, Conditioner & Repairing Oil Trio",
    component_sku: "14040",
    component_name: "Kérastase Première Intensive Shine Repairing Oil 30ml",
    qty: 1,
  },
  {
    bundle_sku: "20854",
    bundle_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml Duo",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20855",
    bundle_name:
      "Kérastase Première Shampoo & Condtioner Duo With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "14036",
    component_name:
      "Kérastase Première Decalcifying System Reparative Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20855",
    bundle_name:
      "Kérastase Première Shampoo & Condtioner Duo With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20855",
    bundle_name:
      "Kérastase Première Shampoo & Condtioner Duo With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20856",
    bundle_name: "Kérastase Première Condtioner Duo Pack",
    component_sku: "14037",
    component_name:
      "Kérastase Première Anti-Rigidity Decalcifying Repairing Conditioner 200ml",
    qty: 2,
  },
  {
    bundle_sku: "20857",
    bundle_name: "Kerastase Genesis Homme Thickness Boosting Shampoo 250ml Duo",
    component_sku: "11375",
    component_name:
      "Kerastase Genesis Homme Thickness Boosting Shampoo - 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20858",
    bundle_name: "Kérastase Symbiose Shampoo, Conditioner & Mask Trio",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20858",
    bundle_name: "Kérastase Symbiose Shampoo, Conditioner & Mask Trio",
    component_sku: "12258",
    component_name:
      "Kérastase Symbiose Detangling Soothing Cellular Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20858",
    bundle_name: "Kérastase Symbiose Shampoo, Conditioner & Mask Trio",
    component_sku: "12259",
    component_name: "Kérastase Symbiose Masque Intense Revitalising Mask 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20859",
    bundle_name:
      "Kérastase Symbiose Shampoo, Conditioner & Mask Trio With FREE Hair Towel",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20859",
    bundle_name:
      "Kérastase Symbiose Shampoo, Conditioner & Mask Trio With FREE Hair Towel",
    component_sku: "12258",
    component_name:
      "Kérastase Symbiose Detangling Soothing Cellular Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20859",
    bundle_name:
      "Kérastase Symbiose Shampoo, Conditioner & Mask Trio With FREE Hair Towel",
    component_sku: "12259",
    component_name: "Kérastase Symbiose Masque Intense Revitalising Mask 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20859",
    bundle_name:
      "Kérastase Symbiose Shampoo, Conditioner & Mask Trio With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20860",
    bundle_name:
      "Kérastase Symbiose Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "12258",
    component_name:
      "Kérastase Symbiose Detangling Soothing Cellular Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20860",
    bundle_name:
      "Kérastase Symbiose Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20860",
    bundle_name:
      "Kérastase Symbiose Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20870",
    component_name: "Kérastase Symbiose Moisturising Anti-Dandruff 250ml Duo",
    qty: 1,
  },
  {
    bundle_sku: "20861",
    bundle_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml Duo",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20862",
    bundle_name:
      "Elemis Radiance Renewal Cleansing Bundle with FREE Cleansing Mitts",
    component_sku: "13387",
    component_name: "Elemis Superfood Blackcurrant Jelly Exfoliator 50ml",
    qty: 1,
  },
  {
    bundle_sku: "20862",
    bundle_name:
      "Elemis Radiance Renewal Cleansing Bundle with FREE Cleansing Mitts",
    component_sku: "13405",
    component_name: "Elemis Pro-Collagen Cleansing Balm 100g",
    qty: 1,
  },
  {
    bundle_sku: "20862",
    bundle_name:
      "Elemis Radiance Renewal Cleansing Bundle with FREE Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    qty: 1,
  },
  {
    bundle_sku: "20863",
    bundle_name: "Elemis Collagen Boost Bundle with FREE Cleansing Mitts",
    component_sku: "13406",
    component_name: "Elemis Pro-Collagen Super Serum Elixir 15ml",
    qty: 1,
  },
  {
    bundle_sku: "20863",
    bundle_name: "Elemis Collagen Boost Bundle with FREE Cleansing Mitts",
    component_sku: "13413",
    component_name: "Elemis Pro-Collagen Naked Cleansing Balm 100g",
    qty: 1,
  },
  {
    bundle_sku: "20863",
    bundle_name: "Elemis Collagen Boost Bundle with FREE Cleansing Mitts",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    qty: 1,
  },
  {
    bundle_sku: "20866",
    bundle_name:
      "Dermalogica Teen Skin Starter Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "100851",
    component_name: "Dermalogica Clear Start Hydrating Lotion 60ml",
    qty: 1,
  },
  {
    bundle_sku: "20866",
    bundle_name:
      "Dermalogica Teen Skin Starter Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "10280",
    component_name:
      "Dermalogica Clear Start Breakout Clearing Foaming Wash 296ml",
    qty: 1,
  },
  {
    bundle_sku: "20866",
    bundle_name:
      "Dermalogica Teen Skin Starter Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "11234",
    component_name: "Dermalogica Clear Start Post-Break Out Fix",
    qty: 1,
  },
  {
    bundle_sku: "20866",
    bundle_name:
      "Dermalogica Teen Skin Starter Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    qty: 1,
  },
  {
    bundle_sku: "20867",
    bundle_name:
      "The Ordinary Shine Control Squad Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "11088",
    component_name: "The Ordinary Niacinamide 10% + Zinc 1% - 60ml",
    qty: 1,
  },
  {
    bundle_sku: "20867",
    bundle_name:
      "The Ordinary Shine Control Squad Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    qty: 1,
  },
  {
    bundle_sku: "20867",
    bundle_name:
      "The Ordinary Shine Control Squad Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "5756",
    component_name: "The Ordinary Natural Moisturising Factors + HA 30ml",
    qty: 1,
  },
  {
    bundle_sku: "20867",
    bundle_name:
      "The Ordinary Shine Control Squad Bundle With FREE Cleansing Pads & Cuffs",
    component_sku: "8203",
    component_name: "The Ordinary Squalane Cleanser 150ml",
    qty: 1,
  },
  {
    bundle_sku: "20868",
    bundle_name:
      "The Ordinary Dry Skin Saviours with FREE Cleansing Pads & Cuffs",
    component_sku: "20516",
    component_name:
      "BeautyFeatures Reusable Premium Cleansing Pads with Cuffs - 3 Pack",
    qty: 1,
  },
  {
    bundle_sku: "20868",
    bundle_name:
      "The Ordinary Dry Skin Saviours with FREE Cleansing Pads & Cuffs",
    component_sku: "5673",
    component_name: "The Ordinary Hyaluronic Acid 2% + B5 - 30ml",
    qty: 1,
  },
  {
    bundle_sku: "20868",
    bundle_name:
      "The Ordinary Dry Skin Saviours with FREE Cleansing Pads & Cuffs",
    component_sku: "5756",
    component_name: "The Ordinary Natural Moisturising Factors + HA 30ml",
    qty: 1,
  },
  {
    bundle_sku: "20868",
    bundle_name:
      "The Ordinary Dry Skin Saviours with FREE Cleansing Pads & Cuffs",
    component_sku: "8203",
    component_name: "The Ordinary Squalane Cleanser 150ml",
    qty: 1,
  },
  {
    bundle_sku: "20869",
    bundle_name:
      "The Inkey List Combination Skin Balance Bundle with FREE Cleansing Pads & Cuff",
    component_sku: "20517",
    component_name:
      "BeautyFeatures Resuable Bamboo Fibre Cleansing Mitts - 2 Pack",
    qty: 1,
  },
  {
    bundle_sku: "20869",
    bundle_name:
      "The Inkey List Combination Skin Balance Bundle with FREE Cleansing Pads & Cuff",
    component_sku: "7165",
    component_name: "The INKEY list Hyaluronic Acid Serum 30ml",
    qty: 1,
  },
  {
    bundle_sku: "20869",
    bundle_name:
      "The Inkey List Combination Skin Balance Bundle with FREE Cleansing Pads & Cuff",
    component_sku: "7634",
    component_name: "The INKEY-List - Sailcylic Acid Cleanser 150ml",
    qty: 1,
  },
  {
    bundle_sku: "20869",
    bundle_name:
      "The Inkey List Combination Skin Balance Bundle with FREE Cleansing Pads & Cuff",
    component_sku: "8533",
    component_name: "The Inkey List Peptide Moisturiser 50ml",
    qty: 1,
  },
  {
    bundle_sku: "20870",
    bundle_name: "Kérastase Symbiose Moisturising Anti-Dandruff 250ml Duo",
    component_sku: "12257",
    component_name:
      "Kérastase Symbiose Moisturising Anti-Dandruff Cellular Shampoo 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20871",
    bundle_name: "Kérastase Nutritive Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_44015370",
    component_name: "Kerastase Nutritive Masquintense Riche 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20871",
    bundle_name: "Kérastase Nutritive Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20871",
    bundle_name: "Kérastase Nutritive Shampoo, Conditioner & Mask Trio",
    component_sku: "KER_4402082",
    component_name: "Kerastase  Nutritive Bain Satin Riche 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20872",
    bundle_name:
      "Kérastase Nutritive Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20872",
    bundle_name:
      "Kérastase Nutritive Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_44015370",
    component_name: "Kerastase Nutritive Masquintense Riche 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20872",
    bundle_name:
      "Kérastase Nutritive Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_4401984",
    component_name: "Kerastase Nutritive Lait Vital 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20872",
    bundle_name:
      "Kérastase Nutritive Shampoo, Conditioner & Mask Trio With FREE BeautyFeatures Hair Towel",
    component_sku: "KER_4402082",
    component_name: "Kerastase  Nutritive Bain Satin Riche 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20873",
    bundle_name: "Kérastase Blond Absolu Bain Lumiere & Mask Duo",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20873",
    bundle_name: "Kérastase Blond Absolu Bain Lumiere & Mask Duo",
    component_sku: "8778",
    component_name: "Kerastase Blond Absolu Masque Ultra-Violet 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20874",
    bundle_name: "Kérastase Blond Absolu Bain Ultra-Violet & Mask Duo",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20874",
    bundle_name: "Kérastase Blond Absolu Bain Ultra-Violet & Mask Duo",
    component_sku: "8778",
    component_name: "Kerastase Blond Absolu Masque Ultra-Violet 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20875",
    bundle_name:
      "Kérastase Blond Absolu Bain Lumiere & Mask Duo With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20875",
    bundle_name:
      "Kérastase Blond Absolu Bain Lumiere & Mask Duo With FREE Hair Towel",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20875",
    bundle_name:
      "Kérastase Blond Absolu Bain Lumiere & Mask Duo With FREE Hair Towel",
    component_sku: "8778",
    component_name: "Kerastase Blond Absolu Masque Ultra-Violet 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20876",
    bundle_name:
      "Kérastase Blond Absolu Bain Ultra-Violet & Mask Duo With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20876",
    bundle_name:
      "Kérastase Blond Absolu Bain Ultra-Violet & Mask Duo With FREE Hair Towel",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20876",
    bundle_name:
      "Kérastase Blond Absolu Bain Ultra-Violet & Mask Duo With FREE Hair Towel",
    component_sku: "8778",
    component_name: "Kerastase Blond Absolu Masque Ultra-Violet 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "13236",
    component_name:
      "Kérastase Blond Absolu 2% Pure Hyaluronic Acid Scalp and Hair Serum 50ml",
    qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "20379",
    component_name: "Kerastase Blond Absolu Huile Cicaextreme Hair Oil 75ml",
    qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "8777",
    component_name: "Kerastase Blond Absolu Cicaplasme 150ml",
    qty: 1,
  },
  {
    bundle_sku: "20877",
    bundle_name: "Kérastase Blond Absolu Bundle - The Full Routine",
    component_sku: "9226",
    component_name: "Kerastase Blond Absolu Cicanuit Overnight Hair Serum 90Ml",
    qty: 1,
  },
  {
    bundle_sku: "20878",
    bundle_name: "Kérastase Blond Absolu Bain Lumiere 250ml Duo",
    component_sku: "8775",
    component_name: "Kerastase Blond Absolu Bain Lumiére 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20879",
    bundle_name: "Kérastase Blond Absolu Bain Ultra-Violet 250ml Duo",
    component_sku: "8774",
    component_name: "Kerastase Blond Absolu Bain Ultra-Violet 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20880",
    bundle_name: "Kérastase Blond Absolu Fondant Cicaflash 250ml Duo",
    component_sku: "8776",
    component_name: "Kerastase Blond Absolu Fondant Cicaflash 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20881",
    bundle_name:
      "Kérastase Gloss Absolu Shampoo & Conditioner Duo With Free BeautyFeatures Detangling Hair Brush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20881",
    bundle_name:
      "Kérastase Gloss Absolu Shampoo & Conditioner Duo With Free BeautyFeatures Detangling Hair Brush",
    component_sku: "20805",
    component_name: "Kerastase Gloss Absolu Bain Hydra Glaze Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20881",
    bundle_name:
      "Kérastase Gloss Absolu Shampoo & Conditioner Duo With Free BeautyFeatures Detangling Hair Brush",
    component_sku: "20808",
    component_name: "Kerastase Gloss Absolu Insta Glaze Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20882",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Conditioner Duo",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20882",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Conditioner Duo",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20883",
    bundle_name: "Kérastase Curl Manifesto Shampoo, Conditioner & Mask Trio",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20883",
    bundle_name: "Kérastase Curl Manifesto Shampoo, Conditioner & Mask Trio",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20883",
    bundle_name: "Kérastase Curl Manifesto Shampoo, Conditioner & Mask Trio",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20884",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20884",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20884",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20885",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Mask Duo",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20885",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Mask Duo",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20886",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Mask With FREE Hair Towel",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20886",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Mask With FREE Hair Towel",
    component_sku: "10190",
    component_name:
      "Kerastase Curl Manifesto Masque Beurre Haute Nutrition 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20886",
    bundle_name: "Kérastase Curl Manifesto Shampoo & Mask With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20887",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo, Conditioner & Sublime Repair Oil Trio",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20887",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo, Conditioner & Sublime Repair Oil Trio",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20887",
    bundle_name:
      "Kérastase Curl Manifesto Shampoo, Conditioner & Sublime Repair Oil Trio",
    component_sku: "10192",
    component_name: "Kerastase Curl Manifesto Huile Sublime Repair 50ml",
    qty: 1,
  },
  {
    bundle_sku: "20888",
    bundle_name: "Kérastase Curl Manifesto Bain Hydratation Douceur 250ml Duo",
    component_sku: "10188",
    component_name: "Kerastase Curl Manifesto Bain Hydratation Douceur 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20889",
    bundle_name: "Kérastase Discipline Shampoo & Mask Duo",
    component_sku: "9132",
    component_name: "Kerastase Discipline Maskeratine 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20889",
    bundle_name: "Kérastase Discipline Shampoo & Mask Duo",
    component_sku: "KER_E1023000",
    component_name: "Kerastase Discipline Bain Fluidealiste 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20890",
    bundle_name:
      "Kérastase Curl Manifesto Fondant Hydratation Essentielle 250ml Duo",
    component_sku: "10189",
    component_name:
      "Kerastase Curl Manifesto Fondant Hydratation Essentielle 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20891",
    bundle_name: "Kérastase Densifique Shampoo & Conditioner Duo",
    component_sku: "9135",
    component_name: "Kerastase Densifique Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20891",
    bundle_name: "Kérastase Densifique Shampoo & Conditioner Duo",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20892",
    bundle_name:
      "Kérastase Densifique Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20892",
    bundle_name:
      "Kérastase Densifique Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "9135",
    component_name: "Kerastase Densifique Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20892",
    bundle_name:
      "Kérastase Densifique Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20893",
    bundle_name: "Kérastase Densifique Shampoo & Mask Duo",
    component_sku: "9133",
    component_name: "Kerastase Densifique Masque Recovery Stemox 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20893",
    bundle_name: "Kérastase Densifique Shampoo & Mask Duo",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20894",
    bundle_name: "Kérastase Densifique Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20894",
    bundle_name: "Kérastase Densifique Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "9133",
    component_name: "Kerastase Densifique Masque Recovery Stemox 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20894",
    bundle_name: "Kérastase Densifique Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20895",
    bundle_name: "Kérastase Densifique Shampoo, Conditioner & Mask Trio",
    component_sku: "9133",
    component_name: "Kerastase Densifique Masque Recovery Stemox 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20895",
    bundle_name: "Kérastase Densifique Shampoo, Conditioner & Mask Trio",
    component_sku: "9135",
    component_name: "Kerastase Densifique Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20895",
    bundle_name: "Kérastase Densifique Shampoo, Conditioner & Mask Trio",
    component_sku: "9140",
    component_name: "Kerastase Densifique Bain Stemfree 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20896",
    bundle_name: "Kérastase Elixir Ultime Sublime Shampoo & Conditioner Duo",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20896",
    bundle_name: "Kérastase Elixir Ultime Sublime Shampoo & Conditioner Duo",
    component_sku: "9144",
    component_name: "Kerastase Elixir Ultime Soin 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20897",
    bundle_name:
      "Kérastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml Duo",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20898",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Mask Trio",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20898",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Mask Trio",
    component_sku: "9142",
    component_name: "Kerastase Elixir Ultime Masque 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20898",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Mask Trio",
    component_sku: "9144",
    component_name: "Kerastase Elixir Ultime Soin 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20899",
    bundle_name: "Kérastase Elixir Ultime Shampoo & Mask Duo",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20899",
    bundle_name: "Kérastase Elixir Ultime Shampoo & Mask Duo",
    component_sku: "9142",
    component_name: "Kerastase Elixir Ultime Masque 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20900",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20900",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20900",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "9142",
    component_name: "Kerastase Elixir Ultime Masque 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20901",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Conditioner Duo With Free Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20901",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Conditioner Duo With Free Detangling Hairbrush",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20901",
    bundle_name:
      "Kérastase Elixir Ultime Shampoo & Conditioner Duo With Free Detangling Hairbrush",
    component_sku: "9144",
    component_name: "Kerastase Elixir Ultime Soin 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20902",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Oil Trio",
    component_sku: "14790",
    component_name: "Kérastase Elixir Ultime Hair Oil L'Huile Originale 30ml",
    qty: 1,
  },
  {
    bundle_sku: "20902",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Oil Trio",
    component_sku: "8722",
    component_name:
      "Kerastase Elixir Ultime Sublime Cleansing Oil Shampoo 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20902",
    bundle_name: "Kérastase Elixir Ultime Shampoo, Conditioner & Oil Trio",
    component_sku: "9144",
    component_name: "Kerastase Elixir Ultime Soin 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20903",
    bundle_name: "Kérastase Elixir Ultime Soin Conditioner 200ml Duo",
    component_sku: "9144",
    component_name: "Kerastase Elixir Ultime Soin 200ml",
    qty: 2,
  },
  {
    bundle_sku: "20904",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Fine, Oily Hair",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20904",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Fine, Oily Hair",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20904",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Fine, Oily Hair",
    component_sku: "8782",
    component_name: "Kerastase Genesis Masque Reconstituant 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20905",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Thick, Dry Hair",
    component_sku: "8780",
    component_name: "Kerastase Genesis Bain Nutri-Fortifiant 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20905",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Thick, Dry Hair",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20905",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Mask Trio - Thick, Dry Hair",
    component_sku: "8782",
    component_name: "Kerastase Genesis Masque Reconstituant 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20906",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Fine, Oily Hair",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20906",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Fine, Oily Hair",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20906",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Fine, Oily Hair",
    component_sku: "8785",
    component_name: "Kerastase Genesis Serum Anti-Chute Fortifiant 90ml",
    qty: 1,
  },
  {
    bundle_sku: "20907",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Thick, Dry Hair",
    component_sku: "8780",
    component_name: "Kerastase Genesis Bain Nutri-Fortifiant 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20907",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Thick, Dry Hair",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20907",
    bundle_name:
      "Kérastase Genesis Shampoo, Conditioner & Serum Trio - Thick, Dry Hair",
    component_sku: "8785",
    component_name: "Kerastase Genesis Serum Anti-Chute Fortifiant 90ml",
    qty: 1,
  },
  {
    bundle_sku: "20908",
    bundle_name: "Kérastase Genesis Bain Hydra-Fortifiant 250ml Duo",
    component_sku: "8779",
    component_name: "Kerastase Genesis Bain Hydra-Fortifiant 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20909",
    bundle_name: "Kérastase Genesis Bain Nutri-Fortifiant 250ml Duo",
    component_sku: "8780",
    component_name: "Kerastase Genesis Bain Nutri-Fortifiant 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20910",
    bundle_name: "Kérastase Genesis Fondant Renforçateur 200ml Duo",
    component_sku: "8781",
    component_name: "Kerastase Genesis Fondant Renforçateur 200ml",
    qty: 2,
  },
  {
    bundle_sku: "20911",
    bundle_name: "L'Oréal Professionnel Absolut Repair Shampoo & Mask Duo",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20911",
    bundle_name: "L'Oréal Professionnel Absolut Repair Shampoo & Mask Duo",
    component_sku: "11460",
    component_name: "L'Oréal Professionnel Absolut Repair Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20912",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20912",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "11460",
    component_name: "L'Oréal Professionnel Absolut Repair Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20912",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Mask Duo With FREE Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20913",
    bundle_name: "L'Oréal Professionnel Absolut Repair Shampoo 300ml Duo",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    qty: 2,
  },
  {
    bundle_sku: "20914",
    bundle_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml Duo",
    component_sku: "11459",
    component_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml",
    qty: 2,
  },
  {
    bundle_sku: "20915",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Conditioner with FREE Hairbrush",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20915",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Conditioner with FREE Hairbrush",
    component_sku: "11459",
    component_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20915",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Shampoo & Conditioner with FREE Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20916",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Bundle - The Full Routine",
    component_sku: "11458",
    component_name: "L'Oréal Professionnel Absolut Repair Shampoo - 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20916",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Bundle - The Full Routine",
    component_sku: "11459",
    component_name: "L'Oréal Professionnel Absolut Repair Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20916",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Bundle - The Full Routine",
    component_sku: "11462",
    component_name:
      "L'Oréal Professionnel Absolut Repair 10 in 1 leave in oil - 90ml",
    qty: 1,
  },
  {
    bundle_sku: "20929",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml Duo",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "20930",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner Duo",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20930",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner Duo",
    component_sku: "11431",
    component_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20931",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20931",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "11431",
    component_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20931",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20932",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo, Conditioner & Mask Trio",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20932",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo, Conditioner & Mask Trio",
    component_sku: "11428",
    component_name:
      "L'Oréal Professionnel Curl Expression Hair Mask for Curls & Coils 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20932",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo, Conditioner & Mask Trio",
    component_sku: "11431",
    component_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20933",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20933",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11428",
    component_name:
      "L'Oréal Professionnel Curl Expression Hair Mask for Curls & Coils 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20933",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11425",
    component_name:
      "L'Oréal Professionnel Curl Expression Curl-Activator Jelly 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11427",
    component_name:
      "L'Oréal Professionnel Curl Expression Moisturising & Hydrating Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11428",
    component_name:
      "L'Oréal Professionnel Curl Expression Hair Mask for Curls & Coils 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11430",
    component_name:
      "L'Oréal Professionnel Curl Expression Multi-benefit 10 in 1 Mousse 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11431",
    component_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11432",
    component_name:
      "L'Oréal Professionnel Curl Expression Curl Reviving Spray: Caring Water Mist 190ml",
    qty: 1,
  },
  {
    bundle_sku: "20934",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Bundle - The Full Routine",
    component_sku: "11433",
    component_name:
      "L'Oréal Professionnel Curl Expression Drying Accelerator 150ml",
    qty: 1,
  },
  {
    bundle_sku: "20935",
    bundle_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml Duo",
    component_sku: "11431",
    component_name:
      "L'Oréal Professionnel Curl Expression Long-Lasting Leave in Moisturiser 200ml",
    qty: 2,
  },
  {
    bundle_sku: "20936",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo & Mask Duo with FREE Detangling Hairbrush",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20936",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo & Mask Duo with FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20936",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Shampoo & Mask Duo with FREE Detangling Hairbrush",
    component_sku: "20939",
    component_name:
      "L'Oréal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml Duo",
    qty: 1,
  },
  {
    bundle_sku: "20937",
    bundle_name: "L'Oréal Professionnel Metal Detox Shampoo, Mask & Oil Trio",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20937",
    bundle_name: "L'Oréal Professionnel Metal Detox Shampoo, Mask & Oil Trio",
    component_sku: "11988",
    component_name:
      "L'Oreal Professionnel Metal Detox Anti-Deposit Protector Concentrated Oil 50ml",
    qty: 1,
  },
  {
    bundle_sku: "20937",
    bundle_name: "L'Oréal Professionnel Metal Detox Shampoo, Mask & Oil Trio",
    component_sku: "20939",
    component_name:
      "L'Oréal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml Duo",
    qty: 1,
  },
  {
    bundle_sku: "20938",
    bundle_name: "L'Oréal Professionnel Metal Detox Bundle - The Full Routine",
    component_sku: "11351",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Metal Cleansing Cream Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20938",
    bundle_name: "L'Oréal Professionnel Metal Detox Bundle - The Full Routine",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20938",
    bundle_name: "L'Oréal Professionnel Metal Detox Bundle - The Full Routine",
    component_sku: "11988",
    component_name:
      "L'Oreal Professionnel Metal Detox Anti-Deposit Protector Concentrated Oil 50ml",
    qty: 1,
  },
  {
    bundle_sku: "20938",
    bundle_name: "L'Oréal Professionnel Metal Detox Bundle - The Full Routine",
    component_sku: "12771",
    component_name:
      "L'Oréal Professionnel Metal Detox Anti-Metal High Protection Cream 100ml",
    qty: 1,
  },
  {
    bundle_sku: "20938",
    bundle_name: "L'Oréal Professionnel Metal Detox Bundle - The Full Routine",
    component_sku: "14413",
    component_name:
      "L’Oréal Professionnel Metal Detox Anti-Porosity Filler Pre-Shampoo Treatment 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20940",
    bundle_name:
      "L'Oréal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml Duo",
    component_sku: "11352",
    component_name:
      "Loreal Professionnel Metal Detox Anti-Deposit Protector Mask 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20941",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Conditioner Duo With FREE Hairbrush",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20941",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Conditioner Duo With FREE Hairbrush",
    component_sku: "11472",
    component_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20941",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Conditioner Duo With FREE Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20942",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo, Conditioner & Mask Trio",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20942",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo, Conditioner & Mask Trio",
    component_sku: "11472",
    component_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20942",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo, Conditioner & Mask Trio",
    component_sku: "11473",
    component_name: "L'Oréal Professionnel Pro Longer Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20943",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20943",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11472",
    component_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20943",
    bundle_name:
      "L'Oréal Professionnel Pro Longer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20944",
    bundle_name: "L'Oréal Professionnel Pro Longer Bundle - The Full Routine",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20944",
    bundle_name: "L'Oréal Professionnel Pro Longer Bundle - The Full Routine",
    component_sku: "11472",
    component_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20944",
    bundle_name: "L'Oréal Professionnel Pro Longer Bundle - The Full Routine",
    component_sku: "11473",
    component_name: "L'Oréal Professionnel Pro Longer Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20944",
    bundle_name: "L'Oréal Professionnel Pro Longer Bundle - The Full Routine",
    component_sku: "11474",
    component_name: "L'Oréal Professionnel Pro Longer 10 in 1 Cream 150ml",
    qty: 1,
  },
  {
    bundle_sku: "20945",
    bundle_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml Duo",
    component_sku: "11471",
    component_name: "L'Oréal Professionnel Pro Longer Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "20946",
    bundle_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml Duo",
    component_sku: "11472",
    component_name: "L'Oréal Professionnel Pro Longer Conditioner 200ml",
    qty: 2,
  },
  {
    bundle_sku: "20947",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "11468",
    component_name: "L'Oréal Professionnel Inforcer Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20947",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "11469",
    component_name: "L'Oréal Professionnel Inforcer Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20947",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20948",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11468",
    component_name: "L'Oréal Professionnel Inforcer Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20948",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11470",
    component_name: "L'Oréal Professionnel Inforcer Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20948",
    bundle_name:
      "L'Oréal Professionnel Inforcer Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20949",
    bundle_name: "L'Oréal Professionnel Inforcer Shampoo 300ml Duo",
    component_sku: "11468",
    component_name: "L'Oréal Professionnel Inforcer Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "20950",
    bundle_name: "L'Oréal Professionnel Inforcer Conditioner 200ml Duo",
    component_sku: "11469",
    component_name: "L'Oréal Professionnel Inforcer Conditioner 200ml",
    qty: 2,
  },
  {
    bundle_sku: "20951",
    bundle_name:
      "L'Oréal Professionnel Absolut Repar Molecular Shampoo & Mask Duo",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20951",
    bundle_name:
      "L'Oréal Professionnel Absolut Repar Molecular Shampoo & Mask Duo",
    component_sku: "20955",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Rinse off Hair Mask 250ml Duo",
    qty: 1,
  },
  {
    bundle_sku: "20952",
    bundle_name:
      "L'Oréal Professionnel Absolut Repar Molecular Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20952",
    bundle_name:
      "L'Oréal Professionnel Absolut Repar Molecular Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "20465",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Rinse off Hair Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20952",
    bundle_name:
      "L'Oréal Professionnel Absolut Repar Molecular Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20953",
    bundle_name:
      "L'Oréal Professionnel Absolut Repar Molecular Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20953",
    bundle_name:
      "L'Oréal Professionnel Absolut Repar Molecular Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20465",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Rinse off Hair Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20953",
    bundle_name:
      "L'Oréal Professionnel Absolut Repar Molecular Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20954",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml Duo",
    component_sku: "13284",
    component_name:
      "L'Oréal Professionnel Absolut Repair Molecular Sulfate-Free Molecular Repairing Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "20955",
    bundle_name:
      "L'Oréal Professionnel Absolut Repair Molecular Rinse off Hair Mask 250ml Duo",
    component_sku: "20465",
    component_name:
      "L'Oreal Professional Absolut Repair Molecular Rinse off Hair Mask 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20956",
    bundle_name: "L'Oréal Professionnel Silver Shampoo & Conditioner Duo",
    component_sku: "11456",
    component_name: "L'Oréal Professionnel Silver Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20956",
    bundle_name: "L'Oréal Professionnel Silver Shampoo & Conditioner Duo",
    component_sku: "11457",
    component_name: "L'Oréal Professionnel Silver Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20957",
    bundle_name:
      "L'Oréal Professionnel Silver Shampoo & Conditioner With Free Detangling Hairbrush",
    component_sku: "11456",
    component_name: "L'Oréal Professionnel Silver Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20957",
    bundle_name:
      "L'Oréal Professionnel Silver Shampoo & Conditioner With Free Detangling Hairbrush",
    component_sku: "11457",
    component_name: "L'Oréal Professionnel Silver Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20957",
    bundle_name:
      "L'Oréal Professionnel Silver Shampoo & Conditioner With Free Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20958",
    bundle_name: "L'Oréal Professionnel Silver Shampoo 300ml Duo",
    component_sku: "11456",
    component_name: "L'Oréal Professionnel Silver Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "20959",
    bundle_name: "L'Oréal Professionnel Silver Conditioner 200ml Duo",
    component_sku: "11457",
    component_name: "L'Oréal Professionnel Silver Conditioner 200ml",
    qty: 2,
  },
  {
    bundle_sku: "20960",
    bundle_name: "L'Oréal Professionnel Liss Unlimted Shampoo & Mask Duo",
    component_sku: "11483",
    component_name: "L'Oréal Professionnel Liss Unlimited Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20960",
    bundle_name: "L'Oréal Professionnel Liss Unlimted Shampoo & Mask Duo",
    component_sku: "11484",
    component_name: "L'Oréal Professionnel Liss Unlimited Mask - 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20961",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimted Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "11483",
    component_name: "L'Oréal Professionnel Liss Unlimited Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20961",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimted Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "11484",
    component_name: "L'Oréal Professionnel Liss Unlimited Mask - 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20961",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimted Shampoo & Mask With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20962",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimted Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11483",
    component_name: "L'Oréal Professionnel Liss Unlimited Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20962",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimted Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11484",
    component_name: "L'Oréal Professionnel Liss Unlimited Mask - 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20962",
    bundle_name:
      "L'Oréal Professionnel Liss Unlimted Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20963",
    bundle_name: "L'Oréal Professionnel Liss Unlimted Shampoo 300ml Duo",
    component_sku: "11483",
    component_name: "L'Oréal Professionnel Liss Unlimited Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "20964",
    bundle_name: "L'Oréal Professionnel Liss Unlimted Mask 250ml Duo",
    component_sku: "11484",
    component_name: "L'Oréal Professionnel Liss Unlimited Mask - 250ml",
    qty: 2,
  },
  {
    bundle_sku: "20965",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Conditioner With FREE Detangling Brush",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20965",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Conditioner With FREE Detangling Brush",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20965",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Conditioner With FREE Detangling Brush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20966",
    bundle_name: "L'Oréal Professionnel Vitamino Color Shampoo & Mask",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20966",
    bundle_name: "L'Oréal Professionnel Vitamino Color Shampoo & Mask",
    component_sku: "11454",
    component_name: "L'Oréal Professionnel Vitamino Color Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20967",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20967",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "11454",
    component_name: "L'Oréal Professionnel Vitamino Color Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20967",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20968",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo, Conditioner & 10 in 1 Multi-Benefit Leave In Treatment",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20968",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo, Conditioner & 10 in 1 Multi-Benefit Leave In Treatment",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20968",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Shampoo, Conditioner & 10 in 1 Multi-Benefit Leave In Treatment",
    component_sku: "11455",
    component_name:
      "L'Oréal Professionnel Vitamino Color 10 in 1 Multi-Benefit Leave In Treatment",
    qty: 1,
  },
  {
    bundle_sku: "20969",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Bundle - The Full Routine",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    qty: 1,
  },
  {
    bundle_sku: "20969",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Bundle - The Full Routine",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20969",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Bundle - The Full Routine",
    component_sku: "11454",
    component_name: "L'Oréal Professionnel Vitamino Color Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "20969",
    bundle_name:
      "L'Oréal Professionnel Vitamino Color Bundle - The Full Routine",
    component_sku: "11455",
    component_name:
      "L'Oréal Professionnel Vitamino Color 10 in 1 Multi-Benefit Leave In Treatment",
    qty: 1,
  },
  {
    bundle_sku: "20970",
    bundle_name: "L'Oréal Professionnel Vitamino Color Shampoo 300ml Duo",
    component_sku: "11452",
    component_name: "L'Oréal Professionnel Vitamino Color Shampoo - 300ml",
    qty: 2,
  },
  {
    bundle_sku: "20971",
    bundle_name: "L'Oréal Professionnel Vitamino Color Conditioner 200ml Duo",
    component_sku: "11453",
    component_name: "L'Oréal Professionnel Vitamino Conditioner 200ml",
    qty: 2,
  },
  {
    bundle_sku: "20978",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20978",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20978",
    bundle_name:
      "Pureology Hydrate Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20979",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "10256",
    component_name: "Pureology Hydrate Sheer Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20979",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "10257",
    component_name: "Pureology Hydrate Sheer Conditioner 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20979",
    bundle_name:
      "Pureology Hydrate Sheer Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20980",
    bundle_name:
      "Pureology Strength Cure Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20980",
    bundle_name:
      "Pureology Strength Cure Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20980",
    bundle_name:
      "Pureology Strength Cure Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5057",
    component_name: "Pureology - Strength Cure Conditioner 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20981",
    bundle_name:
      "Pureology Smooth Perfection Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20981",
    bundle_name:
      "Pureology Smooth Perfection Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5050",
    component_name: "Pureology - Smooth Perfection Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20981",
    bundle_name:
      "Pureology Smooth Perfection Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5055",
    component_name: "Pureology - Smooth Perfection Conditioner 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20982",
    bundle_name:
      "Pureology Nanoworks Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "11358",
    component_name: "Pureology Nanoworks Gold Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20982",
    bundle_name:
      "Pureology Nanoworks Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "11359",
    component_name: "Pureology Nanoworks Gold Conditioner 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20982",
    bundle_name:
      "Pureology Nanoworks Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20983",
    bundle_name:
      "Pureology Strength Cure Blonde Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20983",
    bundle_name:
      "Pureology Strength Cure Blonde Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5051",
    component_name: "Pureology Strength Cure Best Blonde Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20983",
    bundle_name:
      "Pureology Strength Cure Blonde Shampoo & Conditioner With FREE BeautyFeatures Detangling Hairbrush",
    component_sku: "5056",
    component_name: "Pureology Strength Cure Blonde Conditioner 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20984",
    bundle_name: "Pureology Hydrate Shampoo, Conditioner & Mask Trio",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20984",
    bundle_name: "Pureology Hydrate Shampoo, Conditioner & Mask Trio",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20984",
    bundle_name: "Pureology Hydrate Shampoo, Conditioner & Mask Trio",
    component_sku: "6258",
    component_name: "Pureology Pure Hydrate Superfood Mask  200ml",
    qty: 1,
  },
  {
    bundle_sku: "20985",
    bundle_name: "Pureology Hydrate Shampoo & Mask Duo",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20985",
    bundle_name: "Pureology Hydrate Shampoo & Mask Duo",
    component_sku: "6258",
    component_name: "Pureology Pure Hydrate Superfood Mask  200ml",
    qty: 1,
  },
  {
    bundle_sku: "20986",
    bundle_name:
      "Pureology Hydrate Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "20986",
    bundle_name:
      "Pureology Hydrate Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20986",
    bundle_name:
      "Pureology Hydrate Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20987",
    bundle_name: "Pureology Hydrate Shampoo 266ml Duo",
    component_sku: "5048",
    component_name: "Pureology - Pure Hydrate Shampoo 266ml",
    qty: 2,
  },
  {
    bundle_sku: "20988",
    bundle_name: "Pureology Hydrate Conditioner 266ml Duo",
    component_sku: "5053",
    component_name: "Pureology - Pure Hydrate Conditioner 266ml",
    qty: 2,
  },
  {
    bundle_sku: "20989",
    bundle_name: "Pureology Hydrate Sheer Shampoo 266ml Duo",
    component_sku: "10256",
    component_name: "Pureology Hydrate Sheer Shampoo 266ml",
    qty: 2,
  },
  {
    bundle_sku: "20990",
    bundle_name: "Pureology Hydrate Sheer Conditioner 266ml Duo",
    component_sku: "10257",
    component_name: "Pureology Hydrate Sheer Conditioner 266ml",
    qty: 2,
  },
  {
    bundle_sku: "20991",
    bundle_name: "Pureology Strength Cure Shampoo, Conditioner & Mask Trio",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20991",
    bundle_name: "Pureology Strength Cure Shampoo, Conditioner & Mask Trio",
    component_sku: "5057",
    component_name: "Pureology - Strength Cure Conditioner 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20991",
    bundle_name: "Pureology Strength Cure Shampoo, Conditioner & Mask Trio",
    component_sku: "6259",
    component_name: "Pureology Strength Cure Superfood Mask 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20992",
    bundle_name: "Pureology Strength Cure Shampoo & Mask Duo",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20992",
    bundle_name: "Pureology Strength Cure Shampoo & Mask Duo",
    component_sku: "6259",
    component_name: "Pureology Strength Cure Superfood Mask 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20993",
    bundle_name:
      "Pureology Strength Cure Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "20993",
    bundle_name:
      "Pureology Strength Cure Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20993",
    bundle_name:
      "Pureology Strength Cure Shampoo & Mask With FREE Microfibre Hair Towel",
    component_sku: "6259",
    component_name: "Pureology Strength Cure Superfood Mask 200ml",
    qty: 1,
  },
  {
    bundle_sku: "20994",
    bundle_name: "Pureology Strength Cure Shampoo 266ml Duo",
    component_sku: "5052",
    component_name: "Pureology - Strength Cure Shampoo 266ml",
    qty: 2,
  },
  {
    bundle_sku: "20995",
    bundle_name: "Pureology Strength Cure Conditioner 266ml Duo",
    component_sku: "5057",
    component_name: "Pureology - Strength Cure Conditioner 266ml",
    qty: 2,
  },
  {
    bundle_sku: "20996",
    bundle_name:
      "Pureology Smooth Perfection Shampoo, Conditioner & Serum Trio",
    component_sku: "13332",
    component_name: "Pureology Smooth Perfection Smoothing Serum 150ml",
    qty: 1,
  },
  {
    bundle_sku: "20996",
    bundle_name:
      "Pureology Smooth Perfection Shampoo, Conditioner & Serum Trio",
    component_sku: "5050",
    component_name: "Pureology - Smooth Perfection Shampoo 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20996",
    bundle_name:
      "Pureology Smooth Perfection Shampoo, Conditioner & Serum Trio",
    component_sku: "5055",
    component_name: "Pureology - Smooth Perfection Conditioner 266ml",
    qty: 1,
  },
  {
    bundle_sku: "20997",
    bundle_name: "Pureology Smooth Perfection Shampoo 266ml Duo",
    component_sku: "5050",
    component_name: "Pureology - Smooth Perfection Shampoo 266ml",
    qty: 2,
  },
  {
    bundle_sku: "20998",
    bundle_name: "Pureology Smooth Perfection Conditioner 266ml Duo",
    component_sku: "5055",
    component_name: "Pureology - Smooth Perfection Conditioner 266ml",
    qty: 2,
  },
  {
    bundle_sku: "20999",
    bundle_name: "Pureology Nanoworks Shampoo 266ml Duo",
    component_sku: "11358",
    component_name: "Pureology Nanoworks Gold Shampoo 266ml",
    qty: 2,
  },
  {
    bundle_sku: "21000",
    bundle_name: "Pureology Nanoworks Conditioner 266ml Duo",
    component_sku: "11359",
    component_name: "Pureology Nanoworks Gold Conditioner 266ml",
    qty: 2,
  },
  {
    bundle_sku: "21001",
    bundle_name: "Pureology Strength Cure Blonde Shampoo 266ml Duo",
    component_sku: "5051",
    component_name: "Pureology Strength Cure Best Blonde Shampoo 266ml",
    qty: 2,
  },
  {
    bundle_sku: "21002",
    bundle_name: "Pureology Strength Cure Blonde Conditioner 266ml Duo",
    component_sku: "5056",
    component_name: "Pureology Strength Cure Blonde Conditioner 266ml",
    qty: 2,
  },
  {
    bundle_sku: "21004",
    bundle_name: "Redken Extreme Shampoo, Conditioner & Mask Trio",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21004",
    bundle_name: "Redken Extreme Shampoo, Conditioner & Mask Trio",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21004",
    bundle_name: "Redken Extreme Shampoo, Conditioner & Mask Trio",
    component_sku: "REDK_P029530",
    component_name: "Redken - Extreme Strength Builder 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21005",
    bundle_name: "Redken Extreme Shampoo & Mask Duo",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21005",
    bundle_name: "Redken Extreme Shampoo & Mask Duo",
    component_sku: "REDK_P029530",
    component_name: "Redken - Extreme Strength Builder 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21006",
    bundle_name: "Redken Extreme Bundle - The Full Routine",
    component_sku: "7692",
    component_name: "Redken Extreme Play Safe 230C 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21006",
    bundle_name: "Redken Extreme Bundle - The Full Routine",
    component_sku: "REDK_P027790",
    component_name: "Redken - Extreme Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21006",
    bundle_name: "Redken Extreme Bundle - The Full Routine",
    component_sku: "REDK_P027920",
    component_name: "Redken - Extreme Anti Snap 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21006",
    bundle_name: "Redken Extreme Bundle - The Full Routine",
    component_sku: "REDK_P027970",
    component_name: "Redken - Extreme Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21006",
    bundle_name: "Redken Extreme Bundle - The Full Routine",
    component_sku: "REDK_P029530",
    component_name: "Redken - Extreme Strength Builder 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21007",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21007",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21007",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21008",
    bundle_name: "Redken Acidic Bonding Concentrate Shampoo & Mask Duo",
    component_sku: "13069",
    component_name:
      "Redken Acidic Bonding Concentrate 5-Minute Liquid Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21008",
    bundle_name: "Redken Acidic Bonding Concentrate Shampoo & Mask Duo",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21009",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "13069",
    component_name:
      "Redken Acidic Bonding Concentrate 5-Minute Liquid Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21009",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "21009",
    bundle_name:
      "Redken Acidic Bonding Concentrate Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21010",
    bundle_name: "Redken Acidic Bonding Concentrate Shampoo 300ml Duo",
    component_sku: "9762",
    component_name: "Redken Acidic Bonding Concentrate Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21011",
    bundle_name: "Redken Acidic Bonding Concentrate Conditioner 300ml Duo",
    component_sku: "9763",
    component_name: "Redken Acidic Bonding Concentrate Conditioner 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21012",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21012",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21012",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "7609",
    component_name: "Redken Color Extend Blondage Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21013",
    bundle_name: "Redken Colour Extend Blondage Shampoo & Mask Duo",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21013",
    bundle_name: "Redken Colour Extend Blondage Shampoo & Mask Duo",
    component_sku: "8490",
    component_name: "Redken Blondage Anti-Brass mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21014",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "21014",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21014",
    bundle_name:
      "Redken Colour Extend Blondage Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "8490",
    component_name: "Redken Blondage Anti-Brass mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21015",
    bundle_name: "Redken Colour Extend Blondage Shampoo 300ml Duo",
    component_sku: "7608",
    component_name: "Redken Colour Extend Blondage Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21016",
    bundle_name: "Redken Colour Extend Blondage Conditioner 300ml Duo",
    component_sku: "7609",
    component_name: "Redken Color Extend Blondage Conditioner 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21017",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "14141",
    component_name: "Redken Acidic Color Gloss Sulfate-Free Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21017",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "14142",
    component_name: "Redken Acidic Color Gloss Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21017",
    bundle_name:
      "Redken Acidic Color Gloss Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21018",
    bundle_name: "Redken Acidic Color Gloss Shampoo 300ml Duo",
    component_sku: "14141",
    component_name: "Redken Acidic Color Gloss Sulfate-Free Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21019",
    bundle_name: "Redken Acidic Color Gloss Conditioner 300ml Duo",
    component_sku: "14142",
    component_name: "Redken Acidic Color Gloss Conditioner 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21020",
    bundle_name:
      "Redken All Soft Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21020",
    bundle_name:
      "Redken All Soft Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21020",
    bundle_name:
      "Redken All Soft Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "REDK_P042560",
    component_name: "Redken - All Soft Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21021",
    bundle_name: "Redken All Soft Shampoo & Mask Duo",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21021",
    bundle_name: "Redken All Soft Shampoo & Mask Duo",
    component_sku: "REDK_P042690",
    component_name: "Redken - All Soft Heavy Cream 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21022",
    bundle_name:
      "Redken All Soft Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21022",
    bundle_name:
      "Redken All Soft Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "REDK_P042690",
    component_name: "Redken - All Soft Heavy Cream 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21023",
    bundle_name: "Redken All Soft Bundle - The Full Routine",
    component_sku: "6443",
    component_name: "Redken All Soft Mega Hydramelt 150ml",
    qty: 1,
  },
  {
    bundle_sku: "21023",
    bundle_name: "Redken All Soft Bundle - The Full Routine",
    component_sku: "8493",
    component_name: "Redken All Soft Argan-6 Oil 111ml",
    qty: 1,
  },
  {
    bundle_sku: "21023",
    bundle_name: "Redken All Soft Bundle - The Full Routine",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21023",
    bundle_name: "Redken All Soft Bundle - The Full Routine",
    component_sku: "REDK_P042560",
    component_name: "Redken - All Soft Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21023",
    bundle_name: "Redken All Soft Bundle - The Full Routine",
    component_sku: "REDK_P042690",
    component_name: "Redken - All Soft Heavy Cream 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21024",
    bundle_name: "Redken All Soft Shampoo, Conditioner & Oil Bundle",
    component_sku: "8493",
    component_name: "Redken All Soft Argan-6 Oil 111ml",
    qty: 1,
  },
  {
    bundle_sku: "21024",
    bundle_name: "Redken All Soft Shampoo, Conditioner & Oil Bundle",
    component_sku: "REDK_P042480",
    component_name: "Redken - All Soft Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21024",
    bundle_name: "Redken All Soft Shampoo, Conditioner & Oil Bundle",
    component_sku: "REDK_P042560",
    component_name: "Redken - All Soft Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21025",
    bundle_name: "Redken Extreme Lengths Shampoo & Conditioner Duo",
    component_sku: "13313",
    component_name: "Redken Extreme Length Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21025",
    bundle_name: "Redken Extreme Lengths Shampoo & Conditioner Duo",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21026",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "13313",
    component_name: "Redken Extreme Length Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21026",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21026",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21027",
    bundle_name:
      "Redken Extreme Lengths Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "13313",
    component_name: "Redken Extreme Length Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21027",
    bundle_name:
      "Redken Extreme Lengths Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21027",
    bundle_name:
      "Redken Extreme Lengths Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "13315",
    component_name:
      "Redken Extreme Length Leave In Treatment With Biotin 150ml",
    qty: 1,
  },
  {
    bundle_sku: "21028",
    bundle_name: "Redken Extreme Lengths Shampoo & Leave In Treatment Duo",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21028",
    bundle_name: "Redken Extreme Lengths Shampoo & Leave In Treatment Duo",
    component_sku: "13315",
    component_name:
      "Redken Extreme Length Leave In Treatment With Biotin 150ml",
    qty: 1,
  },
  {
    bundle_sku: "21029",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Leave In Treatment Duo With FREE Microfibre Hair Towel",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21029",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Leave In Treatment Duo With FREE Microfibre Hair Towel",
    component_sku: "13315",
    component_name:
      "Redken Extreme Length Leave In Treatment With Biotin 150ml",
    qty: 1,
  },
  {
    bundle_sku: "21029",
    bundle_name:
      "Redken Extreme Lengths Shampoo & Leave In Treatment Duo With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "21030",
    bundle_name: "Redken Extreme Lengths Shampoo 300ml Duo",
    component_sku: "13314",
    component_name: "Redken Extreme Length Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21031",
    bundle_name: "Redken Extreme Lengths Conditioner 300ml Duo",
    component_sku: "13313",
    component_name: "Redken Extreme Length Conditioner 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21032",
    bundle_name: "Redken Blondage High Bright Shampoo & Conditioner Duo",
    component_sku: "11200",
    component_name: "Redken Blondage High Bright Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21032",
    bundle_name: "Redken Blondage High Bright Shampoo & Conditioner Duo",
    component_sku: "11201",
    component_name: "Redken Blondage High Bright Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21033",
    bundle_name:
      "Redken Blondage High Bright Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "11200",
    component_name: "Redken Blondage High Bright Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21033",
    bundle_name:
      "Redken Blondage High Bright Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "11201",
    component_name: "Redken Blondage High Bright Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21033",
    bundle_name:
      "Redken Blondage High Bright Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21034",
    bundle_name:
      "Redken Blondage High Bright Pre Shampoo, Shampoo & Conditioner Trio",
    component_sku: "11199",
    component_name: "Redken Blondage High Bright Pre-Treatment",
    qty: 1,
  },
  {
    bundle_sku: "21034",
    bundle_name:
      "Redken Blondage High Bright Pre Shampoo, Shampoo & Conditioner Trio",
    component_sku: "11200",
    component_name: "Redken Blondage High Bright Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21034",
    bundle_name:
      "Redken Blondage High Bright Pre Shampoo, Shampoo & Conditioner Trio",
    component_sku: "11201",
    component_name: "Redken Blondage High Bright Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21035",
    bundle_name: "Redken Blondage High Bright Shampoo 300ml Duo",
    component_sku: "11200",
    component_name: "Redken Blondage High Bright Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21036",
    bundle_name: "Redken Blondage High Bright Conditioner 300ml Duo",
    component_sku: "11201",
    component_name: "Redken Blondage High Bright Conditioner 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21037",
    bundle_name:
      "Reken Volume Injection Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "10184",
    component_name: "Redken Volume Injection Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21037",
    bundle_name:
      "Reken Volume Injection Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "13337",
    component_name: "Redken Volume Injection Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21037",
    bundle_name:
      "Reken Volume Injection Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21038",
    bundle_name: "Reken Volume Injection Shampoo 300ml Duo",
    component_sku: "10184",
    component_name: "Redken Volume Injection Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21039",
    bundle_name: "Reken Volume Injection Conditioner 300ml Duo",
    component_sku: "13337",
    component_name: "Redken Volume Injection Conditioner 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21040",
    bundle_name: "Redken Acidic Bonding Curls Shampoo & Conditioner Duo",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21040",
    bundle_name: "Redken Acidic Bonding Curls Shampoo & Conditioner Duo",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21041",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21041",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21041",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21042",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21042",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21042",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo, Conditioner & Leave In Treatment Trio",
    component_sku: "20287",
    component_name: "Redken Acidic Bonding Curls Leave-In Treatment 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21043",
    bundle_name: "Redken Acidic Bonding Curls Shampoo & Leave In Treatment Duo",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21043",
    bundle_name: "Redken Acidic Bonding Curls Shampoo & Leave In Treatment Duo",
    component_sku: "20287",
    component_name: "Redken Acidic Bonding Curls Leave-In Treatment 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21044",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Leave In Treatment With FREE Microfibre Hair Towel",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21044",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Leave In Treatment With FREE Microfibre Hair Towel",
    component_sku: "20287",
    component_name: "Redken Acidic Bonding Curls Leave-In Treatment 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21044",
    bundle_name:
      "Redken Acidic Bonding Curls Shampoo & Leave In Treatment With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20287",
    component_name: "Redken Acidic Bonding Curls Leave-In Treatment 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20288",
    component_name: "Redken Hydrating Curl Cream 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20289",
    component_name: "Redken Sculpting Curl Gel 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21045",
    bundle_name: "Redken Acidic Bonding Curls Complete Set",
    component_sku: "20290",
    component_name: "Redken Refreshing Curl Mist 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21046",
    bundle_name: "Redken Acidic Bonding Curls Curl Protection & Control Set",
    component_sku: "20287",
    component_name: "Redken Acidic Bonding Curls Leave-In Treatment 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21046",
    bundle_name: "Redken Acidic Bonding Curls Curl Protection & Control Set",
    component_sku: "20288",
    component_name: "Redken Hydrating Curl Cream 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21046",
    bundle_name: "Redken Acidic Bonding Curls Curl Protection & Control Set",
    component_sku: "20289",
    component_name: "Redken Sculpting Curl Gel 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21046",
    bundle_name: "Redken Acidic Bonding Curls Curl Protection & Control Set",
    component_sku: "20290",
    component_name: "Redken Refreshing Curl Mist 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21047",
    bundle_name: "Redken Acidic Bonding Curls Curl Holding Trio",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21047",
    bundle_name: "Redken Acidic Bonding Curls Curl Holding Trio",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21047",
    bundle_name: "Redken Acidic Bonding Curls Curl Holding Trio",
    component_sku: "20289",
    component_name: "Redken Sculpting Curl Gel 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21048",
    bundle_name: "Redken Acidic Bonding Curls Curl Defining Trio",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21048",
    bundle_name: "Redken Acidic Bonding Curls Curl Defining Trio",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21048",
    bundle_name: "Redken Acidic Bonding Curls Curl Defining Trio",
    component_sku: "20288",
    component_name: "Redken Hydrating Curl Cream 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21049",
    bundle_name: "Redken Acidic Bonding Curls Curl Refreshing Trio",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21049",
    bundle_name: "Redken Acidic Bonding Curls Curl Refreshing Trio",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21049",
    bundle_name: "Redken Acidic Bonding Curls Curl Refreshing Trio",
    component_sku: "20290",
    component_name: "Redken Refreshing Curl Mist 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21050",
    bundle_name: "Redken Acidic Bonding Curls Shampoo 300ml Duo",
    component_sku: "20285",
    component_name: "Redken Acidic Bonding Curls Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21051",
    bundle_name: "Redken Acidic Bonding Curls Conditioner 300ml Duo",
    component_sku: "20286",
    component_name: "Redken Acidic Bonding Curls Conditioner 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21052",
    bundle_name: "Redken All Soft Mega Curls Shampoo & Conditioner Duo",
    component_sku: "12627",
    component_name: "Redken All Soft Mega Curl Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21052",
    bundle_name: "Redken All Soft Mega Curls Shampoo & Conditioner Duo",
    component_sku: "13311",
    component_name: "Redken All Soft Mega Curl Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21053",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "12627",
    component_name: "Redken All Soft Mega Curl Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21053",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "13311",
    component_name: "Redken All Soft Mega Curl Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21053",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo & Conditioner With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21054",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo, Conditioner & Leave In Conditioner Trio",
    component_sku: "12627",
    component_name: "Redken All Soft Mega Curl Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21054",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo, Conditioner & Leave In Conditioner Trio",
    component_sku: "12628",
    component_name:
      "Redken All Soft Mega Curl Hydramelt Leave In Conditioner 150ml",
    qty: 1,
  },
  {
    bundle_sku: "21054",
    bundle_name:
      "Redken All Soft Mega Curls Shampoo, Conditioner & Leave In Conditioner Trio",
    component_sku: "13311",
    component_name: "Redken All Soft Mega Curl Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21055",
    bundle_name: "Redken All Soft Mega Curls Shampoo 300ml Duo",
    component_sku: "12627",
    component_name: "Redken All Soft Mega Curl Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21056",
    bundle_name: "Redken All Soft Mega Curls Conditioner 300ml Duo",
    component_sku: "13311",
    component_name: "Redken All Soft Mega Curl Conditioner 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21059",
    bundle_name: "Matrix Instacure Shampoo & Conditioner Duo",
    component_sku: "11740",
    component_name: "Matrix Instacure Anti-Breakage Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21059",
    bundle_name: "Matrix Instacure Shampoo & Conditioner Duo",
    component_sku: "11741",
    component_name: "Matrix Instacure Anti-Breakage Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21060",
    bundle_name:
      "Matrix Instacure Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "11740",
    component_name: "Matrix Instacure Anti-Breakage Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21060",
    bundle_name:
      "Matrix Instacure Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "11741",
    component_name: "Matrix Instacure Anti-Breakage Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21060",
    bundle_name:
      "Matrix Instacure Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21061",
    bundle_name:
      "Matrix Instacure Shampoo,Conditioner & Anti Porosity Spray Trio",
    component_sku: "11740",
    component_name: "Matrix Instacure Anti-Breakage Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21061",
    bundle_name:
      "Matrix Instacure Shampoo,Conditioner & Anti Porosity Spray Trio",
    component_sku: "11741",
    component_name: "Matrix Instacure Anti-Breakage Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21062",
    bundle_name: "Matrix A Curl Can Dream Shampoo & Mask Duo",
    component_sku: "11992",
    component_name: "Matrix A Curl Can Dream Gentle Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21062",
    bundle_name: "Matrix A Curl Can Dream Shampoo & Mask Duo",
    component_sku: "11993",
    component_name: "Matrix A Curl Can Dream Rich Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21063",
    bundle_name:
      "Matrix A Curl Can Dream Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "11992",
    component_name: "Matrix A Curl Can Dream Gentle Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21063",
    bundle_name:
      "Matrix A Curl Can Dream Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "11993",
    component_name: "Matrix A Curl Can Dream Rich Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21063",
    bundle_name:
      "Matrix A Curl Can Dream Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "21064",
    bundle_name: "Matrix Total Results Brass Off Shampoo & Conditioner Duo",
    component_sku: "8248",
    component_name: "Matrix Total Results Brass Off Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21064",
    bundle_name: "Matrix Total Results Brass Off Shampoo & Conditioner Duo",
    component_sku: "8249",
    component_name: "Matrix Total Results Brass Off Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21065",
    bundle_name:
      "Matrix Total Results Brass Off Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21065",
    bundle_name:
      "Matrix Total Results Brass Off Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8248",
    component_name: "Matrix Total Results Brass Off Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21065",
    bundle_name:
      "Matrix Total Results Brass Off Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8249",
    component_name: "Matrix Total Results Brass Off Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21066",
    bundle_name: "Matrix A Curl Can Dream Bundle - The Full Routine",
    component_sku: "11991",
    component_name: "Matrix A Curl Can Dream Light Hold Defining Gel 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21066",
    bundle_name: "Matrix A Curl Can Dream Bundle - The Full Routine",
    component_sku: "11992",
    component_name: "Matrix A Curl Can Dream Gentle Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21066",
    bundle_name: "Matrix A Curl Can Dream Bundle - The Full Routine",
    component_sku: "11993",
    component_name: "Matrix A Curl Can Dream Rich Mask 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21066",
    bundle_name: "Matrix A Curl Can Dream Bundle - The Full Routine",
    component_sku: "11994",
    component_name: "Matrix A Curl Can Dream Moisturising Cream 500ml",
    qty: 1,
  },
  {
    bundle_sku: "21067",
    bundle_name: "Matrix Instacure Shampoo 300ml Duo",
    component_sku: "11740",
    component_name: "Matrix Instacure Anti-Breakage Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21068",
    bundle_name: "Matrix Instacure Conditioner 300ml Duo",
    component_sku: "11741",
    component_name: "Matrix Instacure Anti-Breakage Conditioner 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21069",
    bundle_name: "Matrix A Curl Can Dream Shampoo 300ml Duo",
    component_sku: "11992",
    component_name: "Matrix A Curl Can Dream Gentle Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21070",
    bundle_name: "Matrix Total Results Brass Off Shampoo 300ml Duo",
    component_sku: "8248",
    component_name: "Matrix Total Results Brass Off Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21071",
    bundle_name: "Matrix Total Results Brass Off Conditioner 300ml Duo",
    component_sku: "8249",
    component_name: "Matrix Total Results Brass Off Conditioner 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21073",
    bundle_name: "Matrix Keep Me Vivid Shampoo 300ml Duo",
    component_sku: "8250",
    component_name: "Matrix Total Results Keep Me Vivid Shampoo 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21074",
    bundle_name: "Matrix Keep Me Vivid Conditioner 300ml Duo",
    component_sku: "8251",
    component_name: "Matrix Total Results Keep Me Vivid Conditioner 300ml",
    qty: 2,
  },
  {
    bundle_sku: "21075",
    bundle_name:
      "Matrix Keep Me Vivid Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21075",
    bundle_name:
      "Matrix Keep Me Vivid Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8250",
    component_name: "Matrix Total Results Keep Me Vivid Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21075",
    bundle_name:
      "Matrix Keep Me Vivid Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8251",
    component_name: "Matrix Total Results Keep Me Vivid Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21081",
    bundle_name: "Milkshake Silver Shine Shampoo & Conditioner Duo",
    component_sku: "14568",
    component_name: "Milkshake Silver Shine Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21081",
    bundle_name: "Milkshake Silver Shine Shampoo & Conditioner Duo",
    component_sku: "14570",
    component_name: "Milkshake Silver Shine Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21082",
    bundle_name:
      "Milkshake Silver Shine Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14569",
    component_name: "Milkshake Silver Shine Light Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21082",
    bundle_name:
      "Milkshake Silver Shine Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14570",
    component_name: "Milkshake Silver Shine Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21082",
    bundle_name:
      "Milkshake Silver Shine Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21083",
    bundle_name:
      "Milkshake Silver Shine Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14565",
    component_name: "Milkshake Silver Shine Whipped Cream 200ml",
    qty: 1,
  },
  {
    bundle_sku: "21083",
    bundle_name:
      "Milkshake Silver Shine Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14569",
    component_name: "Milkshake Silver Shine Light Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21083",
    bundle_name:
      "Milkshake Silver Shine Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14570",
    component_name: "Milkshake Silver Shine Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21084",
    bundle_name: "Milkshake Colour Maintainer Shampoo & Conditioner Duo",
    component_sku: "14527",
    component_name: "Milkshake Colour Maintainer Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21084",
    bundle_name: "Milkshake Colour Maintainer Shampoo & Conditioner Duo",
    component_sku: "14528",
    component_name: "Milkshake Colour Maintainer Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21085",
    bundle_name:
      "Milkshake Colour Maintainer Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14527",
    component_name: "Milkshake Colour Maintainer Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21085",
    bundle_name:
      "Milkshake Colour Maintainer Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14528",
    component_name: "Milkshake Colour Maintainer Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21085",
    bundle_name:
      "Milkshake Colour Maintainer Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21086",
    bundle_name: "Milkshake Volume Solution Shampoo & Conditioner Duo",
    component_sku: "14555",
    component_name: "Milkshake Volume Solution Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21086",
    bundle_name: "Milkshake Volume Solution Shampoo & Conditioner Duo",
    component_sku: "14556",
    component_name: "Milkshake Volume Solution Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21087",
    bundle_name:
      "Milkshake Volume Solution Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14555",
    component_name: "Milkshake Volume Solution Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21087",
    bundle_name:
      "Milkshake Volume Solution Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14556",
    component_name: "Milkshake Volume Solution Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21087",
    bundle_name:
      "Milkshake Volume Solution Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21088",
    bundle_name: "Milkshake Integrity Shampoo & Conditioner Duo",
    component_sku: "14538",
    component_name: "Milkshake Integrity Nourishing Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21088",
    bundle_name: "Milkshake Integrity Shampoo & Conditioner Duo",
    component_sku: "14539",
    component_name: "Milkshake Integrity Nourishing Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21089",
    bundle_name:
      "Milkshake Integrity Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14538",
    component_name: "Milkshake Integrity Nourishing Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21089",
    bundle_name:
      "Milkshake Integrity Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14539",
    component_name: "Milkshake Integrity Nourishing Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21089",
    bundle_name:
      "Milkshake Integrity Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21090",
    bundle_name: "Milkshake Integrity Bundle - The Full Routine",
    component_sku: "14538",
    component_name: "Milkshake Integrity Nourishing Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21090",
    bundle_name: "Milkshake Integrity Bundle - The Full Routine",
    component_sku: "14539",
    component_name: "Milkshake Integrity Nourishing Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21090",
    bundle_name: "Milkshake Integrity Bundle - The Full Routine",
    component_sku: "14540",
    component_name: "Milkshake Integrity Intensive Treatment 200ml",
    qty: 1,
  },
  {
    bundle_sku: "21090",
    bundle_name: "Milkshake Integrity Bundle - The Full Routine",
    component_sku: "14541",
    component_name: "Milkshake Integrity Repairing Hair Lotion 8 x 12ml",
    qty: 1,
  },
  {
    bundle_sku: "21092",
    bundle_name:
      "Milkshake Moisture Plus Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14546",
    component_name: "Milkshake Moisture Plus Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21092",
    bundle_name:
      "Milkshake Moisture Plus Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14547",
    component_name: "Milkshake Moisture Plus Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21092",
    bundle_name:
      "Milkshake Moisture Plus Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21093",
    bundle_name:
      "Milkshake Moisture Plus Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14546",
    component_name: "Milkshake Moisture Plus Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21093",
    bundle_name:
      "Milkshake Moisture Plus Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14547",
    component_name: "Milkshake Moisture Plus Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21093",
    bundle_name:
      "Milkshake Moisture Plus Shampoo, Conditioner & Whipped Cream Trio",
    component_sku: "14548",
    component_name: "Milkshake Moisture Plus Whipped Cream 200ml",
    qty: 1,
  },
  {
    bundle_sku: "21094",
    bundle_name: "Milkshake Curl Passion Shampoo & Conditioner Duo",
    component_sku: "14551",
    component_name: "Milkshake Curl Passion Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21094",
    bundle_name: "Milkshake Curl Passion Shampoo & Conditioner Duo",
    component_sku: "14552",
    component_name: "Milkshake Curl Passion Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21095",
    bundle_name:
      "Milkshake Curl Passion Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14551",
    component_name: "Milkshake Curl Passion Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21095",
    bundle_name:
      "Milkshake Curl Passion Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14552",
    component_name: "Milkshake Curl Passion Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21095",
    bundle_name:
      "Milkshake Curl Passion Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21096",
    bundle_name: "Milkshake Curl Passion Bundle - The Full Routine",
    component_sku: "14551",
    component_name: "Milkshake Curl Passion Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21096",
    bundle_name: "Milkshake Curl Passion Bundle - The Full Routine",
    component_sku: "14552",
    component_name: "Milkshake Curl Passion Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21096",
    bundle_name: "Milkshake Curl Passion Bundle - The Full Routine",
    component_sku: "14553",
    component_name: "Milkshake Curl Passion Curl Perfectionist 200ml",
    qty: 1,
  },
  {
    bundle_sku: "21096",
    bundle_name: "Milkshake Curl Passion Bundle - The Full Routine",
    component_sku: "14554",
    component_name: "Milkshake Curl Passion Curl Shaper 200ml",
    qty: 1,
  },
  {
    bundle_sku: "21097",
    bundle_name: "Milkshake Energizing Shampoo & Conditioner Duo",
    component_sku: "14561",
    component_name: "Milkshake Energizing Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21097",
    bundle_name: "Milkshake Energizing Shampoo & Conditioner Duo",
    component_sku: "14562",
    component_name: "Milkshake Energizing Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21098",
    bundle_name:
      "Milkshake Energizing Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14561",
    component_name: "Milkshake Energizing Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21098",
    bundle_name:
      "Milkshake Energizing Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14562",
    component_name: "Milkshake Energizing Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21098",
    bundle_name:
      "Milkshake Energizing Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21099",
    bundle_name:
      "Milkshake Energizing Shampoo, Conditioner & Scalp Treatment Trio",
    component_sku: "14561",
    component_name: "Milkshake Energizing Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21099",
    bundle_name:
      "Milkshake Energizing Shampoo, Conditioner & Scalp Treatment Trio",
    component_sku: "14562",
    component_name: "Milkshake Energizing Conditioner 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21099",
    bundle_name:
      "Milkshake Energizing Shampoo, Conditioner & Scalp Treatment Trio",
    component_sku: "14563",
    component_name: "Milkshake Energizing Scalp Treatment 30ml",
    qty: 1,
  },
  {
    bundle_sku: "21100",
    bundle_name: "Milkshake Glistening Trio",
    component_sku: "14549",
    component_name: "Milkshake Glistening Serum 100ml",
    qty: 1,
  },
  {
    bundle_sku: "21100",
    bundle_name: "Milkshake Glistening Trio",
    component_sku: "14550",
    component_name: "Milkshake Glistening Spray 100ml",
    qty: 1,
  },
  {
    bundle_sku: "21100",
    bundle_name: "Milkshake Glistening Trio",
    component_sku: "14560",
    component_name: "Milkshake Glistening Argan Oil 50ml",
    qty: 1,
  },
  {
    bundle_sku: "21101",
    bundle_name: "Milkshake Cold Brunette Shampoo & Conditioner Duo",
    component_sku: "14571",
    component_name: "Milkshake Cold Brunette Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21101",
    bundle_name: "Milkshake Cold Brunette Shampoo & Conditioner Duo",
    component_sku: "14572",
    component_name: "Milkshake Cold Brunette Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21102",
    bundle_name:
      "Milkshake Cold Brunette Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14571",
    component_name: "Milkshake Cold Brunette Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21102",
    bundle_name:
      "Milkshake Cold Brunette Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14572",
    component_name: "Milkshake Cold Brunette Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21102",
    bundle_name:
      "Milkshake Cold Brunette Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21103",
    bundle_name: "Milkshake Icy Blond Shampoo & Conditioner Duo",
    component_sku: "14573",
    component_name: "Milkshake Icy Blond Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21103",
    bundle_name: "Milkshake Icy Blond Shampoo & Conditioner Duo",
    component_sku: "14574",
    component_name: "Milkshake Icy Blond Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21104",
    bundle_name:
      "Milkshake Icy Blond Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14573",
    component_name: "Milkshake Icy Blond Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21104",
    bundle_name:
      "Milkshake Icy Blond Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14574",
    component_name: "Milkshake Icy Blond Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21104",
    bundle_name:
      "Milkshake Icy Blond Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21105",
    bundle_name: "Milkshake Pink Lemonade Shampoo & Conditioner Duo",
    component_sku: "14566",
    component_name: "Milkshake Pink Lemonade Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21105",
    bundle_name: "Milkshake Pink Lemonade Shampoo & Conditioner Duo",
    component_sku: "14567",
    component_name: "Milkshake Pink Lemonade Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21106",
    bundle_name:
      "Milkshake Pink Lemonade Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14566",
    component_name: "Milkshake Pink Lemonade Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21106",
    bundle_name:
      "Milkshake Pink Lemonade Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "14567",
    component_name: "Milkshake Pink Lemonade Conditioner 250ml",
    qty: 1,
  },
  {
    bundle_sku: "21106",
    bundle_name:
      "Milkshake Pink Lemonade Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21107",
    bundle_name: "R+Co On A Cloud Shampoo & Mask Duo",
    component_sku: "13955",
    component_name: "R+Co On A Cloud Baobab Oil Repair Masque 147ml",
    qty: 1,
  },
  {
    bundle_sku: "21107",
    bundle_name: "R+Co On A Cloud Shampoo & Mask Duo",
    component_sku: "13956",
    component_name: "R+Co On A Cloud  Baobab Repair Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21108",
    bundle_name:
      "R+Co On A Cloud Shampoo & Mask Duo FREE Microfibre Hair Towel",
    component_sku: "13955",
    component_name: "R+Co On A Cloud Baobab Oil Repair Masque 147ml",
    qty: 1,
  },
  {
    bundle_sku: "21108",
    bundle_name:
      "R+Co On A Cloud Shampoo & Mask Duo FREE Microfibre Hair Towel",
    component_sku: "13956",
    component_name: "R+Co On A Cloud  Baobab Repair Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21108",
    bundle_name:
      "R+Co On A Cloud Shampoo & Mask Duo FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "21109",
    bundle_name: "R+Co On A Cloud Shampoo, Mask & Styler Trio",
    component_sku: "13946",
    component_name: "R+Co On A Cloud Baobab Repair Splash On Styler 124ml",
    qty: 1,
  },
  {
    bundle_sku: "21109",
    bundle_name: "R+Co On A Cloud Shampoo, Mask & Styler Trio",
    component_sku: "13955",
    component_name: "R+Co On A Cloud Baobab Oil Repair Masque 147ml",
    qty: 1,
  },
  {
    bundle_sku: "21109",
    bundle_name: "R+Co On A Cloud Shampoo, Mask & Styler Trio",
    component_sku: "13956",
    component_name: "R+Co On A Cloud  Baobab Repair Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21110",
    bundle_name: "R+Co Television Shampoo & Conditioner Duo",
    component_sku: "8729",
    component_name: "R+Co Television Perfect Hair Shampoo 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21110",
    bundle_name: "R+Co Television Shampoo & Conditioner Duo",
    component_sku: "8730",
    component_name: "R+Co Television Perfect Hair Conditioner 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21111",
    bundle_name:
      "R+Co Television Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21111",
    bundle_name:
      "R+Co Television Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8729",
    component_name: "R+Co Television Perfect Hair Shampoo 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21111",
    bundle_name:
      "R+Co Television Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8730",
    component_name: "R+Co Television Perfect Hair Conditioner 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21112",
    bundle_name: "R+Co Dallas Biotin Shampoo & Conditioner Duo",
    component_sku: "8727",
    component_name: "R+Co Dallas Biotin Thickening Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21112",
    bundle_name: "R+Co Dallas Biotin Shampoo & Conditioner Duo",
    component_sku: "8728",
    component_name: "R+Co Dallas Biotin Thickening Conditioner 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21113",
    bundle_name:
      "R+Co Dallas Biotin Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21113",
    bundle_name:
      "R+Co Dallas Biotin Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8727",
    component_name: "R+Co Dallas Biotin Thickening Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21113",
    bundle_name:
      "R+Co Dallas Biotin Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8728",
    component_name: "R+Co Dallas Biotin Thickening Conditioner 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21114",
    bundle_name: "R+Co Bel Air Shampoo & Conditioner Duo",
    component_sku: "8725",
    component_name:
      "R+Co Bel Air Smoothing Shampoo + Anti Oxidant Complex 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21114",
    bundle_name: "R+Co Bel Air Shampoo & Conditioner Duo",
    component_sku: "8726",
    component_name:
      "R+Co Bel Air Smoothing Conditioner + Anti Oxidant Complex 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21115",
    bundle_name:
      "R+Co Bel Air Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21115",
    bundle_name:
      "R+Co Bel Air Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8725",
    component_name:
      "R+Co Bel Air Smoothing Shampoo + Anti Oxidant Complex 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21115",
    bundle_name:
      "R+Co Bel Air Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8726",
    component_name:
      "R+Co Bel Air Smoothing Conditioner + Anti Oxidant Complex 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21116",
    bundle_name: "R+Co Gemstone Shampoo & Conditioner Duo",
    component_sku: "11258",
    component_name: "R+Co GEMSTONE Color Conditioner 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21116",
    bundle_name: "R+Co Gemstone Shampoo & Conditioner Duo",
    component_sku: "8731",
    component_name: "R+Co Gemstone Color Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21117",
    bundle_name:
      "R+Co Gemstone Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "11258",
    component_name: "R+Co GEMSTONE Color Conditioner 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21117",
    bundle_name:
      "R+Co Gemstone Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21117",
    bundle_name:
      "R+Co Gemstone Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8731",
    component_name: "R+Co Gemstone Color Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21118",
    bundle_name: "R+Co Gemstone Bundle - The Full Routine",
    component_sku: "11230",
    component_name: "R+Co Gemstone Pre-Shampoo Colour Protect Masque 172ml",
    qty: 1,
  },
  {
    bundle_sku: "21118",
    bundle_name: "R+Co Gemstone Bundle - The Full Routine",
    component_sku: "11231",
    component_name: "R+Co Gemstone Ultra Shine Glossing Treatment 147ml",
    qty: 1,
  },
  {
    bundle_sku: "21118",
    bundle_name: "R+Co Gemstone Bundle - The Full Routine",
    component_sku: "11258",
    component_name: "R+Co GEMSTONE Color Conditioner 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21118",
    bundle_name: "R+Co Gemstone Bundle - The Full Routine",
    component_sku: "8731",
    component_name: "R+Co Gemstone Color Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21120",
    bundle_name:
      "R+Co Atlantis Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21120",
    bundle_name:
      "R+Co Atlantis Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8723",
    component_name: "R+Co Atlantis Moisturizing B5 Shampoo 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21120",
    bundle_name:
      "R+Co Atlantis Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "8724",
    component_name: "R+Co Atlantis Moisturizing B5 Conditioner 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21121",
    bundle_name: "R+Co Bleu Ingenious Shampoo & Conditioner Duo",
    component_sku: "20239",
    component_name: "R+Co Bleu Ingenious Thickening Conditioner 201ml",
    qty: 1,
  },
  {
    bundle_sku: "21121",
    bundle_name: "R+Co Bleu Ingenious Shampoo & Conditioner Duo",
    component_sku: "20240",
    component_name: "R+Co Bleu Ingenious Thickening Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21122",
    bundle_name:
      "R+Co Ingenious Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20239",
    component_name: "R+Co Bleu Ingenious Thickening Conditioner 201ml",
    qty: 1,
  },
  {
    bundle_sku: "21122",
    bundle_name:
      "R+Co Ingenious Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20240",
    component_name: "R+Co Bleu Ingenious Thickening Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21122",
    bundle_name:
      "R+Co Ingenious Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21123",
    bundle_name: "R+Co Bleu Ingenious Shampoo & Mask Duo",
    component_sku: "20240",
    component_name: "R+Co Bleu Ingenious Thickening Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21123",
    bundle_name: "R+Co Bleu Ingenious Shampoo & Mask Duo",
    component_sku: "20249",
    component_name: "R+Co Bleu Ingenious Mask 148ml",
    qty: 1,
  },
  {
    bundle_sku: "21124",
    bundle_name:
      "R+Co Bleu Ingenious Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20240",
    component_name: "R+Co Bleu Ingenious Thickening Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21124",
    bundle_name:
      "R+Co Bleu Ingenious Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20249",
    component_name: "R+Co Bleu Ingenious Mask 148ml",
    qty: 1,
  },
  {
    bundle_sku: "21124",
    bundle_name:
      "R+Co Bleu Ingenious Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21125",
    bundle_name: "R+Co Bleu Ingenious Shampoo, Conditioner & Mask Trio",
    component_sku: "20239",
    component_name: "R+Co Bleu Ingenious Thickening Conditioner 201ml",
    qty: 1,
  },
  {
    bundle_sku: "21125",
    bundle_name: "R+Co Bleu Ingenious Shampoo, Conditioner & Mask Trio",
    component_sku: "20240",
    component_name: "R+Co Bleu Ingenious Thickening Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21125",
    bundle_name: "R+Co Bleu Ingenious Shampoo, Conditioner & Mask Trio",
    component_sku: "20249",
    component_name: "R+Co Bleu Ingenious Mask 148ml",
    qty: 1,
  },
  {
    bundle_sku: "21126",
    bundle_name: "R+Co Bleu Primary Color Shampoo & Conditioner Duo",
    component_sku: "20244",
    component_name: "R+Co Bleu Primary Color Conditioner 201ml",
    qty: 1,
  },
  {
    bundle_sku: "21126",
    bundle_name: "R+Co Bleu Primary Color Shampoo & Conditioner Duo",
    component_sku: "20245",
    component_name: "R+Co Bleu Primary Color Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21127",
    bundle_name:
      "R+Co Primary Color Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20244",
    component_name: "R+Co Bleu Primary Color Conditioner 201ml",
    qty: 1,
  },
  {
    bundle_sku: "21127",
    bundle_name:
      "R+Co Primary Color Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20245",
    component_name: "R+Co Bleu Primary Color Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21127",
    bundle_name:
      "R+Co Primary Color Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21129",
    bundle_name:
      "R+Co Bleu Primary Color Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20238",
    component_name: "R+Co Bleu Primary Color Masque 148ml",
    qty: 1,
  },
  {
    bundle_sku: "21129",
    bundle_name:
      "R+Co Bleu Primary Color Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20245",
    component_name: "R+Co Bleu Primary Color Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21129",
    bundle_name:
      "R+Co Bleu Primary Color Shampoo & Mask Duo With FREE Microfibre Hair Towel",
    component_sku: "20519",
    component_name: "BeautyFeatures Microfibre Hair Towel",
    qty: 1,
  },
  {
    bundle_sku: "21130",
    bundle_name: "R+Co Bleu Primary Color Shampoo, Conditioner & Mask Trio",
    component_sku: "20238",
    component_name: "R+Co Bleu Primary Color Masque 148ml",
    qty: 1,
  },
  {
    bundle_sku: "21130",
    bundle_name: "R+Co Bleu Primary Color Shampoo, Conditioner & Mask Trio",
    component_sku: "20244",
    component_name: "R+Co Bleu Primary Color Conditioner 201ml",
    qty: 1,
  },
  {
    bundle_sku: "21130",
    bundle_name: "R+Co Bleu Primary Color Shampoo, Conditioner & Mask Trio",
    component_sku: "20245",
    component_name: "R+Co Bleu Primary Color Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21131",
    bundle_name: "R+Co Hydration & Moisture Bundle For Dry & Dehydrated Hair",
    component_sku: "13961",
    component_name: "R+Co Sun Catcher Vitamin C Leave In Conditioner 124ml",
    qty: 1,
  },
  {
    bundle_sku: "21131",
    bundle_name: "R+Co Hydration & Moisture Bundle For Dry & Dehydrated Hair",
    component_sku: "8723",
    component_name: "R+Co Atlantis Moisturizing B5 Shampoo 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21131",
    bundle_name: "R+Co Hydration & Moisture Bundle For Dry & Dehydrated Hair",
    component_sku: "8724",
    component_name: "R+Co Atlantis Moisturizing B5 Conditioner 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21131",
    bundle_name: "R+Co Hydration & Moisture Bundle For Dry & Dehydrated Hair",
    component_sku: "8732",
    component_name: "R+Co High Dive Moisture + Shine Crème 147ml",
    qty: 1,
  },
  {
    bundle_sku: "21132",
    bundle_name: "R+Co Volume & Thickness Boost Bundle For Fine & Limp Hair",
    component_sku: "13945",
    component_name: "R+Co Dallas Thicken Treat 89ml",
    qty: 1,
  },
  {
    bundle_sku: "21132",
    bundle_name: "R+Co Volume & Thickness Boost Bundle For Fine & Limp Hair",
    component_sku: "8727",
    component_name: "R+Co Dallas Biotin Thickening Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21132",
    bundle_name: "R+Co Volume & Thickness Boost Bundle For Fine & Limp Hair",
    component_sku: "8728",
    component_name: "R+Co Dallas Biotin Thickening Conditioner 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21132",
    bundle_name: "R+Co Volume & Thickness Boost Bundle For Fine & Limp Hair",
    component_sku: "8735",
    component_name: "R+Co Rodeo Star Thickening Style Foam 150ml",
    qty: 1,
  },
  {
    bundle_sku: "21133",
    bundle_name: "R+Co Ultimate Curl Definition Bundle For Curly & Wavy Hair",
    component_sku: "13944",
    component_name: "R+Co Ringtone Curl Cream 177ml",
    qty: 1,
  },
  {
    bundle_sku: "21133",
    bundle_name: "R+Co Ultimate Curl Definition Bundle For Curly & Wavy Hair",
    component_sku: "20265",
    component_name: "R+Co Bleu Curl Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21133",
    bundle_name: "R+Co Ultimate Curl Definition Bundle For Curly & Wavy Hair",
    component_sku: "20266",
    component_name: "R+Co Bleu Curl Conditioner 201ml",
    qty: 1,
  },
  {
    bundle_sku: "21133",
    bundle_name: "R+Co Ultimate Curl Definition Bundle For Curly & Wavy Hair",
    component_sku: "8740",
    component_name: "R+Co Turntable Curl Defining Crème 147ml",
    qty: 1,
  },
  {
    bundle_sku: "21134",
    bundle_name: "R+Co Bleu Curl Shampoo & Conditioner Duo",
    component_sku: "20265",
    component_name: "R+Co Bleu Curl Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21134",
    bundle_name: "R+Co Bleu Curl Shampoo & Conditioner Duo",
    component_sku: "20266",
    component_name: "R+Co Bleu Curl Conditioner 201ml",
    qty: 1,
  },
  {
    bundle_sku: "21135",
    bundle_name:
      "R+Co Bleu Curl Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20265",
    component_name: "R+Co Bleu Curl Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21135",
    bundle_name:
      "R+Co Bleu Curl Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20266",
    component_name: "R+Co Bleu Curl Conditioner 201ml",
    qty: 1,
  },
  {
    bundle_sku: "21135",
    bundle_name:
      "R+Co Bleu Curl Shampoo & Conditioner Duo With FREE Detangling Hairbrush",
    component_sku: "20520",
    component_name: "BeautyFeatures Detangling Hairbrush",
    qty: 1,
  },
  {
    bundle_sku: "21136",
    bundle_name: "R+ Co Smooth & Frizz-Free Bundle For Frizz-Prone Hair",
    component_sku: "13936",
    component_name: "R+Co Two Way Mirror Smoothing Oil 60ml",
    qty: 1,
  },
  {
    bundle_sku: "21136",
    bundle_name: "R+ Co Smooth & Frizz-Free Bundle For Frizz-Prone Hair",
    component_sku: "8725",
    component_name:
      "R+Co Bel Air Smoothing Shampoo + Anti Oxidant Complex 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21136",
    bundle_name: "R+ Co Smooth & Frizz-Free Bundle For Frizz-Prone Hair",
    component_sku: "8726",
    component_name:
      "R+Co Bel Air Smoothing Conditioner + Anti Oxidant Complex 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21136",
    bundle_name: "R+ Co Smooth & Frizz-Free Bundle For Frizz-Prone Hair",
    component_sku: "8741",
    component_name: "R+Co Moon Landing Anti-Humidity Spray 180m",
    qty: 1,
  },
  {
    bundle_sku: "21137",
    bundle_name: "R+Co Texture & Beachy Waves Bundle",
    component_sku: "13951",
    component_name: "R+Co Sail Soft Wave Spray 147ml",
    qty: 1,
  },
  {
    bundle_sku: "21137",
    bundle_name: "R+Co Texture & Beachy Waves Bundle",
    component_sku: "20264",
    component_name: "R+Co Bleu Rose Water Wave Spray 201ml",
    qty: 1,
  },
  {
    bundle_sku: "21137",
    bundle_name: "R+Co Texture & Beachy Waves Bundle",
    component_sku: "8736",
    component_name: "R+Co Sand Castle Dry Texture Crème 62g",
    qty: 1,
  },
  {
    bundle_sku: "21137",
    bundle_name: "R+Co Texture & Beachy Waves Bundle",
    component_sku: "8742",
    component_name: "R+Co Balloon Dry Volume Spray 173ml",
    qty: 1,
  },
  {
    bundle_sku: "21138",
    bundle_name: "R+ Co Ultimate Shine & Gloss Bundle",
    component_sku: "13936",
    component_name: "R+Co Two Way Mirror Smoothing Oil 60ml",
    qty: 1,
  },
  {
    bundle_sku: "21138",
    bundle_name: "R+ Co Ultimate Shine & Gloss Bundle",
    component_sku: "20258",
    component_name: "R+Co Bleu Reflect Shine Spray 104ml",
    qty: 1,
  },
  {
    bundle_sku: "21138",
    bundle_name: "R+ Co Ultimate Shine & Gloss Bundle",
    component_sku: "8733",
    component_name: "R+Co Waterfall Moisture + Shine Lotion 147ml",
    qty: 1,
  },
  {
    bundle_sku: "21138",
    bundle_name: "R+ Co Ultimate Shine & Gloss Bundle",
    component_sku: "8739",
    component_name: "R+Co Trophy Shine + Texture Spray 198ml",
    qty: 1,
  },
  {
    bundle_sku: "21139",
    bundle_name: "R+Co Dry Shampoo & Refresh Bundle",
    component_sku: "13939",
    component_name: "R+Co Badlands Dry Shampoo Paste 62g",
    qty: 1,
  },
  {
    bundle_sku: "21139",
    bundle_name: "R+Co Dry Shampoo & Refresh Bundle",
    component_sku: "13943",
    component_name: "R+Co Skyline Volume Powder 28 g",
    qty: 1,
  },
  {
    bundle_sku: "21139",
    bundle_name: "R+Co Dry Shampoo & Refresh Bundle",
    component_sku: "20246",
    component_name: "R+Co Bleu Retroactive Dry Shampoo 192ml",
    qty: 1,
  },
  {
    bundle_sku: "21139",
    bundle_name: "R+Co Dry Shampoo & Refresh Bundle",
    component_sku: "8737",
    component_name: "R+Co Death Valley Dry Shampoo 300ml",
    qty: 1,
  },
  {
    bundle_sku: "21140",
    bundle_name: "R+Co Essential Everyday Haircare Bundle",
    component_sku: "13942",
    component_name: "R+Co Zipper Multitasking Styling Lotion177ml",
    qty: 1,
  },
  {
    bundle_sku: "21140",
    bundle_name: "R+Co Essential Everyday Haircare Bundle",
    component_sku: "20251",
    component_name: "R+Co Bleu Super Style Creme 148ml",
    qty: 1,
  },
  {
    bundle_sku: "21140",
    bundle_name: "R+Co Essential Everyday Haircare Bundle",
    component_sku: "8729",
    component_name: "R+Co Television Perfect Hair Shampoo 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21140",
    bundle_name: "R+Co Essential Everyday Haircare Bundle",
    component_sku: "8730",
    component_name: "R+Co Television Perfect Hair Conditioner 241ml",
    qty: 1,
  },
  {
    bundle_sku: "21141",
    bundle_name: "R+Co Dallas Thickening Bundle - The Full Routine",
    component_sku: "13945",
    component_name: "R+Co Dallas Thicken Treat 89ml",
    qty: 1,
  },
  {
    bundle_sku: "21141",
    bundle_name: "R+Co Dallas Thickening Bundle - The Full Routine",
    component_sku: "8727",
    component_name: "R+Co Dallas Biotin Thickening Shampoo 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21141",
    bundle_name: "R+Co Dallas Thickening Bundle - The Full Routine",
    component_sku: "8728",
    component_name: "R+Co Dallas Biotin Thickening Conditioner 251ml",
    qty: 1,
  },
  {
    bundle_sku: "21141",
    bundle_name: "R+Co Dallas Thickening Bundle - The Full Routine",
    component_sku: "8738",
    component_name: "R+Co Dallas Thickening Spray 251ml",
    qty: 1,
  },
];

bundleData = bundleData.filter((bd) => !["20510", "20511"].includes(bd.component_sku));

const skusToFix = [{"sku":"20988",},
 ]

 async function generateContent(context: string): Promise<string> {
  try {
    let response = await new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    }).chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `You are a content writer for the beautyfeatures hair and beauty store writing descriptions for some of our bundles. Use the content from the component products: "${context}" so that it conforms to the following structure. 
    Use the following headings:
    <strong>Who's it For?</strong><br/>
    (The type of hair / skin this product is suitable for)

    <strong>Introduction</strong><br/>
    Start by giving a summary of the product in a light, and friendly tone. 3-4 sentences should suffice.

    <strong>Bundle Contains:</strong><br/>
    (for each of the component products please provide the name and an unordered list of key features/benefits/advantages)
    
    <strong>Beautyfeatures Style Guide</strong><br/>
    (Recomment that the reader check out some of the component products and hyperlink using the url provided)
    '. Unordered list-items only. Output in MARKDOWN format only and do not wrap your response in triple backticks`,
        },
      ],
    });

    console.log(response.choices[0].message.content)
    console.log("###############################")

    return marked(response.choices[0].message.content || "");
  } catch (err: any) {
    throw err;
  }
}

async function main() {
  require("./config/config").config("bf");
  try {
    for (let i = 0; i < skusToFix.length; i++) {
        console.log(i,skusToFix.length)
      const sku = skusToFix[i].sku;
      const bundle = await getProductBySku(sku)
      if(!bundle) {
        throw `no bundle exists with sku ${sku}`
      }
      
      const components = bundleData.filter((bd) => bd.bundle_sku == sku);
      const componentContextArr: {
        name: string;
        description: string;
        url: string;
      }[] = [];
      for (const component of components) {
        const product = await getProductBySku(component.component_sku);
        if (!product) {
          throw `no product fround for sku ${component.component_sku}`;
        }
        componentContextArr.push({
          name: product.name,
          description: htmlToText(product.description),
          url: "https://beautyfeatures.ie" + product.custom_url.url,
        });
      }
      const generatedContent = await generateContent(
        JSON.stringify(componentContextArr)
      );

      await updateProduct(bundle.id,{description: generatedContent})

      console.log(generatedContent)
      console.log(`updated product ${bundle.id}: ${bundle.name}`)
      console.log(`https://beautyfeatures.ie`+bundle.custom_url.url+`?showHidden=true`)
    }
  } catch (err) {
    console.log(err);
  }
}
main();
