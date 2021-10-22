export async function get(request) {
  console.log('request: ', request);
  return {
    body: {
      message: "Yep!"
    }
  }
}

export async function post(request) {
  console.log(request);
  return {
    body: {
      message: 'Post yep!',
    }
  }
}