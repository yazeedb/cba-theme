/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, j as renderSlot, i as renderComponent } from '../astro_B1jQg0ns.mjs';
import 'kleur/colors';
import 'html-escaper';
import { b as $$Section, $ as $$Layout } from './about_DJNeJFuq.mjs';
import 'clsx';

const $$Astro$5 = createAstro();
const $$EventCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$EventCard;
  const { name, price, date, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white shadow-md rounded-lg border-t-8 border-emerald-950"> <div class="p-6"> <div class="font-bold flex items-center justify-between text-sm"> <p class="text-slate-600">${date}</p> <span class="bg-slate-700 text-slate-50 px-2 py-1 rounded-full">${price}</span> </div> <h3 class="font-bold text-xl my-2">${name}</h3> <p class="text-gray-700 mb-4 section-paragraph"> ${description} </p> <button class="cta-button w-full" type="button"> Register </button> </div> </div>`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/EventCard.astro", void 0);

const $$Astro$4 = createAstro();
const $$NewTabLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$NewTabLink;
  return renderTemplate`${maybeRenderHead()}<a target="_blank" rel="noreferrer noopener"${spreadAttributes(Astro2.props)}>${renderSlot($$result, $$slots["default"])}</a>`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/NewTabLink.astro", void 0);

const $$Astro$3 = createAstro();
const $$YouTube = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$YouTube;
  return renderTemplate`${maybeRenderHead()}<svg width="668" height="668" viewBox="0 0 668 668" fill="none" xmlns="http://www.w3.org/2000/svg"${spreadAttributes(Astro2.props)}> <g clip-path="url(#clip0_396_24)"> <path d="M334 667.333C518.095 667.333 667.333 518.095 667.333 334C667.333 149.905 518.095 0.666687 334 0.666687C149.905 0.666687 0.666626 149.905 0.666626 334C0.666626 518.095 149.905 667.333 334 667.333Z" fill="#FF0000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M522.342 206.968C528.993 213.62 533.787 221.898 536.243 230.978C550.392 287.928 547.122 377.873 536.518 437.022C534.062 446.102 529.268 454.38 522.617 461.032C515.965 467.683 507.687 472.477 498.607 474.933C465.365 484 331.573 484 331.573 484C331.573 484 197.782 484 164.54 474.933C155.46 472.477 147.182 467.683 140.53 461.032C133.878 454.38 129.085 446.102 126.628 437.022C112.397 380.318 116.298 290.318 126.353 231.253C128.81 222.172 133.603 213.893 140.255 207.242C146.907 200.59 155.185 195.798 164.265 193.34C197.507 184.275 331.298 184 331.298 184C331.298 184 465.09 184 498.332 193.067C507.412 195.523 515.69 200.317 522.342 206.968ZM399.705 334L288.717 398.285V269.713L399.705 334Z" fill="white"></path> </g> <defs> <clipPath id="clip0_396_24"> <rect width="668" height="668" fill="white"></rect> </clipPath> </defs> </svg>`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/svgs/YouTube.astro", void 0);

const $$Astro$2 = createAstro();
const $$Facebook = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Facebook;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#4460A0" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="-143 145 512 512" xml:space="preserve"${spreadAttributes(Astro2.props)}> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M169.5,357.6l-2.9,38.3h-39.3  v133H77.7v-133H51.2v-38.3h26.5v-25.7c0-11.3,0.3-28.8,8.5-39.7c8.7-11.5,20.6-19.3,41.1-19.3c33.4,0,47.4,4.8,47.4,4.8l-6.6,39.2  c0,0-11-3.2-21.3-3.2c-10.3,0-19.5,3.7-19.5,14v29.9H169.5z"></path> </svg>`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/svgs/Facebook.astro", void 0);

