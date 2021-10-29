import UserService from '$lib/services/user.service.js';
import * as cookie from 'cookie';
import CookieService from '$lib/services/cookie.service.js';
import { authService } from '$lib/machines/auth.machine.js';

export const handle = async ({ request, resolve }) => {
  const cookies = cookie.parse(request.headers.cookie || '');
  request.locals.user = { ...cookies };

  console.log('cookies: ', cookies);

  if (!cookies.session_id) {
    request.locals.user.authenticated = false;
  }

  const userSession = await CookieService.findOne(cookies.session_id);
  console.log('userSession: ', userSession);

  let storedUser;

  if (userSession) {
    storedUser = await getUser(userSession.email);
    request.locals.user.authenticated = true;
    request.locals.user.email = userSession.email;
    request.locals.user.name = storedUser.name;
    request.locals.user.userName = storedUser.userName;
    request.locals.user.id = storedUser.id;
  } else {
    request.locals.user.authenticated = false;
  }

  console.log('request.locals.user: ', request.locals.user);

  const response = await resolve(request);

  return {
    ...response,
    headers: {
      ...response.headers,
    },
  };
};

async function getUser(email) {
  const userResponse = await UserService.getByEmail(email);
  let user = {};
  if (userResponse[0].length > 0) {
    user = userResponse[0][0];
  }
  return user;
}

export const getSession = async (request) => {
  return request.locals.user
    ? {
        user: {
          id: request.locals.user.id,
          email: request.locals.user.email,
          name: request.locals.user.name,
          userName: request.locals.user.userName,
          authenticated: request.locals.user.authenticated,
        },
      }
    : {};
};
