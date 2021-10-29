export async function get(request) {
  return {
    body: {
      message: "Yep!"
    }
  }
}

export async function post(request) {
  return {
    body: {
      message: 'Post yep!',
    }
  }
}