export async function mockLoginWithUserId(userId) {

  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    jwtToken: `mock-jwt-token-${userId}-${Date.now()}`
  };
}

export async function mockCreateUser(username) {

  await new Promise(resolve => setTimeout(resolve, 500));

  const userId = `user-${Date.now()}`;
  const jwtToken = `mock-jwt-token-${userId}`;

  return {
    userId,
    username,
    jwtToken
  };
}
