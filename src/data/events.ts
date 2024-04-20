import type { ParsedImage, Post, Rendered } from './common';
import { parseFeaturedMedia } from './common';
import { routes } from './routes';

export const getEvents = () => {
  return fetch(routes.events)
    .then((res) => res.json())
    .then((data: EventResponse[]) => data.map(parseEvent));
};

const parseEvent = (data: EventResponse): Event => {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title.rendered,
    content: data.content.rendered,
    image: parseFeaturedMedia(data._embedded['wp:featuredmedia']),
    fields: {
      ...data.acf,
      start_date: parseDate(data.acf.start_date),
      end_date: parseDate(data.acf.end_date)
    }
  };
};

/**
 * Format (for some stupid reason) is YYYYmmDD,
 * so this converts it to YYYY-mm-dd.
 */
const parseDate = (date: string) =>
  date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

export interface Event {
  id: number;
  title: string;
  content: string;
  fields: AcfFields;
  image: ParsedImage;
  slug: string;
}

interface EventResponse extends Post {
  content: Rendered;
  acf: AcfFields;
}

interface AcfFields {
  all_day: boolean;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  price_dollars: number;
  price_recurrence: string;
}
