<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getLandmarks } from "@/services/api/landmarks.js"
import markerIcon from "@/assets/images/adria_landmark_marker.png"

const mapInstance = ref(null);
const landmarks = ref([])

onMounted(() => {
  mapInstance.value = L.map("map").setView([0, 0], 3);
  var Stadia_StamenWatercolor = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}",
    {
      minZoom: 1,
      maxZoom: 16,
      attribution:
        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: "jpg",
    }
  );
  Stadia_StamenWatercolor.addTo(mapInstance.value);
  
  getLandmarks()
  .then(res => landmarks.value = res.landmarks)
  .then(() => {
    const icon = L.icon({
      iconUrl: markerIcon,
      iconSize: [50, 50],
      iconAnchor: [25, 50]
    })

    const markers = landmarks.value.map(({latitude, longitude, name}) => L.marker([latitude, longitude], { icon }).bindPopup(name));
    const markersGroup = L.featureGroup(markers).addTo(mapInstance.value);
    mapInstance.value.fitBounds(markersGroup.getBounds());
  })

  
});
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
