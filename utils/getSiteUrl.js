/**
 * 
 * @returns url string of current site
 */
exports.getSiteUrl = () => {
    return new Promise((resolve, reject)=>{
        require("../config/config").store.get("/sites").then(sites => resolve(sites.data.data[0].url)).catch(err => reject(err))
    })
}