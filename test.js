const { updateProduct } = require("./functions/products/updateProduct");
require("./config/config").config("bf");

const data = [
  {
    id: 3362,
    name: "FitFlop Freya Suede Sneaker Midnight Navy",
    page_title: "FitFlop Freya Suede Sneaker Midnight Navy",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Freya Suede Sneaker Midnight Navy today we will deliver tomorrow via AnPost.",
  },
  {
    id: 3789,
    name: "FitFlop Fino Leaf Toe-Post Silver",
    page_title: "FitFlop Fino Leaf Toe-Post Silver ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Fino Leaf Toe-Post Silver  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3790,
    name: "FitFlop Freya Suede Sneaker Stone",
    page_title: "FitFlop Freya Suede Sneaker Stone ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Freya Suede Sneaker Stone  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3791,
    name: "FitFlop Imogen Basket-Weave Raffia Slide All Black",
    page_title: "FitFlop Imogen Basket-Weave Slide All Black ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Imogen Basket-Weave Slide All Black  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3792,
    name: "FitFlop Imogen Basket-Weave Raffia Slide Soft Pink",
    page_title: "FitFlop Imogen Basket-Weave Slide Soft Pink ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Imogen Basket-Weave Slide Soft Pink  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3793,
    name: "FitFlop Imogen Basket-Weave Raffia Slide Stone",
    page_title: "FitFlop Imogen Basket-Weave Slide Stone ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Imogen Basket-Weave Slide Stone  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3794,
    name: "FitFlop Imogen Basket-Weave Raffia Toe-Post All Black",
    page_title: "FitFlop Imogen Basket-Weave Toe-Post All Black ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Imogen Basket-Weave Toe-Post All Black  today we will deliver tomorrow via AnPost",
  },
  {
    id: 3795,
    name: "FitFlop Imogen Basket-Weave Raffia Toe-Post Soft Pink",
    page_title: "FitFlop Imogen Basket-Weave Toe-Post Soft Pink ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Imogen Basket-Weave Toe-Post Soft Pink  today we will deliver tomorrow via AnPost",
  },
  {
    id: 3796,
    name: "FitFlop Imogen Basket-Weave Raffia Toe-Post Stone",
    page_title: "FitFlop Imogen Basket-Weave Toe-Post Stone ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Imogen Basket-Weave Toe-Post Stone  today we will deliver tomorrow via AnPost.",
  },
  {
    id: 3797,
    name: "FitFlop iQushion Ergonomic Sandals Mink",
    page_title: "FitFlop iQushion Ergonomic Sandals Mink ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop iQushion Ergonomic Sandals Mink  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3798,
    name: "FitFlop iQushion Ergonomic Sandals All Black",
    page_title: "FitFlop iQushion Ergonomic Sandals All Black ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop iQushion Ergonomic Sandals All Black  today we will deliver tomorrow via AnPost.",
  },
  {
    id: 3799,
    name: "FitFlop Leia Leather Toe-Post Navy",
    page_title: "FitFlop Leia Leather Toe-Post Navy ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Leia Leather Toe-Post Navy  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3800,
    name: "FitFlop Leia Toe-Post Heather Pink",
    page_title: "FitFlop Leia Toe-Post Heather Pink ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Leia Toe-Post Heather Pink  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3801,
    name: "FitFlop Leia Toe-Post Light Tan",
    page_title: "FitFlop Leia Toe-Post Light Tan ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Leia Toe-Post Light Tan  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3802,
    name: "FitFlop Lottie Corsage Toe-Post Urban White",
    page_title: "FitFlop Lottie Corsage Toe-Post White ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Lottie Corsage Toe-Post White  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3803,
    name: "FitFlop Lottie Shimmer Crystal  Toe-Post Midnight Navy",
    page_title: "FitFlop Lottie Shimmer Toe-Post Crystal Navy ",
    meta_description:
      "BeautyFeatures.ie presents FitFlops Season of style. Buy FitFlop Lottie Shimmer Toe-Post Crystal Navy  today we will deliver tomorrow via AnPost.",
  },
  {
    id: 3804,
    name: "FitFlop Lottie Shimmer Crystal Toe-Post Pewter",
    page_title: "FitFlop Lottie Shimmer Toe-Post Crystal Pewter ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Lottie Shimmer Toe-Post Crystal Pewter  today we will deliver tomorrow via AnPost",
  },
  {
    id: 3805,
    name: "FitFlop Lulu Leather Toe-Post Heather Pink",
    page_title: "FitFlop Lulu Leather Toe-Post Heather Pink ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Lulu Leather Toe-Post Heather Pink  today we will deliver tomorrow via AnPost.",
  },
  {
    id: 3806,
    name: "FitFlop Lulu Leather Toe-Post Silver",
    page_title: "FitFlop Lulu Leather Toe-Post Silver ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Lulu Leather Toe-Post Silver  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3807,
    name: "FitFlop Lulu Cross Sandals Leather Heather Pink",
    page_title: "FitFlop Lulu Sandals Leather Heather Pink ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Lulu Sandals Leather Heather Pink  today we will deliver tomorrow via Bray Co Wicklow",
  },
  {
    id: 3808,
    name: "FitFlop Lulu Cross Sandals Leather Silver",
    page_title: "FitFlop Lulu Sandals Leather Silver ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Lulu Sandals Leather Silver  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3809,
    name: "FitFlop Lulu Shimmer Toe-Post Midnight Navy",
    page_title: "FitFlop Lulu Shimmer Toe-Post Midnight Navy ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Lulu Shimmer Toe-Post Midnight Navy  today we will deliver tomorrow via AnPost.",
  },
  {
    id: 3810,
    name: "FitFlop Lulu Shimmer Toe-Post Pewter",
    page_title: "FitFlop Lulu Shimmer Toe-Post Pewter ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Lulu Shimmer Toe-Post Pewter  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3811,
    name: "FitFlop Lulu Cross Slide Leather Black",
    page_title: "FitFlop Lulu Slide Leather Black ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Lulu Slide Leather Black  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3812,
    name: "FitFlop Lulu Cross Slide Leather Silver",
    page_title: "FitFlop Lulu Slide Leather Silver ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Lulu Slide Leather Silver  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3813,
    name: "FitFlop Marbleknit Sneakers Coral",
    page_title: "FitFlop Marbleknit Sneakers Coral ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Marbleknit Sneakers Coral  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3814,
    name: "FitFlop Marbleknit Sneakers Navy",
    page_title: "FitFlop Marbleknit Sneakers Navy ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Marbleknit Sneakers Navy  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3815,
    name: "FitFlop Surfa Toe-Post Sea Blue",
    page_title: "FitFlop Surfa Toe-Post Sea Blue ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Surfa Toe-Post Sea Blue  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 3816,
    name: "FitFlop Surfa Toe-Post Soft Pink",
    page_title: "FitFlop Surfa Toe-Post Soft Pink ",
    meta_description:
      "BeautyFeatures.ie present FitFlops Season of style. Buy FitFlop Surfa Toe-Post Soft Pink  today and have your favourite brand in your hands tomorrow",
  },
  {
    id: 5333,
    name: "Alfaparf Semi Di Lino Diamond - Gift Set",
    page_title: "Alfaparf Semi Di Lino Diamond - Gift Set",
    meta_description:
      "Buy Alfaparf Semi Di Lino Diamond - Gift Set from Irish Business BeautyFeatures.ie and enjoy next day premium delivery anywhere in Ireland.",
  },
  {
    id: 5334,
    name: "Alfaparf Semi Di Lino Reconstruction - Gift Set",
    page_title: "Alfaparf Semi Di Lino Reconstruction - Gift Set",
    meta_description:
      "Buy Alfaparf Semi Di Lino Reconstruction - Gift Set from Irish Business BeautyFeatures.ie and enjoy next day premium delivery anywhere in Ireland.",
  },
  {
    id: 5335,
    name: "Alfaparf Semi Di Lino Volume - Gift Set",
    page_title: "Alfaparf Semi Di Lino Volume - Gift Set",
    meta_description:
      "Buy Alfaparf Semi Di Lino Volume - Gift Set from Irish Business BeautyFeatures.ie and enjoy next day premium delivery anywhere in Ireland from Bray.",
  },
  {
    id: 5423,
    name: "Dermalogica Our Best Cleanse & Glow Gift Set",
    page_title: "Dermalogica Our Best Cleanse & Glow Gift Set",
    meta_description:
      "Buy Dermalogica Our Best Cleanse & Glow Gift Set from Guaranteed Irish business BeautyFeatures.ie and enjoy our premium next day delivery from Bray.",
  },
  {
    id: 5719,
    name: "Kerastase Home Fragrance Kit (5 Scents)",
    page_title: "Kerastase Home Fragrance Kit (5 Scents) : BeautyFeatures.ie",
    meta_description:
      "Buy Kerastase Home Fragrance Kit (5 Scents) from BeautyFeatures.ie and enjoy our premium next day delivery service nationwide from our Bray Co Wicklow office.",
  },
  {
    id: 5785,
    name: "Ren Glow One Step Further",
    page_title: "Ren Glow One Step Further : BeautyFeatures.ie",
    meta_description:
      "Buy Ren Glow One Step Further from Guaranteed Irish business BeautyFeatures.ie and enjoy next day delivery throughout Ireland from Bray County Wicklow",
  },
  {
    id: 5791,
    name: "Ren Stop Being So Sensitive",
    page_title: "Ren Stop Being So Sensitive : BeautyFeatures.ie",
    meta_description:
      "Buy Ren Stop Being So Sensitive from Guaranteed Irish business BeautyFeatures.ie and enjoy next day delivery throughout Ireland from Bray County Wicklow",
  },
  {
    id: 5820,
    name: "Moroccanoil Be An Original Oil Treatment 100ml + 25ml",
    page_title:
      "Moroccanoil Be An Original Oil Treatment 100ml + 25ml : BeautyFeatures.ie",
    meta_description:
      "Buy Moroccanoil Be An Original Oil Treatment 100ml + 25ml  from Guaranteed Irish Business BeautyFeatures.ie and enjoy next day delivery throughout Ireland.",
  },
  {
    id: 5821,
    name: "Moroccanoil Be An Original Light Oil Treatment 100ml + 25ml",
    page_title:
      "Moroccanoil Be An Original Light Oil Treatment 100ml + 25ml : BeautyFeatures.ie",
    meta_description:
      "Buy Moroccanoil Be An Original Light Oil Treatment 100ml + 25ml  from Guaranteed Irish Business BeautyFeatures.ie and enjoy next day delivery throughout Ireland.",
  },
  {
    id: 5823,
    name: "Alfaparf Semi Di Lino Scalp Relief Kit",
    page_title:
      "Alfaparf Semi Di Lino Scalp Relief KitÂ Â  : BeautyFeatures.ie",
    meta_description:
      "Buy Alfaparf Semi Di Lino Scalp Relief Kit  from Guaranteed Irish members BeautyFeatures.ie and enjoy next day delivery from Bray County Wicklow.",
  },
  {
    id: 5866,
    name: "Nuxe Prodigieux Travel Kit",
    page_title: "Nuxe Prodigieux Travel Kit 2021 : BeautyFeatures.ie",
    meta_description:
      "Buy Nuxe Prodigieux Travel Kit From Guaranteed Irish award winners BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray office",
  },
  {
    id: 5867,
    name: "Nuxe Prodigieux Floral Travel Kit",
    page_title: "Nuxe Prodigieux Floral Travel Kit : BeautyFeatures.ie",
    meta_description:
      "Buy Nuxe Prodigieux Floral Travel Kit From Guaranteed Irish award winners BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray",
  },
  {
    id: 6164,
    name: "Kerastase Elixir L'Huile Legere Pride Edition 100ml",
    page_title: "Kerastase Elixir L'Huile Legere 100ml : BeautyFeatures.ie",
    meta_description:
      "Buy Kerastase Elixir L'Huile Legere 100ml from an Irish business Beautyfeatures.ie and enjoy our premium next day delivery service anywhere in Ireland",
  },
  {
    id: 6286,
    name: "NUXE The Iconics Gift Set - Edition",
    page_title: "NUXE The Iconics Gift Set - Edition : BeautyFeatures.ie",
    meta_description:
      "Buy NUXE The Iconics Gift Set - Edition from Guaranteed Irish business BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray",
  },
  {
    id: 6287,
    name: "NUXE The Iconics in Pink - Edition",
    page_title: "NUXE The Iconics in Pink - Edition : BeautyFeatures.ie",
    meta_description:
      "Buy NUXE The Iconics in Pink - Edition from Guaranteed Irish business BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray",
  },
  {
    id: 6297,
    name: "Kerastase Blond Extreme Mask Holiday Gift Set",
    page_title:
      "Kerastase Blond Extreme Mask Holiday Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Kerastase Blond Extreme Mask Holiday Gift Set from BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray Co Wicklow office",
  },
  {
    id: 6298,
    name: "Kerastase Chroma Absolu Mask Holiday Gift Set",
    page_title:
      "Kerastase Chroma Absolu Mask Holiday Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Kerastase Chroma Absolu Mask Holiday Gift Set from BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray Co Wicklow office",
  },
  {
    id: 6299,
    name: "Kerastase Chrono Mask Holiday Gift Set",
    page_title: "Kerastase Chrono Mask Holiday Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Kerastase Chrono Mask Holiday Gift Set from Guaranteed Irish business BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray",
  },
  {
    id: 6300,
    name: "Kerastase Curl Fondant Holiday Gift Set",
    page_title: "Kerastase Curl Fondant Holiday Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Kerastase Curl Fondant Holiday Gift Set from BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray Co Wicklow office",
  },
  {
    id: 6301,
    name: "Kerastase Discipline Fondant Holiday Gift Set",
    page_title:
      "Kerastase Discipline Fondant Holiday Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Kerastase Discipline Fondant Holiday Gift Set from BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray Co Wicklow office",
  },
  {
    id: 6302,
    name: "Kerastase Genesis Fondant Holiday Gift Set",
    page_title:
      "Kerastase Genesis Fondant Holiday Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Kerastase Genesis Fondant Holiday Gift Set from BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray Co Wicklow office",
  },
  {
    id: 6303,
    name: "Kerastase Genesis Homme Fondant Holiday Gift Set",
    page_title:
      "Kerastase Genesis Homme Fondant Holiday Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Kerastase Genesis Homme Fondant Holiday Gift Set from BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray Co Wicklow office",
  },
  {
    id: 6304,
    name: "Kerastase Nutritive Mask Holiday Gift Set",
    page_title: "Kerastase Nutritive Mask Holiday Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Kerastase Nutritive Mask Holiday Gift Set from BeautyFeatures.ie and enjoy next day delivery throughout Ireland from our Bray Co Wicklow office",
  },
  {
    id: 6305,
    name: "Alfaparf Semi Di Lino Curl - Gift Set",
    page_title: "Alfaparf Semi Di Lino Curl - Gift Set",
    meta_description:
      "Buy Alfaparf Semi Di Lino Curl - Gift Set from Irish Business BeautyFeatures.ie and enjoy next day premium delivery anywhere in Ireland from Bray.",
  },
  {
    id: 6306,
    name: "Alfaparf Semi Di Lino Smooth - Gift Set",
    page_title: "Alfaparf Semi Di Lino Smooth - Gift Set",
    meta_description:
      "Buy Alfaparf Semi Di Lino Smooth - Gift Set from Irish Business BeautyFeatures.ie and enjoy next day premium delivery anywhere in Ireland from Bray.",
  },
  {
    id: 6318,
    name: "Caudalie The des Vignes Lip Hand Duo",
    page_title: "Caudalie The des Vignes LipHand Duo : BeautyFeatures.ie",
    meta_description:
      "Buy Caudalie The des Vignes LipHand Duo from Irish Company BeautyFeatures.ie and enjoy our premium next day delivery service across Ireland from Bray.",
  },
  {
    id: 6319,
    name: "Caudalie Vinotherapist LipHand Duo",
    page_title: "Caudalie Vinotherapist LipHand Duo : BeautyFeatures.ie",
    meta_description:
      "Buy Caudalie Vinotherapist LipHand Duo from Irish Company BeautyFeatures.ie and enjoy our premium next day delivery service across Ireland from Bray.",
  },
  {
    id: 6320,
    name: "Caudalie Beauty Elixir Set - Xmas",
    page_title: "Caudalie Beauty Elixir Set - Xmas : BeautyFeatures.ie",
    meta_description:
      "Buy Caudalie Beauty Elixir Set - Xmas from Irish Company BeautyFeatures.ie and enjoy our premium next day delivery service across Ireland from Bray.",
  },
  {
    id: 6321,
    name: "Caudalie Vinosource-Hydra Creme SOS Jar Set - Xmas",
    page_title:
      "Caudalie Vinosource-Hydra Creme SOS Jar Set - Xmas : BeautyFeatures.ie",
    meta_description:
      "Buy Caudalie Vinosource-Hydra Creme SOS Jar Set - Xmas from Irish Company BeautyFeatures.ie and enjoy our premium next day delivery service across Ireland.",
  },
  {
    id: 6334,
    name: "Decleor Essential Oil Advent Calendar",
    page_title: "Decleor Essential Oil Advent Calendar : BeautyFeatures.ie",
    meta_description:
      "Buy Decleor Essential Oil Advent Calendar from Irish Company BeautyFeatures.ie and enjoy our premium next day delivery service across Ireland from Bray.",
  },
  {
    id: 6364,
    name: "L'Oreal Professionnel Steampod 3 Gift Set",
    page_title: "L'oreal Professionnel Steampod 3 Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy L'oreal Professionnel Steampod 3 Gift Set from Irish retailer Beautyfeatures.ie and enjoy our premium next day delivery service throughout Ireland",
  },
  {
    id: 6391,
    name: "NAK Hydrate Christmas Gift Set",
    page_title: "NAK Hydrate Christmas Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy NAK Hydrate Christmas Gift Set from Irish business BeautyFeatures and enjoy next day delivery throughout Ireland from our Bray Wicklow office.",
  },
  {
    id: 6392,
    name: "NAK Nourish Christmas Gift Set",
    page_title: "NAK Nourish Christmas Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy NAK Nourish Christmas Gift Set from Irish business BeautyFeatures and enjoy next day delivery throughout Ireland from our Bray Wicklow office.",
  },
  {
    id: 6393,
    name: "NAK Structure Complex Christmas Gift Set",
    page_title: "NAK Structure Complex Christmas Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy NAK Structure Complex Christmas Gift Set from Irish business BeautyFeatures and enjoy next day delivery throughout Ireland from our Bray office.",
  },
  {
    id: 6394,
    name: "NAK Blonde Plus Christmas Gift Set",
    page_title: "NAK Blonde Plus Christmas Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy NAK Blonde Plus Christmas Gift Set from Irish business BeautyFeatures and enjoy next day delivery throughout Ireland from our Bray Wicklow office.",
  },
  {
    id: 6425,
    name: "Moroccanoil Hydrating Superstars Light",
    page_title: "Moroccanoil Hydrating Superstars Light : BeautyFeatures.ie",
    meta_description:
      "Buy Moroccanoil Hydrating Superstars Light from Irish business BeautyFeatures and enjoy next day delivery throughout Ireland from our Bray office.",
  },
  {
    id: 6426,
    name: "Moroccanoil Hydrating Superstars Original",
    page_title: "Moroccanoil Hydrating Superstars Original : BeautyFeatures.ie",
    meta_description:
      "Buy Moroccanoil Hydrating Superstars Original from Irish business BeautyFeatures and enjoy next day delivery throughout Ireland from our Bray office.",
  },
  {
    id: 6430,
    name: "Actyva Bellessere Gift Set",
    page_title: "Actyva Bellessere Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Actyva Bellessere Gift Set from Irish business BeautyFeatures and enjoy next day delivery throughout Ireland from our Bray County Wicklow office.",
  },
  {
    id: 6431,
    name: "Actyva Disciplina Gift Set",
    page_title: "Actyva Disciplina Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Actyva Disciplina Gift Set from Irish business BeautyFeatures and enjoy next day delivery throughout Ireland from our Bray County Wicklow office.",
  },
  {
    id: 6432,
    name: "Actyva Nuova Kit Gift Set",
    page_title: "Actyva Nuova Kit Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Actyva Nuova Kit Gift Set from Irish business BeautyFeatures and enjoy next day delivery throughout Ireland from our Bray County Wicklow office.",
  },
  {
    id: 6456,
    name: "Joico Blonde Life Shampoo & Conditioner Gift Set",
    page_title:
      "Joico Blonde Life Shampoo & Conditioner Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Joico Blonde Life Shampoo & Conditioner Gift Set from Guaranteed Irish retailer BeuatyFeatures.ie and enjoy next day delivery throughout Ireland.",
  },
  {
    id: 6457,
    name: "Joico Colorful Shampoo & Conditioner Gift Set",
    page_title:
      "Joico Colorful Shampoo & Conditioner Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Joico Colorful Shampoo & Conditioner Gift Set from Guaranteed Irish retailer BeuatyFeatures.ie and enjoy next day delivery throughout Ireland.",
  },
  {
    id: 6458,
    name: "Joico Defy Damage Shampoo & Conditioner Gift Set",
    page_title:
      "Joico Defy Damage Shampoo & Conditioner Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Joico Defy Damage Shampoo & Conditioner Gift Set from Guaranteed Irish retailer BeuatyFeatures.ie and enjoy next day delivery throughout Ireland.",
  },
  {
    id: 6459,
    name: "Joico Hydrasplash Shampoo & Conditioner Gift Set",
    page_title:
      "Joico Hydrasplash Shampoo & Conditioner Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Joico Hydrasplash Shampoo & Conditioner Gift Set from Guaranteed Irish retailer BeuatyFeatures.ie and enjoy next day delivery throughout Ireland.",
  },
  {
    id: 6460,
    name: "Joico JoiFull Volume Shampoo & Conditioner Gift Set",
    page_title:
      "Joico JoiFull Volume Shampoo & Conditioner Gift Set : BeautyFeatures.ie",
    meta_description:
      "Buy Joico JoiFull Volume Shampoo & Conditioner Gift Set from Guaranteed Irish retailer BeuatyFeatures.ie and enjoy next day delivery throughout Ireland.",
  },
];
(async function () {

  for (const product of data) {
    try {
      await updateProduct(product.id, {
        name: product.name,
        page_title: product.page_title,
        meta_description: product.meta_description
      })
      console.log(`updated ${product.name}`)
    } catch (err) {
      console.log(err)
      continue
    }
  }

})();
