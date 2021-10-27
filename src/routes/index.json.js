import service from '$lib/services/user.service.js';

export const post = async ({ body }) => {
  console.log(body.email);
  if (body.email) {
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
      } else {
        // send user object without password
        return {
          status: 200,
          body: {
            id: user.id,
            email: user.email,
            name: user.name,
            userName: user.userName,
          },
        };
      }
    } catch (error) {
      console.error(error);
    }
  }
};
