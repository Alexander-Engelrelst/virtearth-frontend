<script setup>
const modelValue = defineModel({
  type: Array,
  default: () => [],
});

defineProps({
  allContinents: {
    type: Array,
    default: () => [],
  },
});

const toggleContinent = (continent) => {
  if (!modelValue.value) {
    modelValue.value = [];
  }
  const index = modelValue.value.indexOf(continent);
  if (index > -1) {
    modelValue.value.splice(index, 1);
  } else {
    modelValue.value.push(continent);
  }
};

const isSelected = (continent) => {
  return modelValue.value.includes(continent);
};

// Expose reset function for parent to call
const reset = () => {
  modelValue.value = [];
};

defineExpose({ reset });
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="continent in allContinents"
      :key="continent"
      @click="toggleContinent(continent)"
      :class="[
        'px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer',
        isSelected(continent)
          ? 'bg-brand-primary text-white hover:bg-brand-primary-dark cursor-pointer'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      ]"
    >
      {{ continent }}
    </button>
  </div>
</template>
