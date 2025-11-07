<script setup>
import LogoImage from '@/components/base/LogoImage.vue';
import BrandTitle from '@/components/base/BrandTitle.vue';
import LoginForm from '@/components/feature/auth/LoginForm.vue';
import router from '@/router';

function handleLogin(username) {
    console.log('Login attempted with username:', username);
    // TODO: Call /login endpoint
    if (true){
        router.push({ name: "dashboard"})
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

        <LoginForm @login="handleLogin" />

    </div>
</template>
