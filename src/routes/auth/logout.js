import * as cookie from 'cookie';
import CookieService from '../../lib/services/cookie.service.js';

export const post = async ({ body }) => {
  let cookieId;

  const cookieResponse = await CookieService.findOneByEmail(body.email);
  if (cookieResponse?.id) {
    cookieId = cookieResponse.id;
    await CookieService.deleteOne(cookieResponse.id);
  }

  const headers = {
    'Set-cookie': cookie.serialize('session_id', cookieId, {
      httpOnly: true,
      maxAge: new Date('01 Jan 1970 00:00:00 GMT'),
      sameSite: 'strict',
      path: '/',
    }),
  };

  return {
    status: 200,
    headers,
    body: {
      message: 'Logout successful',
    },
  };
};
