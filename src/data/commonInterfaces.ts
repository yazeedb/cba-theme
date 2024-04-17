export interface Rendered {
  rendered: string;
}

export interface MediaDetailSize {
  file: string;
  width: number;
  height: number;
  filesize?: number;
  mime_type: string;
  source_url: string;
}

export interface MediaDetails {
  width: number;
  height: number;
  file: string;
  filesize?: number;
  sizes: {
    medium: MediaDetailSize;
    large: MediaDetailSize;
    thumbnail: MediaDetailSize;
    medium_large: MediaDetailSize;
    full: MediaDetailSize;
  };
  image_meta: {
    aperture: string;
    credit: string;
    camera: string;
    caption: string;
    created_timestamp: string;
    copyright: string;
    focal_length: string;
    iso: string;
    shutter_speed: string;
    title: string;
    orientation: string;
    keywords: string[];
  };
}

export interface EmbeddedMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: Rendered;
  author: number;
  featured_media: number;
  acf: any[];
  caption: Rendered;
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: MediaDetails;
  source_url: string;
  _links: any;
}

export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: Rendered;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Rendered;
  featured_media: number;
  template: string;
  acf: any;
  _links: any;
  _embedded: {
    'wp:featuredmedia': EmbeddedMedia[];
  };
}
