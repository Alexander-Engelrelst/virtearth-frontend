<script setup>
import { ref, onMounted } from "vue";
import LogoImage from "@/components/base/LogoImage.vue";
import BrandTitle from "@/components/base/BrandTitle.vue";
import LoginForm from "@/components/feature/auth/LoginForm.vue";
import router from "@/router";
import {
  clearAuthData,
  getUserId,
  saveAuthData,
  isAuthenticated,
  hasPartialAuth,
} from "@/services/auth.js";
import {
  loginWithUserId,
  createUser,
  checkUserExists,
} from "@/services/api/users.js";

const isLoading = ref(false);
const error = ref(null);

const HTTP_STATUS_NO_CONTENT = 204;
const HTTP_STATUS_CONFLICT = 409;
const HTTP_STATUS_BAD_REQUEST = 400;

// Check for existing auth data on mount and handle auto-login
onMounted(async () => {
  if (isAuthenticated()) {
    router.push({ name: "dashboard" });
    return;
  }

  if (hasPartialAuth()) {
    isLoading.value = true;
    error.value = null;

    try {
      const userId = getUserId();
      const response = await loginWithUserId(userId);

      saveAuthData(response.id, response.username, response.jwtToken);

      router.push({ name: "dashboard" });
    } catch (err) {
      clearAuthData();
      error.value = "Auto-login failed. Please login again.";
      console.error(err)
    } finally {
      isLoading.value = false;
    }
  }
});

async function handleLogin(username) {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await checkUserExists(username);
    await processLoginResponse(response, username);
  } catch (err) {
    error.value = "Login failed. Please try again.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

async function processLoginResponse(response, username) {
  switch (response.status) {
    case HTTP_STATUS_NO_CONTENT:
      await handleUserNotFound(username);
      break;
    case HTTP_STATUS_CONFLICT:
      handleUserConflict();
      break;
    case HTTP_STATUS_BAD_REQUEST:
      handleBadRequest();
      break;
    default:
      handleUnexpectedResponse(response);
  }
}

async function handleUserNotFound(username) {
  const newUser = await createUser(username);
  saveAuthData(newUser.id, newUser.username, newUser.jwtToken);
  router.push({ name: "dashboard" });
}

function handleUserConflict() {
  error.value = "User already exists.";
}

function handleBadRequest() {
  error.value = "Invalid username";
}

function handleUnexpectedResponse(response) {
  error.value = `An unexpected error occurred: ${response.status}`;
  console.error(`Unexpected response status: ${response.status} ${response.statusText}`);
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-background">
    <div class="mb-4">
      <LogoImage size="xl" />
    </div>

    <div class="hero">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <BrandTitle size="lg" />
          <p class="py-2 text-brand-secondary">Explore history, live culture</p>
        </div>
      </div>
    </div>

    <!-- Loading spinner -->
    <div v-if="isLoading" class="text-center py-4">
      <span class="loading loading-spinner loading-lg text-brand-primary"></span>
      <p class="mt-2 text-brand-secondary">Logging you back in...</p>
    </div>

    <!-- Error message -->
    <div v-else-if="error" class="alert alert-error max-w-md mb-4">
      <span>{{ error }}</span>
    </div>

    <!-- Login form -->
    <LoginForm v-if="!isLoading" @login="handleLogin" />
  </div>
</template>
