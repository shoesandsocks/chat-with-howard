workbox.routing.registerRoute(
  new RegExp('/oauth/'),
  new workbox.strategies.NetworkOnly()
);