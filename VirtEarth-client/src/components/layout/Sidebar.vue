<script setup>
import { computed, ref, watch } from 'vue';
import TimeRangeFilter from '../feature/TimeRangeFilter.vue';
import ResetFiltersBtn from '../feature/ResetFiltersBtn.vue';

const props = defineProps({
  min: {type: Number, required: true},
  max: {type: Number, required: true}
});

const timeRange = ref({"from": props.min, "to": props.max})
const step = computed(() => {(Math.abs(props.min) + Math.abs(props.max))/ 100})

// Update timeRange when min/max props change (e.g., when landmarks are loaded)
watch([() => props.min, () => props.max], ([newMin, newMax]) => {
  if (newMin !== 0 || newMax !== 0) {
    timeRange.value = { from: newMin, to: newMax };
  }
});

const emit = defineEmits(['update:timeRange']);

const handleTimeRangeUpdate = (newTimeRange) => {
  emit('update:timeRange', newTimeRange);
};
</script>

<template>
  <aside class="w-70 min-w-65 bg-white h-full border-r border-gray-300 p-4">
    <h3 class="text-xl font-bold text-gray-800 mb-2">Filters</h3>
    <ResetFiltersBtn class="mb-6"></ResetFiltersBtn>
    <label class="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
    <TimeRangeFilter
      :min="min"
      :max="max"
      :step="step"
      :modelValue="timeRange"
      @update:modelValue="handleTimeRangeUpdate"
    ></TimeRangeFilter>
  </aside>
</template>
