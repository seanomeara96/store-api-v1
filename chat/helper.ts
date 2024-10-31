import sqlite from "sqlite3";
import path from "path";

import csv from "csvtojson";
import OpenAI from "openai";
import { getProductBySku } from "../functions/products/getProductBySKU";
import { updateProduct } from "../functions/products/updateProduct";

require("../config/config").config("px");

async function main() {
  try {
    const store = "bf";
    require("../config/config").config(store);

    const data = [
      {
        sku: "20546",
        "part number": "KMU19493",
        barcode: 9339341037507,
        description:
          "Define, enhance, and refine naturally textured or permed hair with our NEW KILLER products! Enhance your hairâ€™s texture. This leave-in styler helps to define while keeping hair hydrated and protected against humidity and adding shine. Just twirl and go!BENEFITSHydrating &amp; nourishingRefines textureImproves shineIdeal for both naturally curly &amp; permed hairEnhances &amp; defines curlsSmooths curlsStrengtheningColour-safeVegan",
      },
      {
        sku: "20547",
        "part number": "KMU18612",
        barcode: 9339341037538,
        description:
          "NEW! Define, enhance, and refine naturally textured or permed hair with our NEW KILLER products! A nourishing Oat Milk shampoo that gently cleanses hair while protecting the cuticle. Its ingredients, rich in fatty acids, preserve the hairâ€™s strength and retain moisture to enhance texture for healthy, shiny hair.BENEFITSHydrating &amp; nourishingEnhances curl &amp; refines texture â€¢Ideal for both naturally curly &amp; permed hairSmooths curlsColour-safeVegan",
      },
      {
        sku: "20548",
        "part number": "KMU18611",
        barcode: 9339341037521,
        description:
          "NEW! Define, enhance, and refine naturally textured or permed hair with our NEW KILLER products!A nourishing Oat Milk conditioner that deeply hydrates and strengthens, diminishing the likelihood of breakage. Protects against colour fading and refines texture for soft and bouncy curls that are shiny and defined.BENEFITSHydrating &amp; nourishingRefines textureImproves shineIdeal for both naturally curly &amp; permed hairStrengtheningColour-safeVegan",
      },
      {
        sku: "20536",
        "part number": "KMU16557",
        barcode: 9339341020356,
        description:
          "100mlKevin Murphy Young Again is a daily leave-in treatment oil ideal for dry, damaged or ageing hair. Infused with immortelle and packed with antioxidants, this weightless treatment provides intense nourishment, leaving hair looking smoother and shinier, as well as helping to protect against environmental stressors and heat damage.Weightless, nutrient-rich oilPromotes elasticity and increases shineDeeply nourishing and conditioningIdeal for dry, damaged and ageing hairSulphate-, paraben- and cruelty-freeHow to use: Apply to freshly-washed, wet hair, before any styling products. A small amount can also be applied to dry hair to smooth flyaway hairs. Use with Young Again Wash, Young Again Rinse and Young Again Masque as part of the Kevin Murphy Anti-Ageing haircare regime.",
      },
      {
        sku: "20554",
        "part number": "KMU15770",
        barcode: 9339341018285,
        description:
          "150mlKevin Murphy Anti Gravity is an oil-free volumiser and texturiser for all hair types. Providing long-lasting weightless hold, you can create and maintain the perfect style, as well as control flyaway hairs.ï»¿Benefits:Increases volume, boosts body and adds shineLightweight and long-lastingSulphate-, paraben- and cruelty-freeHow to use: Apply to damp hair and style as desired or allow to dry naturally.",
      },
      {
        sku: "20555",
        "part number": "KMU16455",
        barcode: 9339341019541,
        description:
          "200mlKevin Murphy Angel Masque is a restorative at-home treatment ideal for fine, fragile, broken or colour-damaged hair. Designed to nourish and repair, your hair will be left feeling healthier, shinier and thicker.ï»¿Benefits:ï»¿Instantly restores the appearance of distressed, fine or damaged hairNourishing ingredients help restore, repair and strengthenAdds volume and fullnessSupports split endsColour-safe and gentle enough for all hair typesSulphate-, paraben- and cruelty-freeHow to use: MassageKevin Murphy Angel Masque into freshly-washed hairAllow to absorb for between 5-10 minutesFollow with a refreshing rinseFor optimal results, use after Angel Wash,and as part of the Kevin Murphy Volumehaircare plan",
      },
      {
        sku: "20544",
        "part number": "KMU16464",
        barcode: 9339341019602,
        description:
          "250mlKevin Murphy Plumping Rinse is a lavish conditioner that&#039;s specially formulated to boost the hairâ€™s thickness and volume as well as enhancing softness and shine. Brimming with hydrating ingredients, this nourishing conditioner protects and strengthens hair from root to tip.Hair feels thicker and softer, with added volume and bounceHair looks shinier and glossierIdeal for all hair types, especially fine and ageing hairSulphate-, paraben- and cruelty-freeHow to use: Apply to freshly-washed hair and allow to absorb for 1-2 minutes. Follow with a refreshing rinse. For best results, use after Plumping Wash and follow with Body Mass. Can be used daily and as part of the Kevin Murphy Thickening haircare regime.",
      },
      {
        sku: "20540",
        "part number": "KMU15320",
        barcode: 9339341016878,
        description:
          "250mlKevin Murphy Stimulate Me Wash is an invigorating daily shampoo for men. Containing camaphor crystals, bergamot and black pepper, this revitalising blend will awaken the hair and the senses.Stimulates the hair and scalpStrengthens and repairs the hairLeaves hair feeling fuller and thickerSuitable for all hair typesSulphate-, paraben- and cruelty-freeHow to use: ApplyKevin Murphy Stimulate Me Wash to wet hairDistribute all over hair and scalpMassage gentlyRinse wellFollow with Kevin MurphyStimulate Me Rinse andKevin Murphy Thick AgainCan be used daily",
      },
      {
        sku: "20569",
        "part number": "KMU17618",
        barcode: 9339341033677,
        description:
          "A concentrated foaming masque designed to relieve sensitive scalps and restore scalp health to promote healthier hair.PRODUCT HIGHLIGHTSRemoves dirt and excessive oils from the scalp to keep it fresh and healthy.For hydration and smoothing we use Hyaluronic Acid a skincare ingredient acts as a magnet for moisture helping to relieve dehydration.Celery Seed Extract soothes and hydrates an itchy scalp and can help to reduce impurities and regulate sebum production to help solve the problems associated with an irritated scalp.This calming, soothing and nourishing thick foaming masque does not weigh the hair down and can be used alone or in conjunction with the other members of the SCALP.SPA regimen.BENEFITSHelps relieve sensitive scalpsCalmsGently removes impurities for a clean, clear scalpBalances scalpSoothesNourishesWeightlessHOW TO APPLYShake well before each use. Part clean, damp or dry hair into sections and stripe along the scalp. Massage in and rinse after 20 minutes.",
      },
      {
        sku: "20570",
        "part number": "KMU16671",
        barcode: 9339341021407,
        description:
          "A lightweight and fast absorbing, leave-on treatment that provides targeted instant soothing and balancing relief to an irritated scalp.PRODUCT HIGHLIGHTSA gentle and safe serum for everyday or as needed use.Can help to reduce impurities and regulate sebum production to help solve the problems associated with a dry or oily scalp.Celery Seed Extract soothes and moisturises an itchy or irritated scalp.Witch Hazel Water helps to tighten and tone and holds balancing properties.Rose Flower Oil helps to promote the very best scalp health and lend problem solving attributes to a range of issuesBENEFITSBalancesCalmsSoothesNourishesWeightlessHOW TO APPLYUse as needed, part hair and apply to the areas of the scalp that need treating. May be used on damp or dry hair. Leave in.",
      },
      {
        sku: "20550",
        "part number": "KMU17156",
        barcode: 9339341022596,
        description:
          "Activated by the heat of your blow dryer, this lightweight spray creates smooth volume and lift for a blow dry that is soft to the touch. Helps lock out humidity for a longer lasting finish.• Anti-Frizz• Humidity Resistant• Creates Volume• Style Extender• Sulphate Free• Paraben Free• Cruelty FreeApply after shampooing and conditioning to towel dried hair. Separate hair into sections and spray liberally. Blow dry each section with the brush of your choice to activate the smoothing technology and increase longevity of style and volume. You can also use a hot tool to further enhance the shape of your style.",
      },
      {
        sku: "20593",
        "part number": "KMU17152",
        barcode: 9339341022565,
        description:
          "Activated by the heat of your blow dryer, this lightweight spray creates the ultimate silky, smooth blow dry with softness, volume and a frizz free finish.Anti-FrizzHumidity ResistantStyle ExtenderSulphate FreeParaben FreeCruelty FreeDirections for use: Apply after shampooing and conditioning to towel dried hair. Separate hair into sections and spray liberally. Blow dry each section with the brush of your choice to activate the smoothing technology and increase longevity of style. You can also use a hot tool to further enhance the shape of your style.",
      },
      {
        sku: "20592",
        "part number": "KMU17162",
        barcode: 9339341022633,
        description:
          "Activated by the heat of your blow dryer, this lightweight spray creates thicker fuller hair, that lasts. Helps lock out humidity to seal in a longer lasting blow dry.• Anti-Frizz• Humidity Resistant• Creates Thickness• Style Extender• Sulphate Free• Paraben Free• Cruelty FreeeApply after shampooing and conditioning to towel dried hair. Separate hair intosections and spray liberally. Blow dry each section with the brush of your choice to activate the smoothing technology and increase longevity of style. You can also use a hot tool to further enhance the shape of your style.",
      },
      {
        sku: "20565",
        "part number": "KMU16533",
        barcode: 9339341020202,
        description:
          "Add a little shimmer to your shine with a treatment spray that smells just as good as it looks. Lightweight finishing mist, with light reflective technology from high-end skincare, adds brilliant shine to the hair with no oily residue or added weight. SHIMMER.SHINE has a specially selected blend of ingredients from the Australian Rainforest, chosen for their ability to flourish in harsh climates, add elasticity and revive lackluster hair. Packed with Vitamins C and E, Baobab, Immortelle and Bamboo it’s a spritz of shimmering goodness for the hair.Infused with a nourishing blend of Australian Fruit ExtractsAdds instant, radiant shine and a sublime scentHelps counteract dull, flat colour – even on dark tonesNourishing and moisturisingSuitable for all hair typesSulphate, paraben and cruelty-freeTWIRL. SPRAY. SHINE. Spray onto damp, towel-dried hair or directly onto dry hair. Do not rinse; leave to dry naturally or style as desired.",
      },
      {
        sku: "20596",
        "part number": "KMU18355",
        barcode: 9339341035565,
        description:
          "As the name implies…this is BODY in a bottle. Created using eyelash thickening and lengthening technology, BODY.MASS helps strengthen the hair, while imparting a fullness and thickness that gives you beautiful body and bounce. Richly formulated with Oleanolic Acid, our leave-in plumping treatment helps fortify and strengthen at the roots to help prevent hair ageing.Helps to strengthen and fortify hair from root to tipBoosts thickness for increased body and bounceHelps increase microcirculation to the scalpProvides thermal protection against styling damage up to 420FIdeal for all hair types, especially fine, ageing and thinning hairSulphate, paraben and cruelty-freePREP. SPRAY. STAY. Prep hair with PLUMPING.WASH and RINSE, from our THICKENING regimen, and towel dry. Spray BODY.MASS evenly throughout damp or towel dried hair, concentrating on the roots and scalp. Do not rinse, dry and style as usual.",
      },
      {
        sku: "20584",
        "part number": "KMU16202",
        barcode: 9339341018582,
        description:
          "Beat the heat with our best defense: HEATED.DEFENSE. Our weightless, invisible leave-in foam promises to protect your hair against heated tools and mechanical damage up to 232℃ / 450℉.Weightless leave-in foam provides heat protection up to 232℃ / 450℉Reduces damage while conditioning and smoothingStrengthens and soothes hair, creating a protective barrier with essential moisturising agentsApply to damp or dry hair prior to styling with heated tools. Use alone or layer with other products and style as desired.",
      },
      {
        sku: "20549",
        "part number": "KMU17818",
        barcode: 9339341034902,
        description:
          "Bond-building colour protective treatment.Lightweight leave-in spray that treats hair from the inside, building strength from within to increase hair resistance for improved, stronger and healthier hair. Preserves colour vibrancy and protects hair from environmental stressors while nourishing, hydrating and repairing.Acidic pH Leave-InColour-lockingBond-buildingCreates shineEnvironmental ProtectionRepairs & StrengthensDetanglingSPRAY.COMB.LEAVE. Spray onto wet hair, comb through and leave-in. For best results, use with the entire EVERLASTING.COLOUR regimen",
      },
      {
        sku: "20591",
        "part number": "KMU17817",
        barcode: 9339341034896,
        description:
          "Colour protect conditioner with pH sealing technology.A colour-locking conditioner forms a protective layer to guard against colour loss and environmental stressors, while pH balancers help create shine and improve hair’s condition, softness, and hydration while reducing damage and never weighing down the hair.Acidic pH conditionerColour-lockingCreates shineRestores conditionNourishes & HydratesWeightlessAPPLY.ABSORB.RINSE. Apply to freshly washed hair, leave for 1-2 minutes and rinse. For best results, use with the entire EVERLASTING.COLOUR regimen.",
      },
      {
        sku: "20590",
        "part number": "KMU17816",
        barcode: 9339341034896,
        description:
          "Colour protect shampoo with pH sealing technology.A sulphate-free pH balanced shampoo gently cleanses and closes the cuticle for a shine that helps to lock colour in while protecting hair strands from hard water mineral accumulation to guarantee brilliance.Acidic pH shampooColour-lockingCreates shineProtects against hard water mineralsNourishes and HydratesWeightlessWASH.RINSE.REPEAT. Apply to wet hair and massage into hair and scalp. Rinse and repeat. For best results, use with the entire EVERLASTING.COLOUR regimen.",
      },
      {
        sku: "20564",
        "part number": "KMU18609",
        barcode: 9339341036050,
        description:
          "Dual purpose SMOOTH.AGAIN delivers all the benefits of a hard-working styling product, alongside the smoothing and nourishing benefits of a treatment. Our leave-in smoothing treatment helps eliminate frizz, leaving you with smoother, silkier more touchable hair.Provides, long-lasting hydration Helps nourish and protect the hairHelps smooth and control frizzIdeal for thick, coarse, and unruly hairSulphate, paraben and cruelty-freeAPPLY. SMOOTH. STYLE. Apply SMOOTH.AGAIN to towel-dried hair and style as desired. For optimal results, use after SMOOTH.AGAIN.WASH and RINSE, and as part of our SMOOTH regimen.",
      },
      {
        sku: "20551",
        "part number": "KMU17159",
        barcode: 9339341022619,
        description:
          "EVER.BOUNCE packed with our Phyto-Nutrient Complex is a lasting hold heat-activated style extender. Try the EVER.BOUNCE Signature Dry and create smooth body with bounce when activated by heat. Perfectly matched with our FRENCH.DISCO Elevation.• Anti-Frizz• Humidity Resistant• Creates Bounce• Style Extender• Sulphate Free• Paraben Free• Cruelty FreeApply after shampooing and conditioning to towel dried hair. Separate hair intosections and spray liberally. Blow dry each section with the brush of your choice to activate the smoothing technology and increase bounce and longevity of style. You can also use a hot tool to further enhance the shape of your style.",
      },
      {
        sku: "20588",
        "part number": "KMU571",
        barcode: 9339341010357,
        description:
          "Give fine, limp hair a boost while soaking up any excess dirt and oils along with all your sins from the night before. FRESH.HAIR, our hardworking dry shampoo, instantly freshens and deodorises to transform hair back to fresh, bouncy locks – it’s the ideal way to boost hair having a midday meltdown.Lessening our environmental footprint, and creating products that are kind to the planet is at the heart of everything we do at KEVIN.MURPHY. For every can of FRESH.HAIR sold, a financial contribution will be made to help reduce global carbon emissions.Instantly refreshes and removes odoursFreshens up lifeless hairRemoves excess product from the hairSuitable for all hair typesSulphate, paraben and cruelty-freeSHAKE. SHAKE. SPRAY. Shake well, and spray lightly over dry hair, rub into the hair and brush through.",
      },
      {
        sku: "20579",
        "part number": "KMU15779",
        barcode: 9339341018339,
        description:
          "Have you heard? Curl is the new cool-girl calling card. Our new weightless wave enhancer is your ‘one stop shop’ for adding volume, texture and definition to your curls and waves. Perfect for that naturally effortless look you’ve been dreaming of, KILLER.WAVES moisturises and maintains your locks while fighting frizz, adding strength, and offering overall protection and manageability for your ‘doo.Enhances and perfects wavy and curly hairReduces frizzTreats while stylingDoes not weigh hair downIdeal for fine and damaged, wavy and curly hairSpray onto damp, towel-dried hair prior to styling. Use alone or layer with other products and style as desired!",
      },
      {
        sku: "20571",
        "part number": "KMU16668",
        barcode: 9339341021384,
        description:
          "Help beautify, purify and detoxify your scalp. Our SCALP.SPA regimen treats your hair and scalp as gently as you would your skin. This unique exfoliating scrub is designed to gently scrub away impurities from the scalp and hair follicle to provide the foundation for optimal scalp health and hair growth. Safe for all hair types, can be used as a body scrub.Gently cleansesRemoves impurities from the scalpExfoliatesRevives an irritated scalpBalancesApply to wet hair and, use your fingertips in circular motions to massage your scalp and roots of your hair. Rinse and follow with SCALP.SPA WASH. For optimal results, follow with the WASH, RINSE or MASQUE of your choice, style as desired.",
      },
      {
        sku: "20598",
        "part number": "KMU18575",
        barcode: 9339341035985,
        description:
          "Hydrolysed Pea Protein and our Wood Bark Complex work together to help strengthen and protect hair against breakage with added protection against heat damage. A sulphate-free wash that hydrates while repairing and nourishing.• Hydrating• Nourishing• Strengthening• Heat protection• Colour safe• Smoothing• Safe for everyday useDirections: Apply to wet hair and massage into hair and scalp. Rinse and repeat. For best results style with a BLOW.DRY EVER by KEVIN.MURPHY styling product of choice.",
      },
      {
        sku: "20553",
        "part number": "KMU15353",
        barcode: 9339341017219,
        description:
          "Kevin Murphy Cool Angel is the perfect conditioning treatment for platinum, silver, crystal, ash and natural grey tones. With pigments to enhance cooler shades and neutralise red, orange or brassy hues, your hair will have an added edge with high shine and longer-lasting colour.How to use: Apply to freshly-washed hair and allow to absorb for 3-5 minutes. Follow with a refreshing rinse.250ml",
      },
      {
        sku: "20552",
        "part number": "KMU15425",
        barcode: 9339341017677,
        description:
          "Kevin Murphy Easy Rider is an anti-frizz styling crÃ¨me, designed to nourish the hair for a sleek, smooth finish with flexible hold.Controls frizz and activates curlHelps thicken fine hair, and soften thick hairIdeal for all hair typesSulphate-, paraben- and cruelty-freeHow to use: Apply directly to damp or dry hair, style as desired.100g",
      },
      {
        sku: "20545",
        "part number": "KMU15418",
        barcode: 9339341017745,
        description:
          "Kevin Murphy Maxi Wash is a detoxifying shampoo that uses a blend of essential oils to gently remove build-up of unwanted products and minerals. Designed to refresh the hair and scalp, it provides a thorough cleanse without stripping the hair of essential oils.Removes product and mineral build-upDetoxifies and stimulates sluggish scalpsIdeal pre-colour treatment shampooSulphate-, paraben- and cruelty-freeHow to use: Apply to wet hair, distributing all over hair and scalp, and massage gently (do not scrub). Leave for one minute and rinse.250ml",
      },
      {
        sku: "20543",
        "part number": "KMU16567",
        barcode: 9339341020448,
        description:
          "Kevin Murphy Restore is a powerful repairing treatment for dry, damaged or frizzy hair. The third step of the Kevin Murphy Repair treatment process, Restore is packed with amino acids, proteins and enzymes to help rebuild hairâ€™s elasticity, strength and moisture.Non-foaming treatment to cleanse, repair and replenishHair looks and feels smoother and strongerEnhances manageability and shineIdeal for all hair types in need of repairSulphate-, paraben- and cruelty-freeHow to use: For optimal results, use 1-2 times per week as a substitute for shampoo and conditioner. Should be used as part of the Kevin Murphy three-part Repair haircare regime. Use Kevin Murphy Repair Me Wash and Repair Me Rinse for two consecutive washes, then replace both with Restore for the third wash.",
      },
      {
        sku: "20541",
        "part number": "KMU16217",
        barcode: 9339341018735,
        description:
          "Kevin Murphy Shimmer Me Blonde is a finishing treatment spray that adds luminous shine to blonde hair. Created with a blend of fruit extracts, colour-enhancers and brighteners, this lightweight mist adds brilliant shimmer and radiant shine to highlighted blonde or grey shades.Adds instant, radiant shine and a sublime scentHelps counteract yellow and golden tonesNourishing and moisturisingSuitable for all hair typesSulphate-, paraben- and cruelty-freeHow to use: Spray onto damp or towel-dried hair, or directly onto dry hair. Do not rinse. Style as desired or allow to dry naturally.",
      },
      {
        sku: "20539",
        "part number": "KMU564",
        barcode: 9339341010302,
        description:
          "Kevin Murphy Touchable is a finishing spray wax providing natural hold for messy, casual looks, without creating stickiness. Enriched with flower extracts, this product conditions and nourishes the hair, for a style that smells as good as it looks! Suitable for all hair types.How to use: Shake well before each use. Apply to dry hair to finish your style.250ml",
      },
      {
        sku: "20538",
        "part number": "KMU15403",
        barcode: 9339341017387,
        description:
          "Kevin Murphy Untangled is a leave-in conditioner that helps to detangle and strengthen all hair types. Containing a blend of nourishing fruit extracts, this nourishing spray will restore the hair to sleek perfection as well as providing heat protection for styling.Restores, strengthens and retains moisture in the hairSuitable for all hair typesSulphate-, paraben- and cruelty-freeHeat protectionHow to use: Spray directly onto wet hair, wait 5-10 seconds and comb through.150ml",
      },
      {
        sku: "20537",
        "part number": "KMU621",
        barcode: 9339341011644,
        description:
          "Kevin Murphy Young Again Dry Conditioner is great for reviving and conditioning hair between washes. Deeply nourishing ingredients such as sunflower seed extract and babassu oil will condition your hair leaving ithealthy-looking.Benefits:Revive your hair in between washesAdds shineRevives dullnessSmoothes out lengths and endsFresh styled look straightaway",
      },
      {
        sku: "20535",
        "part number": "KMU16450",
        barcode: 9339341019473,
        description:
          "Kevin Murphy Young Again Masque is a nourishing and restorative at-home treatment ideal for dry, damaged and ageing hair. Packed with amino acids, essential oils and rich moisturising ingredients, this masque deeply conditions the hair to restore lustre, shine and body.Antioxidant-rich blend repairs the hairReplenishes moisture and softens the hairAnti-ageing ingredients give hair a more youthful lookIdeal for dry, damaged and ageing hairSulphate-, paraben- and cruelty-freeHow to use: Massage into freshly-washed, wet hair and allow to absorb for 5-10 minutes. Follow with a refreshing rinse. For optimal results, use after Young Again Wash,and as part of the Kevin Murphy Anti-Ageinghaircare regime.200ml",
      },
      {
        sku: "20568",
        "part number": "KMU16352",
        barcode: 9339341018889,
        description:
          "Luxurious hair always begins with a healthy scalp! A specially formulated shampoo designed with Micellar Water & Celery Seed Extract to soothe and cleanse the scalp; leaving the hair feeling clean and moisturised. Safe for all hair types, including coloured hair.CalmsBalances scalpSoothesNourishesApply the SCALP.SPA WASH to wet hair following the SCALP.SPA SCRUB. Lather gently from root to tip, and rinse. Kevin recommends following with the WASH, RINSE or MASQUE of your choice, style as desired.",
      },
      {
        sku: "20599",
        "part number": "KMU18576",
        barcode: 9339341035992,
        description:
          "Our Anti-Breakage Technology works together to nourish and protect hair with added protective benefits against heat damage*. A repairing and nourishing conditioner that forms a protective layer that guards against colour loss and environmental stressors.• Hydrating• Nourishing• Strengthening• Heat protection• Colour safe• Smooths• Safe for everyday useDirections: Apply to freshly washed hair, leave for 1-2 minutes and rinse. For best results style with a BLOW.DRY by KEVIN.MURPHY styling product of choice.Ingredients: Wood Bark ComplexA powerhouse of Australian derived plant and bark extracts from Blue Cypress, White Cypress and Lemon Aspen behave like an AHA to gently protect, while water soluble phyto-acids help to create resilience. Rice Bran OilCreates a natural shine and helps repair dryness, damage, brittleness and contributes to strength. Shea ButterA moisturiser that helps hydration to increase softness while having natural antioxidant properties. Rice Amino AcidsPenetrate the hair shaft and can help bind moisture to hair and contribute to soft and healthy, strengthened hair.",
      },
      {
        sku: "20574",
        "part number": "KMU16524",
        barcode: 9339341020141,
        description:
          "Repair, renew and restore dry, damaged, frizzy over-processed hair with REPAIR.ME.RINSE, our deeply nourishing and strengthening conditioner that helps reconstruct and repair the hair. Packed with a powerhouse of ‘soft-state proteins’ and enzymes, REPAIR-ME.RINSE delivers gentle lubrication to the hair, while helping to restore and protect against future damage.A power-packed blend of proteins and enzymesHelps nourish, restore and replenish the hairHelps hair look and feel smoother and strongerEnhances manageability and shineIdeal for all hair types in need of targeted repairSulphate, paraben and cruelty-freeAPPLY. ABSORB. RINSE. Apply to freshly washed hair and allow the hair to absorb the benefits for 1-2 minutes, follow with a refreshing rinse. For optimal repairing results, use after washing with REPAIR.ME.WASH, and as part of our 3-part system from the REPAIR regimen.Note: You might not need to wash your hair daily, but remember to always use REPAIR-ME.WASH and RINSE for two consecutive washes even if they are apart, and then replace both with RE.STORE for the thirdwash.",
      },
      {
        sku: "20542",
        "part number": "KMU18360",
        barcode: 9339341007241,
        description:
          "Size: 100mlKevin Murphy Session Spray is the ultimate finishing spray delivering long-lasting, weightless hold. Enriched with natural oils itâ€™s perfect for setting any look, providing humidity resistance and brushing out easily.Weightless, firm holdHumidity resistantSuitable for all hair typesSulphate-, paraben- and cruelty-freeHow to use: Hold about 15cm away and spray a fine mist onto the hair. Allow a few seconds to dry, then shape/style as desired. Spray again to set in place.",
      },
      {
        sku: "20595",
        "part number": "KMU15350",
        barcode: 9339341006183,
        description:
          "DescriptionWhy we love it:Illuminate your hair with Kevin Murphy CRYSTAL.ANGEL! This treatment adds a lustrous top coat with a lip gloss-like shine. Moisturise, enhance, and refresh for hair that gleams with health!How it works:Specially selected pigments enhance existing tones while neutralising unwanted ones, ensuring longer-lasting colour without buildup. How to use:Glowing hair, made easy. Shampoo as usual and apply to wet hair from roots to ends. Let it work its magic for 3-5 minutes. Rinse thoroughly, style as desired, and let your hair shine! For best results:Start your regime with your favourite KEVIN.MURPHY Shampoo.Benefits include:Illuminates dull, lifeless hair, promoting shine and lusterRemoves unwanted tones, revealing hair's true brillianceSuitable for all hair types and colors – perfect for everyoneInfused with natural goodness for hair that gleams with healthVegan-friendly, sulfate, paraben, and cruelty-free – a stylish choice!",
      },
      {
        sku: "20559",
        "part number": "KMU15313",
        barcode: 0,
        description:
          "Is it a paste? Is it a gel? No… it’s SUPER.GOO. Packed with super-hero qualities to create a firm-holding, rubbery-gel that dries to a slick natural finish. Super-defined texture and style are created from our no-flake, water-soluble setting and moulding gel, that not only enhances volume and hold, but doubles up as a great curl enhancer.",
      },
      {
        sku: "20556",
        "part number": "KMU16471",
        barcode: 9339341019657,
        description:
          "ANTI-AGEING, RESTORATIVE AND SOFTENING SHAMPOOPut youthful body and bounce back into brittle, damaged hair with a nourishing boost of YOUNG.AGAIN.WASH. An essential part of our REJUVENATE regimen, our restorative shampoo delivers a nourishing complex of Amino Acids alongside ingredients selected specifically for their known rejuvenating benefits. The end result will be renewed, youthful-looking lustre, and hair that looks and feels young again.",
      },
      {
        sku: "20557",
        "part number": "KMU16473",
        barcode: 9339341019671,
        description:
          "ANTI-AGEING, RESTORATIVE AND SOFTENING CONDITIONERTreat your hair to the feeling of youth with our nourishing YOUNG.AGAIN RINSE. This luxurious conditioner helps restore youthful lustre to dry, brittle or damaged hair, and delivers a unique complex of Amino Acids, essential oils and known rejuvenating ingredients to smooth frizz and impart shine – leaving the hair looking and feeling young again.",
      },
      {
        sku: "20558",
        "part number": "KMU16551",
        barcode: 9339341020318,
        description:
          "itrus Flavonoids, Ginger Root Nettle and Parsley extracts, will thicken hair and prevent breakage. Rich in Oleanic acid that helps to fortify and strengthen the hair at the root to prevent thinning and falling hair. Paraben free. How to use: Concentrating on the roots and scalp, spray all through damp or towel dried hair. Do not rinse.Effective at best when paired with the Kevin Murphy Stimulate me system, but can also be used on hair treated with other products. Benefits: Stimulates hair growth, Thickening, Strengthening, Fortifying, Prevention of thinning & falling hair.Key IngredientsParsley ExtractsContains a concentrated amount of Apigenin, which increases blood flow to the scalp, promoting healthy and strong hair. Stimulates hair growth whilst it lengthens the growing phase. Naturally occurring Apigenin is a bioflavonoid, which maintains the walls of small blood vessels therefore increasing circulation. This natural antioxidant and anti-inflammatory encourages hair growth and thickness. It also promotes the adhesive proteins at the root junction, thereby increasing the anchoring power and preventing hair loss. Biotinoyl Tripeptide-1Derived from the technology used in eyelash thickening and lengthening, Biotinoyl Tripeptide-1 repairs and strengthens by penetrating the hair to help close split ends. They help to swell the hair shaft which give the impression of thicker hair. Add body and fullness. Amino acids go much deeper into the cortex of the hair supplying a blend of moisturising ingredients to the hair to promote softness and shine. Nettle ExtractCleans and stimulates the scalp to help stop hair loss and provide optimum condition for healthy hair growth. Fortifies hair fibers and helps oxygenate the hair follicles. Oleanolic Acid from Lovely Hemslaya RootFights follicle ageing by fortifying the roots. Possesses antioxidant properties, which have a beneficial e≠ect on the hair, making it stronger and less susceptible to loss. It’s anti inflammatory properties aid in reversing and preventing the damage caused by DHT. Blue Lotus Flower ExtractIncreases the natural shine of damaged hair while adding volume and body as well as elasticity to brittle hair. Hydrolysed Wheat ProteinSoftens the surface of the hair to enhance shine and manageability.#Intensive treatments #To give volume to your hair #Thinned Reviews (4)Write a review",
      },
      {
        sku: "20560",
        "part number": "KMU15321",
        barcode: 9339341016861,
        description:
          "STIMULATING AND REFRESHING CONDITIONER FOR HAIR AND SCALPAn invigorating conditioner for men, bursting with revitalising freshness. STIMULATE-ME.RINSE delivers a stimulating blend of Camphor Crystals, Bergamot and Black Pepper that helps soothe and cool the hair and scalp, while strengthening and nourishing the hair.",
      },
      {
        sku: "20561",
        "part number": "KMU15401",
        barcode: 9339341017400,
        description:
          "So much more than a 70’s pop song…STAYING.ALIVE is our high-performance leave-in, oil-free treatment, thatinstantly helps repair damaged or colour-treated hair. Enriched with silk proteins to help smooth and repair damage,and packed with antioxidants, this weightless mist of goodness promotes elasticity in the hair and helps overcomedryness, while teasing its way through tangles with ease.",
      },
      {
        sku: "20562",
        "part number": "KMU60000",
        barcode: 9339341060000,
        description:
          "Tame unruly tresses, and fight back against frizz with our targeted smoothing shampoo, SMOOTH.AGAIN.WASH. This smooth operator will nourish and refine thick, coarse and unruly hair, delivering all-over softness and a stronger, smoother, shinier-looking finish.A rich blend of beneficial oils and buttersHelps nourish and protect the hairHelps hair look and feel soft and smoothHelps smooth and control frizzIdeal for thick, coarse, and unruly hairSulphate, paraben and cruelty-freeWASH. RINSE. REPEAT – Apply to wet hair and massage gently through the hair and scalp. Rinse. Follow with SMOOTH.AGAIN RINSE. Can be used daily, and as part of our SMOOTH regimen.",
      },
      {
        sku: "20563",
        "part number": "KMU60031",
        barcode: 9339341016717,
        description:
          "SMOOTHING CONDITIONER FOR THICK, COARSE HAIRSmoothly does it - thanks to our targeted smoothing and refining conditioner SMOOTH.AGAIN.RINSE. Created to nourish and smooth thick, coarse hair using ion-based cationic technology, Keratin Proteins mimic the structure of hair’s natural proteins to seamlessly smooth and refine where needed the most. This hardworking smoothing conditioner also provides a layer of protection to help seal torn, split ends, and reduces the appearance of frizz.",
      },
      {
        sku: "20566",
        "part number": "KMU18362",
        barcode: 9339341035619,
        description:
          "Why we love it:Introducing Kevin Murphy SESSION.SPRAY FLEX – your ultimate solution for achieving a flexible, natural-looking hold that defies crunchiness. Fall in love with a lightweight finishing hairspray that transforms your styling experience and breathes life back into your hair. With Kevin Murphy SESSION.SPRAY FLEX, embrace a hairspray that elevates your style and empowers you to rock your look with confidence.How it works:A dynamic formula designed to provide you with the ideal balance between hold and flexibility. Enriched with nature's best, including olive leaf extract for strength, grape seed oil for moisture and shine, and green tea extracts for resilience and elasticity, this hairspray offers more than just hold. It's your secret weapon against frizz, static, and flakes, allowing you to embrace styles that truly embody your uniqueness.How to use it: Shake the bottle before use to activate the powerful formula. Spray the lightweight mist onto your dry hair. Allow a few seconds for it to dry, experiencing the transformation from spray to fully flexible finish.",
      },
      {
        sku: "20567",
        "part number": "KMU18361",
        barcode: 9339341035602,
        description:
          "Kevin murphy Styling Session spray 400mlThis aerosol provides a firm, weightless lasting hold with natural fragrance oils and a UV shield for colour protection. Firm hold styling resins provide intense hold and memory with excellent resistance against high humidity, allowing brush ability with no flakiness.Benefits: Weightless hold, Firm hold, UV shields protect colour, Great memory, Humidity resistant.How to use: Dispense fine mist 16 cm from hair to achieve desired hold.",
      },
      {
        sku: "20572",
        "part number": "KMU15429",
        barcode: 9339341017639,
        description:
          "Kevin murphy Styling Rough rider 100gr  Strong hold clay to create a matte defined look. Infused with Soya Bean Extracts and Golden Bamboo to seal ends and provide strength.Benefits: Strong hold, Matte & defined look, Adds softness and shine, Strengthening, Moisturising, Maintenance to scalp’s health, Antioxidant richHow to use:Rub a small amount between palms and distribute evenly through damp or dry hair.",
      },
      {
        sku: "20573",
        "part number": "KMU16519",
        barcode: 9339341020103,
        description:
          "Kevin Murphy Shampoo Repair me wash 250ml - Restorative shampooReconstructing shampoo with powerful protein from Bamboo and Silk Amino Acids, strengthens hair while gently removing impurities.How to use: Apply to wet hair and massage into hair and scalp. Rinse and repeat. For optimal results, follow with REPAIR-ME.RINSE.Benefits: Sulphate Free, Nourishing, Restorative, Paraben Free, Replenishing, Strengthening, Moisturising, Smoothing, RepairingKey IngredientsPapayaAnti-ageing and anti-inﬂammatory properties that work to smooth the surface of the hair and increase shine.Silk Amino AcidsAmino Acids have a profound e≠ect on hair growth and cellular renewal.Bamboo Leaf ExtractRestores the hair by binding to the hair shaft to increase shine and manageability.Green Pea ProteinA superfood rich in Amino Acids that intensely nourishes and replenishes the hair.",
      },
      {
        sku: "20575",
        "part number": "KMU16461",
        barcode: 9339341019589,
        description:
          "Plump up in all the right places, and take your hair to a whole new level of volume and thickness with PLUMPING.WASH. Created to nourish every strand from root to tip, fine and ageing hair will transform into stronger, fuller-looking locks with renewed strength and vitality. Benefits: Thickens without weighing down the hair, Stimulates circulation in the scalp while nourishing the hair follicles,Helps to maintain the integrity of your hair’s health, Creates volume, while delivering softness and shine, Ideal for all hair types, especially fine and ageing hair, Sulphate, paraben and cruelty-free. Ingredients: Extracts of Ginger Root and Nettle help to strengthen and densify fine hair, leaving the scalp feeling revitalised and refreshed.Known for its strengthening properties, and rich with antioxidants, Lovely Hemsleya Root helps fortify the roots and fight follicle ageing.Aloe Vera Leaf Extract – Packed with essential vitamins and minerals, this natural conditioning agent helps to restore sheen, lustre and shine.Rice Protein & Rice Amino Acids are rich in vital nutrients essential for hair repair. Rice Amino Acid helps condition, strengthen and expand the diameter of the hair shaft. Also helps the hair appear thicker, and adds an overall more luxurious, silky sheen.Packed with an abundance of antioxidant and vitamin goodness, Bamboo Extract is also a rich source of mineral nourishment, and a key ingredient to help protect the integrity of hair health.Richly conditioning and moisturising, Silk Amino Acids help to improve hydration and draw in moisture for hair that appears more flexible, manageable and softer.Acai Berry Extract, known for its anti-ageing benefits, is an antioxidant packed “super-fruit” with essential vitamins to add luminous  shine. How to use: WASH. RINSE. REPEAT – Apply to wet hair and massage gently through the hair and scalp. Rinse. Follow with PLUMPING.RINSE. Can be used daily, and as part of our THICKENING regimen.",
      },
      {
        sku: "20576",
        "part number": "KMU15427",
        barcode: 9339341017653,
        description:
          "Kevin murphy Styling Night rider 100gr - Matte texture paste strong holdProvides a tough hold and a rough matte texture for short or choppy looks. This product has the advantage of being easy to get from the jar and sets on contact. It gives you a little time to work the look then it sets.How to use: Rub a small amount between palms and distribute evenly through damp or dry hair.Benefits: Strong hold, Matte texture",
      },
      {
        sku: "20577",
        "part number": "KMU15782",
        barcode: 9339341018353,
        description:
          "The ideal product to create light and soft waves. Enhances richness and controls frizz for a flexible hold and natural shine. Ideal for defining curls in long and thin hair. Sulfate-free, paraben-free and cruelty-free.",
      },
      {
        sku: "20578",
        "part number": "KMU16216",
        barcode: 9339341018728,
        description:
          "Kevin Murphy Leave-in Repair 200ml - nourishing leave-in treatmentKevin Murphy Leave-in Repair is a lightweight, no-rinse balm that reduces hair breakage by making it stronger.Its formula acts in the most damaged and weak hair areas restructuring and reinforcing it in depth thanks to hydrolysed keratin, papain (extracted from papaya). Geranium extracts add antioxidants, while the hydrolysed protein of peas and Jojoba seed oil bring a moisturizing and smoothing action. In the end, the extract of bamboo leaves gives shine and natural brilliance. Paraben free and cruelty free product. How to use:After washing your hair with your favorite Kevin Murphy shampoo (best with Kevin Murphy Repair me Wash and Rinse), apply Kevin Murphy Leave-in Repair on damp or towel-dried hair. Do not rinse and proceed to styling.",
      },
      {
        sku: "20580",
        "part number": "KMU16215",
        barcode: 9339341018711,
        description:
          "LEAVE-IN ANTI-FRIZZ DEFINING CRÈME FOR CURLY AND COILY HAIRThis is one killer anti-frizz curl definer that will put the spring back into sad, straggly curls. KILLER.CURLS, our antioxidant rich, leave-in anti-frizz defining crème, helps to activate curls while adding essential moisture to throw out the frizz. Curls look and feel natural and soft, as KILLER.CURLS delivers the ideal balance of strong hold and elasticity to the hair.",
      },
      {
        sku: "20581",
        "part number": "KMU15386",
        barcode: 9339341017554,
        description:
          "Kevin Murphy Hydrate Me Wash 250ml Hydrating shampoo Quench dull, parched and dry hair, with a nourishing hydration pick-me-up. HYDRATE-ME.WASH is our super-smoothing, hydrating WASH that will replenish hair with much needed moisture. Ideal for hair that’s naturally dry, or exposed to harsh, dry climates, it’s packed with antioxidant goodness to help restore a healthy glow to parched locks. Benefits: Antioxidant-rich blend helps boost hydration,Helps add essential moisture and shine, Helps smooth the hair and delivers a silky-soft feel, Packed with vitamins and nourishing oils, Ideal for normal to dry hair, Sulphate, paraben and cruelty-free. Ingredients: Native to Australia’s Northern Territory, Kakadu Plum has the highest concentration of natural Vitamin C of any known plant. Helps smooth the surface of the hair to lock in essential moisture. Antioxidant Vitamin A smoothes the appearance of the hair shaft, and helps increase elasticity. An effective antioxidant, Vitamin C is a natural source of goodness for the hair.Shea Butter delivers moisture to dry or damaged hair from root to tip, and helps repair and protect against environmental stressors, dryness and brittleness. Quickly absorbing, this naturally beneficial butter, helps rehydrate the hair and scalp without clogging the cuticles.Antioxidant rich, and a natural source of vitamins, Bergamot Fruit Extract assists in balancing the hair and scalp.High in Omega 6, Evening Primrose Oil hydrates and helps soften the hair. It contains Phospholipids that are hydrophilic, meaning they are moisture-loving and attracted to water. How to use: WASH. RINSE. REPEAT – Apply to wet hair and massage gently through the hair and scalp. Rinse. Follow with HYDRATE-ME.RINSE. Can be used daily, and as part of our HYDRATE regimen.",
      },
      {
        sku: "20582",
        "part number": "KMU15387",
        barcode: 9339341017547,
        description:
          "Why we love it:Embrace the wonders of KEVIN MURPHY HYDRATE-ME.RINSE, a super smoothing and hydrating conditioner specially crafted for normal to dry hair. Whether your hair craves repair, faces dryness, or endures a harsh climate, this conditioner comes to the rescue. Consider it your hair's best-kept secret as it effortlessly disguises damage, nourishes, and brings life back to dry tresses, making split ends unrecognisable.How it works:This conditioner's antioxidant-rich formulation imparts a radiant sheen while locking in precious moisture, preventing further loss. Powered by cutting-edge technology borrowed from high-end skincare, witness the magic of this hair concealer as it works wonders on your hair! With micro algae for radiance and kakadu plum to maintain collagen and elastin levels, your hair will exude a healthy, lustrous glow. Evening primrose oil instantly hydrates and detangles, infusing your hair with moisture and a glossy finish.How to use:On wet hair, gently distribute it through the lengths and ends of your hair. Leave it on for 1-2 minutes to work its hydrating wonders. Rinse thoroughly, revealing irresistibly soft and smooth locks.",
      },
      {
        sku: "20583",
        "part number": "KMU16453",
        barcode: 9339341019503,
        description:
          "HYDRATING MASQUE FOR FRIZZY, COARSE AND COLOURED HAIRGive dry, parched hair an intense burst of hydration with HYDRATE-ME.MASQUE. Our repairing and smoothing treatment MASQUE delivers hydration and moisture to dry hair, or hair that’s been exposed to harsh, dry climates. HYDRATE-ME.MASQUE’s unique formulation features vitamin-charged, micro-capsules, that explode upon contact to deliver hydration and moisture, leaving the hair deeply conditioned from root to tip.",
      },
      {
        sku: "20585",
        "part number": "KMU15399",
        barcode: 9339341017424,
        description:
          "Why we love it:KEVIN.MURPHY HAIR.RESORT.SPRAY is your partner in crime for crafting a beachy hair masterpiece. Indulge in the fragrant blend of honey, citrus, and tangerine that makes this volumising spray an essential for those craving that coveted surfer-inspired look. With its non-aerosol formula, this weightless hair thickener lets you achieve touchable texture without the stickiness of traditional wax-based products so you can rock of beachy waves all year round. How it works:This versatile spray empowers you to create textured, natural-looking waves that exude effortless beauty. Formulated with honey, citrus, and tangerine extracts, it adds volume and soft hold to your hair, making it the perfect choice for those seeking a sexy, undone style.How to use it:Shake the bottle to activate the formula's enchanting blend of ingredients. Spritz the spray onto damp or dry hair, ensuring thorough coverage. Gently scrunch your hair to distribute the product evenly. You can either leave your hair as is or continue styling as desired.",
      },
      {
        sku: "20586",
        "part number": "KMU15741",
        barcode: 9339341018179,
        description:
          "Create the iconic beach hair look that Kevin Murphy is renowned for with HAIR.RESORT. This oil-free, beach texturiser and finishing lotion in-one works in seconds to give you full-on volume and sexy, surfer texture with long-lasting hold. Better yet, it’s loaded with the Antioxidant benefits of Vitamins C and E. Simply scrunch it in and play around until you achieve that messy, fresh-off-the-beach look.HOW TO APPLYAPPLY.SQUISH.SCRUNCH. Apply HAIR.RESORT to damp or dry hair, scrunch in and you’re good to go.",
      },
      {
        sku: "20587",
        "part number": "KMU15305",
        barcode: 9339341016342,
        description:
          "REPAIRING THICKENING LOTIONFulfill all your fullness dreams with FULL.AGAIN - our hardworking thickening lotion that boosts body and bounce. Created with an abundance of tiny rayon particles that adhere to the hair shaft making it appear fuller, FULL.AGAIN creates naturally soft movement, leaving fine or thinning hair looking lush and beauty-FULL.",
      },
      {
        sku: "20589",
        "part number": "KMU15393",
        barcode: 9339341017486,
        description:
          "Kevin murphy Styling Free hold 100gr - medium hold pasteA flexible hold styling crème with a natural shine. Contains essences of Bergamot and Vanilla, suitable for all hair types.Benefits: Paraben Free, Medium Hold, Adds Natural Shine, Thickening effect on the hair, Glossy Finish, Lubricates the hair and scalp.How to use:Apply to damp or dry hair.Key Ingredients:Lanolin Wax: Lubricates the hair and scalp to give a soft, Lanolin Wax smooth appearance.Carnuba Wax: Thickening effect and provides a glossy finish.Yerba Mate: Yerba Mate originates from South America. It’s rich in anti oxidants, amino acids and vitamins. When vitamins are placed on to the outer surface of the hair, they add shine and thickness. Amino Acids are the building blocks of repair and will provide strength.",
      },
      {
        sku: "20594",
        "part number": "KMU18357",
        barcode: 9339341035589,
        description:
          "Kevin Murphy Styling Doo over 250mlA dry finishing hairspray with holding power to mold, form, and shape while giving you the freedom of movement. Contains Tapioca Starch and essences of Virginian Cedar Wood and Patchouli. Suitable for all hair types.Benefits:Paraben Free, Volumising, Moisturising, Light Hold, Creates Texture with Hold, Removes Excess Oil and Product ResidueKey IngredientsTapioca StarchGives the hair a soft velvety feel and provides the powder technology, giving the hair volume that lasts. Tapioca Starch is hydrophilic and removes excess oil from the hair and scalp.SilicaGives body, suppleness and sheen.Patchouli OilAnti-ageing for the hair and scalp. Stimulates Patchouli Oil cellular renewal and can alleviate signs of dandruff. How to use: Shake well. Spray evenly onto dry hair. Focus on the roots and brush through.",
      },
      {
        sku: "20597",
        "part number": "KMU17241",
        barcode: 9339341026754,
        description:
          "Kevin Murphy Body Builder Volumising Mousse 350ml - Volume mousseWork that body and boost your hair with flexible fullness and hold. A product that you can layer onto the hair to create smooth big shapes. Don’t be afraid to use quite a lot of BODY.BUILDER as it is weightless and moisturising so you can go for it without any fear of a crunch. For every can of BODY.BUILDER sold, a financial contribution will be made to help reduce global carbon emissions.How to use: Apply to damp hair and dry in.Benefits: Weightless volumising spray mousse, Contains memory hold resins for silky hold and shine",
      },
      {
        sku: "20600",
        "part number": "KMU15369",
        barcode: 9339341017059,
        description:
          "Why we love it:Experience vibrant blonde hair with Kevin Murphy BLONDE.ANGEL.WASH! This lavender-infused shampoo rescues dulled coloru, adds shine, and counteracts brassy tones. Perfect for blonde or grey hair.How it works:Packed with natural wonders like murumuru butter for glossy hair, shea butter to restore elasticity, and lavender flower for a soothing touch. Say hello to brighter, cooler tones without sulfates or parabens.How to use:Embrace the angelic ritual. Apply to wet hair, massaging into scalp and strands. Rinse and repeat for a luxurious cleanse. For best results:Follow with KEVIN MURPHY BLONDE.ANGEL, paraben, sulfate, gluten-free, and cruelty-free – the perfect blend! Benefits include:Enhances blonde tones in yellow and greying hair.Counteracts brassy tones, maintaining cooler hues.Restores shine and brightness for radiant locks.Sulfate and paraben-free – haircare with a conscience!",
      },
      {
        sku: "20601",
        "part number": "KMU15368",
        barcode: 9339341017066,
        description:
          "Kevin murphy Treatments Blonde angel 250ml - Moisturising conditioner for blond hairColour-intensifying conditioner for blond and grey hair, rich formula to fight 'brassy' tones, helps restore shine and maintain cooler tones.A nourishing blend of sunflower seed and extracts of olive oil, lavender seed oil and jojoba, it deeply moisturises and conditions coloured hairto protect and maintain the beauty and shine of blond hair.  How to UseApply to freshly washed hair and let it absorb the benefits for 1-2 minutes, followed by a refreshing rinse.For optimal repair results, use it after washing with Blonde Angel Wash or as part of our Blonde routine.BenefitsEnhances the colour of blond and grey hair.Counteracts brassy tones.Helps restore shine and radiance.Helps maintain 'cooler' tones.Technical CharacteristicsSulphate-free, paraben-free and cruelty-free.Known for its high content of vitamins and antioxidants that help the overall health of the hair, Sunflower Seed Extract helps prevent colour fading while providing nourishing moisture.A natural antioxidant known to moisturise, restore and repair, olive oil extract promotes shine and elasticity and is also rich in biotin, niacin, vitamins A and E.Widely cultivated throughout the Mediterranean, Lavendula Angustifolia (Lavender) extract is one of nature's most delicate scents, known for its calming and soothing properties.Jojoba seed oil provides moisture while soothing both hair and scalp.Bertholletia Excelsa Seed (Brazil Nut) is an oil known to be rich in omega fatty acids, this nourishing oil helps fight frizz, detangles and protects hair, helping to reduce breakage.Linseed oil is known to promote a healthy shine and contains essential fatty acids that are vital for maintaining healthy hair.",
      },
      {
        sku: "20602",
        "part number": "KMU17068",
        barcode: 9339341022060,
        description: `Kevin Murphy Styling Bedroom hair 250ml - light hairsprayKevin Murphy Bedroom hair is a light and flexible hairspray, perfect for disheveled, "out of bed", "lived-in" looks with a touch of brilliance.Suitable for all hair types, recommended for waves and curls.It keeps texture and separation throughout the day without sticking, always maintaining an elastic and reshapable styling.The extracts of ginger root and sunflower seeds infuse essential nutrients for the hair, leaving it healthier, stronger and protected from external agents, vegetable glycerine helps to maintain the hydration for a soft hair anytime.`,
      },
      {
        sku: "20603",
        "part number": "KMU15421",
        barcode: 9339341017714,
        description:
          "Washing your hair every day is a balancing act that requires the right shampoo for the job. Our BALANCING.WASH is the yin and yang of everyday shampoos, formulated to gently, yet effectively cleanse the hair and scalp while a nourishing blend of Amino Acids and Antioxidant-rich oils restore moisture, strengthen the hair and protect against colour-fading.HOW TO APPLYWASH. RINSE. REPEAT – Apply to wet hair and massage gently through the hair and scalp. Rinse. Can be used daily.",
      },
      {
        sku: "20604",
        "part number": "KMU15396",
        barcode: 9339341017455,
        description:
          "Kevin Murphy Styling Anti gravity spray 150ml - Volume No gas sprayA no-gas spray that adds volume without weighing the hair down the hair and enhances shine. Enriched with Certified Organic Lavender to get body and hold on all types of hair.It can also be used as a fixing for the  Color Bug (sold separately).",
      },
      {
        sku: "20605",
        "part number": "KMU15367",
        barcode: 9339341017073,
        description:
          "Fine, colored hair needs more conditioning to stay healthy. This Kevin Murphy treatment is specific moisturizing and volumizing treatment for the hair fiber and gives it a smooth and dense texture. Mango, cocoa butter and tangerine essential oil that smooth and moisturize dry and colored hair. And hop ! Thanks to Kevin Murphy products you will find volume and substance without damaging your color! Quite the contrary.BenefitsHydrates without weighing down hairIts antioxidant-rich formula creates a shield against free radicalsStrengthens and protects hair against stress factorsSuitable for all hair typesSafe for coloringSulfate-free, paraben-free and cruelty-freeCapacity: 250 ml",
      },
    ];

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    for(let i =0; i < data.length; i++){

      console.log(i+1, data.length)

      let {sku, description} = data[i]

      const product = await getProductBySku(sku)

      if (!product){
        throw `no product with sku ${getProductBySku}`
      }

      console.log(`${product.name} (${product.sku})`)

      let response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "user", content:  `Output in HTML format and only HTML no additional response is required. Do not enclose in code snippet. You are a product content writer for beautyfeatures.ie an Irish online beauty retailer. Using the product description included as context please restructure it into the following structure:
          <strong>Who's it For?</strong><br>
          (insert what kind of hair type or skin type this product is suitable for and include 2 new lines after this)
          <br>
          (insert a one or two sentence introduction for the product here)
          <br>
          (insert some unordered bulletpoints here to highlight key features, advanatages and benefits)
          <br> 
          <strong>How to Use:</strong><br>
          (insert unordered list instructions on how to use the product here)


          Product description for context """
          ${description}
          """`},
        ],
      });

      await updateProduct(product?.id, {description: response.choices[0].message.content})

    }
  } catch (err) {
    console.log(err);
  }
}

main();
