<script setup>
import TimeRangeFilter from '../feature/TimeRangeFilter.vue';

// Sidebar logic will go here
</script>

<template>
  <aside class="w-70 min-w-65 bg-white h-full border-r border-gray-300 p-4">
    <h3 class="text-xl font-bold text-gray-800 mb-6">Filters</h3>
    <label class="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
    <TimeRangeFilter :min="-1000" :max="1000" :step="50"></TimeRangeFilter>
  </aside>
</template>
