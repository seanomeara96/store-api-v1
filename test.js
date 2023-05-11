"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllProducts_1 = require("./functions/products/getAllProducts");
const getProductBySKU_1 = require("./functions/products/getProductBySKU");
const getProductVariants_1 = require("./functions/products/getProductVariants");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = [
                { cat_name: "Product Range", bsk_id: 59, px_id: 449 },
                { cat_name: "Active Clearing", bsk_id: 93, px_id: 458 },
                { cat_name: "AGE Smart®", bsk_id: 12, px_id: 452 },
                { cat_name: "UltraCalming™ (Sensitive Skin)", bsk_id: 18, px_id: 459 },
                {
                    cat_name: "MediBac Clearing® (Acne treatments)",
                    bsk_id: 23,
                    px_id: 451,
                },
                {
                    cat_name: "Clear Start™ (Skincare for Teenagers)",
                    bsk_id: 52,
                    px_id: 460,
                },
                { cat_name: "Daily Skin Health", bsk_id: 16, px_id: 455 },
                { cat_name: "Daylight Defense", bsk_id: 17, px_id: 457 },
                { cat_name: "PowerBright TRx™", bsk_id: 53, px_id: 454 },
                { cat_name: "Gluten-Free", bsk_id: 79, px_id: 456 },
                { cat_name: "Vegan", bsk_id: 80, px_id: 453 },
                { cat_name: "Skin Concern", bsk_id: 60, px_id: 450 },
                { cat_name: "Signs of Ageing", bsk_id: 62, px_id: 467 },
                { cat_name: "Acne and Breakouts", bsk_id: 41, px_id: 465 },
                { cat_name: "Dryness and Dehydration", bsk_id: 40, px_id: 463 },
                { cat_name: "Oily Skin", bsk_id: 46, px_id: 461 },
                { cat_name: "Sensitivity and Redness", bsk_id: 61, px_id: 462 },
                { cat_name: "Uneven Skin Tone", bsk_id: 63, px_id: 466 },
                { cat_name: "Dermalogica Speed Mapping", bsk_id: 65, px_id: 464 },
            ];
            require("./config/config").config("bsk");
            const bskSKUs = [];
            for (let x = 0; x < 1 /*data.length*/; x++) {
                const category = data[x];
                const products = yield (0, getAllProducts_1.getAllProducts)({
                    "categories:in": category.bsk_id,
                });
                console.log(`there are ${products.length} products in the ${category.cat_name} category`);
                for (let i = 0; i < products.length; i++) {
                    const product = products[i];
                    console.log(`getting variants for ${i + 1}/${products.length}`);
                    const variants = (yield (0, getProductVariants_1.getProductVariants)(product.id));
                    for (let ii = 0; ii < variants.length; ii++) {
                        const variant = variants[ii];
                        bskSKUs.push(variant.sku);
                    }
                }
                const uniquebskSKUs = [...new Set(bskSKUs)];
                require("./config/config").config("px");
                for (let iii = 0; iii < 1 /*uniquebskSKUs.length*/; iii++) {
                    const sku = uniquebskSKUs[iii];
                    const product = yield (0, getProductBySKU_1.getProductBySku)("sean12");
                    console.log(`###product ###`, product);
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
main();
