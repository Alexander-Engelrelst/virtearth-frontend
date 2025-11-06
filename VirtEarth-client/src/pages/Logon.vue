<script setup>
import { useRouter } from 'vue-router';
import LogoImage from '@/components/base/LogoImage.vue';
import BrandTitle from '@/components/base/BrandTitle.vue';
import LoginForm from '@/components/feature/auth/LoginForm.vue';
import { ref } from 'vue';

const router = useRouter();

function handleLogin(username) {
    console.log('Login attempted with username:', username);

    if (true) { 
        router.push({ name: 'dashboard' });
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