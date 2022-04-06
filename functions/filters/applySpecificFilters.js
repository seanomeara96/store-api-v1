"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySpecificFilters = void 0;
const getProductIdByName_1 = require("../products/getProductIdByName");
const applyFilter_1 = require("./applyFilter");
const data = [
    {
        Key: "Skin Concerns",
        Value: "Acne / Blemish",
        "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
        "The INKEY list Alpha Hydroxy Acid 30ml": "",
        "The INKEY list Caffeine 15ml": "",
        "The Inkey List Fulvic Acid Cleanser 150ml": "",
        "The INKEY list Hemp Oil 30ml": "",
        "The Inkey List Snow Mushroom Moisturiser 30ml": "",
        "The Inkey List Symbright Moisturiser 50ml": "",
    },
    {
        Key: "Skin Concerns",
        Value: "Anti Pollution",
        "The Inkey List - Caffeine Stimulating Scalp Treatment 50ml": "",
        "The INKEY list Alpha Hydroxy Acid 30ml": "",
        "The INKEY list Caffeine 15ml": "",
        "The Inkey List Fulvic Acid Cleanser 150ml": "",
        "The INKEY list Hemp Oil 30ml": "",
        "The Inkey List Snow Mushroom Moisturiser 30ml": "",
        "The Inkey List Symbright Moisturiser 50ml": "",
    },
]; // data goes here
/**
 * applies specific filters by name marked x e.g. key = "field" value = "filter" name1 ="x" name2 = ""
 * @param {array} data
 * @returns promise
 */
const applySpecificFilters = (data) => new Promise((resolve, reject) => {
    let promises = [];
    data.forEach((item) => {
        if (!item["Key"])
            return reject("No Key Heading");
        if (!item["Value"])
            return reject("No Value heading");
        const key = item["Key"];
        const value = item["Value"];
        // generate array of product names by removing fields key and value
        let productNames = Object.keys(item).filter((key) => key !== "Key" && key !== "Value");
        for (var name in productNames) {
            if (item[productNames[name]].toUpperCase() === "X") {
                (0, getProductIdByName_1.getProductIdByName)(productNames[name])
                    .then((id) => {
                    promises.push((0, applyFilter_1.applyFilter)(id, key, value).catch((err) => console.log(err)));
                })
                    .catch((err) => console.log(err));
            }
        }
        Promise.allSettled(promises)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
});
exports.applySpecificFilters = applySpecificFilters;
