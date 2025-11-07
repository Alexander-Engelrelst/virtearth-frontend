<script setup>
import LogoImage from '@/components/base/LogoImage.vue';
import BrandTitle from '@/components/base/BrandTitle.vue';
import SearchBar from '@/components/feature/SearchBar.vue';

defineProps({
    username: {
        type: String,
        default: 'john doe' 
    }
});
</script>

<template>
    <nav class="navbar bg-base-100 px-6 border-b border-base-200">
        <div class="navbar-start flex items-center gap-3">
            <LogoImage  size="sm" />
            <BrandTitle :size=24 />
        </div>

        <div class="navbar-center w-full max-w-lg">
            <SearchBar />
        </div>

        <div class="navbar-end flex items-center gap-3">
            <div class="avatar">
                <div class="w-14 rounded-full">
                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
            </div>
            <span class="font-semibold text-gray-700">{{ username }}</span>
        </div>
    </nav>
</template>
