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

//AI function to get distance between two landmarks
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const findNearestLandmark = (userLat, userLon, landmarks) => {
  if (!landmarks || landmarks.length === 0) {
    return null;
  }

  let nearest = landmarks[0];
  let minDistance = getDistance(userLat, userLon, nearest.latitude, nearest.longitude);

  for (let i = 1; i < landmarks.length; i++) {
    const landmark = landmarks[i];
    const distance = getDistance(userLat, userLon, landmark.latitude, landmark.longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = landmark;
    }
  }
  return nearest;
};

const centerOnUser = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        const nearestLandmark = findNearestLandmark(userLat, userLon, props.landmarks);

        if (mapInstance.value && nearestLandmark) {
          mapInstance.value.setView([nearestLandmark.latitude, nearestLandmark.longitude], 7);
        } else if (mapInstance.value) {
          mapInstance.value.setView([userLat, userLon], 7);
        }
      },
      (error) => {
        alert("Error: Unable to retrieve location. " + error.message);
      }
    );
  } else {
    alert("Error: Geolocation is not working");
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
    <div
      @click="centerOnUser"
      class="material-icons absolute top-2.5 right-14 z-1000 cursor-pointer p-2.5 bg-white rounded shadow-md"
    >
      my_location
    </div>
  </div>
</template>
