import { getAll } from "../utils/getAll";
import { Redirect } from "./Redirect";

export const getAllRedirects = getAll("/storefront/redirects") as (
  params?: any
) => Promise<Redirect[]>;
