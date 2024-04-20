import { format } from 'date-fns';

export const generateGoogleCalendarUrl = ({
  startDate,
  endDate,
  title,
  details,
  location,
  timezone
}: EventDetails) => {
  const formatDate = (date: Date) => {
    return format(date, "yyyyMMdd'T'HHmmss'Z'");
  };

  const baseUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit';
  const encodedTitle = encodeURIComponent(title);
  const encodedDetails = encodeURIComponent(details);
  const encodedLocation = encodeURIComponent(location);
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  const encodedTimezone = encodeURIComponent(timezone);

  return `${baseUrl}?dates=${formattedStartDate}/${formattedEndDate}&text=${encodedTitle}&details=${encodedDetails}&location=${encodedLocation}&trp=false&ctz=${encodedTimezone}&sprop=website:https://demo.theeventscalendar.com`;
};

interface EventDetails {
  startDate: Date;
  endDate: Date;
  title: string;
  details: string;
  location: string;
  timezone: string;
}

export const createEventDetailsUrl = (slug: string) => `/events/${slug}`;
