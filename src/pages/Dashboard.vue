<script setup>
import { ref, computed, onMounted } from "vue";
import Navbar from "../components/layout/Navbar.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import MapContainer from "../components/feature/MapContainer.vue";
import LandmarkSideOverview from "../components/layout/LandmarkSideOverview.vue";
import { getUsername } from "../services/auth.js";
import { getLandmarks } from "../services/api/landmarks.js";
import { showNotification } from "../services/showNotification.js";

// we use an array since the function used to render these messages takes a rest parameter to enable multiline messages easily
const GET_PARAMETER_MESSAGES_MAP = {
  "game-saved": ["Game saved successfully"],
  "save-error": [
    "Something went wrong while saving",
    "Try again later or contact support if this issue persists",
  ],
  "unexpected-error": [
    "An unexpected error has occurred",
    "Please contact support if this issue persists",
  ],
};

const landmarkSideOverview = ref(null);
const selectedLandmark = ref(null);

function renderGetParameterMessages() {
  const messageToDisplay = new URLSearchParams(window.location.search).get("message");
  if (messageToDisplay && GET_PARAMETER_MESSAGES_MAP.hasOwnProperty(messageToDisplay)) {
    showNotification(...GET_PARAMETER_MESSAGES_MAP[messageToDisplay]);
  }
}

const handleMarkerClick = (gameId) => {
  selectedLandmark.value = landmarks.value.find((l) => l.gameId === gameId);
  if (landmarkSideOverview.value) {
    landmarkSideOverview.value.open();
  }
};

const username = getUsername();
const landmarks = ref([]);
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

const continents = computed(() => {
  if (landmarks.value.length === 0) return [];
  return [...new Set(landmarks.value.map((landmark) => landmark.continent))];
});

const filterByTimeRange = (landmark) => {
  return (
    !timeRange.value.from ||
    (landmark.year >= timeRange.value.from && landmark.year <= timeRange.value.to)
  );
};

const filterByContinent = (landmark) => {
  return (
    selectedContinents.value.length === 0 || selectedContinents.value.includes(landmark.continent)
  );
};

const filterBySearch = (landmark) => {
  return (
    searchString.value === "" ||
    landmark.gameName.toLowerCase().includes(searchString.value.toLowerCase()) ||
    landmark.continent.toLowerCase().includes(searchString.value.toLowerCase())
  );
};

const filteredLandmarks = computed(() => {
  return landmarks.value.filter((landmark) => {
    return filterByTimeRange(landmark) && filterByContinent(landmark) && filterBySearch(landmark);
  });
});

// Fetch landmarks on component mount
onMounted(async () => {
  renderGetParameterMessages();

  try {
    const response = await getLandmarks();
    landmarks.value = response.landmarks || response;
  } catch (error) {
    console.error("Failed to fetch landmarks:", error);
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
      <MapContainer
        :landmarks="filteredLandmarks"
        class="flex-1"
        @marker-click="handleMarkerClick"
      />
      <LandmarkSideOverview ref="landmarkSideOverview" :landmark="selectedLandmark" />
    </div>
  </div>
</template>
