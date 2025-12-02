<script setup>
import { ref, onMounted } from "vue";
import LogoImage from "@/components/base/LogoImage.vue";
import BrandTitle from "@/components/base/BrandTitle.vue";
import LoginForm from "@/components/feature/auth/LoginForm.vue";
import router from "@/router";
import {
  clearAuthData,
  getUserId,
  getUsername,
  saveAuthData,
  isAuthenticated,
  hasPartialAuth,
} from "@/services/auth.js";
import {
  loginWithUserId,
  createUser,
  checkUserExists,
  getUserByUsername,
} from "@/services/api/users.js";

const isLoading = ref(false);
const error = ref(null);

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

    if (response.status === 204) { //user doesn't exist yet

      const newUser = await createUser(username);
      saveAuthData(newUser.id, newUser.username, newUser.jwtToken);
    } else if (response.status === 409) { // User exists, display an error

      error.value = "User already exists.";
      isLoading.value = false; 
      return; 
    } else if (response.status === 400){

      error.value = "Invalid username";
      isLoading.value = false; 
      return; 
    } else {
      throw new Error(
        `Unexpected response status: ${response.status} ${response.statusText}`
      );
    }
    router.push({ name: "dashboard" });

  } catch (err) {
    error.value = "Login failed. Please try again.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
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
