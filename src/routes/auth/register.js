import bcrypt from 'bcrypt';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import service from '$lib/services/user.service.js';
import CookieService from '$lib/services/cookie.service.js';
import User from '$lib/models/user.model.js';

export const post = async ({ body }) => {
  try {
    const response = await service.getByEmail(body.email);
    const user = response[0][0];

    if (user) {
      return {
        status: 400,
        body: {
          message: 'A user with that email already exists.',
        },
      };
    }

    const salt = await bcrypt.genSalt(10);

    const newUser = new User(
      body.name,
      body.userName,
      body.email,
      await bcrypt.hash(body.password, salt)
    );

    const createResponse = await service.create(newUser);
    if (createResponse[0].affectedRows < 1) {
      throw new Error('Something went wrong while saving that user!');
    }

    const cookieId = uuidv4();

    await CookieService.insertOne({ id: cookieId, email: newUser.email });

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
