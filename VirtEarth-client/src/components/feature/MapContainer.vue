<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPurple from "@/assets/images/adria_landmark_marker_purple.png";
import markerIcon from "@/assets/images/adria_landmark_marker.png";
import { showNotification } from "@/services/showNotification.js";

const props = defineProps({
  landmarks: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["marker-click"]);

const mapInstance = ref(null);
const markersGroup = ref(null);
const mapContainerRef = ref(null);
const mapRef = ref(null);
const isFullscreen = ref(false);

const onFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
  const WAIT_TIME = 50;
  if (mapInstance.value) {
    setTimeout(() => {
      mapInstance.value.invalidateSize();
    }, WAIT_TIME);
  }
};

// Initialize map
onMounted(() => {
  const INIT_ZOOM_LEVEL = 3;
  mapInstance.value = L.map(mapRef.value).setView([0, 0], INIT_ZOOM_LEVEL);
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
    const MARKER_SIZE = 60;
    const markers = props.landmarks.map((landmark) => {
      const { latitude, longitude, completed, gameId } = landmark;
      const currentIcon = completed ? markerIconPurple : markerIcon;
      const icon = L.icon({
        iconUrl: currentIcon,
        iconSize: [MARKER_SIZE, MARKER_SIZE],
        iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE],
      });
      return L.marker([latitude, longitude], { icon }).on("click", () => {
        emit("marker-click", gameId);
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
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
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    mapContainerRef.value.requestFullscreen();
  }
};

//AI function to get distance between two landmarks
const getDistance = (lat1, lon1, lat2, lon2) => {
  const HALF_CIRCLE = 180;
  const EARTH_RADIUS_KM = 6371;
  const DEG_TO_RAD = Math.PI / HALF_CIRCLE;

  const dLat = (lat2 - lat1) * DEG_TO_RAD;
  const dLon = (lon2 - lon1) * DEG_TO_RAD;

  const lat1Rad = lat1 * DEG_TO_RAD;
  const lat2Rad = lat2 * DEG_TO_RAD;

  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
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

const handleGeolocationSuccess = (position) => {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;
  const ZOOM_LEVEL = 7;
  const nearestLandmark = findNearestLandmark(userLat, userLon, props.landmarks);

  if (mapInstance.value && nearestLandmark) {
    mapInstance.value.setView([nearestLandmark.latitude, nearestLandmark.longitude], ZOOM_LEVEL);
  } else if (mapInstance.value) {
    mapInstance.value.setView([userLat, userLon], ZOOM_LEVEL);
  } else {
    showNotification("something went wrong");
  }
};

const handleGeolocationError = (error) => {
  alert("Error: Unable to retrieve location. " + error.message);
};

const centerOnUser = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, handleGeolocationError);
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
