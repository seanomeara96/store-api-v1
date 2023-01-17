(async () => {
  const { deleteProduct } = require("../../functions/products/deleteProduct");

  require("../../config/config").config("ds");

  const data = [
    {
      id: 134,
      url: "/babydan-premier-true-pressure-fit-safety-gate-black-73-5-79-6cm/",
    },
    { id: 135, url: "/babydan-flexi-fit-wooden-stair-gate-69-106-5cm/" },
    {
      id: 136,
      url: "/babydan-y-spindel-2-pack-allowing-pressure-gates-to-be-fitted-onto-stairs/",
    },
    { id: 137, url: "/babydan-configure-flex-gate-medium-black-90-146-cm/" },
    { id: 138, url: "/dreambaby-retractable-stair-gate-white-20-140cm/" },
    { id: 139, url: "/dreambaby-no-trip-gate-ramp/" },
    { id: 140, url: "/babydan-flexi-fit-metal-stair-gate-black-67-105-5cm/" },
    { id: 141, url: "/babydan-33-cm-extension-section-white/" },
    { id: 142, url: "/babydan-standard-extend-a-gate-kit-white-2-x-7cm/" },
    { id: 143, url: "/babydan-standard-extend-a-gate-kit-black-2-x-7cm/" },
    { id: 144, url: "/babydan-72cm-extension-section-black/" },
    {
      id: 145,
      url: "/babydan-premier-true-pressure-fit-safety-gate-white-73-5-79-6cm/",
    },
    { id: 146, url: "/babydan-configure-flex-gate-medium-white-90-146-cm/" },
    { id: 147, url: "/babydan-72cm-extension-section-white/" },
    { id: 148, url: "/babydan-multidan-metal-safety-gate-white-62-5-106-8cm/" },
    { id: 149, url: "/babydan-wall-mounting-kit-white/" },
    { id: 150, url: "/babydan-wall-mounting-kit-black/" },
    {
      id: 151,
      url: "/babydan-no-trip-wall-mounted-metal-safety-gate-white-72-5-78-5cm/",
    },
    { id: 152, url: "/babydan-flexi-fit-metal-stair-gate-white-67-105-5cm/" },
    { id: 153, url: "/babydan-multidan-beechwood-safety-gate-60-5-102cm/" },
    { id: 154, url: "/babydan-33-cm-extension-section-black/" },
    { id: 155, url: "/babydan-guard-me-auto-foldable-safety-guard-55-89cm/" },
    { id: 156, url: "/babydan-guard-me-14cm-ext-kit-ext-up-to-113-5cm/" },
    { id: 157, url: "/babydan-configure-flex-gate-large-white-90-223cm/" },
    { id: 158, url: "/babydan-no-trip-beechwood-71-5-78-5cm/" },
    {
      id: 159,
      url: "/babydan-danamic-pressure-indicator-gate-white-73-80-5cm-max-100/",
    },
    { id: 160, url: "/babydan-pet-gate-white-73-79-6cm-max-120/" },
    { id: 161, url: "/babydan-extend-a-gate-pet-gate-extension-white/" },
    { id: 162, url: "/scandinavian-pet-configure-extra-tall-gate-90-223cm/" },
    { id: 163, url: "/extra-tall-gate-extension-72cm-black/" },
    {
      id: 164,
      url: "/babydan-perfect-close-gate-white-77-3cm-83-5cm-max-110cm/",
    },
    {
      id: 165,
      url: "/babydan-danamic-narrow-pressure-fit-safety-gate-white-63-69-5cm/",
    },
    {
      id: 166,
      url: "/safetots-advanced-retractable-safety-gate-black-60-120cm/",
    },
    {
      id: 167,
      url: "/safetots-chunky-wooden-pressure-fit-stair-gate-natural-74-81cm/",
    },
    { id: 168, url: "/kidkusion-banister-guard/" },
    { id: 169, url: "/dreambaby-retractable-gate-spacers/" },
    { id: 170, url: "/fred-universal-stair-post-kit/" },
    { id: 171, url: "/fred-clear-view-stairgate-screw-fit-no-trip-75-100cm/" },
    { id: 172, url: "/fred-clear-view-stairgate-pressure-fit-76-96cm/" },
    {
      id: 173,
      url: "/babydan-quick-release-extra-tall-safety-gate-63-5-107cm/",
    },
    {
      id: 174,
      url: "/scandanavian-pet-design-extra-tall-pet-gate-63-5-107cm/",
    },
    { id: 175, url: "/babydan-46-cm-extension-section-white/" },
    { id: 176, url: "/babydan-46-cm-extension-section-black/" },
    { id: 177, url: "/babydan-20-cm-extension-section-white/" },
    { id: 178, url: "/babydan-20-cm-extension-section-black/" },
    {
      id: 179,
      url: "/babydan-3-in-1-playpen-room-divider-hearth-gate-black-90-350cm/",
    },
    { id: 180, url: "/babydan-extra-tall-gate-extension-72cm-black/" },
    {
      id: 181,
      url: "/safetots-advanced-retractable-safety-gate-white-60-120cm/",
    },
    {
      id: 183,
      url: "/bettacare-child-and-pet-and-cat-flap-matt-black-extra-tall-extension-12-9cm/",
    },
    {
      id: 184,
      url: "/bettacare-child-and-pet-and-cat-flap-matt-black-extra-tall-extension-32-4cm/",
    },
    {
      id: 185,
      url: "/bettacare-child-and-pet-and-cat-flap-matt-black-extra-tall-extension-6-4cm/",
    },
    {
      id: 186,
      url: "/bettacare-gate-with-lockable-cat-flap-matt-black-extra-tall-75-84cm/",
    },
    {
      id: 187,
      url: "/wooden-multi-panel-multi-use-safety-barrier-96-5-176-5cm/",
    },
    { id: 188, url: "/dreambaby-arizona-extenda-gate-white-67-112cm/" },
    { id: 189, url: "/dreambaby-ava-gate-9cm-wide-extension-charcoal/" },
    {
      id: 190,
      url: "/dreambaby-ava-metal-pressure-safety-gate-charcoal-75-82cm/",
    },
    {
      id: 191,
      url: "/dreambaby-brooklyn-converta-play-pen-room-divider-with-mesh-sides-85-5-375cm/",
    },
    { id: 192, url: "/dreambaby-chelsea-100cm-wide-gate-extension-white/" },
    { id: 193, url: "/dreambaby-chelsea-18cm-wide-gate-extension-white/" },
    { id: 194, url: "/dreambaby-chelsea-27cm-wide-gate-extension-white/" },
    { id: 195, url: "/dreambaby-chelsea-36cm-wide-gate-extension-white/" },
    { id: 196, url: "/dreambaby-chelsea-45cm-wide-gate-extension-white/" },
    { id: 197, url: "/dreambaby-chelsea-54cm-wide-gate-extension-white/" },
    { id: 198, url: "/dreambaby-chelsea-63cm-wide-gate-extension-white/" },
    { id: 199, url: "/dreambaby-chelsea-9cm-wide-gate-extension-white/" },
    { id: 200, url: "/dreambaby-chelsea-auto-close-gate-white-71-480cm/" },
    {
      id: 201,
      url: "/dreambaby-cosmopolitan-wood-metal-pressure-safety-gate-75-82cm/",
    },
    {
      id: 202,
      url: "/dreambaby-denver-adapta-gate-black-metal-with-grey-mesh-panels-85-5-210cm/",
    },
    {
      id: 203,
      url: "/dreambaby-y-spindle-banister-gate-adaptors-2-pack-fit-pressure-gate-to-stairs/",
    },
    {
      id: 204,
      url: "/dreambaby-protect-a-wall-mounting-cup-for-pressure-gates-only/",
    },
    { id: 205, url: "/dreambaby-retractable-gate-spacers-black/" },
    { id: 206, url: "/dreambaby-retractable-stair-gate-black-20-140cm/" },
    { id: 207, url: "/dreambaby-retractable-stair-gate-grey-20-140cm/" },
    {
      id: 208,
      url: "/babydan-new-perfect-close-safety-gate-77-3-83-5cm-max-110cm/",
    },
    { id: 209, url: "/bettacare-expandable-pet-barrier-natural-60-108cm/" },
    { id: 210, url: "/safetots-secure-fabric-gate-grey-79-5-96-5cm/" },
    { id: 211, url: "/safetots-simply-secure-wooden-gate-azure-blue-72-79cm/" },
    { id: 212, url: "/safetots-simply-secure-wooden-gate-grey-72-79cm/" },
    { id: 213, url: "/bettacare-deluxe-fit-any-car-adjustable-dog-barrier/" },
    {
      id: 214,
      url: "/safetots-chunky-wooden-screw-fit-stair-gate-grey-63-5-105-5cm/",
    },
    {
      id: 215,
      url: "/safetots-chunky-wooden-screw-fit-stair-gate-azure-blue-63-5-105-5cm/",
    },
    { id: 216, url: "/babydan-premier-extra-wide-up-to-151cm-white/" },
    { id: 217, url: "/babydan-premier-extra-wide-up-to-182cm-white/" },
    { id: 218, url: "/babydan-premier-gate-extension-32cm/" },
    {
      id: 219,
      url: "/babydan-extra-tall-extending-metal-pet-gate-white-62-5-106-8cm/",
    },
    {
      id: 220,
      url: "/babydan-extra-tall-extending-metal-pet-gate-black-62-5cm/",
    },
    {
      id: 221,
      url: "/dreambaby-broadway-gro-gate-extra-wide-white-fits-gaps-76cm-134-5cm/",
    },
    {
      id: 222,
      url: "/dreambaby-broadway-gro-gate-extra-tall-extra-wide-white-fits-gaps-76cm-134-5cm/",
    },
    {
      id: 223,
      url: "/safetots-chunky-wooden-screw-fit-stair-gate-natural-63-5cm-105-5cm/",
    },
    { id: 224, url: "/babydan-stair-post-adaptor/" },
    { id: 225, url: "/bettacare-pet-gate-plus-cat-flap-white-75cm-84cm/" },
    { id: 226, url: "/babydan-premier-gate-extension-64-5cm/" },
    {
      id: 227,
      url: "/babydan-premier-pressure-indicator-gate-white-86-5cm-92-6cm/",
    },
    {
      id: 228,
      url: "/babydan-premier-pressure-indicator-gate-white-99-5cm-105-6cm/",
    },
    {
      id: 229,
      url: "/babydan-premier-pressure-indicator-gate-white-112-5cm-118-6cm/",
    },
    {
      id: 230,
      url: "/babydan-premier-pressure-indicator-gate-white-151cm-157cm/",
    },
    {
      id: 231,
      url: "/babydan-premier-pressure-indicator-gate-white-182-5cm-188-6cm/",
    },
    {
      id: 232,
      url: "/babydan-premier-pressure-indicator-gate-black-86-5cm-92-6cm/",
    },
    {
      id: 233,
      url: "/babydan-premier-pressure-indicator-gate-black-99-5cm-105-6cm/",
    },
    {
      id: 234,
      url: "/babydan-premier-pressure-indicator-gate-black-112-5cm-118-6cm/",
    },
    {
      id: 235,
      url: "/babydan-premier-pressure-pet-gate-black-73-79-6cm-max-120/",
    },
    { id: 236, url: "/babydan-premier-pressure-pet-gate-extension-black/" },
    { id: 237, url: "/fred-universal-stair-post-dark-grey/" },
  ];

  const { log, clear } = console;

  for (const p of data) {
    log("deleting " + p.url);
    await deleteProduct(p.id, "https://www.babysafety.ie" + p.url).catch(log);
    log("deleted");
    clear();
  }
})();
