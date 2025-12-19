<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-transparent flex items-center justify-center z-[9999]"
  >
    <div class="bg-white p-6 rounded-lg shadow-xl min-w-[300px]">
      <p class="text-gray-800 text-center">
        <template v-for="(line, index) in message.split('\n')" :key="index">
          {{ line }}<br/>
        </template>
      </p>
      <div class="mt-4 flex justify-end">
        <button
          @click="hide"
          class="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
const message = ref("");

const show = (messageLines) => {
  message.value = messageLines.join("\n");
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

defineExpose({ show });
</script>
