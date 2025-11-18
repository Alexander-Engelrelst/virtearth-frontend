<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 100
    },
    step: {
        type: Number,
        default: 1
    },
    modelValue: {
        type: Object,
        default: () => ({ from: 0, to: 100 })
    }
});

const emit = defineEmits(['update:modelValue']);

const from = ref(props.modelValue.from || props.min);
const to = ref(props.modelValue.to || props.max);

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

const emitChange = () => {
    emit('update:modelValue', { from: from.value, to: to.value });
};

// Calculate the progress bar position and width
const progressLeft = computed(() => {
    return ((from.value - props.min) / (props.max - props.min)) * 100;
});

const progressWidth = computed(() => {
    return ((to.value - from.value) / (props.max - props.min)) * 100;
});

</script>

<template>
    <div class="relative h-[50px] pt-2.5">
        <div class="absolute w-full h-1.5 bg-slate-300 rounded top-2.5"></div>

        <div
            class="absolute h-1.5 bg-blue-500 rounded top-2.5"
            :style="{
                left: progressLeft + '%',
                width: progressWidth + '%'
            }"
        ></div>

        <!-- Range inputs -->
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

        <div class="flex justify-between mt-2.5 text-sm text-slate-500">
            <span>{{ from }}</span>
            <span>{{ to }}</span>
        </div>
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
    top: 10px;
}

.slider-input::-webkit-slider-thumb {
    cursor: pointer;
    pointer-events: all;
}
</style>