const baseRoute = import.meta.env.PUBLIC_WP_API;
const wpApiRoute = `${baseRoute}/wp/v2`;
const eventsApiRoute = `${baseRoute}/tribe/events/v1/events`;

export const routes = {
  boardMembers: `${wpApiRoute}/board_members?per_page=100`,
  events: `${eventsApiRoute}?per_page=10&status=publish&starts_after=1900-01-01&per_page=1000000000`,
  pageSpoilers: `${wpApiRoute}/page-spoiler`,
  carouselAds: `${wpApiRoute}/carousel-ad?_embed`,
  tenets: `${wpApiRoute}/tenet?acf_format=standard`,
  page: (id: number) => `${wpApiRoute}/pages/${id}?_embed`,
  post: (id: number) => `${wpApiRoute}/posts/${id}`
};
