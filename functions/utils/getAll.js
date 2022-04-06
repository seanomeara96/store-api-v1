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
exports.getAll = void 0;
/**
 * Get-all function to retrieve all info from a given url
 * @param {string} URL supply url for get request
 * @returns
 */
const getAll = (URL) => (params = {}) => new Promise((resolve, reject) => {
    let pageNumber = 1;
    let aggregatedData = [];
    function getData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield require("../../config/config").store.get(URL, {
                    params: Object.assign({ limit: 250, page: pageNumber }, params),
                });
                let dataArray;
                if (data.data === undefined) {
                    dataArray = data;
                }
                else {
                    dataArray = data.data;
                }
                if (dataArray.length) {
                    aggregatedData.push(...dataArray);
                    pageNumber++;
                    getData();
                }
                else {
                    resolve(aggregatedData);
                }
            }
            catch (err) {
                if (err.response)
                    return reject(err.response.data);
                return reject(err);
            }
        });
    }
    getData();
});
exports.getAll = getAll;
