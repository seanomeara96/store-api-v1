/**
 *
 * @returns url string of current site
 */
const getSiteUrl = (storeInitials) => {
  switch(storeInitials.toLowerCase()){
    case "bf":
      return "https://www.beautyfeatures.ie";
    case "ih":
      return "https://www.inhealth.ie";
    case "bsk":
      return "https://www.beautyskincare.ie";
    case "ah":
      return "https://www.allhair.ie";
    case "pb":
      return "https://www.pregnancyandbaby.ie";
    case "bs":
      return "https://www.babysafety.ie";
    case "fs":
      return "https://www.fertilitystore.ie";
    case "hie":
      return "https://www.haakaa.ie";
    case "huk":
      return "https://www.haakaaofficial.co.uk";
    case "ds":
      return "https://dogspace.ie";
    default:
      return ""
  }
};
exports.getSiteUrl = getSiteUrl