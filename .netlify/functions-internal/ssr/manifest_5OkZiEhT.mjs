import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_B1jQg0ns.mjs';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const t=document.querySelector(\".navbar-burger\"),e=document.querySelector(\".navbar-menu\"),c=document.querySelector(\".navbar-close\"),o=document.querySelector(\".navbar-backdrop\");if(!t||!e||!c||!o)return;const n=()=>e.classList.toggle(\"hidden\");t.addEventListener(\"click\",function(){n()}),c.addEventListener(\"click\",function(){n()}),o.addEventListener(\"click\",function(){n()}),document.addEventListener(\"keyup\",function(d){d.key===\"Escape\"&&e.classList.add(\"hidden\")})});\n"}],"styles":[{"type":"external","src":"/_astro/about.7XNIy60T.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const t=document.querySelector(\".navbar-burger\"),e=document.querySelector(\".navbar-menu\"),c=document.querySelector(\".navbar-close\"),o=document.querySelector(\".navbar-backdrop\");if(!t||!e||!c||!o)return;const n=()=>e.classList.toggle(\"hidden\");t.addEventListener(\"click\",function(){n()}),c.addEventListener(\"click\",function(){n()}),o.addEventListener(\"click\",function(){n()}),document.addEventListener(\"keyup\",function(d){d.key===\"Escape\"&&e.classList.add(\"hidden\")})});\n"}],"styles":[{"type":"external","src":"/_astro/about.7XNIy60T.css"}],"routeData":{"route":"/events","isIndex":false,"type":"page","pattern":"^\\/events\\/?$","segments":[[{"content":"events","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/events.astro","pathname":"/events","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const t=document.querySelector(\".navbar-burger\"),e=document.querySelector(\".navbar-menu\"),c=document.querySelector(\".navbar-close\"),o=document.querySelector(\".navbar-backdrop\");if(!t||!e||!c||!o)return;const n=()=>e.classList.toggle(\"hidden\");t.addEventListener(\"click\",function(){n()}),c.addEventListener(\"click\",function(){n()}),o.addEventListener(\"click\",function(){n()}),document.addEventListener(\"keyup\",function(d){d.key===\"Escape\"&&e.classList.add(\"hidden\")})});\n"}],"styles":[{"type":"external","src":"/_astro/about.7XNIy60T.css"}],"routeData":{"route":"/history","isIndex":false,"type":"page","pattern":"^\\/history\\/?$","segments":[[{"content":"history","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/history.astro","pathname":"/history","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",function(){const t=document.querySelector(\".navbar-burger\"),e=document.querySelector(\".navbar-menu\"),c=document.querySelector(\".navbar-close\"),o=document.querySelector(\".navbar-backdrop\");if(!t||!e||!c||!o)return;const n=()=>e.classList.toggle(\"hidden\");t.addEventListener(\"click\",function(){n()}),c.addEventListener(\"click\",function(){n()}),o.addEventListener(\"click\",function(){n()}),document.addEventListener(\"keyup\",function(d){d.key===\"Escape\"&&e.classList.add(\"hidden\")})});\n"}],"styles":[{"type":"external","src":"/_astro/about.7XNIy60T.css"},{"type":"external","src":"/_astro/Carousel.DPIf8cY3.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/yazeed/Desktop/projects/cba-website/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/yazeed/Desktop/projects/cba-website/src/pages/events.astro",{"propagation":"none","containsHead":true}],["/Users/yazeed/Desktop/projects/cba-website/src/pages/history.astro",{"propagation":"none","containsHead":true}],["/Users/yazeed/Desktop/projects/cba-website/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/events.astro":"chunks/pages/events_B1xaS3Fx.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_4SL_UU_s.mjs","/src/pages/history.astro":"chunks/pages/history_BiabJGJc.mjs","/src/pages/index.astro":"chunks/pages/index_zt5hCbuW.mjs","\u0000@astrojs-manifest":"manifest_5OkZiEhT.mjs","/Users/yazeed/Desktop/projects/cba-website/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DE3l38XX.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_BxoRE5TP.mjs","\u0000@astro-page:src/pages/events@_@astro":"chunks/events_D8a_eA_t.mjs","\u0000@astro-page:src/pages/history@_@astro":"chunks/history_DBsQYJK1.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_BlxJ1u1v.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.Mr2mvwkC.js","/Users/yazeed/Desktop/projects/cba-website/src/components/Carousel":"_astro/Carousel.CB9LdgWn.js","@astrojs/react/client.js":"_astro/client.DURhWcR2.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/circassian-flag.Sk_NFnaP.png","/_astro/circassian-warrior.DgJ3j-WF.jpeg","/_astro/circassian-alphabet.8v3UUqe9.jpeg","/_astro/cba-logo.D0sRbK7e.png","/_astro/about.7XNIy60T.css","/cba-logo.png","/cba-photo.jpeg","/circassian-alphabet.jpeg","/circassian-dance-bg.png","/circassian-flag.png","/circassian-warrior.jpeg","/favicon.ico","/_astro/Carousel.CB9LdgWn.js","/_astro/Carousel.DPIf8cY3.css","/_astro/client.DURhWcR2.js","/_astro/index.CSLRt44l.js"],"buildFormat":"directory"});

export { manifest };
