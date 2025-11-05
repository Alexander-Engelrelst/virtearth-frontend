<script setup>
import LogoImage from '@/components/base/LogoImage.vue';
import LoginForm from '@/components/feature/auth/LoginForm.vue';

function handleLogin(username) {
    // TODO: Add API call logic here
    console.log('Login attempted with username:', username);
}
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-background">

        <LogoImage />

        <div class="hero">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold text-brand-primary">Virtearth</h1>
                    <p class="py-6 text-brand-secondary">Travel time through culture</p>
                </div>
            </div>
        </div>

        <LoginForm @submit="handleLogin" />

    </div>
</template>