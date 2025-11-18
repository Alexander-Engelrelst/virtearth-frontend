<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import MapContainer from "@/components/feature/MapContainer.vue";
import { getUsername } from "@/services/auth.js";
import { getLandmarks } from "@/services/api/landmarks.js";

const username = getUsername();
const landmarks = ref([]);
const timeRange = ref({});

const minYear = computed(() => {
  if (landmarks.value.length === 0) return 0;
  return Math.min(...landmarks.value.map(l => l.year));
});

const maxYear = computed(() => {
  if (landmarks.value.length === 0) return 0;
  return Math.max(...landmarks.value.map(l => l.year));
});

const filteredLandmarks = computed(() => {
  return landmarks.value.filter((landmark) => {
    return landmark.year >= timeRange.value.from && landmark.year <= timeRange.value.to;
  });
});

// Fetch landmarks on component mount
onMounted(async () => {
  try {
    const response = await getLandmarks();
    landmarks.value = response.landmarks;
  } catch (error) {
    console.error("Failed to fetch landmarks:", error);
  }
});
</script>

<template>
  <div class="w-full h-screen flex flex-col">
    <Navbar :username="username" />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar v-model:timeRange="timeRange" :min="minYear" :max="maxYear" />
      <MapContainer :landmarks="filteredLandmarks" />
    </div>
  </div>
</template>
