<script setup>
defineProps({
    size: {
        type: Number,
        default: 48 
    }
});
</script>

<template>
    <h1 class="font-bold text-brand-primary" :style="{ fontSize: size + 'px', fontFamily: 'var(--font-primary)' }">
        Virtearth
    </h1>
</template>
