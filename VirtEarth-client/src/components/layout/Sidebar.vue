<script setup>
import { ref } from "vue";
import TimeRangeFilter from "../feature/TimeRangeFilter.vue";
import ResetFiltersBtn from "../feature/ResetFiltersBtn.vue";
import ContinentFilter from "../feature/ContinentFilter.vue";

const props = defineProps({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  allContinents: { type: Array, required: true },
  continents: { type: Array, required: true },
});

const timeRange = ref({ from: props.min, to: props.max });

//references to components
const timeRangeFilterRef = ref(null);
const continentFilterRef = ref(null);

const emit = defineEmits(["update:timeRange", "update:continents"]);

const handleTimeRangeUpdate = (newTimeRange) => {
  emit("update:timeRange", newTimeRange);
};

const handleUpdateContinents = (newContinents) => {
  emit("update:continents", newContinents);
};

const handleResetFilters = () => {
  timeRangeFilterRef.value?.reset();
  continentFilterRef.value?.reset();
};
</script>

<template>
  <aside class="w-70 min-w-65 bg-white h-full border-r border-gray-300 p-4">
    <h3 class="text-2xl font-bold text-gray-800 mb-2">Filters</h3>
    <ResetFiltersBtn class="mb-6" @reset:filters="handleResetFilters"></ResetFiltersBtn>
    <label class="block text-m font-medium text-gray-700 mb-2">Time Period</label>
    <TimeRangeFilter
      class="mb-12"
      ref="timeRangeFilterRef"
      :min="min"
      :max="max"
      :modelValue="timeRange"
      @update:modelValue="handleTimeRangeUpdate"
    ></TimeRangeFilter>
    <label class="block text-m font-medium text-gray-700 mb-2">Continent</label>
    <ContinentFilter
      ref="continentFilterRef"
      :allContinents="allContinents"
      :modelValue="continents"
      @update:modelValue="handleUpdateContinents"
    ></ContinentFilter>
  </aside>
</template>
