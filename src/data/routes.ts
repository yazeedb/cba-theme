const baseRoute = import.meta.env.PUBLIC_WP_API;

export const routes = {
  boardMembers: `${baseRoute}/board_members`,
  events: `${baseRoute}/acf-custom-event?_embed`,
  pageSpoilers: `${baseRoute}/page-spoiler`,
  carouselAds: `${baseRoute}/carousel-ad?_embed`,
  tenets: `${baseRoute}/tenet?acf_format=standard`,
  page: (id: number) => `${baseRoute}/pages/${id}?_embed`,
  post: (id: number) => `${baseRoute}/posts/${id}`
};
