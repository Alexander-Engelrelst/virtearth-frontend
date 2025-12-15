<script setup>
import NotificationPopup from "@/components/base/NotificationPopup.vue";
import { notificationRef } from "@/services/useNotification";
</script>

<template>
  <router-view />
  <NotificationPopup ref="notificationRef" />
</template>
