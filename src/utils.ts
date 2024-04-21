import he from 'he';
import type { Event } from './data/events';

export function createGoogleCalendarUrl(event: Event): string {
  const baseUrl = 'https://calendar.google.com/calendar/r/eventedit';
  const params = new URLSearchParams();

  function formatDateTime(date: string, allDay: boolean): string {
    const d = new Date(date);
    const pad = (num: number) => num.toString().padStart(2, '0');

    if (allDay) {
      return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
    } else {
      return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
    }
  }

  const startDate = formatDateTime(event.start_date, event.all_day);
  const endDate = formatDateTime(event.end_date, event.all_day);
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
    params.append('location', event.venue.address);
  }

  if (event.timezone) {
    params.append('ctz', event.timezone);
  }

  if (event.website) {
    params.append('sprop', `website:${event.website}`);
  }

  if (event.organizer && event.organizer.length > 0) {
    const emails = event.organizer.map((org) => org.email).join(',');
    params.append('add', emails);
  }

  return `${baseUrl}?${params.toString()}`;
}

export const createEventDetailsUrl = (slug: string) => `/events/${slug}`;
