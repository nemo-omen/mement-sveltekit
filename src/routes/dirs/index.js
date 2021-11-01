import service from '$lib/services/directory.service.js';

export async function get({ params }) {
  try {
    const allDirsResponse = await service.findAll();
    if (!allDirsResponse.ok) {
      return {
        status: 500,
        body: {
          message: allDirsResponse.message,
        },
      };
    }

    return {
      status: 200,
      body: JSON.stringify(allDirsResponse.data),
    };
  } catch (error) {
    console.error(error);
  }
}
