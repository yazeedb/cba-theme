const baseRoute = import.meta.env.PUBLIC_WP_API;

export const routes = {
  boardMembers: `${baseRoute}/board_members`,
  events: `${baseRoute}/acf-custom-event`,
  pageSpoilers: `${baseRoute}/page-spoiler`,
  carouselAds: `${baseRoute}/carousel-ad?_embed`
};
