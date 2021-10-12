const gtinMicroData = (barcode="") => {
    return `<!--gtinMicroData--><div style="display:none;" itemprop="gtin14" content="${barcode}"></div><!--gtinMicroData-->`
}

exports.gtinMicroData = gtinMicroData;