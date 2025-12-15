<script setup>
import { ref, defineExpose } from 'vue'

const props = defineProps({
  landmark: {
    type: Object,
    default: null
  }
})

const isOpen = ref(false)

const close = () => {
  isOpen.value = false
}

const open = () => {
  isOpen.value = true
}

defineExpose({
  open
})
</script>

<template>
  <div v-if="isOpen" class="w-64 bg-white p-4 flex flex-col justify-between">
    <div>
      <div class="flex justify-end">
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div v-if="landmark">
        <h2 class="text-xl font-bold">{{ landmark.gameName }}</h2>
        <p class="text-gray-600">{{ landmark.year }}</p>
        <p class="mt-4">{{ landmark.description }}</p>
      </div>
    </div>
    <div v-if="landmark">
      <button class="px-3 py-2 w-full bg-brand-primary text-white rounded-lg hover:bg-brand-primary cursor-pointer">
        Play Game
      </button>
    </div>
  </div>
</template>