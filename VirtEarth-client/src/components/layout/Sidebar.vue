<script setup>
import { ref } from "vue";
import TimeRangeFilter from "../feature/TimeRangeFilter.vue";
import ResetFiltersBtn from "../feature/ResetFiltersBtn.vue";
import ContinentFilter from "../feature/ContinentFilter.vue";

defineProps({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  allContinents: { type: Array, required: true },
});

const timeRange = defineModel("timeRange");
const continents = defineModel("continents");

//references to components
const timeRangeFilterRef = ref(null);
const continentFilterRef = ref(null);

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
      v-model="timeRange"
    ></TimeRangeFilter>
    <label class="block text-m font-medium text-gray-700 mb-2">Continent</label>
    <ContinentFilter
      ref="continentFilterRef"
      :allContinents="allContinents"
      v-model="continents"
    ></ContinentFilter>
  </aside>
</template>
