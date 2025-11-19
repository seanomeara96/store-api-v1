import { applyCustomField } from "../../functions/custom-fields/applyCustomField";
import { getProductBySku } from "../../functions/products/getProductBySKU";

require("../../config/config").config("bf");

async function applyCustomFieldBySKU() {
  try {
    const data = [
      {
        sku: "20649",
        name: "*LIMITED STOCK* Alfaparf Semi Di Lino Reconstruction Exclusive Gift Set *UNDER 500 LEFT*",
      },
      {
        sku: "20788",
        name: "Sabrina Carpenter Sweet Tooth Eau De Parfum 30ml",
      },
      { sku: "20650", name: "Alfaparf Moisture Shampoo & Conditioner Bundle" },
      { sku: "20520", name: "BeautyFeatures Detangling Hairbrush" },
      { sku: "20789", name: "Sabrina Carpenter Sweet Tooth Body Mist 236ml" },
      {
        sku: "22428",
        name: "Sabrina Carpenter Sweet Tooth Eau De Parfum & Body Mist Duo",
      },
      {
        sku: "20792",
        name: "Sabrina Carpenter Caramel Dreams Body Mist 236ml",
      },
      {
        sku: "22426",
        name: "Sabrina Carpenter Caramel Dreams Eau De Parfum & Body Mist Duo",
      },
      {
        sku: "20616",
        name: "Isoclean Professional Brush Cleaner Gift Set 525ml",
      },
      {
        sku: "21944",
        name: "TIKTOK EXCLUSIVE - Redken Acidic Bonding Concentrate Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
      },
      {
        sku: "20713",
        name: "BeautyFeatures Colour Treated Hair Discovery Beauty Box",
      },
      {
        sku: "11553B",
        name: "BeautiEdit - Decadence by Lorraine Keane **Limited Edition**",
      },
      {
        sku: "14136",
        name: "Alfaparf Semi Di Lino Density Thickening Shampoo & Conditioner Bundle",
      },
      { sku: "21681", name: "LANEIGE Lip Sleeping Mask - Berry 20g" },
      { sku: "111006", name: "Dermalogica Dynamic Skin Recovery SPF50 50ml" },
      {
        sku: "mor_mo0041",
        name: "Moroccanoil Treatment Oil 125ml for the price of 100ml",
      },
      { sku: "110631", name: "Dermalogica Skin Smoothing Cream 100ml" },
      {
        sku: "21652",
        name: "Beauty of Joseon Relief Sun Rice + Probiotics SP50+ PA ++++ 50ml",
      },
      {
        sku: "13140",
        name: "Color WOW Extra Strength Dream Coat Ultra Moisturising Anti Frizz Treatment 200ml",
      },
      { sku: "21670", name: "Medicube Collagen Night Wrapping Mask 75ml" },
      { sku: "5023", name: "Moroccanoil - Dry Shampoo Light Tones 217ml" },
      { sku: "9631", name: "L'Oreal Steampod V3 White" },
      {
        sku: "12704",
        name: "Revlon Professional Equave™ Instant Leave-In Detangling Conditioner for Normal/Dry Hair 200ml",
      },
      {
        sku: "12675",
        name: "Revlon Professional UniqOne™ All in One Treatment Original 150ml",
      },
      { sku: "20725", name: "L'Oréal Professionnel Steampod 3.0 MEGA Bundle" },
      {
        sku: "21481",
        name: "Redken Extreme Shampoo & Conditioner Duo with FREE Vent Hairbrush",
      },
      {
        sku: "7810",
        name: "Nioxin Scalp Recovery: Anti-Dandruff 3-Step System Kit",
      },
      {
        sku: "12739",
        name: "Dermalogica Supersized Intensive Moisture Balance 150ml",
      },
      { sku: "110625", name: "Dermalogica Intensive Moisture Balance 100ml" },
      {
        sku: "22451",
        name: "Alfaparf Semi Di Lino Blonde Christmas Gift Set 2025",
      },
      { sku: "13420", name: "Elemis Pro-Collagen Marine Cream SPF 30 50ml" },
      {
        sku: "10257A",
        name: "Pureology Hydrate Sheer Shampoo / Conditioner 266ml",
      },
      { sku: "21801", name: "The Autumn Glow Beauty Box" },
      {
        sku: "20293",
        name: "RevitaLash Advanced Eyelash Conditioner Serum 3.5ml (6 Month Supply)",
      },
      { sku: "8874", name: "Olaplex Shampoo & Conditioner Bundle" },
      { sku: "22415", name: "Lattafa Yara Eau De Parfum 100ml" },
      { sku: "5183", name: "OLAPLEX No. 3 Hair Perfector 100ml" },
      { sku: "7655", name: "Color Wow Raise the Roots 150ml" },
      { sku: "21669", name: "Medicube Zero Pore Pad 2.0 155g - 70 Pack" },
      { sku: "6283", name: "Actyva P Factor Hair Loss Shampoo 250ml" },
      { sku: "20124", name: "ISOCLEAN Microfibre Makeup Towel -White" },
      {
        sku: "21675",
        name: "Skin1004 Madagascar Centella Ampoule Serum 100ml",
      },
      { sku: "14403", name: "COSRX Advanced Snail 96 Mucin Power Essence" },
      { sku: "13653", name: "e.l.f. Power Grip Primer" },
      {
        sku: "11499",
        name: "Color Wow Shampoo, Conditioner & Money Masque Bundle",
      },
      { sku: "8048", name: "Advanced Nutrition Programme Skin Accumax" },
      { sku: "12737", name: "Dermalogica Supersized PreCleanse 295ml" },
      { sku: "22298", name: "Redken Acidic Bonding Concentrate Gift Set 2025" },
      { sku: "22403", name: "Joico Defy Damage Christmas Gift Set 2025" },
      { sku: "20843", name: "K18 Airwash Dry Shampoo" },
      {
        sku: "22405",
        name: "Joico Blonde Life Violet Christmas Gift Set 2025",
      },
      { sku: "13413", name: "Elemis Pro-Collagen Naked Cleansing Balm 100g" },
      {
        sku: "21943",
        name: "TIKTOK EXCLUSIVE - Redken All Soft Shampoo & Conditioner Duo Plus FREE Mini Shampoo & Conditioner",
      },
      {
        sku: "21569",
        name: "Kerastase Nutritive Bain Satin Riche Shampoo 250ml + FREE 80ml Mini Shampoo",
      },
      { sku: "14464", name: "ghd Platinum+ Styler - Black" },
      { sku: "21845", name: "K Beauty Favourites Bundle" },
      {
        sku: "11245",
        name: "Shiseido White Lucent Brightening Gel Cream 50ml",
      },
      { sku: "21937", name: "Kevin Murphy Illuminate Hydrate Gift Set" },
      { sku: "21114", name: "R+Co Bel Air Shampoo & Conditioner Duo" },
    ];

    for(let i = 0 ; i < data.length; i++){
        console.log(i, data.length);
        const row =  data[i];
        const product = await getProductBySku(row.sku)
        if(!product) {
            console.log(`no product found for ${row.sku} expected ${row.name}`)
            continue
        }
        await applyCustomField(product.id, "tag", "Selling Fast")
    }

  } catch (err) {
    console.log(err);
  }
}
applyCustomFieldBySKU()