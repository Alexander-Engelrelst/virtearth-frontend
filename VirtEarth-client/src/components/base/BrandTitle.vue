<script setup>
import { computed } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "base",
    validator: (value) => ["sm", "base", "lg", "xl"].includes(value),
  },
});

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "text-2xl";
    case "lg":
      return "text-5xl";
    case "xl":
      return "text-6xl";
    case "base":
    default:
      return "text-4xl";
  }
});
</script>

<template>
  <h1 class="font-bold text-brand-primary font-primary" :class="sizeClass">Virtearth</h1>
</template>
