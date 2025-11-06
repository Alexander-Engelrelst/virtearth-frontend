<script setup>
import { ref } from 'vue';
import LogoImage from '@/components/base/LogoImage.vue';
import BrandTitle from '@/components/base/BrandTitle.vue';
import LoginForm from '@/components/feature/auth/LoginForm.vue';
import CreateUserForm from '@/components/feature/auth/CreateUserForm.vue';
import { checkUserExists as apiCheckUserExists } from '@/services/api/users.js';
import router from '@/router';

const activeMode = ref('login'); // 'login' or 'create'
const userStatus = ref({ status: null, message: '' });

function switchMode(mode) {
    activeMode.value = mode;
    // Clear status when switching modes
    userStatus.value = { status: null, message: '' };
}

async function handleUsernameChange(username) {
    console.log('Checking username:', username);

    try {
        const result = await apiCheckUserExists(username);
        console.log('API result:', result);

        // Store the status to pass to CreateUserForm
        userStatus.value = {
            status: result.status,
            message: result.message || ''
        };
    } catch (error) {
        console.error('Error checking user:', error);
        userStatus.value = {
            status: 500,
            message: 'An error occurred'
        };
    }
}

function handleLogin(username) {
    console.log('Login attempted with username:', username);
    // TODO: Call /login endpoint
    if (true){
        router.push({ name: "dashboard"})
    }
}

function handleCreateUser(username) {
    console.log('Create user attempted with username:', username);
    // TODO: Call POST / endpoint
}
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-background">

        <div class="mb-4">
            <LogoImage :size=86 />
        </div>

        <div class="hero">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <BrandTitle :size=48 />
                    <p class="py-2 text-brand-secondary">Travel time through culture</p>
                </div>
            </div>
        </div>

        <!-- Tab Switching UI -->
        <div class="mb-6 bg-white rounded-xl shadow-md p-1 border border-gray-200">
            <div class="flex gap-1">
                <button
                    class="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                    :class="activeMode === 'login'
                        ? 'bg-brand-primary text-white shadow-md'
                        : 'bg-transparent text-gray-600 hover:bg-gray-100'"
                    @click="switchMode('login')">
                    Login
                </button>
                <button
                    class="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                    :class="activeMode === 'create'
                        ? 'bg-brand-primary text-white shadow-md'
                        : 'bg-transparent text-gray-600 hover:bg-gray-100'"
                    @click="switchMode('create')">
                    Create
                </button>
            </div>
        </div>

        <!-- Show appropriate form based on active mode -->
        <LoginForm
            v-if="activeMode === 'login'"
            @login="handleLogin"
        />

        <CreateUserForm
            v-else-if="activeMode === 'create'"
            :user-status="userStatus"
            @create-user="handleCreateUser"
            @username-change="handleUsernameChange"
        />

    </div>
</template>