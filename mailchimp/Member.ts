interface ADDRESS {
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface MergeFields {
  COMPANY: string;
  ADDRESS: ADDRESS;
  FNAME: string;
  SWELL_PBAL: number;
  SWELL_CBAL: string;
  SWELL_PEAR: number;
  SWELL_REFL: string;
  SWELL_REFD: string;
  SWELL_HASA: string;
  LOYAL_OTIN: string;
  LOYAL_OIAT: string;
  SWELL_VPTN: string;
  SWELL_VPTE: string;
  SWELL_ISAF: string;
  SWELL_AFEM: string;
  SWELL_PPER: string;
  SWELL_HPTD: string;
  SWELL_TAME: string;
  SWELL_PYAM: string;
  SWELL_FINA: string;
  SWELL_PYDA: string;
  SWELL_PYPT: string;
  SWELL_PYEM: string;
  SWELL_PCBD: string;
  SWELL_RCUE: string;
  SWELL_RCAS: string;
  SWELL_RCPO: string;
  SWELL_ROPN: string;
  SWELL_PEA: string;
}

interface Interests {
  [key: string]: boolean;
}

interface Stats {
  avg_open_rate: number;
  avg_click_rate: number;
}

interface Location {
  latitude: number;
  longitude: number;
  gmtoff: number;
  dstoff: number;
  country_code: string;
  timezone: string;
}

interface Link {
  rel: string;
  href: string;
  method: string;
  targetSchema?: string;
  schema?: string;
}

export interface Member {
  id: string;
  email_address: string;
  unique_email_id: string;
  email_type: string;
  status: string;
  merge_fields: MergeFields;
  interests: Interests;
  stats: Stats;
  ip_signup: string;
  timestamp_signup: string;
  ip_opt: string;
  timestamp_opt: Date;
  member_rating: number;
  last_changed: Date;
  language: string;
  vip: boolean;
  email_client: string;
  location: Location;
  list_id: string;
  _links: Link[];
}
