function promotion(brandName, link, nameOfFreeGift, threshold, promoString) {
  if (!promoString) {
    promoString = `<div style=" padding: 12px 18px; margin-bottom: 12px; background-color: #ecdbec; border-radius: 4px; display: flex; align-items: center; " > <div style="padding-right: 12px"> <img src="https://cdn11.bigcommerce.com/s-63354/product_images/uploaded_images/gift-icon.png?t=1620198387&amp;_ga=2.1541873.1322443927.1620197854-9852056.1620197612" alt="gift icon"/> </div><div> <p style="margin-bottom: 0"> Free <a href="${link}" >${nameOfFreeGift}</a > when you spend &euro;${threshold} or more on ${brandName}</p></div></div>`;
  }
  const brand = document.querySelector(".productView-brand").textContent.trim();
  if (brandName === brand) {
    document
      .querySelector(".productView-description-tabContent")
      .insertAdjacentHTML("afterbegin", promoString);
  }
}

promotion(
  "Alfaparf",
  "https://www.beautyfeatures.ie/free-alfaparf-gift-with-purchase/",
  "Cristalli Liquidi 15ml",
  "100"
);
// promotion("Dermalogica", "https://www.beautyfeatures.ie/free-dermalogica-gift-with-purchase/", "Multi-Masque Kit", "100");
// promotion("Redken", "https://www.beautyfeatures.ie/free-redken-gift-with-purchase/", "Acidic Perfecting Concentrate Leave-In Treatment", "100");
promotion(
  "NUXE",
  "https://www.beautyfeatures.ie/free-nuxe-gift-with-purchase/",
  "Very Rose 3-in-1 Soothing Micellar Water",
  "60"
);
promotion(
  "SVR",
  "https://www.beautyfeatures.ie/free-svr-gift-with-purchase/",
  "SVR Sebiaclear Gel Moussant",
  "30"
);
// promotion("Nioxin", "https://www.beautyfeatures.ie/free-nioxin-gift-with-purchase/", "Diaboost Thickening Xtrafusion Treatment", "80");
promotion(
  "NAK",
  "https://www.beautyfeatures.ie/free-nak-gift-with-purchase/",
  "Platinum Blonde Trio 100ml Bundle",
  "80"
);
promotion(
  "Thalgo",
  "https://www.beautyfeatures.ie/free-thalgo-gift-with-purchase/",
  "Thalgo Exotic Island Body Scrub",
  "100"
);
// promotion("Carter Beauty", "https://www.beautyfeatures.ie/free-carter-beauty-gift-with-purchase/", "Bounce & Blend Beauty Sponge", "16");
promotion(
  "Moroccanoil",
  "https://www.beautyfeatures.ie/free-moroccanoil-gift-with-purchase/",
  "Moroccanoil Gym Bottle",
  "100"
);
// promotion("Issey Miyake", "#", "Toiletry Bag and Shower Gel", "80");
