import { updateBrand } from "./functions/brands/updateBrand";
import { updateCategory } from "./functions/categories/updateCategory";

const data = [
  {
    id: 379,
    store: "bf",
    type: "brand",
    page_title: "Eylure: Premium False Eyelashes",
    meta_desription:
      "Discover Eyelure's premium false eyelashes & accessories, designed for a dramatic, flawless look. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 380,
    store: "bf",
    type: "brand",
    page_title: "Oh K! Skincare:  The Fun Korean Skincare!",
    meta_desription:
      "Discover the best Korean skincare essentials for glowing, youthful skin with Oh K! Skincare. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 383,
    store: "bf",
    type: "brand",
    page_title: "BrowAid: Achive Perfectly Shaped Brows",
    meta_desription:
      "Achieve sculpted brows with BrowAid’s precision tools for flawless results and natural brow shapes. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 384,
    store: "bf",
    type: "brand",
    page_title: "COSRX: Korean Skincare for Clear Skin",
    meta_desription:
      "Explore COSRX’s skincare, featuring proven Korean ingredients for healthy, clear, glowing skin. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 391,
    store: "bf",
    type: "brand",
    page_title: "Real Techniques: Makeup Brushes & Blending Tools",
    meta_desription:
      "Create flawless makeup with Real Techniques' professional brushes & blending tools for high quality results. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 396,
    store: "bf",
    type: "brand",
    page_title: "Nappi Nippas: Nappy Fasteners for Babies",
    meta_desription:
      "Keep your baby secure with Nappi Nippas’ easy-to-use nappy fasteners for stress-free diaper changes. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 398,
    store: "bf",
    type: "brand",
    page_title: "L'Oréal Steampod: Sleek, Smooth Hair with Steam Power",
    meta_desription:
      "Achieve sleek, smooth hair with L'Oréal Steampod's steam-powered technology for frizz-free, shiny hair. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 400,
    store: "bf",
    type: "brand",
    page_title: "Dead Sea: Mineral-Rich Skincare",
    meta_desription:
      "Unlock Dead Sea minerals with skincare products that nourish & rejuvenate skin for a healthy complexion. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 401,
    store: "bf",
    type: "brand",
    page_title: "NHP: Natural Haircare Products for Healthy, Strong Hair",
    meta_desription:
      "Treat hair with NHP’s natural products, promoting healthier, shinier hair with nourishing ingredients. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 402,
    store: "bf",
    type: "brand",
    page_title: "FairyDrops: Volumizing Mascara for Long, Defined Lashes",
    meta_desription:
      "Get voluminous lashes with FairyDrops mascara for ultimate definition & lift with every swipe. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 403,
    store: "bf",
    type: "brand",
    page_title: "Bloom & Blossom: Skincare & Wellness",
    meta_desription:
      "Enhance wellness with Bloom & Blossom’s nourishing skincare for a radiant glow and hydration. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 404,
    store: "bf",
    type: "brand",
    page_title: "Egyptian Magic: Multi-Purpose Balm for Skin & Hair",
    meta_desription:
      "Discover Egyptian Magic, the all-in-one balm that hydrates, heals, and protects your skin and hair. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 405,
    store: "bf",
    type: "brand",
    page_title: "Sabrina Carpenter: The Celebrity Fragrance Collection",
    meta_desription:
      "Experience Sabrina Carpenter’s celebrity fragrance collection, offering captivating scents for a statement. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 590,
    store: "bf",
    type: "category",
    page_title: "Elemis: Luxurious Skincare for Radiant, Youthful Skin",
    meta_desription:
      "Revitalise skin with Elemis' luxurious skincare for a radiant, youthful glow. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 904,
    store: "bf",
    type: "category",
    page_title: "Google Reviews: See What Customers Are Saying",
    meta_desription:
      "Read authentic customer reviews to discover the best beauty & skincare products for your routine. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 933,
    store: "bf",
    type: "category",
    page_title: "Dermalogica Speed Mapping",
    meta_desription:
      "Find the perfect skincare routine with Dermalogica Speed Mapping for personalized skincare advice. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 987,
    store: "bf",
    type: "category",
    page_title: "Shop By Offer: Discover the Best Deals & Discounts",
    meta_desription:
      "Explore amazing deals & discounts on top beauty & skincare products, handpicked just for you. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 988,
    store: "bf",
    type: "category",
    page_title: "Gift Sets: Perfect Beauty & Skincare Gifts",
    meta_desription:
      "Find the perfect beauty & skincare gift set for every occasion. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1021,
    store: "bf",
    type: "category",
    page_title: "Olos: Professional Skincare with Natural Ingredients",
    meta_desription:
      "Treat skin to Olos’ professional skincare, crafted with natural ingredients/ Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1022,
    store: "bf",
    type: "category",
    page_title: "Olos Acid: Targeted Skincare Solutions for Radiant Skin",
    meta_desription:
      "Achieve radiant skin with Olos Acid's targeted skincare, formulated to combat dark spots and acne. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1023,
    store: "bf",
    type: "category",
    page_title: "Olos Calming: Soothing Skincare for Sensitive Skin",
    meta_desription:
      "Calm and soothe sensitive skin with Olos Calming skincare, restoring comfort, balance, and hydration. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1024,
    store: "bf",
    type: "category",
    page_title: "Olos Moisture: Hydrating Products for Soft, Supple Skin",
    meta_desription:
      "Keep skin soft with Olos Moisture skincare, providing deep moisture and a refreshed feeling. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1025,
    store: "bf",
    type: "category",
    page_title: "Olos Nourishing: Rich Skincare Formulas for Deep Care",
    meta_desription:
      "Nourish skin deeply with Olos' rich skincare formulas for soft, pampered skin with ultimate hydration. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1026,
    store: "bf",
    type: "category",
    page_title: "Olos Purifying: Clarifying Skincare for Clearer Complexion",
    meta_desription:
      "Purify skin with Olos’ clarifying products, designed to clear blemishes and promote a brighter complexion. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1027,
    store: "bf",
    type: "category",
    page_title: "Olos Youth Enhancing: Anti-Aging Skincare",
    meta_desription:
      "Defy aging with Olos Youth Enhancing skincare, packed with powerful ingredients. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1031,
    store: "bf",
    type: "category",
    page_title: "Discover: Explore New & Trending Beauty Must-Haves",
    meta_desription:
      "Stay ahead of trends with must-have beauty products, perfect for refreshing your beauty routine. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1032,
    store: "bf",
    type: "category",
    page_title: "Skin Health: Expert Skincare for All Skin Types",
    meta_desription:
      "Find expert skincare solutions for every skin type, leaving your complexion glowing and healthy. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1033,
    store: "bf",
    type: "category",
    page_title: "Top Brands: Shop the Best Beauty & Skincare Brands",
    meta_desription:
      "Shop top beauty & skincare brands for high-quality products that deliver results. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1038,
    store: "bf",
    type: "category",
    page_title: "The Inkey List: Affordable Skincare Backed by Science",
    meta_desription:
      "Achieve clear, healthy skin with The Inkey List's affordable, science-backed skincare for every skin concern. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1040,
    store: "bf",
    type: "category",
    page_title: "Eleven I Want Body: Lightweight Volume for Fine Hair",
    meta_desription:
      "Add volume & body to fine hair with Eleven I Want Body, giving fuller-looking hair while keeping it bouncy. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1041,
    store: "bf",
    type: "category",
    page_title: "Eleven Keep My Colour / Keep My Blonde",
    meta_desription:
      "Keep your hair vibrant with Eleven Keep My Colour, designed to maintain and protect your colour. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1042,
    store: "bf",
    type: "category",
    page_title: "Eleven Smooth Me Now: Anti-Frizz Haircare",
    meta_desription:
      "Tame frizz with Eleven Smooth Me Now, providing smooth, manageable hair and anti-frizz protection all day. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1043,
    store: "bf",
    type: "category",
    page_title: "Eleven Hydrate My Hair: Intense Moisture for Dry Hair",
    meta_desription:
      "Rehydrate dry hair with Eleven Hydrate My Hair, delivering moisture for soft, silky hair. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1044,
    store: "bf",
    type: "category",
    page_title: "Eleven Miracle Hair Treatment: Hair Repair",
    meta_desription:
      "Restore damaged hair with Eleven Miracle Hair Treatment, revitalizing hair for smooth,  healthy results. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1045,
    store: "bf",
    type: "category",
    page_title: "Eleven Frizz Control: Tame Flyaways",
    meta_desription:
      "Control frizz with Eleven Frizz Control, designed for sleek, manageable hair throughout the day. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1046,
    store: "bf",
    type: "category",
    page_title: "Eleven Strong Hold / Flexible Hold: Lasting Hair Styling",
    meta_desription:
      "Create lasting styles with Eleven Strong Hold, offering flexible yet strong hair hold that stays in place. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1047,
    store: "bf",
    type: "category",
    page_title: "Cleansing : Cleansers for Every Skin Type",
    meta_desription:
      "Cleanse and refresh skin with a range of cleansers formulated to suit all skin types and concerns. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1048,
    store: "bf",
    type: "category",
    page_title: "Body Care: Nourishing Skincare for Soft, Healthy Skin",
    meta_desription:
      "Keep your skin soft and healthy with nourishing body care products that hydrate and protect. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1049,
    store: "bf",
    type: "category",
    page_title: "Tools: Must-Have Beauty Tools & Accessories",
    meta_desription:
      "Shop must-have beauty tools & accessories, from brushes to skincare tools, perfect for your routine. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1051,
    store: "bf",
    type: "category",
    page_title: "Beauty Boxes: Curated Beauty Boxes for Every Routine",
    meta_desription:
      "Discover curated beauty boxes filled with skincare and makeup essentials, tailored to suit your needs. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1052,
    store: "bf",
    type: "category",
    page_title: "Skincare Beauty Boxes: Great Value Boxes For All Skin Types!",
    meta_desription:
      "Get great value beauty boxes, packed with top products for all skin types, offering an amazing price. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1054,
    store: "bf",
    type: "category",
    page_title: "L'Oréal Professionnel Silver: Haircare for Blond Hair",
    meta_desription:
      "Keep blonde & grey hair vibrant with L'Oréal Professionnel Silver haircare, neutralising brassiness. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1055,
    store: "bf",
    type: "category",
    page_title: "L'Oréal Professionnel Tecni Art: Professional Styling",
    meta_desription:
      "Create professional styles with L'Oréal Professionnel Tecni Art products for lasting hold. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1058,
    store: "bf",
    type: "category",
    page_title: "Professional Brands: Professional Beauty & Haircare ",
    meta_desription:
      "Shop professional beauty & haircare brands trusted by experts, delivering results you can rely on. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1059,
    store: "bf",
    type: "category",
    page_title: "Trending Brands: The Hottest Beauty & Skincare Brands",
    meta_desription:
      "Explore the hottest beauty brands, featuring innovative products that are trending in the beauty industry. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1060,
    store: "bf",
    type: "category",
    page_title: "New Brands: Fresh & Exciting Beauty Brands to Discover",
    meta_desription:
      "Discover exciting new beauty brands to refresh your routine with the latest trends. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1061,
    store: "bf",
    type: "category",
    page_title: "Cult Faves: Must-Have Beauty Products Loved by Many",
    meta_desription:
      "Shop cult-favorite beauty products loved for their effectiveness & reliability in skincare and beauty care. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1062,
    store: "bf",
    type: "category",
    page_title: "BeautyFeatures: Your Destination for Premium Beauty!",
    meta_desription:
      "Shop premium beauty products at BeautyFeatures, your destination for the latest beauty essentials. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1063,
    store: "bf",
    type: "category",
    page_title: "BeautiEdit: Handpicked Beauty Essentials for Every Routine",
    meta_desription:
      "BeautiEdit offers handpicked beauty essentials to build your perfect routine and enhance your daily rituals. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1064,
    store: "bf",
    type: "category",
    page_title: "Nuxe: Luxurious French Skincare for Radiant Beauty",
    meta_desription:
      "Discover Nuxe's luxurious skincare, powered by natural ingredients for a radiant complexion. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1065,
    store: "bf",
    type: "category",
    page_title: "Reform Skincare: Advanced Skincare for Healthy, Glowing Skin",
    meta_desription:
      "Reform Skincare offers advanced skincare for glowing, healthy skin. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1066,
    store: "bf",
    type: "category",
    page_title: "The Wet Brush: Gentle Detangling for All Hair Types",
    meta_desription:
      "The Wet Brush detangles all hair types gently without damage. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1067,
    store: "bf",
    type: "category",
    page_title: "Revolution: Bold, Affordable Makeup & Skincare",
    meta_desription:
      "Revolution offers bold, affordable makeup & skincare. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1068,
    store: "bf",
    type: "category",
    page_title: "NAK: Professional Haircare for All Hair Types",
    meta_desription:
      "NAK provides professional haircare for healthy, strong hair. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1069,
    store: "bf",
    type: "category",
    page_title: "e.l.f: Affordable, High-Quality Makeup & Skincare",
    meta_desription:
      "e.l.f offers affordable, high-quality makeup & skincare. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1070,
    store: "bf",
    type: "category",
    page_title: "Actyva: Salon-Quality Haircare for Healthy, Strong Hair",
    meta_desription:
      "Actyva delivers salon-quality haircare for healthy, strong hair. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1071,
    store: "bf",
    type: "category",
    page_title: "CeraVe: Dermatologist-Approved Skincare for Every Skin Type",
    meta_desription:
      "CeraVe offers dermatologist-approved skincare for all skin types. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1072,
    store: "bf",
    type: "category",
    page_title: "Caudalie: Natural Skincare Powered by Grape Extracts",
    meta_desription:
      "Caudalie offers natural skincare powered by grape extracts. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1073,
    store: "bf",
    type: "category",
    page_title: "K18: Innovative Hair Repair for Stronger, Healthier Hair",
    meta_desription:
      "K18 offers innovative hair repair for healthier, stronger hair. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1074,
    store: "bf",
    type: "category",
    page_title: "Ziaja: Affordable Skincare Inspired by Nature",
    meta_desription:
      "Ziaja provides affordable skincare inspired by nature. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1075,
    store: "bf",
    type: "category",
    page_title: "Revlon Professional: Salon-Quality Haircare & Styling",
    meta_desription:
      "Revlon Professional offers salon-quality haircare & styling. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1076,
    store: "bf",
    type: "category",
    page_title: "La Roche-Posay: Dermatologist-Recommended Skincare Solutions",
    meta_desription:
      "La Roche-Posay offers dermatologist-recommended skincare. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1078,
    store: "bf",
    type: "category",
    page_title: "SOSU: Trendy Beauty & Makeup by Suzanne Jackson",
    meta_desription:
      "SOSU brings trendy beauty & makeup by Suzanne Jackson. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1079,
    store: "bf",
    type: "category",
    page_title: "Isoclean: Professional Makeup Brush & Tool Cleaning",
    meta_desription:
      "Isoclean offers professional makeup brush & tool cleaning. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1080,
    store: "bf",
    type: "category",
    page_title: "R+CO: High-Performance Haircare for Every Style",
    meta_desription:
      "R+CO offers high-performance haircare for every style. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1081,
    store: "bf",
    type: "category",
    page_title: "Advanced Nutrition: Supplements for Healthy Skin & Hair",
    meta_desription:
      "Advanced Nutrition provides supplements for healthy skin & hair. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1082,
    store: "bf",
    type: "category",
    page_title: "Hollywood Browzer: Effortless Hair Removal & Dermaplaning",
    meta_desription:
      "Hollywood Browzer offers easy hair removal & dermaplaning. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1083,
    store: "bf",
    type: "category",
    page_title: "Shop All Brands: Find Your Favorite Beauty & Skincare Brands",
    meta_desription:
      "Shop All Brands offers a wide selection of beauty & skincare. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1085,
    store: "bf",
    type: "category",
    page_title: "Kevin Murphy: Eco-Friendly Haircare with Salon Results",
    meta_desription:
      "Kevin Murphy offers eco-friendly, salon-quality haircare. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1086,
    store: "bf",
    type: "category",
    page_title: "GHD: Professional Hair Tools for Salon-Worthy Styling",
    meta_desription:
      "GHD offers professional hair tools for sleek, salon-worthy styles. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1087,
    store: "bf",
    type: "category",
    page_title: "Revitalash: Lash & Brow Conditioning for Fuller Growth",
    meta_desription:
      "Revitalash offers lash & brow conditioning for fuller growth. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1088,
    store: "bf",
    type: "category",
    page_title: "milk_shake: Natural Haircare for Nourished, Shiny Hair",
    meta_desription:
      "milk_shake provides natural haircare for nourished, shiny hair. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1089,
    store: "bf",
    type: "category",
    page_title: "Black Friday Wow Offers: Huge Savings on Beauty & Haircare",
    meta_desription:
      "Black Friday Wow Offers: Save big on beauty & haircare. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1090,
    store: "bf",
    type: "category",
    page_title: "Haircare Gift Sets: The Perfect Haircare Bundles & Kits",
    meta_desription:
      "Haircare Gift Sets: The perfect haircare bundles & kits. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1092,
    store: "bf",
    type: "category",
    page_title: "20% Off Alfaparf: Save on Alfaparf Haircare & Styling",
    meta_desription:
      "20% Off Alfaparf: Save on Alfaparf haircare & styling. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1093,
    store: "bf",
    type: "category",
    page_title: "25% Off Dermalogica: Exclusive Dermalogica Discounts",
    meta_desription:
      "25% Off Dermalogica: Exclusive discounts on Dermalogica. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1094,
    store: "bf",
    type: "category",
    page_title: "30% Off Kerastase: Luxury Haircare Savings You Can’t Miss",
    meta_desription:
      "30% Off Kerastase: Save on luxury haircare products. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1095,
    store: "bf",
    type: "category",
    page_title: "20% Off Moroccanoil: Nourishing Haircare for Silky Locks",
    meta_desription:
      "20% Off Moroccanoil: Nourishing haircare for silky locks. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1096,
    store: "bf",
    type: "category",
    page_title: "30% Off L'Oréal Professionnel: Pro Haircare at Great Prices!",
    meta_desription:
      "30% Off L'Oréal Professionnel: Save on pro haircare. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1097,
    store: "bf",
    type: "category",
    page_title: "25% Off Olaplex: Strengthen & Repair Hair for Less",
    meta_desription:
      "25% Off Olaplex: Strengthen & repair your hair for less. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1098,
    store: "bf",
    type: "category",
    page_title: "25% Off Elemis: Luxurious Skincare Savings This Season",
    meta_desription:
      "25% Off Elemis: Luxurious skincare savings this season. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1099,
    store: "bf",
    type: "category",
    page_title: "30% Off Redken: Professional Haircare at Unbeatable Prices",
    meta_desription:
      "30% Off Redken: Professional haircare at unbeatable prices. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1100,
    store: "bf",
    type: "category",
    page_title: "20% Off Color Wow: Salon-Quality Color Protection & Styling",
    meta_desription:
      "20% Off Color Wow: Save on salon-quality color care. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1101,
    store: "bf",
    type: "category",
    page_title: "25% Off Nioxin: Thicker, Fuller Hair at a Discount",
    meta_desription:
      "25% Off Nioxin: Thicker, fuller hair at a discount. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1102,
    store: "bf",
    type: "category",
    page_title: "Gift Set Sale: Shop the Best Beauty & Haircare Gift Sets",
    meta_desription:
      "Gift Set Sale: Shop the best beauty & haircare gift sets. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1103,
    store: "bf",
    type: "category",
    page_title: "Shop By Range: Find the Perfect Products for Your Needs",
    meta_desription:
      "Shop By Range: Find the perfect beauty & haircare products. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1104,
    store: "bf",
    type: "category",
    page_title: "Repair: Hair & Skincare Solutions for Ultimate Restoration",
    meta_desription:
      "Repair: Hair & skincare solutions for ultimate restoration. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1105,
    store: "bf",
    type: "category",
    page_title: "Hydration: Deeply Moisturizing Products for Hair & Skin",
    meta_desription:
      "Hydration: Deeply moisturizing products for hair & skin. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1106,
    store: "bf",
    type: "category",
    page_title: "Volume: Boost Body & Fullness for Hair That Stands Out",
    meta_desription:
      "Volume: Boost body & fullness for hair that stands out. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1107,
    store: "bf",
    type: "category",
    page_title: "Color Care: Protect & Maintain Vibrant Hair Color",
    meta_desription:
      "Color Care: Protect & maintain vibrant hair color. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1109,
    store: "bf",
    type: "category",
    page_title: "L'Oréal Heroes: Top-Selling L'Oréal Products",
    meta_desription:
      "L'Oréal Heroes: Top-selling L'Oréal products for radiant hair. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 109,
    store: "bsk",
    type: "category",
    page_title: "20% Off: Get Exclusive Beauty & Haircare Discounts Now",
    meta_desription:
      "20% Off: Get exclusive beauty & haircare discounts now. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 111,
    store: "ah",
    type: "brand",
    page_title: "Moxi Loves: Smart, Sustainable Beauty & Skincare Essentials",
    meta_desription:
      "Moxi Loves: Smart, sustainable beauty & skincare essentials. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 112,
    store: "ah",
    type: "brand",
    page_title: "Caudalie: Antioxidant-Powered Skincare for Radiant Skin",
    meta_desription:
      "Caudalie: Antioxidant-powered skincare for radiant skin. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 113,
    store: "ah",
    type: "brand",
    page_title: "Parker: Premium Grooming & Skincare Essentials for Men",
    meta_desription:
      "Parker: Premium grooming & skincare essentials for men. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 121,
    store: "ah",
    type: "brand",
    page_title: "BeautyFeatures: Your Go-To for Top Beauty & Haircare Brands",
    meta_desription:
      "BeautyFeatures: Your go-to for top beauty & haircare brands. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 124,
    store: "ah",
    type: "brand",
    page_title: "Luna By Lisa: Luxurious Beauty & Haircare by Lisa Jordan",
    meta_desription:
      "Luna By Lisa: Luxurious beauty & haircare by Lisa Jordan. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 142,
    store: "ah",
    type: "brand",
    page_title: "NHP: Natural Hair Products for Stronger, Healthier Hair",
    meta_desription:
      "NHP: Natural hair products for stronger, healthier hair. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 187,
    store: "pb",
    type: "category",
    page_title: "NO_DISCOUNT: Items Not Eligible for Discounts & Promotions",
    meta_desription:
      "NO_DISCOUNT: Items not eligible for discounts & promotions. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 422,
    store: "ih",
    type: "brand",
    page_title: "Inco Sheets: Absorbent, Disposable Sheets for Comfort & Care",
    meta_desription:
      "Inco Sheets: Absorbent disposable sheets for comfort & care. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 443,
    store: "ih",
    type: "brand",
    page_title: "Huaan Medical: Trusted Medical Supplies & Hygiene Products",
    meta_desription:
      "Huaan Medical: Trusted medical supplies & hygiene products. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 1493,
    store: "ih",
    type: "category",
    page_title: "NO_DISCOUNT: Beauty & Haircare Items Excluded from Offers",
    meta_desription:
      "NO_DISCOUNT: Beauty & haircare items excluded from offers. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 89,
    store: "bs",
    type: "category",
    page_title: "Home Hygiene: Essential Products for a Clean, Fresh Home",
    meta_desription:
      "Home Hygiene: Essential products for a clean, fresh home. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 90,
    store: "bs",
    type: "category",
    page_title: "NO_DISCOUNT: Shop Products That Are Excluded from Discounts",
    meta_desription:
      "NO_DISCOUNT: Shop products excluded from discounts. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 41,
    store: "hie",
    type: "category",
    page_title: "Excluded From Discounts: Products Not Eligible for Offers",
    meta_desription:
      "Excluded From Discounts: Products not eligible for offers. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 399,
    store: "px",
    type: "category",
    page_title: "Men's Range: Grooming & Skincare for Every Man",
    meta_desription:
      "Men’s Range: Grooming & skincare for every man. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 417,
    store: "px",
    type: "category",
    page_title: "Tools & Accessories: Must-Have Beauty & Hair Tools",
    meta_desription:
      "Tools & Accessories: Must-have beauty & hair tools. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 419,
    store: "px",
    type: "category",
    page_title: "Lip Care: Hydrating & Nourishing Lip Treatments",
    meta_desription:
      "Lip Care: Hydrating & nourishing lip treatments. Order before 2pm for next day delivery in Ireland.",
  },
  {
    id: 448,
    store: "px",
    type: "category",
    page_title: "Exfoliators: Reveal Smoother Skin with the Best Scrubs",
    meta_desription:
      "Reveal smoother, brighter skin with the best exfoliators, from scrubs to peels, designed to gently remove dead skin and reveal a refreshed complexion.",
  },
  {
    id: 469,
    store: "px",
    type: "category",
    page_title: "Hair Products: The Best Haircare for Every Type & Texture",
    meta_desription:
      "Find the best haircare for every type and texture with our curated selection of products that address every hair need, from dry to oily and everything in between.",
  },
  {
    id: 470,
    store: "px",
    type: "category",
    page_title: "Discover: Find the Latest Beauty Trends & Innovations",
    meta_desription:
      "Discover the latest beauty trends and innovations with fresh and exciting products designed to update and elevate your beauty routine.",
  },
  {
    id: 471,
    store: "px",
    type: "category",
    page_title: "Damaged Hair: Strengthen & Repair Hair with Expert Care",
    meta_desription:
      "Strengthen and repair your damaged hair with expert care, using products that restore health, shine, and vitality to tired, brittle strands.",
  },
  {
    id: 472,
    store: "px",
    type: "category",
    page_title: "Hair Loss & Thinning: Solutions for Fuller, Thicker Hair",
    meta_desription:
      "Solutions for fuller, thicker hair are here with our hair loss and thinning products, designed to promote hair regrowth and reduce hair shedding.",
  },
  {
    id: 473,
    store: "px",
    type: "category",
    page_title: "Scalp Care & Anti Dandruff: Healthy Scalp Treatments for All",
    meta_desription:
      "Scalp care and anti-dandruff treatments to keep your scalp healthy and free from irritation, providing the perfect solution for a clean and balanced scalp.",
  },
  {
    id: 474,
    store: "px",
    type: "category",
    page_title: "Hair Vitamins & Supplements: Support Hair Growth & Strength",
    meta_desription:
      "Support hair growth and strength with hair vitamins and supplements, providing essential nutrients to promote thicker, healthier hair.",
  },
  {
    id: 475,
    store: "px",
    type: "category",
    page_title: "Hair Brushes: The Best Brushes for Smooth, Tangle-Free Hair",
    meta_desription:
      "Discover the best brushes for smooth, tangle-free hair, perfect for all hair types and designed to minimize breakage while detangling gently.",
  },
  {
    id: 476,
    store: "px",
    type: "category",
    page_title: "Hair Curlers & Wavers: Create Long-Lasting Curls & Waves",
    meta_desription:
      "Create long-lasting curls and waves with professional hair curlers and wavers, designed for beautiful, bouncy curls and effortless styling.",
  },
  {
    id: 477,
    store: "px",
    type: "category",
    page_title: "Hair Dryers: Professional Blow-Dry Results at Home",
    meta_desription:
      "Get professional blow-dry results at home with high-quality hair dryers, designed to provide fast drying and smooth, shiny hair with every use.",
  },
  {
    id: 478,
    store: "px",
    type: "category",
    page_title: "Hair Straighteners: Sleek, Frizz-Free Hair with Pro Styling",
    meta_desription:
      "Achieve sleek, frizz-free hair with professional-grade hair straighteners, designed to create smooth, shiny strands with lasting results.",
  },
  {
    id: 479,
    store: "px",
    type: "category",
    page_title: "Skin Products: Must-Have Skincare for Every Routine",
    meta_desription:
      "Must-have skincare products for every routine, from cleansers to moisturizers, designed to address every skin concern and keep your skin glowing.",
  },
  {
    id: 480,
    store: "px",
    type: "category",
    page_title: "Discover: Explore New & Exciting Beauty Products",
    meta_desription:
      "Explore new and exciting beauty products with a fresh collection of innovative skincare and makeup designed to enhance your beauty regimen.",
  },
  {
    id: 481,
    store: "px",
    type: "category",
    page_title: "Skin Health: Dermatologist-Approved Skincare",
    meta_desription:
      "Dermatologist-approved skincare products for healthy skin, offering effective solutions for every skin type and concern, promoting smooth, radiant skin.",
  },
  {
    id: 482,
    store: "px",
    type: "category",
    page_title: "Product Type: Browse Beauty & Haircare by Category",
    meta_desription:
      "Browse beauty and haircare by category with our product type selection, making it easy to find exactly what you need for your beauty and skincare goals.",
  },
  {
    id: 483,
    store: "px",
    type: "category",
    page_title: "Haircare Bundles: The Best Haircare Sets for Every Need",
    meta_desription:
      "The best haircare sets for every need, offering bundles of top-rated products that deliver results for every hair type and concern.",
  },
  {
    id: 484,
    store: "px",
    type: "category",
    page_title: "Excluded From Discounts: Items Not Eligible for Promotions",
    meta_desription:
      "Items not eligible for promotions are listed under Excluded From Discounts.",
  },
];

async function main() {
  try {
    for (let i = 0; i < data.length; i++) {
      console.log(i, data.length);
      const row = data[i];
      require("./config/config").config(row.store)
      if (row.type == "brand") {
        await updateBrand(row.id, {
          page_title: row.page_title,
          meta_description: row.meta_desription,
        });
      } else if (row.type == "category") {
        await updateCategory(row.id, {
          page_title: row.page_title,
          meta_description: row.meta_desription,
        });
      }
    }
  } catch (err) {
    console.log("Error:", err);
  }
}

main();
