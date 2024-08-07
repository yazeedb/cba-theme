import type { Post } from './common';
import { routes } from './routes';

export const getBoardMembers = () => {
  return fetch(routes.boardMembers)
    .then((res) => res.json())
    .then((data: BoardMemberResponse[]) => data.map(parseBoardMember));
};

const parseBoardMember = (data: BoardMemberResponse): BoardMember => {
  return {
    id: data.id,
    fields: data.acf
  };
};

export interface BoardMember {
  id: number;
  fields: AcfFields;
}

interface BoardMemberResponse extends Post {
  acf: AcfFields;
}

interface AcfFields {
  first_name: string;
  last_name: string;
  position: string;
  team: string;
}
