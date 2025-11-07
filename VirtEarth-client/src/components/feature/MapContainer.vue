<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'


const mapInstance = ref(null)

onMounted(() => {
    mapInstance.value = L.map('map').setView([0, 0], 3)
    var Stadia_StamenWatercolor = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.{ext}', {
        minZoom: 1,
        maxZoom: 16,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'jpg'
    }); 
    Stadia_StamenWatercolor.addTo(mapInstance.value);
})
onBeforeUnmount(() => {
    if (mapInstance.value) {
        mapInstance.value.remove()
    }
})
</script>

<template>
    <div class="flex-1 relative">
        <div id="map" class="w-full h-full"></div>
    </div>
</template>
