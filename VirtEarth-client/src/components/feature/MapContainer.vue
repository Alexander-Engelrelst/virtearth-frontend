<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPurple from "@/assets/images/adria_landmark_marker_purple.png";
import markerIcon from "@/assets/images/adria_landmark_marker.png";

const props = defineProps({
  landmarks: {
    type: Array,
    required: true,
  },
});

const mapInstance = ref(null);
const markersGroup = ref(null);
const mapContainerRef = ref(null);
const mapRef = ref(null);
const isFullscreen = ref(false);

const onFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;

  if (mapInstance.value) {
    setTimeout(() => {
      mapInstance.value.invalidateSize();
    }, 50);
  }
};

// Initialize map
onMounted(() => {
  mapInstance.value = L.map(mapRef.value).setView([0, 0], 3);
  L.tileLayer("https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg", {
    minZoom: 1,
    maxZoom: 16,
    noWrap: true,
  }).addTo(mapInstance.value);

  updateMarkers();
  document.addEventListener("fullscreenchange", onFullscreenChange);
});

const updateMarkers = () => {
  if (!mapInstance.value) return;

  if (markersGroup.value) {
    markersGroup.value.remove();
  }

  if (props.landmarks.length > 0) {
    const markers = props.landmarks.map(({ latitude, longitude, year, gameName, completed }) => {
      const currentIcon = completed ? markerIconPurple : markerIcon;
      const icon = L.icon({
        iconUrl: currentIcon,
        iconSize: [60, 60],
        iconAnchor: [30, 60],
      });
      return L.marker([latitude, longitude], { icon }).bindPopup(year + " " + gameName, {
        offset: [0, -40],
      });
    });

    markersGroup.value = L.featureGroup(markers).addTo(mapInstance.value);
  }
};

watch(
  () => props.landmarks,
  () => {
    updateMarkers();
  }
);

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    mapContainerRef.value.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

onBeforeUnmount(() => {
  if (mapInstance.value) {
    mapInstance.value.remove();
  }
  document.removeEventListener("fullscreenchange", onFullscreenChange);
});
</script>

<template>
  <div class="flex-1 relative" ref="mapContainerRef">
    <div ref="mapRef" class="w-full h-full"></div>
    <div
      @click="toggleFullscreen"
      class="material-icons absolute top-2.5 right-2.5 z-1000 cursor-pointer p-2.5 bg-white rounded shadow-md"
    >
      {{ isFullscreen ? "fullscreen_exit" : "fullscreen" }}
    </div>
  </div>
</template>
