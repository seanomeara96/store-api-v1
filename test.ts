import { createRedirect } from "./functions/redirects/createRedirect";

const ahData = [
  { id: 214, old_url: "/redken-1/", new_url: "/brands-redken/" },
  { id: 224, old_url: "/mermade-hair-1/", new_url: "/brands-mermade-hair/" },
  { id: 286, old_url: "/shampoo-1/", new_url: "/redken-shampoo/" },
  { id: 350, old_url: "/treatment-2/", new_url: "/olaplex-treatment/" },
  { id: 348, old_url: "/shampoo-5/", new_url: "/olaplex-shampoo/" },
  { id: 351, old_url: "/bundles-3/", new_url: "/olaplex-bundles/" },
  { id: 349, old_url: "/conditioner-4/", new_url: "/olaplex-conditioner/" },
  { id: 216, old_url: "/nak-2/", new_url: "/brands-nak/" },
  { id: 191, old_url: "/nak-1/", new_url: "/all-other-brands-nak/" },
  { id: 215, old_url: "/kerastase-1/", new_url: "/brands-kerastase/" },
  { id: 328, old_url: "/shampoo-3/", new_url: "/loreal-pro-shampoo/" },
  { id: 332, old_url: "/bundles-2/", new_url: "/loreal-pro-bundles/" },
  { id: 329, old_url: "/conditioner-2/", new_url: "/loreal-pro-conditioner/" },
  { id: 290, old_url: "/styling-2/", new_url: "/kerastase-styling/" },
  { id: 292, old_url: "/hair-oils-1/", new_url: "/kerastase-hair-oils/" },
  { id: 287, old_url: "/bundles-1/", new_url: "/kerastase-bundles/" },
  { id: 315, old_url: "/shampoo-2/", new_url: "/joico-shampoo/" },
  { id: 305, old_url: "/moisture-1/", new_url: "/joico-moisture/" },
  { id: 316, old_url: "/conditioner-1/", new_url: "/joico-conditioner/" },
  { id: 189, old_url: "/gift-1/", new_url: "/gifts-travel-gift/" },
  { id: 336, old_url: "/treatment-1/", new_url: "/eleven-treatment/" },
  { id: 335, old_url: "/style-1/", new_url: "/eleven-style/" },
  { id: 333, old_url: "/shampoo-4/", new_url: "/eleven-shampoo/" },
  { id: 334, old_url: "/conditioner-3/", new_url: "/eleven-conditioner/" },
  { id: 203, old_url: "/styling-1/", new_url: "/eleven-styling/" },
  {
    id: 198,
    old_url: "/root-cover-up-1/",
    new_url: "/color-wow-root-cover-up/",
  },
  { id: 194, old_url: "/color-wow-1/", new_url: "/brands-color-wow/" },
  { id: 195, old_url: "/all-other-1/", new_url: "/color-wow-all-other/" },
  { id: 306, old_url: "/k-pak/", new_url: "/joico-k-pak/" },
  { id: 307, old_url: "/color-therapy/", new_url: "/joico-color-therapy/" },
  { id: 308, old_url: "/youth-lock/", new_url: "/joico-youth-lock/" },
  { id: 309, old_url: "/innerjoi/", new_url: "/joico-inner-joi/" },
  { id: 310, old_url: "/defy-damage/", new_url: "/joico-defy-damage/" },
  { id: 311, old_url: "/blonde-life/", new_url: "/joico-blonde-life/" },
  { id: 312, old_url: "/joifull/", new_url: "/joico-joi-full/" },
  { id: 313, old_url: "/hydrasplash/", new_url: "/joico-hydra-splash/" },
  { id: 314, old_url: "/colorful/", new_url: "/joico-colorful/" },
  { id: 319, old_url: "/metal-detox/", new_url: "/loreal-pro-/metal-detox/" },
  {
    id: 320,
    old_url: "/absolut-repair/",
    new_url: "/loreal-pro-absolut-repair/",
  },
  { id: 321, old_url: "/inforcer/", new_url: "/loreal-pro-inforcer/" },
  {
    id: 322,
    old_url: "/vitamino-colour/",
    new_url: "/loreal-pro-vitamino-color/",
  },
  { id: 323, old_url: "/silver/", new_url: "/loreal-pro-silver/" },
  { id: 324, old_url: "/tecni-art/", new_url: "/loreal-pro-tecni-art/" },
  { id: 326, old_url: "/pro-longer/", new_url: "/loreal-pro-pro-longer/" },
  {
    id: 327,
    old_url: "/curl-expression/",
    new_url: "/loreal-pro-curl-expression/",
  },
  { id: 330, old_url: "/mask/", new_url: "/loreal-pro-masks/" },
  { id: 331, old_url: "/style/", new_url: "/loreal-pro-styling/" },
  { id: 337, old_url: "/hydrate/", new_url: "/pureology-pure-hydrate/" },
  {
    id: 339,
    old_url: "/nanoworks-gold/",
    new_url: "/pureology-nanoworks-gold/",
  },
  { id: 340, old_url: "/strength-cure/", new_url: "/pureology-strength-cure/" },
  { id: 341, old_url: "/pure-volume/", new_url: "/pureology-pure-volume/" },
  {
    id: 342,
    old_url: "/smooth-perfection/",
    new_url: "/pureology-smooth-perfection/",
  },
  {
    id: 343,
    old_url: "/keep-my-color-keep-my-blonde/",
    new_url: "/eleven-keep-my-color-keep-my-blonde/",
  },
  { id: 344, old_url: "/smooth-me-now/", new_url: "/eleven-smooth-me-now/" },
  {
    id: 345,
    old_url: "/hydrate-my-hair/",
    new_url: "/eleven-hydrate-my-hair/",
  },
  {
    id: 346,
    old_url: "/miracle-hair-treatment/",
    new_url: "/eleven-miracle-hair-treatment/",
  },
  { id: 347, old_url: "/frizz-control/", new_url: "/eleven-frizz-treatment/" },
  { id: 352, old_url: "/giftsets/", new_url: "/olaplex-giftsets/" },
];

async function main() {
  try {
    require("./config/config").config("ah");
    for (const row of ahData) {
      await createRedirect(row.old_url, row.new_url)
    }
  } catch (err) {
    console.log(err);
  }
}

main();
