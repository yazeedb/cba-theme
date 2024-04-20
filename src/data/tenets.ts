import type { Post } from './common';
import { routes } from './routes';

export const getTenets = () => {
  return fetch(routes.tenets)
    .then((res) => res.json())
    .then((data: TenetResponse[]) => data.map(parseTenet));
};

const parseTenet = (data: TenetResponse): Tenet => {
  return {
    id: data.id,
    fields: data.acf
  };
};

export interface Tenet {
  id: number;
  fields: AcfFields;
}

interface TenetResponse extends Post {
  acf: AcfFields;
}

interface AcfFields {
  name: string;
  description: string;
  icon: {
    id: number;
    title: string;
    url: string;
    width: number;
    height: number;
  };
}
