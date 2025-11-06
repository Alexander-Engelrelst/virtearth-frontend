<script setup>
import { ref } from 'vue';

const emit = defineEmits(['createUser', 'login']);

const inputUsername = ref('');
const errors = ref({});

function validateForm() {
    errors.value = {};

    if (!inputUsername.value.trim()) {
        errors.value.inputUsername = 'Username is required';
        return false;
    }

    return true;
}

function handleCreateUser() {
    if (validateForm()) {
        emit('createUser', inputUsername.value.trim());
    }
}

function handleLogin() {
    if (validateForm()) {
        emit('login', inputUsername.value.trim());
    }
}
</script>

<template>
    <div class="card w-full max-w-sm bg-base-100 shadow-xl rounded-lg">
        <div class="card-body items-center text-center">
            <p class="text-sm text-brand-secondary">Authenticated via</p>
            <h2 class="card-title text-xl font-semibold">AdrianID</h2>
            <form class="form-control w-full text-left" autocomplete="off">

                <label class="label">
                    <span class="label-text">What is your username?</span>
                </label>
                <input
                    v-model="inputUsername"
                    type="text"
                    class="input input-bordered w-full"
                    :class="{ 'input-error': errors.inputUsername }"
                    placeholder="Type here"
                />
                <label v-if="errors.inputUsername" class="label">
                    <span class="label-text-alt text-error">{{ errors.inputUsername }}</span>
                </label>

                <button
                    type="button"
                    @click="handleCreateUser"
                    class="btn w-full mt-4 text-white text-brand-secondary border-none rounded-lg">
                    Create user
                </button>
                <button
                    type="button"
                    @click="handleLogin"
                    class="btn w-full mt-4 text-white bg-brand-primary hover:bg-brand-primary-dark border-none rounded-lg">
                    Enter Dashboard
                </button>
            </form>
        </div>
    </div>
</template>
