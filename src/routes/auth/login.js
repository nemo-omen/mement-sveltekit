import bcrypt from 'bcrypt';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import service from '../../lib/services/user.service.js';
import CookieService from '../../lib/services/cookie.service.js';

export const post = async ({ body }) => {
  try {
    const response = await service.getByEmail(body.email);

    const user = response[0][0];

    if (!user) {
      return {
        status: 401,
        body: {
          message: `Could not find a user with the email ${body.email}`,
        },
      };
    }

    if ((await bcrypt.compare(body.password, user.password)) !== true) {
      return {
        status: 401,
        body: {
          message: 'Password is incorrect!',
        },
      };
    }

    const cookieId = uuidv4();

    const cookieResponse = await CookieService.findOneByEmail(body.email);

    const duplicateUser = cookieResponse ? cookieResponse : null;

    if (duplicateUser) {
      await CookieService.updateOne({
        session_id: cookieId,
        email: body.email,
        name: user?.name,
        userName: user?.userName,
      });
    } else {
      await CookieService.insertOne({
        session_id: cookieId,
        email: body.email,
        name: user?.name,
        userName: user?.userName,
      });
    }

    const headers = {
      'Set-cookie': cookie.serialize('session_id', cookieId, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        path: '/',
      }),
    };

    return {
      status: 200,
      headers,
      body: {
        message: 'Successfully logged in!',
        user: { name: user.name, userName: user.userName, email: user.email },
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        message: error.message,
      },
    };
  }
};
