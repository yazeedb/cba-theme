const baseRoute = import.meta.env.PUBLIC_WP_API;

export const routes = {
  boardMembers: `${baseRoute}/board_members`,
  events: `${baseRoute}/acf-custom-event?_embed`,
  pageSpoilers: `${baseRoute}/page-spoiler`,
  carouselAds: `${baseRoute}/carousel-ad?_embed`,
  oneEvent: (id: number) => `${routes.events}/${id}`
};
