<script setup>
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import MapContainer from '@/components/feature/MapContainer.vue';
import { getUsername } from '@/services/auth.js';

const username = getUsername();
</script>

<template>
    <div class="w-full h-screen flex flex-col">
        <Navbar :username="username"/>
        <div class="flex flex-1 overflow-hidden">
            <Sidebar />
            <MapContainer />
        </div>
    </div>
</template>
