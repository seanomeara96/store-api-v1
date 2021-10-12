const skuMicroData = (sku="") => {
    return `<!--skuMicroData--><div style="display:none;" itemprop="sku" content="${sku}" /><!--skuMicroData-->`
}

exports.skuMicroData = skuMicroData;