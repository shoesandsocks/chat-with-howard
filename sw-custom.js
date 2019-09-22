if (t.request.url.indexOf('/oauth') !== -1) return false;

// FUTURE SELF: you're keeping the serviceworker but going around it for this one route
// insert it into the sw

// Sept 2019 -- but now we have Workbox so maybe this:

// am i supposed to put this in the build by-hand? like i was with the above??

// workbox.routing.registerRoute(
//   new RegExp('/oauth/'),
//   new workbox.strategies.NetworkOnly()
// );