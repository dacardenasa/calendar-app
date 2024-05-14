/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst, NetworkOnly } from "workbox-strategies";
import { BackgroundSyncPlugin } from "workbox-background-sync";

precacheAndRoute(self.__WB_MANIFEST);

const bgSyncPlugin = new BackgroundSyncPlugin("POSTS_OFFLINE_QUE", {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
  forceSyncFallback: true
});

const cacheFirstURLS = [
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"
];

const networkFirstURLS = [
  "/api/auth/renew",
  "/api/events"
];

const netWorkOnlyRequests = [
  {
    url: "http://localhost:4000/api/events",
    method: "POST",
    plugins: [bgSyncPlugin]
  },
  {
    url: "http://localhost:4000/api/events/",
    method: "PUT",
    plugins: [bgSyncPlugin]
  },
  {
    url: "http://localhost:4000/api/events/",
    method: "DELETE",
    plugins: [bgSyncPlugin]
  }
];

registerRoute(({ url }) => cacheFirstURLS.includes(url.href), new CacheFirst());
registerRoute(({ url }) => networkFirstURLS.includes(url.pathname), new NetworkFirst());

/* Offline posts */

netWorkOnlyRequests.map((req) =>
  registerRoute(
    new RegExp(req.url),
    new NetworkOnly({
      plugins: [...req.plugins]
    }),
    req.method
  )
);
