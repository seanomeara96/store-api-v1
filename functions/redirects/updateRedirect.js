"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRedirect = void 0;
function isUrlInvalid(url) {
    return !url || typeof url !== "string";
}
const requestBody = (reject, oldUrl, newUrl, type = "url") => {
    const allowedValues = ["product", "brand", "category", "page", "post", "url"];
    if (isUrlInvalid(oldUrl) || isUrlInvalid(newUrl)) {
        return reject("check urls");
    }
    if (!allowedValues.includes(type)) {
        return reject("please provide a valid type");
    }
    return [
        {
            from_path: oldUrl,
            site_id: 1000,
            to: {
                type: type,
                entity_id: null,
                url: newUrl,
            },
        },
    ];
};
const updateRedirect = (fromPath, toPath) => new Promise((resolve, reject) => {
    require("../../config/config")
        .store.put("/storefront/redirects", requestBody(reject, fromPath, toPath))
        .then((res) => {
        if (res.status === 200 || res.status === 201) {
            resolve(res.status);
        }
        else {
            reject(res.status);
        }
    })
        .catch(reject);
});
exports.updateRedirect = updateRedirect;
