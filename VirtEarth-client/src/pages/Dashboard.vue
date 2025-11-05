<script setup>
import LogoImage from '@/components/base/LogoImage.vue';

// Dashboard logic will go here
</script>

<template>
    <nav class="navbar bg-base-100 px-6 border-b border-base-200">
        <div class="navbar-start">
            <LogoImage></LogoImage>
        </div>

        <div class="navbar-center w-full max-w-lg">
            <label class="input input-bordered flex items-center gap-2 w-full bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input type="text" class="grow bg-transparent" placeholder="Search landmarks, eras, or regions..." />
            </label>
        </div>

        <div class="navbar-end avatar">
            <div class="w-14 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
        </div>
    </nav>
</template>
