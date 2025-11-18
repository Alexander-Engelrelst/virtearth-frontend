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
  hasFullAuth,
  hasPartialAuth,
} from "@/services/auth.js";
import { loginWithUserId, createUser } from "@/services/api/users.js";

const isLoading = ref(false);
const error = ref(null);

// Check for existing auth data on mount and handle auto-login
onMounted(async () => {
  if (hasFullAuth()) {
    router.push({ name: "dashboard" });
    return;
  }

  if (hasPartialAuth()) {
    isLoading.value = true;
    error.value = null;

    try {
      const userId = getUserId();
      const response = await loginWithUserId(userId);

      const username = getUsername();
      saveAuthData(userId, username, response.jwtToken);

      router.push({ name: "dashboard" });
    } catch (err) {
      // Auto-login failed - clear storage and show LoginForm
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
    let response = await createUser(username);

    saveAuthData(response.id);

    response = await loginWithUserId(response.id);

    saveAuthData(response.id, response.username, response.jwtToken);

    const userId = getUserId();
    const storedUsername = getUsername();
    saveAuthData(userId, storedUsername, response.jwtToken);

    router.push({ name: "dashboard" });
  } catch (err) {
    error.value = "Login failed. Please try again.";
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
