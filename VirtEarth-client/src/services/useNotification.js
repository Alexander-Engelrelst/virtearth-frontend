import { ref } from 'vue';

export const notificationRef = ref(null);

export function useNotification() {
  const showNotification = (message) => {
    if (notificationRef.value) {
      notificationRef.value.show(message);
    }
  };

  return { showNotification };
}
