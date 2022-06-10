"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllShippingMethods = void 0;
function getAllShippingMethods(zone_id) {
    return new Promise((resolve, reject) => {
        require("../../config/config")
            .store.get(`/shipping/zones/${zone_id}/methods`)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
}
exports.getAllShippingMethods = getAllShippingMethods;
