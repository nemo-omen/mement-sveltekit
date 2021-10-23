import bcrypt from 'bcrypt';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import * as service from '../../lib/services/user.service.js';
import CookieService from '../../lib/services/cookie.service.js';
import User from '../../lib/models/user.model.js';

export const post = async ({ body }) => {
  try {
    const user = await service.getByEmail(body.email);
    if (user) {
      return {
        status: 400,
        body: {
          message: 'A user with that email already exists.',
        },
      };
    }

    const salt = await bcrypt.genSalt(10);

    const user = new User(
      body.name,
      body.userName,
      body.email,
      await bcrypt.hash(body.password, salt)
    );

    const createResponse = await service.create(user);
    if (createResponse[0].affectedRows < 1) {
      throw new Error('Something went wrong while saving that user!');
    }

    const cookieId = uuidv4();

    await CookieService.insertOne({ cookieId, email: user.email });

    const headers = {
      'Set-Cookie': cookie.serialize('session_id', cookieId, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        nameSite: 'strict',
        path: '/',
      }),
    };

    return {
      status: 200,
      headers,
      body: {
        message: 'Successfully registered!',
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
}; // end post
