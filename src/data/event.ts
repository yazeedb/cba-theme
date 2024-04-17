import type { Post } from './commonInterfaces';

export const parseEvent = (data: EventResponse): Event => {
  return {
    id: data.id,
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
  fields: AcfFields;
}

interface EventResponse extends Post {
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
