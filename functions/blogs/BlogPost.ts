export interface BlogPost {
    id: number;
    title: string;
    url: string;
    preview_url: string;
    body: string;
    tags: string[];
    summary: string;
    is_published: boolean;
    published_date: {
      date: string;
      timezone_type: number;
      timezone: string;
    };
    published_date_iso8601: string;
    meta_description: string;
    meta_keywords: string;
    author: string;
    thumbnail_path: string;
  }
  

  export interface BlogPostCreationParams {
    title: string;
    url?: string;
    body: string;
    tags?: string[];
    is_published?: boolean;
    meta_description?: string;
    meta_keywords?: string;
    author?: string;
    thumbnail_path?: string;
    published_date?: Date | string;
  }

  export interface BlogPostUpdateParams {
    title?: string;
    url?: string;
    body?: string;
    tags?: string[];
    is_published?: boolean;
    meta_description?: string;
    meta_keywords?: string;
    author?: string;
    thumbnail_path?: string;
    published_date?: Date | string;
  }