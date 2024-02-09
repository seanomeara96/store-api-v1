import { getAll } from "../utils/getAll";

interface Script {
  name: string; // User-friendly name (1-255 characters)
  uuid: string; // Primary identifier (UUID)
  date_created: string; // Date of initial creation
  date_modified: string; // Date of last update
  description: string; // User-friendly description
  html?: string; // HTML string (0-65536 characters) - present when kind is script_tag
  src?: string; // Src attribute of the script to load - present when kind is src
  auto_uninstall: boolean; // Enable automatic cleanup on uninstall or token revocation
  load_method: "default" | "async" | "defer"; // Load method for the script
  location: "head" | "footer"; // Where on the page to place the script
  visibility: "storefront" | "all_pages" | "checkout" | "order_confirmation"; // Pages the script should load on
  kind: "src" | "script_tag"; // Type of script
  api_client_id?: string; // Client ID of the API user that created this script (blank if created by other means)
  consent_category?: "essential" | "functional" | "analytics" | "targeting"; // Consent category for GDPR and CCPA compliance
  enabled: boolean; // Whether the script is enabled on the storefront
  channel_id: number; // Channel ID associated with the script
}

export const getAllScripts = getAll(`/content/scripts`) as (params?: {}) => Promise<Script[]>
