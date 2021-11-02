import service from '$lib/services/note.service.js';

export async function get({ params }) {
  const { id } = params;
  try {
    const response = await service.find(id);
    if (!response.ok) {
      return {
        status: 500,
        body: {
          message: allDirsResponse.message,
        },
      };
    }

    return {
      status: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
  }
}
