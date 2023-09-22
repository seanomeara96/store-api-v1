export interface Redirect {
    id: number;
    site_id: number;
    from_path: string;
    to: {
      type: "product" | "brand" | "category" | "page" | "post" | "url";
      entity_id: number;
      url: string; // Up to 2048 characters
      to_url: string; // Full destination URL
    };
  }