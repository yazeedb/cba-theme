/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_B1jQg0ns.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './about_DJNeJFuq.mjs';

const $$Astro = createAstro();
const $$Events = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Events;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Events" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main></main> ` })} `;
}, "/Users/yazeed/Desktop/projects/cba-website/src/pages/events.astro", void 0);

const $$file = "/Users/yazeed/Desktop/projects/cba-website/src/pages/events.astro";
const $$url = "/events";

export { $$Events as default, $$file as file, $$url as url };
