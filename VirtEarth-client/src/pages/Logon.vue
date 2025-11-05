<script setup>
import { useRouter } from 'vue-router';
import LogoImage from '@/components/base/LogoImage.vue';
import BrandTitle from '@/components/base/BrandTitle.vue';
import LoginForm from '@/components/feature/auth/LoginForm.vue';

const router = useRouter();

function handleLogin(username) {
    // TODO: Add API call logic here
    console.log('Login attempted with username:', username);

    // Navigate to dashboard if authentication is successful
    if (true) {  // Placeholder condition
        router.push({ name: 'dashboard' });
    }
}
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-background">

        <div class="mb-4">
            <LogoImage />
        </div>

        <div class="hero">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <BrandTitle :size="48" />
                    <p class="py-6 text-brand-secondary">Travel time through culture</p>
                </div>
            </div>
        </div>

        <LoginForm @submit="handleLogin" />

    </div>
</template>