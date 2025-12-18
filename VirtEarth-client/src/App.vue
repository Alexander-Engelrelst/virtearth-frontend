<script setup>
import NotificationPopup from "@/components/base/NotificationPopup.vue";
import { notificationRef } from "@/services/showNotification.js"; //NOSONAR
</script>

<template>
  <router-view />
  <NotificationPopup ref="notificationRef" />
  <!-- is needed so any vue file can make use of the notif -->
</template>
