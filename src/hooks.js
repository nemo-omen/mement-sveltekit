import * as cookie from 'cookie';
import CookieService from './lib/services/cookie.service.js';

export const handle = async ({ request, resolve }) => {
  const cookies = cookie.parse(request.headers.cookie || '');
  request.locals.user = cookie;

  if (!cookies.session_id) {
    request.locals.user.authenticated = false;
  }

  const userSession = await CookieService.findOne(cookies.session_id);

  if (userSession) {
    request.locals.user.authenticated = true;
    request.locals.user.email = userSession.email;
  } else {
    request.locals.user.authenticated = false;
  }

  const response = resolve(request);

  return {
    ...response,
    headers: {
      ...response.headers,
    },
  };
};
