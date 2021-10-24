import * as cookie from 'cookie';
import CookieService from './lib/services/cookie.service.js';

export const handle = async ({ request, resolve }) => {
  const cookies = cookie.parse(request.headers.cookie || '');
  request.locals.user = cookies;

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

  const response = await resolve(request);
  console.log('request in hooks: ', request);

  return {
    ...response,
    headers: {
      ...response.headers,
    },
  };
};

export const getContext = async ({headers}) => {

};

export const getSession = async (request) => {
  return request.locals.user
    ? {
        user: {
          authenticated: request.locals.user.authenticated,
          email: request.locals.user.email,
        },
      }
    : {};
};
