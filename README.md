# Cookie + immutable `Response` headers → 500 in a production build

Minimal reproduction for an Astro bug: an on-demand rendered endpoint that sets a cookie and returns
`Response.redirect()` or a `fetch()` response fails with a 500 in a production build served locally
by `@astrojs/node`, while `astro dev` handles it correctly. It does not depend on any hosting platform.

- `src/pages/api/login.ts`: sets a cookie and returns `Response.redirect()`
- `src/pages/api/proxy.ts`: sets a cookie and returns a `fetch()` response

## Steps

```sh
npm install
npm run build
npm run start            # serves the production build on http://localhost:4321

curl -si localhost:4321/api/login
curl -si localhost:4321/api/proxy
```

Actual: both return `HTTP/1.1 500 Internal Server Error`, and the server logs `TypeError: immutable`
from `prepareResponse`.

Expected (what `npm run dev` returns for the same requests):

```
$ curl -si localhost:4321/api/login
HTTP/1.1 302 Found
location: http://localhost:4321/dashboard
set-cookie: session=abc

$ curl -si localhost:4321/api/proxy
HTTP/1.1 200 OK
set-cookie: session=abc
```
