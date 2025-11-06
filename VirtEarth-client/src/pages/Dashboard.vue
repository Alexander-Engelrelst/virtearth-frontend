<script setup>
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import MapContainer from '@/components/feature/MapContainer.vue';

// Dashboard logic will go here
</script>

<template>
    <div class="w-full h-screen flex flex-col">
        <Navbar />
        <div class="flex flex-1 overflow-hidden">
            <Sidebar />
            <MapContainer />
        </div>
    </div>
</template>
