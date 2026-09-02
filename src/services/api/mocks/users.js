const TIMEOUT_MS = 500;

export async function mockLoginWithUserId(userId) {
  await new Promise((resolve) => setTimeout(resolve, TIMEOUT_MS));

  return {
    jwtToken: `mock-jwt-token-${userId}-${Date.now()}`,
  };
}

export async function mockCreateUser(username) {
  await new Promise((resolve) => setTimeout(resolve, TIMEOUT_MS));

  const userId = `user-${Date.now()}`;
  const jwtToken = `mock-jwt-token-${userId}`;

  return {
    userId,
    username,
    jwtToken,
  };
}

export async function mockCheckUserExists(username) {
  await new Promise((resolve) => setTimeout(resolve, TIMEOUT_MS));

  if (username === "existinguser") {
    return new Response(null, { status: 409 });
  }

  return new Response(null, { status: 204 });
}

export async function mockGetUserByUsername(username) {
  await new Promise((resolve) => setTimeout(resolve, TIMEOUT_MS));

  if (username === "existinguser") {
    return [
      {
        userId: "user-12345",
        username: "existinguser",
        jwtToken: "mock-jwt-for-existing-user",
      },
    ];
  }

  return [];
}
