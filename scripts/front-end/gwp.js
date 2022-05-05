const campaigns = [
  {
    type: "brand",
    identifier: "Redken",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/4676/9011/Redken_Acidic_Perfecting_Concentrate_Leave-In_Treatment_150ml__80796.1616597014.jpg",
    headline:
      "Free Acidic Perfecting Concentrate Leave-In Treatment 150ml worth €28",
    condition: "When you spend €100 on Redken",
  },
  {
    type: "tag",
    identifier: "redken-extreme",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/395/9605/Redken_-_Extreme_Shampoo_300ml__40188.1623162199.jpg",
    headline: "Free Redken Extreme Travel Size",
    condition: "When you spend €40 on the Redken Extreme range",
  },
  {
    type: "tag",
    identifier: "redken-all-soft",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5917/11577/Redken_-_All_Soft_Shampoo_300ml__47580.1620983464.1280.1280__46003.1651581747.jpg",
    headline: "Free Redken All Soft Travel Size",
    condition: "When you spend €40 on the Redken All Soft range",
  },
  {
    type: "tag",
    identifier: "redken-color-extend",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/1280x1280/products/5918/11579/Redken_-_Colour_Extend_Shampoo_300ml__31943.1622627138.1280.1280__35477.1651582462.jpg",
    headline: "Free Redken Color Extend Travel Size",
    condition: "When you spend €40 on the Redken Color Extend range",
  },

  {
    type: "brand",
    identifier: "Kerastase",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/4207/11244/Kerastase_Nutritive_Nectar_Thermique_Blow-Dry_Primer_150ml_1__95211.1650028222.jpg",
    headline: "Free Kerastase Blow-Dry Primer 150ml worth €31",
    condition: "When you spend €100 on Kerastase",
  },

  {
    type: "brand",
    identifier: "Kerastase",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5892/11581/Kerastase_Resistance_Masque_Extentioniste_75ml_1__48084.1651588521.jpg",
    headline: "Free Kerastase hair mask travel size worth €16",
    condition: "When you spend €50 on Kerastase",
  },

  {
    type: "brand",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5874/11225/Template__49690.1649932314.jpg",
    headline: "Free Dermalogica Active Skin Essentials Kit worth €21",
    condition: "When you spend €60 on Dermalogica",
  },

  {
    type: "brand",
    identifier: "Dermalogica",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/3944/7919/Dermalogica_Hydro_Masque_Exfoliant_50ml__26998.1597734770.jpg",
    headline: "Free Dermalogica Hydro Masque Exfoliant 50ml worth €69",
    condition: "When you spend €120 on Dermalogica",
  },

  {
    type: "brand",
    identifier: "Decleor",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5723/11585/Decleor_Hydrate_Glow_GWP_1__42110.1651667588.jpg",
    headline: "Free Decleor Hydrate & Glow Kit worth €58",
    condition: "When you spend €80 on Decleor",
  },

  {
    type: "brand",
    identifier: "Carter Beauty",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5611/10596/Carter_Beauty_Revitalise_Retinol_Collagen_Mask__55306.1643022301.png",
    headline: "Free Revitalise Retinol & Collagen Mask worth €8",
    condition: "When you spend €15 on Carter Beauty",
  },
  {
    type: "brand",
    identifier: "Pureology",
    thumbnail:
      "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5251/11245/Pureology_Color_Fanatic_Leave-In_Spray_200ml_1__40670.1650028399.jpg",
    headline: "Free Pureology Color Fanatic 200ml worth €30",
    condition: "When you spend €70 on Pureology",
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

campaigns.forEach((campaign) => gwp(campaign));
