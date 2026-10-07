import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ cookies, url }) => {
  cookies.set('session', 'abc');
  return Response.redirect(new URL('/dashboard', url), 302);
};
