import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ cookies }) => {
  cookies.set('session', 'abc');
  return fetch('data:text/plain,proxied');
};
