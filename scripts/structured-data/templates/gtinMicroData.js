const gtinMicroData = (barcode="") => {
    return `<!--gtinMicroData--><meta itemprop="gtin14" content="${barcode}" /><!--gtinMicroData-->`
}

exports.gtinMicroData = gtinMicroData;