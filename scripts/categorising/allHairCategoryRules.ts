import { Product } from "../../functions/products/Product";

export function allhairCategoryRules(p: Product, categories:number[]): number[] {
    const name = p.name.toLowerCase();

    // General Product Categories (Hair Products)
    if (name.includes("shampoo")) {
        categories.push(236); // Hair Products => Shampoo
    }

    if (name.includes("shampoo") && name.includes("purple")) {
        categories.push(247); // Hair Products => Purple Shampoo
    }

    if (name.includes("conditioner")) {
        categories.push(237); // Hair Products => Conditioner
    }

    if (name.includes("dry shampoo")) {
        categories.push(182); // Hair Products => Dry Shampoo
    }

    if (name.includes("clarifying")) {
        categories.push(183); // Hair Type & Treatments => Clarifying Shampoo
    }

    if (name.includes("treatment")) {
        categories.push(249); // Hair Products => Leave-in Treatments
    }

    if (name.includes("dye") || name.includes("depositing")) {
        categories.push(238); // Hair Products => Hair Dye & Touch Up
    }

    if (name.includes("mask") || name.includes("masque")) {
        categories.push(239); // Hair Products => Hair Masks
    }

    if (name.includes("serum")) {
        categories.push(240); // Hair Products => Hair Serums
    }

    if (name.includes(" oil")) {
        categories.push(241); // Hair Products => Hair Oil
    }

    if (name.includes("steampod") || name.includes("curler") || name.includes("dryer")) {
        categories.push(222); // Hair Products => Hair Tools & Accessories
    }

    if (name.includes("heat prote")) {
        categories.push(244); // Hair Products => Heat Protection
    }

    // Note: "brush" category (Hair Brush Up) not found in the table.
    if (name.includes("brush")) {
        // categories.push(/* missing id */);
    }

    // Hair Type & Treatments
    if (name.includes("dry")) {
        categories.push(171); // Hair Type & Treatments => Dry
    }

    if (name.includes("normal")) {
        categories.push(172); // Hair Type & Treatments => Normal
    }

    if (name.includes("fine")) {
        categories.push(174); // Hair Type & Treatments => Fine
    }

    if (name.includes("frizz")) {
        categories.push(175); // Hair Type & Treatments => Frizz
    }

    if (name.includes("damaged")) {
        categories.push(176); // Hair Type & Treatments => Damaged Hair
    }

    if (name.includes("blond")) {
        categories.push(177); // Hair Type & Treatments => Blond Hair
    }

    if (name.includes("hair loss") || name.includes("thinning")) {
        categories.push(178); // Hair Type & Treatments => Hair Loss or Thinning
    }

    if (name.includes("all hair types")) {
        categories.push(179); // Hair Type & Treatments => All Hair Types
    }

    if (name.includes("curly")) {
        categories.push(181); // Hair Type & Treatments => Curly
    }

    if (name.includes("grey")) {
        categories.push(186); // Hair Type & Treatments => Grey Hair
    }

    if (name.includes("afro") || name.includes("textured")) {
        categories.push(258); // Hair Type & Treatments => Afro & Textured
    }

    if (name.includes("dandruff") || name.includes("scalp")) {
        categories.push(207); // Hair Type & Treatments => Anti Dandruff & Scalp Care
    }

    if (name.includes("coloured") || name.includes("color")) {
        categories.push(184); // Hair Type & Treatments => Coloured Hair
    }

    // Ingredient & Formulation
    if (name.includes("tea tree")) {
        categories.push(260); // Ingredient & Formulation => Tea Tree Oil
    }

    if (name.includes("peppermint")) {
        categories.push(261); // Ingredient & Formulation => Peppermint Oil
    }

    if (name.includes("salicylic")) {
        categories.push(262); // Ingredient & Formulation => Salicylic Acid
    }

    if (name.includes("hyaluronic")) {
        categories.push(263); // Ingredient & Formulation => Hyaluronic Acid
    }

    if (name.includes("silicone free")) {
        categories.push(265); // Ingredient & Formulation => Silicone Free
    }

    // Brand: Alfaparf
    if (name.includes("alfaparf")) {
        categories.push(159); // Brands => Alfaparf

        if (name.includes("blond")) {
            categories.push(278); // Brands => Alfaparf => Blonde
        }

        if (name.includes("brunet")) {
            categories.push(279); // Brands => Alfaparf => Brunette
        }

        if (name.includes("curls")) {
            categories.push(276); // Brands => Alfaparf => Curls
        }

        if (name.includes("density")) {
            categories.push(270); // Brands => Alfaparf => Density
        }

        if (name.includes("diamond")) {
            categories.push(271); // Brands => Alfaparf => Diamond
        }

        if (name.includes("gift")) {
            categories.push(281); // Brands => Alfaparf => Gift Sets
        }

        if (name.includes("oil") || name.includes("liquid")) {
            categories.push(280); // Brands => Alfaparf => Hair Oils
        }

        if (name.includes("moisture")) {
            categories.push(269); // Brands => Alfaparf => Moisture
        }

        if (name.includes("reconstruction")) {
            categories.push(272); // Brands => Alfaparf => Reconstruction
        }

        if (name.includes("scalp")) {
            categories.push(273); // Brands => Alfaparf => Scalp Care
        }

        if (name.includes("smooth")) {
            categories.push(277); // Brands => Alfaparf => Smooth
        }

        if (name.includes("volume")) {
            categories.push(274); // Brands => Alfaparf => Volume
        }

        if (name.includes("treatment")) {
            categories.push(163); // Brands => Alfaparf => Treatments
        }

        if (name.includes("mask") || name.includes("masq")) {
            categories.push(217); // Brands => Alfaparf => Masks
        }

        if (name.includes(" men ") || name.includes(" men's")) {
            categories.push(206); // Brands => Alfaparf => Mens Range
        }

        if (name.includes("shampoo") || name.includes("conditioner")) {
            categories.push(160); // Brands => Alfaparf => Shampoo & Conditioner
        }
    }

    // Brand: Moroccanoil
    if (name.includes("moroccanoil")) {
        categories.push(142); // Brands => Moroccanoil

        if (name.includes("shampoo") || name.includes("conditioner")) {
            categories.push(149); // Brands => Moroccanoil => Shampoo & Conditioner
        }

        if (name.includes("style")) {
            categories.push(143); // Brands => Moroccanoil => Styling
        }

        if (name.includes("treatment")) {
            categories.push(144); // Brands => Moroccanoil => Treatments
        }

        if (name.includes("gift")) {
            categories.push(218); // Brands => Moroccanoil => Gift Sets
        }

        if (name.includes("body")) {
            categories.push(187); // Brands => Moroccanoil => Body Range
        }
    }

    // Brand: Joico
    if (name.includes("joico")) {
        categories.push(150); // Brands => Joico

        if (name.includes("blond") && name.includes("life")) {
            categories.push(311); // Brands => Joico => Blonde Life
        }

        if ((name.includes("color") || name.includes("colour")) && name.includes("therapy")) {
            categories.push(307); // Brands => Joico => Color Therapy
        }

        if (name.includes("colorful")) {
            categories.push(314); // Brands => Joico => Colorful
        }

        if (name.includes("conditioner")) {
            categories.push(316); // Brands => Joico => Conditioner
        }

        if (name.includes("defy damage")) {
            categories.push(310); // Brands => Joico => Defy Damage
        }

        if (name.includes("hydrasplash")) {
            categories.push(313); // Brands => Joico => HydraSplash
        }

        if (name.includes("innerjoi")) {
            categories.push(309); // Brands => Joico => INNERJOI
        }

        if (name.includes("shampoo")) {
            categories.push(153); // Brands => Joico => Shampoo & Conditioner
        }

        if (name.includes("styling")) {
            categories.push(151); // Brands => Joico => Styling
        }

        if (name.includes("mask")) {
            categories.push(152); // Brands => Joico => Treatments & Masks
        }
    }

    // Brand: Actyva
    if (name.includes("actyva")) {
        categories.push(164); // Brands => Actyva

        if (name.includes("shampoo") || name.includes("conditioner")) {
            categories.push(166); // Brands => Actyva => Shampoo & Conditioner
        }

        if (name.includes("treatment") || name.includes("mask")) {
            categories.push(167); // Brands => Actyva => Treatments & Masks
        }

        if (name.includes("styling")) {
            categories.push(165); // Brands => Actyva => Styling
        }
    }

    // Brand: Color Wow
    if (name.includes("color wow")) {
        categories.push(155); // Brands => All Other Brands => COLOR WOW

        if (name.includes("bundle")) {
            categories.push(196); // Brands => Color Wow => Bundles
        }

        if (name.includes("root cover")) {
            categories.push(198); // Brands => Color Wow => Root Cover Up
        }

        if (name.includes("gift")) {
            categories.push(199); // Brands => Color Wow => Gift Sets
        }
    }

    // Brand: Eleven
    if (name.includes("eleven")) {
        categories.push(201); // Brands => Eleven

        if (name.includes("favourite")) {
            categories.push(202); // Brands => Eleven => Favourites
        }

        if (name.includes("styling")) {
            categories.push(203); // Brands => Eleven => Styling
        }

        if (name.includes("body")) {
            categories.push(204); // Brands => Eleven => I Want Body
        }

        if (name.includes("shampoo")) {
            categories.push(333); // Brands => Eleven => Shampoo
        }

        if (name.includes("conditioner")) {
            categories.push(334); // Brands => Eleven => Conditioner
        }
    }

    // Brand: Redken
    if (name.includes("redken")) {
        categories.push(214); // Brands => Redken

        if (name.includes("acid color")) {
            categories.push(283); // Brands => Redken => Acidic Color Gloss
        }

        if (name.includes("top seller")) {
            categories.push(285); // Brands => Redken => Top Sellers
        }

        if (name.includes("shampoo")) {
            categories.push(286); // Brands => Redken => Shampoo
        }
    }

    // Brand: L'Oréal Pro
    if (name.includes("l'oréal") || name.includes("loreal") || name.includes("l'oreal")) {
        categories.push(223); // Brands => L'oreal Pro
    
        if (name.includes("metal detox")) {
            categories.push(319); // Brands => L'oreal Pro => Metal Detox
        }
        if (name.includes("absolut repair")) {
            categories.push(320); // Brands => L'oreal Pro => Absolut Repair
        }
        if (name.includes("inforcer")) {
            categories.push(321); // Brands => L'oreal Pro => Inforcer
        }
        if (name.includes("vitamino colour") || name.includes("vitamino color")) {
            categories.push(322); // Brands => L'oreal Pro => Vitamino Colour
        }
        if (name.includes("silver")) {
            categories.push(323); // Brands => L'oreal Pro => Silver
        }
        if (name.includes("tecni art")) {
            categories.push(324); // Brands => L'oreal Pro => Tecni Art
        }
        if (name.includes("pro longer")) {
            categories.push(326); // Brands => L'oreal Pro => Pro Longer
        }
        if (name.includes("curl expression")) {
            categories.push(327); // Brands => L'oreal Pro => Curl Expression
        }
        if (name.includes("shampoo")) {
            categories.push(328); // Brands => L'oreal Pro => Shampoo
        }
        if (name.includes("conditioner")) {
            categories.push(329); // Brands => L'oreal Pro => Conditioner
        }
        if (name.includes("mask")) {
            categories.push(330); // Brands => L'oreal Pro => Mask
        }
        if (name.includes("style")) {
            categories.push(331); // Brands => L'oreal Pro => Style
        }
        if (name.includes("bundle")) {
            categories.push(332); // Brands => L'oreal Pro => Bundles
        }
    }

    // Brand: Kerastase
    if (name.includes("kerastase") || name.includes("kérastase")) {
        categories.push(215); // Brands => Kerastase

        if (name.includes("conditioner")) {
            categories.push(289); // Brands => Kerastase => Conditioners
        }

        if (name.includes("styling")) {
            categories.push(290); // Brands => Kerastase => Styling
        }

        if (name.includes("serum")) {
            categories.push(291); // Brands => Kerastase => Serums
        }

        if (name.includes("oil")) {
            categories.push(292); // Brands => Kerastase => Hair Oils
        }
    }

    // Brand: Nioxin
    if (name.includes("nioxin")) {
        categories.push(137); // Brands => Nioxin

        if (name.includes("shampoo") || name.includes("conditioner")) {
            categories.push(139); // Brands => Nioxin => Shampoo & Conditioner
        }

        if (name.includes("system kit")) {
            categories.push(141); // Brands => Nioxin => System Kit
        }
    }

    // Brand: Tangle Teezer
    if (name.includes("tangle teezer")) {
        categories.push(130); // Brands => All Other Brands => Tangle Teezer
    }

    // Brand: Phytopoléine
    if (name.includes("phytopoléine")) {
        categories.push(135); // Brands => All Other Brands => Phyto
    }

    // Brand: Carn
    if (name.includes("carn")) {
        categories.push(156); // Brands => All Other Brands => Carin
    }

    // Brand: Nak
    if (name.includes("nak")) {
        categories.push(191); // Brands => All Other Brands => NAK
    }

    return Array.from(new Set(categories));
}