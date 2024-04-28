import type { Post, Rendered } from './common';
import { routes } from './routes';

export const getContactInfo = () => {
  return fetch(routes.contactInfo)
    .then((res) => res.json())
    .then((data: ContactInfoResponse[]) => parseContactInfo(data));
};

const parseContactInfo = (data: ContactInfoResponse[]): ContactInfo | null => {
  const [first] = data;

  if (!first) return null;

  return {
    id: first.id,
    ...first.acf
  };
};

export interface ContactInfo extends AcfFields {
  id: number;
}

interface ContactInfoResponse extends Post {
  content: Rendered;
  acf: AcfFields;
}

interface AcfFields {
  phone_number: string;
  address: string;
  youtube: string;
  facebook: string;
  instagram: string;
}