const $$Astro$1 = createAstro();
const $$Instagram = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Instagram;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 32 32" fill="none"${spreadAttributes(Astro2.props)}> <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)"></rect> <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"></rect> <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"></rect> <path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white"></path> <defs> <radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"> <stop stop-color="#B13589"></stop> <stop offset="0.79309" stop-color="#C62F94"></stop> <stop offset="1" stop-color="#8A3AC8"></stop> </radialGradient> <radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"> <stop stop-color="#E0E8B7"></stop> <stop offset="0.444662" stop-color="#FB8A2E"></stop> <stop offset="0.71474" stop-color="#E2425C"></stop> <stop offset="1" stop-color="#E2425C" stop-opacity="0"></stop> </radialGradient> <radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"> <stop offset="0.156701" stop-color="#406ADC"></stop> <stop offset="0.467799" stop-color="#6A45BE"></stop> <stop offset="1" stop-color="#6A45BE" stop-opacity="0"></stop> </radialGradient> </defs> </svg>`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/svgs/Instagram.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Carousel", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/yazeed/Desktop/projects/cba-website/src/components/Carousel", "client:component-export": "Carousel" })} ${renderComponent($$result2, "Section", $$Section, {}, { "default": ($$result3) => renderTemplate` <section class="flex justify-between items-center"> <h2 class="text-primary-header-dark section-heading">Our Events</h2> <a class="border-slate-700 text-slate-700 font-bold border-2 p-2 rounded flex items-center" href="/events"> <span class="px-2">View all</span> <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17.1859 12.6094H2.00069C1.47007 12.6094 0.961191 12.3987 0.585989 12.0236C0.210787 11.6485 0 11.1398 0 10.6094C0 10.079 0.210787 9.57025 0.585989 9.19518C0.961191 8.82011 1.47007 8.6094 2.00069 8.6094H17.1859L12.5843 4.0094C12.3763 3.82859 12.2079 3.60675 12.0896 3.3578C11.9714 3.10884 11.9059 2.83815 11.8972 2.56269C11.8886 2.28724 11.937 2.01297 12.0394 1.7571C12.1418 1.50123 12.296 1.26928 12.4923 1.07579C12.6886 0.882309 12.9228 0.731471 13.1802 0.632744C13.4376 0.534016 13.7126 0.489528 13.988 0.502073C14.2634 0.514618 14.5332 0.583924 14.7806 0.705643C15.0279 0.827361 15.2474 0.998866 15.4253 1.2094L23.4281 9.2094C23.7947 9.58325 24 10.0859 24 10.6094C24 11.1329 23.7947 11.6355 23.4281 12.0094L15.4253 20.0094C15.0449 20.34 14.5538 20.5148 14.05 20.499C13.5462 20.4832 13.067 20.2779 12.7081 19.9242C12.3492 19.5705 12.1371 19.0944 12.1141 18.591C12.0912 18.0877 12.2591 17.5943 12.5843 17.2094L17.1859 12.6094Z" fill="#334155"></path> </svg> </a> </section> <section class="grid grid-cols-1 md:grid-cols-3 gap-6"> ${renderComponent($$result3, "EventCard", $$EventCard, { "name": "Monthly Potluck", "description": "Gather with fellow community members for our monthly potluck. Share delicious dishes, stories, and enjoy our cultural richness together.", "price": "Free", "date": "June 1st at 2:00 PM" })} ${renderComponent($$result3, "EventCard", $$EventCard, { "name": "Learn Circassian Workshop", "description": "Dive into the beauty of the Circassian language in this interactive workshop designed for all levels. Materials provided on-site.", "price": "$10/month", "date": "June 5th at 10:00 AM" })} ${renderComponent($$result3, "EventCard", $$EventCard, { "name": "Test Event", "description": "Dive into the beauty of the Circassian language in this interactive workshop designed for all levels. Materials provided on-site.", "price": "Free", "date": "July 5th at 12:00 PM" })} ${renderComponent($$result3, "EventCard", $$EventCard, { "name": "Learn Circassian Workshop", "description": "Dive into the beauty of the Circassian language in this interactive workshop designed for all levels. Materials provided on-site.", "price": "$10/month", "date": "June 5th at 10:00 AM" })} ${renderComponent($$result3, "EventCard", $$EventCard, { "name": "Test Event", "description": "Dive into the beauty of the Circassian language in this interactive workshop designed for all levels. Materials provided on-site.", "price": "Free", "date": "July 5th at 12:00 PM" })} </section> ` })} ${renderComponent($$result2, "Section", $$Section, { "containerClass": "bg-primary-green text-paragraph-light" }, { "default": ($$result3) => renderTemplate` <h2 class="section-heading">Learn About the CBA</h2> <p class="section-paragraph">
The Circassian Benevolent Association, nestled in the quaint town of
        Wayne, New Jersey, stands as a beacon of cultural heritage and community
        spirit. Established in the late 19th century by early Circassian
        immigrants, this association has been a cornerstone of support and
        cultural preservation for the Circassian community in America.
