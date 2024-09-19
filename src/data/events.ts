import he from 'he';
import { format } from 'date-fns';
import type { ParsedImage } from './common';
import { routes } from './routes';

export const getEvents = () => {
  return fetch(routes.events)
    .then((res) => res.json())
    .then((data: EventsCalendar.APIResponse) => data.events.map(parseEvent));
};

export const formatDateTimeForUrl = (datetime: string) =>
  format(datetime, 'M-dd-yyyy');

export const createEventDetailsUrl = (date: string) =>
  `/events/${formatDateTimeForUrl(date)}`;

const parseEvent = (data: EventsCalendar.Event): Event => {
  return {
    ...data,
    title: he.decode(data.title),
    price_recurrence: parsePriceRecurrence(data),
    image:
      data.image === false
        ? { src: '', alt: '' }
        : { src: data.image.url, alt: data.title }
  };
};

const parsePriceRecurrence = (
  data: EventsCalendar.Event
): PriceRecurrenceCategory => {
  const fee = data.categories.find(
    (c) =>
      c.name === 'Daily fee' ||
      c.name === 'Weekly fee' ||
      c.name === 'Monthly fee' ||
      c.name === 'Yearly fee'
  )?.name;

  return (fee as PriceRecurrenceCategory) ?? 'One-time fee';
};

export interface Event extends Omit<EventsCalendar.Event, 'image'> {
  image: ParsedImage;
  price_recurrence: PriceRecurrenceCategory;
}

export type PriceRecurrenceCategory =
  | 'One-time fee'
  | 'Daily fee'
  | 'Weekly fee'
  | 'Monthly fee'
  | 'Yearly fee';

namespace EventsCalendar {
  export interface APIResponse {
    events: Event[];
    rest_url: string;
    next_rest_url: string;
    total: number;
    total_pages: number;
  }

  export interface Event {
    id: number;
    global_id: string;
    global_id_lineage: string[];
    author: string;
    status: string;
    date: string;
    date_utc: string;
    modified: string;
    modified_utc: string;
    url: string;
    rest_url: string;
    title: string;
    description: string;
    excerpt: string;
    slug: string;
    image: Image | false;
    all_day: boolean;
    start_date: string;
    start_date_details: DateTimeDetails;
    end_date: string;
    end_date_details: DateTimeDetails;
    utc_start_date: string;
    utc_start_date_details: DateTimeDetails;
    utc_end_date: string;
    utc_end_date_details: DateTimeDetails;
    timezone: string;
    timezone_abbr: string;
    cost: string;
    cost_details: CostDetails;
    website: string;
    show_map: boolean;
    show_map_link: boolean;
    hide_from_listings: boolean;
    sticky: boolean;
    featured: boolean;
    categories: Category[];
    tags: Tag[];
    venue: Venue;
    organizer: Organizer[];
  }

  export interface DateTimeDetails {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
  }

  export interface CostDetails {
    currency_symbol: string;
    currency_code: string;
    currency_position: string;
    values: string[];
  }

  export interface Category {
    name: string;
    slug: string;
    term_group: number;
    term_taxonomy_id: number;
    taxonomy: string;
    description: string;
    parent: number;
    count: number;
    filter: string;
    id: number;
    urls: URLs;
  }

  export interface Tag {
    name: string;
    slug: string;
    term_group: number;
    term_taxonomy_id: number;
    taxonomy: string;
    description: string;
    parent: number;
    count: number;
    filter: string;
    id: number;
    urls: URLs;
  }

  export interface URLs {
    self: string;
    collection: string;
  }

  export interface Venue {
    id: number;
    author: string;
    status: string;
    date: string;
    date_utc: string;
    modified: string;
    modified_utc: string;
    url: string;
    venue: string;
    slug: string;
    address: string;
    city: string;
    country: string;
    state: string;
    zip: string;
    phone: string;
    stateprovince: string;
    show_map: boolean;
    show_map_link: boolean;
    global_id: string;
    global_id_lineage: string[];
  }

  export interface Organizer {
    id: number;
    author: string;
    status: string;
    date: string;
    date_utc: string;
    modified: string;
    modified_utc: string;
    url: string;
    organizer: string;
    slug: string;
    phone: string;
    email: string;
    global_id: string;
    global_id_lineage: string[];
  }

  export interface Image {
    url: string;
    id: number;
    extension: string;
    width: number;
    height: number;
    filesize: number;
    sizes: ImageSizes;
  }

  export interface ImageSizes {
    medium?: ImageDetails;
    large?: ImageDetails;
    thumbnail?: ImageDetails;
    medium_large?: ImageDetails;
    '1536x1536'?: ImageDetails;
  }

  export interface ImageDetails {
    width: number;
    height: number;
    'mime-type': string;
    filesize: number;
    url: string;
  }
}

export const venueToFullAddress = (venue: EventsCalendar.Venue) =>
  [venue.address, venue.city, venue.state, venue.country]
    .map((v) => v?.trim())
    .filter(Boolean)
    .join(', ');

export function createGoogleCalendarUrl(event: Event): string {
  const baseUrl = 'https://calendar.google.com/calendar/r/eventedit';
  const params = new URLSearchParams();

  function formatDateTime(date: string, allDay: boolean): string {
    const d = new Date(date);
    const pad = (num: number) => num.toString().padStart(2, '0');

    if (allDay) {
      return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    } else {
      return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}Z`;
    }
  }

  const startDate = formatDateTime(event.utc_start_date, event.all_day);
  const endDate = formatDateTime(event.utc_end_date, event.all_day);
  const dates = event.all_day
    ? `${startDate}/${endDate}`
    : `${startDate}/${endDate}`;

  params.append('text', event.title);
  params.append('dates', dates);

  if (event.description) {
    const cleanDetails = event.description.replace(/<[^>]*>/g, '');
    params.append('details', he.decode(cleanDetails));
  }

  if (event.venue) {
    params.append('location', venueToFullAddress(event.venue));
  }

  if (event.timezone) {
    params.append('ctz', event.timezone);
  }

  if (event.website) {
    params.append('sprop', `website:${event.website}`);
  }

  // if (event.organizer && event.organizer.length > 0) {
  //   const emails = event.organizer.map((org) => org.email).join(',');
  //   params.append('add', emails);
  // }

  return `${baseUrl}?${params.toString()}`;
}
