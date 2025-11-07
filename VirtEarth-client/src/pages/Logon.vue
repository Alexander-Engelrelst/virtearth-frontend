<script setup>
import { ref, onMounted } from 'vue';
import LogoImage from '@/components/base/LogoImage.vue';
import BrandTitle from '@/components/base/BrandTitle.vue';
import LoginForm from '@/components/feature/auth/LoginForm.vue';
import router from '@/router';
import { getUserId, saveAuthData } from '@/services/auth.js';
import { loginWithUserId, createUser } from '@/services/api/users.js';

const isLoading = ref(false);
const error = ref(null);

// Check for existing userId on mount and auto-login
onMounted(async () => {
  const userId = getUserId();

  if (userId) {
    console.log('Found existing userId, attempting auto-login...');
    isLoading.value = true;
    error.value = null;

    try {
      // Login with existing userId
      const response = await loginWithUserId(userId);

      // Save the new JWT token
      const username = localStorage.getItem('username') || 'User';
      saveAuthData(userId, username, response.jwtToken);

      console.log('Auto-login successful, redirecting to dashboard...');
      router.push({ name: 'dashboard' });
    } catch (err) {
      console.error('Auto-login failed:', err);
      error.value = 'Auto-login failed. Please login again.';
      // Clear invalid auth data
      localStorage.clear();
    } finally {
      isLoading.value = false;
    }
  }
});

async function handleLogin(username) {
  console.log('Login attempted with username:', username);
  isLoading.value = true;
  error.value = null;

  try {
    // Create new user (POST /api/users/)
    const response = await createUser(username);

    // Save userId, username, and jwtToken to localStorage
    saveAuthData(response.userId, response.username, response.jwtToken);

    console.log('Login successful, redirecting to dashboard...');
    router.push({ name: 'dashboard' });
  } catch (err) {
    console.error('Login failed:', err);
    error.value = 'Login failed. Please try again.';
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
                    <BrandTitle :size=48 />
                    <p class="py-2 text-brand-secondary">Travel time through culture</p>
                </div>
            </div>
        </div>

        <!-- Loading spinner -->
        <div v-if="isLoading" class="text-center py-4">
            <span class="loading loading-spinner loading-lg text-brand-primary"></span>
            <p class="mt-2 text-brand-secondary">Logging in...</p>
        </div>

        <!-- Error message -->
        <div v-else-if="error" class="alert alert-error max-w-md mb-4">
            <span>{{ error }}</span>
        </div>

        <!-- Login form -->
        <LoginForm v-if="!isLoading" @login="handleLogin" />

    </div>
</template>
