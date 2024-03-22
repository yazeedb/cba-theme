export interface Page {
  id: string;
  date: string;
  sllug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  acf: {
    page_subtitle: string;
  };
  _embedded: {
    author: any;
    'wp:featuredmedia': {
      id: number;
      date: string;
      alt_text: string;
      title: { rendered: string };
      source_url: string;
    }[];
  };
}

export interface BoardMember {
  first_name: string;
  last_name: string;
  position: string;
  team: string;
}
