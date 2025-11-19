import { getAll } from "../utils/getAll";
import { Redirect } from "./Redirect";

export async function getAllRedirects(params?: any): Promise<Redirect[]> {
  return await getAll("/storefront/redirects")(params);
}
