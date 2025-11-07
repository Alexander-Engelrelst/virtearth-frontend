<script setup>
import { computed } from 'vue';

// Logo component - Virtearth globe logo
const props = defineProps({
    size: {
        type: String,
        default: 'base'
    }
});

const sizeClass = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'h-24 w-24';
        case 'lg':
            return 'h-48 w-48';
        case 'xl':
            return 'h-82 w-82';
        case 'base':
        default:
            return 'h-12 w-12';
    }
});
</script>

<template>
    <div>
        <!-- TODO: logo image goes here !-->
        <img src="../../assets/images/logo.webp" :class="sizeClass"></img>
    </div>
</template>
