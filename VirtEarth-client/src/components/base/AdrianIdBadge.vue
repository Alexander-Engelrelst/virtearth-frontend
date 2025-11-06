<script setup>
// Base component for displaying AdrianID authentication badge
</script>

<template>
    <div class="mb-4 p-4 w-full bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 border-2 border-brand-primary/30 rounded-xl shadow-sm">
        <div class="flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div class="text-center">
                <p class="text-xs text-brand-secondary font-medium">Authenticated via</p>
                <h2 class="text-lg font-bold text-brand-primary">AdrianID</h2>
            </div>
        </div>
    </div>
</template>
