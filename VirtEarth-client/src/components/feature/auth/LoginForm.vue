<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit']);

const username = ref('');
const errors = ref({});

function validateForm() {
    errors.value = {};

    if (!username.value.trim()) {
        errors.value.username = 'Username is required';
        return false;
    }

    return true;
}

function handleSubmit() {
    if (validateForm()) {
        emit('submit', username.value.trim());
    }
}
</script>

<template>
    <div class="card w-full max-w-sm bg-base-100 shadow-xl rounded-lg">
        <div class="card-body items-center text-center">
            <p class="text-sm text-brand-secondary">Authenticated via</p>
            <h2 class="card-title text-xl font-semibold">AdrianID</h2>
            <form class="form-control w-full text-left" @submit.prevent="handleSubmit" autocomplete="off">
                <label class="label">
                    <span class="label-text">What is your username?</span>
                </label>
                <input
                    v-model="username"
                    type="text"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': errors.username }"
                    placeholder="Type here"
                />
                <label v-if="errors.username" class="label">
                    <span class="label-text-alt text-error">{{ errors.username }}</span>
                </label>
                <button
                    type="submit"
                    class="btn w-full mt-4 text-white bg-brand-primary hover:bg-brand-primary-dark border-none rounded-lg">
                    Enter Dashboard
                </button>
            </form>
        </div>
    </div>
</template>
