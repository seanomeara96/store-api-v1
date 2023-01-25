interface Condition {
  condition_type: string;
  field: string;
  op: string;
}

interface Options {
  match: string;
  conditions: Condition[];
}

interface Link {
  rel: string;
  href: string;
  method: string;
  targetSchema: string;
  schema: string;
}

export interface Segment {
  id: number;
  name: string;
  member_count: number;
  type: string;
  created_at: Date;
  updated_at: Date;
  options: Options;
  list_id: string;
  _links: Link[];
}
