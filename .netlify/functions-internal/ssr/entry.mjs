import { renderers } from './renderers.mjs';
import { manifest } from './manifest_5OkZiEhT.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_DE3l38XX.mjs');
const _page1 = () => import('./chunks/about_BxoRE5TP.mjs');
const _page2 = () => import('./chunks/events_D8a_eA_t.mjs');
const _page3 = () => import('./chunks/history_DBsQYJK1.mjs');
const _page4 = () => import('./chunks/index_BlxJ1u1v.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/events.astro", _page2],
    ["src/pages/history.astro", _page3],
    ["src/pages/index.astro", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "932691b8-9d6f-4d01-8560-b1a878500d4b"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
