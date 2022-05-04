function gwp(type, identifier, imgUrl, headline, condition) {
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
          src="${imgUrl}"
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
gwp(
  "brand",
  "Redken",
  "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/4676/9011/Redken_Acidic_Perfecting_Concentrate_Leave-In_Treatment_150ml__80796.1616597014.jpg",
  "Free Acidic Perfecting Concentrate Leave-In Treatment 150ml worth €28",
  "When you spend €100 on Redken"
);
gwp(
  "tag",
  "redken-extreme",
  "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/395/9605/Redken_-_Extreme_Shampoo_300ml__40188.1623162199.jpg",
  "Free Redken Extreme Travel Size",
  "When you spend €40 on the Redken Extreme range"
);
gwp(
  "tag",
  "redken-all-soft",
  "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5917/11577/Redken_-_All_Soft_Shampoo_300ml__47580.1620983464.1280.1280__46003.1651581747.jpg",
  "Free Redken All Soft Travel Size",
  "When you spend €40 on the Redken All Soft range"
);
gwp(
  "tag",
  "redken-color-extend",
  "https://cdn11.bigcommerce.com/s-63354/images/stencil/1280x1280/products/5918/11579/Redken_-_Colour_Extend_Shampoo_300ml__31943.1622627138.1280.1280__35477.1651582462.jpg",
  "Free Redken Color Extend Travel Size",
  "When you spend €40 on the Redken Color Extend range"
);

gwp(
  "brand",
  "Kerastase",
  "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/4207/11244/Kerastase_Nutritive_Nectar_Thermique_Blow-Dry_Primer_150ml_1__95211.1650028222.jpg",
  "Free Kerastase Blow-Dry Primer 150ml worth €31",
  "When you spend €100 on Kerastase"
);

gwp(
  "brand",
  "Kerastase",
  "https://cdn11.bigcommerce.com/s-63354/images/stencil/75x75/products/5892/11581/Kerastase_Resistance_Masque_Extentioniste_75ml_1__48084.1651588521.jpg",
  "Free Kerastase hair mask travel size worth €16",
  "When you spend €50 on Kerastase"
);
