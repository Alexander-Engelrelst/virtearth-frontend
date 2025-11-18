<script setup>
import { ref, computed, watch } from "vue";

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
  modelValue: {
    type: Object,
    default: () => ({ from: 0, to: 100 }),
  },
});

const from = ref(props.min);
const to = ref(props.max);

//on landmarks fetch, props update, from & to should be defaulted to those.
watch([() => props.min, () => props.max], ([newMin, newMax]) => {
  if (newMin !== 0 || newMax !== 0) {
    from.value = newMin;
    to.value = newMax;
    emitChange();
  }
});

// Prevent sliders from crossing each other
const onFromInput = () => {
  if (from.value > to.value) {
    from.value = to.value;
  }
  emitChange();
};
const onToInput = () => {
  if (to.value < from.value) {
    to.value = from.value;
  }
  emitChange();
};

const emit = defineEmits(["update:modelValue"]);

const emitChange = () => {
  emit("update:modelValue", { from: from.value, to: to.value });
};

// Calculate the progress bar position and width
const progressLeft = computed(() => {
  const range = props.max - props.min;
  return ((from.value - props.min) / range) * 100;
});

const progressWidth = computed(() => {
  const range = props.max - props.min;
  return ((to.value - from.value) / range) * 100;
});

const formatYear = (year) => {
  if (year < 0) {
    return `${Math.abs(year)} BC`;
  } else {
    return `${year} AD`;
  }
};

const fromDisplay = computed(() => formatYear(from.value));
const toDisplay = computed(() => formatYear(to.value));

//expose reset func for parent to call
const reset = () => {
  from.value = props.min;
  to.value = props.max;
  emitChange();
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
      @input="onFromInput"
      class="slider-input"
    />
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="to"
      @input="onToInput"
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
