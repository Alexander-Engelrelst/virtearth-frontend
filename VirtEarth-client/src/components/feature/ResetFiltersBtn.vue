<script setup>

defineEmits(['reset:filters']);

</script>
<template>
    <button class="px-3 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark" @click="$emit('reset:filters')">
        Reset Filters
    </button>
</template>
