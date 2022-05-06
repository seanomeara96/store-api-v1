const campaigns = [
  {
    type: "brand",
    identifier: "Redken",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/4676/9011/Redken_Acidic_Perfecting_Concentrate_Leave-In_Treatment_150ml__80796.1616597014.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/4676/9011/Redken_Acidic_Perfecting_Concentrate_Leave-In_Treatment_150ml__80796.1616597014.jpg",
    headline:
      "Free Acidic Perfecting Concentrate Leave-In Treatment 150ml worth €28",
    condition: "When you spend €100 on Redken",
    sku: "9764",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/redken",
  },
  {
    type: "tag",
    identifier: "redken-extreme",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/395/9605/Redken_-_Extreme_Shampoo_300ml__40188.1623162199.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/395/9605/Redken_-_Extreme_Shampoo_300ml__40188.1623162199.jpg",
    headline: "Free Redken Extreme Travel Size",
    condition: "When you spend €40 on the Redken Extreme range",
    sku: "11099e",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/redken",
  },
  {
    type: "tag",
    identifier: "redken-all-soft",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5917/11577/Redken_-_All_Soft_Shampoo_300ml__47580.1620983464.1280.1280__46003.1651581747.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5917/11577/Redken_-_All_Soft_Shampoo_300ml__47580.1620983464.1280.1280__46003.1651581747.jpg",
    headline: "Free Redken All Soft Travel Size",
    condition: "When you spend €40 on the Redken All Soft range",
    sku: "11099a",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/redken",
  },
  {
    type: "tag",
    identifier: "redken-color-extend",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5918/11579/Redken_-_Colour_Extend_Shampoo_300ml__31943.1622627138.1280.1280__35477.1651582462.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5918/11579/Redken_-_Colour_Extend_Shampoo_300ml__31943.1622627138.1280.1280__35477.1651582462.jpg",
    headline: "Free Redken Color Extend Travel Size",
    condition: "When you spend €40 on the Redken Color Extend range",
    sku: "11099c",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/redken",
  },
  {
    type: "brand",
    identifier: "Kerastase",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/4207/11244/Kerastase_Nutritive_Nectar_Thermique_Blow-Dry_Primer_150ml_1__95211.1650028222.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/4207/11244/Kerastase_Nutritive_Nectar_Thermique_Blow-Dry_Primer_150ml_1__95211.1650028222.jpg",
    headline: "Free Kerastase Blow-Dry Primer 150ml worth €31",
    condition: "When you spend €100 on Kerastase",
    sku: "9053",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/kerastase",
  },
  {
    type: "brand",
    identifier: "Kerastase",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5892/11581/Kerastase_Resistance_Masque_Extentioniste_75ml_1__48084.1651588521.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5892/11581/Kerastase_Resistance_Masque_Extentioniste_75ml_1__48084.1651588521.jpg",
    headline: "Free Kerastase hair mask travel size worth €16",
    condition: "When you spend €50 on Kerastase",
    sku: "11370",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/kerastase",
  },
  {
    type: "brand",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5874/11225/Template__49690.1649932314.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5874/11225/Template__49690.1649932314.jpg",
    headline: "Free Dermalogica Active Skin Essentials Kit worth €21",
    condition: "When you spend €60 on Dermalogica",
    sku: "GWP36",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/dermalogica",
  },
  {
    type: "brand",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/3944/7919/Dermalogica_Hydro_Masque_Exfoliant_50ml__26998.1597734770.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/3944/7919/Dermalogica_Hydro_Masque_Exfoliant_50ml__26998.1597734770.jpg",
    headline: "Free Dermalogica Hydro Masque Exfoliant 50ml worth €69",
    condition: "When you spend €120 on Dermalogica",
    sku: "8755",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/dermalogica",
  },
  {
    type: "brand",
    identifier: "Decleor",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5723/11585/Decleor_Hydrate_Glow_GWP_1__42110.1651667588.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5723/11585/Decleor_Hydrate_Glow_GWP_1__42110.1651667588.jpg",
    headline: "Free Decleor Hydrate & Glow Kit worth €58",
    condition: "When you spend €80 on Decleor",
    sku: "11178",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/decleor",
  },
  {
    type: "brand",
    identifier: "Carter Beauty",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5611/10596/Carter_Beauty_Revitalise_Retinol_Collagen_Mask__55306.1643022301.png",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5611/10596/Carter_Beauty_Revitalise_Retinol_Collagen_Mask__55306.1643022301.png",
    headline: "Free Revitalise Retinol & Collagen Mask worth €8",
    condition: "When you spend €15 on Carter Beauty",
    sku: "11026",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/carter-beauty/",
  },
  {
    type: "brand",
    identifier: "Pureology",
    thumbnail: "",
    full_img: "",
    headline: "Free Pureology Color Fanatic Travel Size",
    condition: "When you spend €40 on Pureolofy",
    sku: "10354a",
    sku_type: "product",
    display: "FALSE",
    destination_url: "https://www.beautyfeatures.ie/brands/pureology",
  },
  {
    type: "brand",
    identifier: "Pureology",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5251/11245/Pureology_Color_Fanatic_Leave-In_Spray_200ml_1__40670.1650028399.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5251/11245/Pureology_Color_Fanatic_Leave-In_Spray_200ml_1__40670.1650028399.jpg",
    headline: "Free Pureology Color Fanatic 200ml worth €30",
    condition: "When you spend €70 on Pureology",
    sku: "10354",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/pureology",
  },
  {
    type: "brand",
    identifier: "Issey Miyake",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5636/10623/Issey_Miyake_Pour_Homme_Toiletry_Bag_and_Shower_Gel_GWP__32404.1643801777.png",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5636/10623/Issey_Miyake_Pour_Homme_Toiletry_Bag_and_Shower_Gel_GWP__32404.1643801777.png",
    headline: "Free Toiletry Bag and Shower Gel",
    condition: "When you spend €80 or more on Issey Miyake",
    sku: "11051",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/issey-miyake/",
  },
  {
    type: "brand",
    identifier: "Thalgo",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5686/10649/Thalgo_Exotic_Island_Body_Scrub_70g_GWP_1__39509.1644405661.png",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5686/10649/Thalgo_Exotic_Island_Body_Scrub_70g_GWP_1__39509.1644405661.png",
    headline: "Free Thalgo Exotic Island Body Scrub",
    condition: "When you spend €100 or more on Thalgo",
    sku: "11100",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/thalgo",
  },
  {
    type: "brand",
    identifier: "NAK",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5709/10693/NAK_Platinum_Blonde_Anti-Yellow_Shampoo_100ml_4_1__75150.1645707093.png",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5709/10693/NAK_Platinum_Blonde_Anti-Yellow_Shampoo_100ml_4_1__75150.1645707093.png",
    headline: "Free Platinum Blonde Bundle worth €16",
    condition: "When you spend €80 or more on NAK",
    sku: "11152",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/nak/",
  },
  {
    type: "brand",
    identifier: "SVR",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5508/11746/Gift_with_purchase_20__24675.1651824657.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5508/11746/Gift_with_purchase_20__24675.1651824657.jpg",
    headline: "Free SVR Sebiaclear Gel Moussant",
    condition: "When you spend €30 or more on SVR",
    sku: "10662",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/svr/",
  },
  {
    type: "brand",
    identifier: "NUXE",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5310/9925/NUXE_Very_Rose_3-in-1_Soothing_Micellar_Water_100ml_1__81400.1629367978.png",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5310/9925/NUXE_Very_Rose_3-in-1_Soothing_Micellar_Water_100ml_1__81400.1629367978.png",
    headline: "Free Very Rose 3-in-1 Soothing Micellar Water 100ml",
    condition: "When you spend €60 or more on NUXE",
    sku: "10442",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/nuxe/",
  },
  {
    type: "brand",
    identifier: "Moroccanoil",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5275/9883/Moroccanoil_Gym_Bottle_GWP_1__55837.1628669225.png",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/products/5275/9883/Moroccanoil_Gym_Bottle_GWP_1__55837.1628669225.png",
    headline: "Free Moroccanoil Gym Bottle",
    condition: "When you spend €100 or more on Moroccanoil",
    sku: "10403",
    sku_type: "product",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/Moroccanoil.html",
  },
  {
    type: "brand",
    identifier: "Alfaparf",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/attribute_rule_images/4652_source_1618495687.jpg",
    full_img:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/600x600/attribute_rule_images/4652_source_1618495687.jpg",
    headline: "Free Cristalli Liquidi 15ml worth €13.40",
    condition: "When you spend €100 or more on Alfaparf",
    sku: "6481A",
    sku_type: "config",
    display: "TRUE",
    destination_url: "https://www.beautyfeatures.ie/brands/Alfaparf.html",
  },
];
function gwp(data) {
  const { type, identifier, thumbnail, headline, condition } = data;
  const brand = document.querySelector(".productView-brand").textContent.trim();
  const tagDoesExist = document.querySelector(`#${identifier}`);
  const displayOffer = type === "brand" ? identifier === brand : tagDoesExist;
  if (displayOffer) {
    document.querySelector(".productView-options").insertAdjacentHTML(
      "beforeend",
      `<div
        style="
          min-height: 75px;
          display: flex;
          justify-content: space-between;
          background-color: #faf9f9;
          margin-bottom: 10px;
        "
      >
        <img
          style="background-position: center; object-fit: contain"
          src="${thumbnail}"
          alt="${headline}"
          loading="lazy"
        />
        <div
          style="
            width: 100%;
            padding: 6px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <strong>${headline}</strong>
          <div style="color: #91268d">${condition}</div>
        </div>
      </div>
      `
    );
  }
}

campaigns.forEach((campaign) => {
  if (campaign.display === "TRUE") {
    gwp(campaign);
  }
});
