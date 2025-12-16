<script setup>
import router from "@/router";
import { ref, defineExpose, watch } from "vue";
import { formatYear } from "@/services/utils";
import { createMazeGame } from "@/services/api/landmarks";

import { useNotification } from "@/services/useNotification";

const { showNotification } = useNotification();

const props = defineProps({
  landmark: {
    type: Object,
    default: null,
  },
});

watch(
  () => props.landmark,
  (newVal) => {
    sessionStorage.setItem("gameId", newVal.gameId);
  },
  { deep: true }
);

const isOpen = ref(false);

const close = () => {
  isOpen.value = false;
};

const open = () => {
  isOpen.value = true;
};

async function handlePlayGameClick() {
  if (sessionStorage.getItem("gameId")) {
    try {
      const response = await createMazeGame(sessionStorage.getItem("gameId"));
      sessionStorage.setItem("gameObject", JSON.stringify(response));
      router.push({ name: "game" });
    } catch (error) {
      showNotification("Sorry, this game doesn't have a game to play");
    }
  }
}

defineExpose({
  open,
});
</script>

<template>
  <div v-if="isOpen" class="w-64 bg-white p-4 flex flex-col justify-between">
    <div>
      <div class="flex justify-end">
        <button @click="close" class="text-gray-500 hover:text-gray-700 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div v-if="landmark">
        <h2 class="text-xl font-bold">{{ landmark.gameName }}</h2>
        <p class="text-gray-600">{{ formatYear(landmark.year) }}</p>
        <p class="mt-4">{{ landmark.description }}</p>
      </div>
    </div>
    <div v-if="landmark">
      <button
        @click="handlePlayGameClick"
        class="px-3 py-2 w-full bg-brand-primary text-white rounded-lg hover:bg-brand-primary cursor-pointer"
      >
        Play Game
      </button>
    </div>
  </div>
</template>
