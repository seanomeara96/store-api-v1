"use strict";
exports.__esModule = true;
exports.createRedirect = void 0;
var createRedirect = function (fromUrl, toUrl) {
    return new Promise(function (resolve, reject) {
        require("../../config/config")
            .store.put("/storefront/redirects", [
            {
                from_path: fromUrl,
                site_id: 1000,
                to: {
                    type: "url",
                    entity_id: null,
                    url: toUrl
                }
            },
        ])
            .then(function (res) { return resolve(res.data.data); })["catch"](reject);
    });
};
exports.createRedirect = createRedirect;
