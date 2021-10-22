export async function get(request) {
  console.log('request: ', request);
  return {
    body: {
      message: "Yep!"
    }
  }
}