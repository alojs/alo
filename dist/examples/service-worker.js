/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "precache-manifest.95595c6a4823ea020945e19c6fc53d98.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "externals.js",
    "revision": "54d294bcc4103745d2f2828bf1a5a3d0"
  },
  {
    "url": "peter-osmenda-1224249-unsplash.wbc.jpg",
    "revision": "64786aca628ab9416350c90ce4f11fc5"
  },
  {
    "url": "app-shell.html",
    "revision": "34a09a62bc9abf1807ddd292b638d9ac"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/.*/, new workbox.strategies.NetworkFirst({ "cacheName":"runtime-cache", plugins: [{ cachedResponseWillBeUsed: async opt => { if (!opt.cachedResponse) { const response = await caches.match("/app-shell.html"); console.log("fallback", response); return response; } return opt.cachedResponse; } }] }), 'GET');
