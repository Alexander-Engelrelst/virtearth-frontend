<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import MapContainer from "@/components/feature/MapContainer.vue";
import { getUsername } from "@/services/auth.js";
import { getContinents, getLandmarks } from "@/services/api/landmarks.js";

const username = getUsername();
const landmarks = ref([]);
const continents = ref([]);
const timeRange = ref({});
const selectedContinents = ref([]);
const searchString = ref("");

const minYear = computed(() => {
  if (landmarks.value.length === 0) return 0;
  return Math.min(...landmarks.value.map((l) => l.year));
});

const maxYear = computed(() => {
  if (landmarks.value.length === 0) return 0;
  return Math.max(...landmarks.value.map((l) => l.year));
});

const filteredLandmarks = computed(() => {
  return landmarks.value.filter((landmark) => {
    const isWithinTimeRange =
      !timeRange.value.from ||
      (landmark.year >= timeRange.value.from && landmark.year <= timeRange.value.to);
    const isSelectedContinent =
      selectedContinents.value.length === 0 ||
      selectedContinents.value.includes(landmark.continent);
    const matchesSearch =
      searchString.value === "" ||
      landmark.name.toLowerCase().includes(searchString.value.toLowerCase()) ||
      landmark.continent.toLowerCase().includes(searchString.value.toLowerCase());
    return isWithinTimeRange && isSelectedContinent && matchesSearch;
  });
});

// Fetch landmarks & continents on component mount
onMounted(async () => {
  try {
    const response = await getLandmarks();
    landmarks.value = response.landmarks;
  } catch (error) {
    console.error("Failed to fetch landmarks:", error);
  }
  try {
    const response = await getContinents();
    continents.value = response.continents;
  } catch (error) {
    console.error("Failed to fetch continents:", error);
  }
});
</script>

<template>
  <div class="w-full h-screen flex flex-col">
    <Navbar :username="username" v-model:searchString="searchString" />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar
        v-model:timeRange="timeRange"
        v-model:continents="selectedContinents"
        :min="minYear"
        :max="maxYear"
        :allContinents="continents"
      />
      <MapContainer :landmarks="filteredLandmarks" />
    </div>
  </div>
</template>
