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

    const markers = landmarks.value.map(({latitude, longitude, year, name}) => L.marker([latitude, longitude], { icon }).bindPopup(year + " " + name));
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
