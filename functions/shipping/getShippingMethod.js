"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingMethod = void 0;
function getShippingMethod(zone_id, method_id) {
    return new Promise((resolve, reject) => {
        require("../../config/config")
            .store(`/shipping/zones/${zone_id}/methods/${method_id}`)
            .then((response) => resolve(response.data))
            .catch(reject);
    });
}
exports.getShippingMethod = getShippingMethod;
