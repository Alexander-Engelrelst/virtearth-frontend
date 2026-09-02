<script setup>
import { computed, watch } from "vue";
import { formatYear } from "../../services/utils.js";

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const model = defineModel({
  type: Object,
  default: () => ({ from: 0, to: 100 }),
});

// on landmarks fetch, props update, from & to should be updated to those.
watch(
  [() => props.min, () => props.max],
  ([newMin, newMax]) => {
    model.value = { from: newMin, to: newMax };
  },
  { immediate: true }
);

// Prevent sliders from crossing each other
const from = computed({
  get: () => model.value.from,
  set: (val) => {
    const newFrom = val > model.value.to ? model.value.to : val;
    model.value = { ...model.value, from: newFrom };
  },
});

const to = computed({
  get: () => model.value.to,
  set: (val) => {
    const newTo = val < model.value.from ? model.value.from : val;
    model.value = { ...model.value, to: newTo };
  },
});

const progressLeft = computed(() => {
  const range = props.max - props.min;
  if (range === 0) return 0;
  return ((from.value - props.min) / range) * 100;
});

const progressWidth = computed(() => {
  const range = props.max - props.min;
  if (range === 0) return 0;
  return ((to.value - from.value) / range) * 100;
});

const fromDisplay = computed(() => formatYear(from.value));
const toDisplay = computed(() => formatYear(to.value));

//expose reset func for parent to call
const reset = () => {
  model.value = { from: props.min, to: props.max };
};

defineExpose({ reset });
</script>

<template>
  <div class="relative">
    <div class="flex justify-between mb-2 text-sm text-brand-secondary">
      <span>{{ fromDisplay }}</span>
      <span>{{ toDisplay }}</span>
    </div>

    <div class="absolute w-full h-1.5 bg-slate-300 rounded top-[2rem]"></div>

    <div
      class="absolute h-1.5 bg-brand-primary rounded top-[2rem]"
      :style="{
        left: progressLeft + '%',
        width: progressWidth + '%',
      }"
    ></div>

    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="from"
      class="slider-input"
    />
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="to"
      class="slider-input"
    />
  </div>
</template>

<style scoped>
.slider-input {
  position: absolute;
  width: 100%;
  height: 6px;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
  top: 2rem;
}

.slider-input::-webkit-slider-thumb {
  width: 1.25rem;
  height: 1.25rem;
  background: var(--color-brand-primary);
  border: 0.15rem solid #eeeeee;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
  -webkit-appearance: none;
  appearance: none;
}
</style>
