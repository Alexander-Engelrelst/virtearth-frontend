import { ref } from "vue";

export const notificationRef = ref(null);

export function showNotification(...messageLines) {
  if (notificationRef.value) {
    notificationRef.value.show(messageLines);
  }
}
