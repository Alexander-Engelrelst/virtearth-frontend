export async function mockLoginWithUserId(userId) {

  await new Promise(resolve => setTimeout(resolve, 500));

  console.log('MOCK API Login with userId:', userId);

  return {
    jwtToken: `mock-jwt-token-${userId}-${Date.now()}`
  };
}

export async function mockCreateUser(username) {

  await new Promise(resolve => setTimeout(resolve, 500));

  const userId = `user-${Date.now()}`;
  const jwtToken = `mock-jwt-token-${userId}`;

  console.log('MOCK API Created user:', { userId, username, jwtToken });

  return {
    userId,
    username,
    jwtToken
  };
}
