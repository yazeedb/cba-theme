/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_B1jQg0ns.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as $$HeroCoverImage, b as $$Section, c as $$Picture, $ as $$Layout } from './about_DJNeJFuq.mjs';

const CircassianWarrior = new Proxy({"src":"/_astro/circassian-warrior.DgJ3j-WF.jpeg","width":536,"height":760,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yazeed/Desktop/projects/cba-website/src/assets/circassian-warrior.jpeg";
							}
							
							return target[name];
						}
					});

const CircassianAlphabet = new Proxy({"src":"/_astro/circassian-alphabet.8v3UUqe9.jpeg","width":320,"height":311,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yazeed/Desktop/projects/cba-website/src/assets/circassian-alphabet.jpeg";
							}
							
							return target[name];
						}
					});

const CircassianFlag = new Proxy({"src":"/_astro/circassian-flag.Sk_NFnaP.png","width":800,"height":400,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yazeed/Desktop/projects/cba-website/src/assets/circassian-flag.png";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro();
const $$History = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$History;
  const subtitle = "From ancient warriors to a global diaspora, the Circassians' enduring spirit transcends centuries of history and hardship.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "History" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "HeroCoverImage", $$HeroCoverImage, { "title": "Circassian History", "subtitle": subtitle, "backgroundImage": "/circassian-dance-bg.png" })} ${renderComponent($$result2, "Section", $$Section, { "containerClass": "bg-slate-100", "innerSectionClass": "flex flex-row" }, { "default": ($$result3) => renderTemplate` <h2 class="section-heading text-primary-header-dark">Introduction</h2> <div class="flex flex-col lg:flex-row gap-base"> <div class="text-paragraph-dark section-paragraph section-layout"> <p>
Circassians, also called Cherkess or Adyghe (Adyghe and Kabardian:
            Адыгэхэр, romanized: Adygekher), are an indigenous Northwest
            Caucasian ethnic group and a nation; native to the historical
            country-region of Circassia in the North Caucasus.
</p> <p>
As a consequence of the Circassian genocide perpetrated by the
            Russian Empire in the 19th century during the Russo-Circassian War,
            most Circassians were exiled from their homeland in Circassia to
            modern-day Turkey and the rest of the Middle East, where most of
            them are today.
</p> <p>
In the early 1990s, the Unrepresented Nations and Peoples
            Organization estimated that there are as many as 3.7 million
            Circassians in diaspora in over 50 countries.
</p> <p>
Circassians have a rich cultural heritage that includes unique
            traditions, music, dance, and attire. Their traditional music
            involves the use of instruments such as the shichepshin (a stringed
            instrument), the pshina (a flute), and the Circassian accordion. The
            traditional Circassian dance is characterized by its elegance and
            the striking attire worn by the dancers. Men wear coats with
            cartridge belts and woolen hats, while women dress in ornate, long
            dresses with tight sleeves.
</p> </div> ${renderComponent($$result3, "Picture", $$Picture, { "src": CircassianWarrior, "alt": "A Circassian warrior" })} </div> ` })} ${renderComponent($$result2, "Section", $$Section, { "containerClass": "bg-primary-green text-paragraph-light", "innerSectionClass": "flex" }, { "default": ($$result3) => renderTemplate` <h2 class="section-heading">Our Language</h2> <div class="flex flex-col lg:flex-row gap-base"> <div class="section-paragraph section-layout"> <p>
Circassians mainly speak the Circassian languages, two mutually
            intelligible languages of the Northwest Caucasian language family,
            namely Adyghe (West Circassian) and Kabardian (East Adyghe). Adyghe
            is based on Temirgoy (Chemirgoy) dialect, while Kabardian is based
            on the dialect of the same name.
</p> <p>
Circassians also speak Russian, Turkish, English, Arabic, and Hebrew
            in large numbers, having been exiled by Russia to lands of the
            Ottoman Empire, where the majority of them live today, and some to
            neighboring Persia, to which they came primarily through mass
            deportations by the Safavids and Qajars or, to a lesser extent, as
            muhajirs in the 19th century.
</p> </div> ${renderComponent($$result3, "Picture", $$Picture, { "class": "w-full sm:w-1/2 lg:w-full", "src": CircassianAlphabet, "alt": "The Circassian Alphabet" })} </div> ` })} ${renderComponent($$result2, "Section", $$Section, {}, { "default": ($$result3) => renderTemplate` <h2 class="section-heading">Our Flag</h2> <p class="section-paragraph">
The national flag of the Circassians, the Circassian flag consists of a
        green field charged with 12 gold stars and, in the center, three crossed
        arrows. The stars represent the 12 historical Circassian provinces: the
        Abzakh, the Besleney, the Bzhedugh, the Hatuqway, the Kabardians, the
        Mamkhegh, the Natukhaj, the Shapsugh, the Chemirgoy, the Ubykh, the
        Yegeruqway and the Zhaney.
</p> ${renderComponent($$result3, "Picture", $$Picture, { "src": CircassianFlag, "alt": "The Circassian Flag" })} ` })} </main> ` })}`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/pages/history.astro", void 0);

const $$file = "/Users/yazeed/Desktop/projects/cba-website/src/pages/history.astro";
const $$url = "/history";

export { $$History as default, $$file as file, $$url as url };
