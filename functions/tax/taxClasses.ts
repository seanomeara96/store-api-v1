export async function getTaxClasses():Promise<TaxClass[]>  {
  try {
    const res = await require("../../config/config").store.get(
      `/tax_classes`,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
}

export interface TaxClass {
  /** The unique numerical ID of the tax class (read-only) */
  id: number;

  /** The name of the tax class */
  name: string;

  /** ISO timestamp when the tax class was created (read-only) */
  created_at: string;

  /** ISO timestamp when the tax class was last updated (read-only) */
  updated_at: string;
}
