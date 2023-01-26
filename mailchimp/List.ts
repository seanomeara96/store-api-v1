interface Contact {
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

interface CampaignDefaults {
  from_name: string;
  from_email: string;
  subject: string;
  language: string;
}

interface Stats {
  member_count: number;
  unsubscribe_count: number;
  cleaned_count: number;
  member_count_since_send: number;
  unsubscribe_count_since_send: number;
  cleaned_count_since_send: number;
  campaign_count: number;
  campaign_last_sent: string;
  merge_field_count: number;
  avg_sub_rate: number;
  avg_unsub_rate: number;
  target_sub_rate: number;
  open_rate: number;
  click_rate: number;
  last_sub_date: string;
  last_unsub_date: string;
}

interface Link {
  rel: string;
  href: string;
  method: string;
  targetSchema: string;
  schema: string;
}

export interface List {
  id: string;
  web_id: number;
  name: string;
  contact: Contact;
  permission_reminder: string;
  use_archive_bar: boolean;
  campaign_defaults: CampaignDefaults;
  notify_on_subscribe: string;
  notify_on_unsubscribe: string;
  date_created: Date;
  list_rating: number;
  email_type_option: boolean;
  subscribe_url_short: string;
  subscribe_url_long: string;
  beamer_address: string;
  visibility: string;
  double_optin: boolean;
  has_welcome: boolean;
  marketing_permissions: boolean;
  modules: any[];
  stats: Stats;
  _links: Link[];
}
