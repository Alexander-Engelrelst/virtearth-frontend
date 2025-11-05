<script setup>
// Logo component - Virtearth globe logo
defineProps({
    size: {
        type: Number,
        default: 64
    }
});
</script>

<template>
    <div>
        <!-- TODO: logo image goes here !-->
        <svg :width="size" :height="size" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#C07353" stroke-width="7.5" fill="none" stroke-linecap="round">
                <circle cx="50" cy="50" r="40" />
                <line x1="10" y1="50" x2="90" y2="50" />
                <ellipse cx="50" cy="50" rx="20" ry="40" />
            </g>
        </svg>
    </div>
</template>