</p> <a class="cta-button self-start" href="/about">Read more</a> ` })} ${renderComponent($$result2, "Section", $$Section, {}, { "default": ($$result3) => renderTemplate` <h2 class="section-heading">IG Feed Placeholder</h2> <p class="section-paragraph">
The Instagram feed will go here. For now this is sample content to get a
        sense of what the final layout will look like on mobile, desktop, and
        other screen sizes.
</p> ` })} ${renderComponent($$result2, "Section", $$Section, { "containerClass": "bg-primary-green text-paragraph-light" }, { "default": ($$result3) => renderTemplate` <h2 class="section-heading">Circassian History</h2> <p class="section-paragraph">
Circassians, also called Cherkess or Adyghe (Adyghe and Kabardian:
        Адыгэхэр, romanized: Adygekher), are an indigenous Northwest Caucasian
        ethnic group and nation native to the historical country-region of
        Circassia in the North Caucasus.
</p> <p class="section-paragraph">
As a consequence of the Circassian genocide perpetrated by the Russian
        Empire in the 19th century during the Russo-Circassian War, most
        Circassians were exiled from their homeland in Circassia to modern-day
        Turkey and the rest of the Middle East, where most of them are today.
</p> <p class="section-paragraph">
In the early 1990s, the Unrepresented Nations and Peoples Organization
        estimated that there are as many as 3.7 million Circassians in diaspora
        in over 50 countries.
</p> <a class="cta-button self-start" href="/history">Learn more</a> ` })} ${renderComponent($$result2, "Section", $$Section, {}, { "default": ($$result3) => renderTemplate` <h2 class="section-heading">Connect With Us</h2> <p class="text-paragraph-dark">
We are located at
 ${renderComponent($$result3, "NewTabLink", $$NewTabLink, { "href": "https://maps.google.com?q=Circassian Benevolent Association Wayne NJ", "class": "text-href-color -mr-1" }, { "default": ($$result4) => renderTemplate`
383 Oldham Road, Wayne, NJ 07470
` })}.
</p> <p class="text-paragraph-dark">
Our main office number is
<a href="tel:+9737908979" class="text-href-color">(973) 790-8979</a>.
</p> <p class="text-paragraph-dark">Check out our social media pages!</p> <div class="flex gap-base"> ${renderComponent($$result3, "NewTabLink", $$NewTabLink, { "href": "https://www.youtube.com/@cba_america" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "YouTube", $$YouTube, { "class": "w-12 h-auto" })} ` })} ${renderComponent($$result3, "NewTabLink", $$NewTabLink, { "href": "https://www.facebook.com/CBA.America/" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Facebook", $$Facebook, { "class": "w-12 h-auto" })} ` })} ${renderComponent($$result3, "NewTabLink", $$NewTabLink, { "href": "https://www.instagram.com/cba_america/?hl=en" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Instagram", $$Instagram, { "class": "w-12 h-auto" })} ` })} </div> ` })} </main> ` })}`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/pages/index.astro", void 0);

const $$file = "/Users/yazeed/Desktop/projects/cba-website/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
