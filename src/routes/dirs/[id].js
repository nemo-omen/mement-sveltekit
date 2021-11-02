import service from '$lib/services/directory.service.js';

export async function get({ params }) {
  const { id } = params;

  try {
    const allDirsResponse = await service.find(id);
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
