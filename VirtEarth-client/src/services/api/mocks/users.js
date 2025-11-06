export function mockCheckUserExists(username) {
  if (username === 'john doe') {
    return Promise.resolve({
      status: 409,
      exists: true,
    });
  }

  if (username === 'invalid') {
    return Promise.resolve({
      status: 400,
      message: 'Invalid username',
    });
  }

  return Promise.resolve({
    status: 204,
    exists: false,
  });
}