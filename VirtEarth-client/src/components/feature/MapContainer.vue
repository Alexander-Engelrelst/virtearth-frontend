<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "@/assets/images/adria_landmark_marker.png";

const props = defineProps({
  landmarks: {
    type: Array,
    required: true,
  },
});

const mapInstance = ref(null);
const markersGroup = ref(null);

// Initialize map
onMounted(() => {
  mapInstance.value = L.map("map").setView([0, 0], 3);
  L.tileLayer("https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg", {
    minZoom: 1,
    maxZoom: 16,
    noWrap: true,
  }).addTo(mapInstance.value);

  updateMarkers();
});

const updateMarkers = () => {
  if (!mapInstance.value) return;

  if (markersGroup.value) {
    markersGroup.value.remove();
  }

  if (props.landmarks.length > 0) {
    const icon = L.icon({
      iconUrl: markerIcon,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });

    const markers = props.landmarks.map(({ latitude, longitude, year, name }) =>
      L.marker([latitude, longitude], { icon }).bindPopup(year + " " + name)
    );

    markersGroup.value = L.featureGroup(markers).addTo(mapInstance.value);
  }
};

watch(
  () => props.landmarks,
  () => {
    updateMarkers();
  }
);

onBeforeUnmount(() => {
  if (mapInstance.value) {
    mapInstance.value.remove();
  }
});
</script>

<template>
  <div class="flex-1 relative">
    <div id="map" class="w-full h-full"></div>
  </div>
</template>
