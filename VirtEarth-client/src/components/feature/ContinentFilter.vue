<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  allContinents: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
});
const selectedContinents = ref([...props.modelValue]);

watch(
  () => props.modelValue,
  (newValue) => {
    selectedContinents.value = [...newValue];
  }
);

const emit = defineEmits(["update:modelValue"]);

const toggleContinent = (continent) => {
  const index = selectedContinents.value.indexOf(continent);
  if (index > -1) {
    selectedContinents.value.splice(index, 1);
  } else {
    selectedContinents.value.push(continent);
  }
  emit("update:modelValue", selectedContinents.value);
};

const isSelected = (continent) => {
  return selectedContinents.value.includes(continent);
};

// Expose reset function for parent to call
const reset = () => {
  selectedContinents.value = [];
  emit("update:modelValue", []);
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
        'px-4 py-2 rounded-lg font-medium transition-colors',
        isSelected(continent)
          ? 'bg-brand-primary text-white hover:bg-brand-primary-dark'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      ]"
    >
      {{ continent }}
    </button>
  </div>
</template>
