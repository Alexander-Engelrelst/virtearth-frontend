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
            return 'h-16 w-16';
        case 'lg':
            return 'h-32 w-32';
        case 'xl':
            return 'h-48 w-48';
        case 'base':
        default:
            return 'h-22 w-22';
    }
});
</script>

<template>
    <div>
        <!-- TODO: logo image goes here !-->
        <img src="../../assets/images/logo.png" :class="sizeClass" alt="VirtEarth Logo">
    </div>
</template>
