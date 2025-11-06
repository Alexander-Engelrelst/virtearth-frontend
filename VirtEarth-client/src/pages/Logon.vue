<script setup>
import { useRouter } from 'vue-router';
import LogoImage from '@/components/base/LogoImage.vue';
import BrandTitle from '@/components/base/BrandTitle.vue';
import LoginForm from '@/components/feature/auth/LoginForm.vue';
import { ref } from 'vue';
import { checkUserExists } from '@/services/api/users.js';

const router = useRouter();

async function handleLogin(username) {
    console.log('Login attempted with username:', username);

    try {
        const result = await checkUserExists(username);

        console.log('API result:', result);

        // Handle different status codes
        if (result.status === 409) {
            // User exists, proceed to dashboard
            console.log('User exists, logging in...');
            router.push({ name: 'dashboard' });
        } else if (result.status === 204) {
            // User does not exist
            console.log('User does not exist');
            alert('User does not exist. Please create an account first.');
        } else if (result.status === 400) {
            // Invalid username
            console.log('Invalid username');
            alert('Invalid username: ' + result.message);
        }
    } catch (error) {
        console.error('Error checking user:', error);
        alert('An error occurred. Please try again.');
    }
}

function handleCreateUser(username) {
    console.log('create attempted with username:', username);

    if (true) {
        router.push({ name: 'dashboard' });
    }
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

        <LoginForm @login="handleLogin" @createUser="handleCreateUser" />

    </div>
</template>