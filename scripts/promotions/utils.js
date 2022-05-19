function percentageDiscount(priceToReduce, percentageAsDecimal) {
    return Math.round(priceToReduce * (1 - percentageAsDecimal) * 100) / 100;
  }

exports.percentageDiscount = percentageDiscount;
  
  function getPrices(el, discountFn, discount) {
    return {
      default_price: el.price,
      id: el.id,
      retail_price: el.retail_price,
      sale_price: el.sale_price,
      promo_price: discountFn(el.price, discount),
    };
  }

  exports.getPrices = getPrices;