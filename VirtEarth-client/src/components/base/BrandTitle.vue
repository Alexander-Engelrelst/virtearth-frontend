<script setup>
import { computed } from 'vue';

const props = defineProps({
    size: {
        type: String,
        default: 'base',
        validator: (value) => ['sm', 'base', 'lg', 'xl'].includes(value)
    }
});

const sizeClass = computed(() => {
    const sizes = {
        sm: 'text-2xl',
        base: 'text-4xl',
        lg: 'text-5xl',
        xl: 'text-6xl'
    };
    return sizes[props.size];
});
</script>

<template>
    <h1 class="font-bold text-brand-primary font-primary" :class="sizeClass">
        Virtearth
    </h1>
</template>