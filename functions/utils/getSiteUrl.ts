/**
 *
 * @returns url string of current site
 */
export function getSiteUrl(storeInitials: string): string {
  switch (storeInitials.toLowerCase()) {
    case "px":
      return "https://pixieloves.ie";
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
    case "stie":
      return "https://sleepytot.ie";
    case "beuk":
      return "https://beautiedit.co.uk";
    case "ha":
      return "https://www.hireall.ie";
    case "ch":
      return "https://www.caterhire.ie";
    default:
      return "";
  }
}
