"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRedirect = void 0;
function deleteRedirect(id) {
    return new Promise(function (resolve, reject) {
        require("../../config/config")
            .store.delete(`/storefront/redirects`, {
            params: {
                "id:in": id,
                site_id: 1000,
            },
        })
            .then((res) => resolve(res.data.data))
            .catch((err) => reject(err.response.data));
    });
}
exports.deleteRedirect = deleteRedirect;
