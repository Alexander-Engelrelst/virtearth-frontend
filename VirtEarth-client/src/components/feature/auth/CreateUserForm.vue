<script setup>
import { ref, watch } from 'vue';
import AdrianIdBadge from '@/components/base/AdrianIdBadge.vue';

const emit = defineEmits(['createUser', 'usernameChange']);

const props = defineProps({
    userStatus: {
        type: Object,
        default: () => ({ status: null, message: '' })
    }
});

const inputUsername = ref('');
const errors = ref({});
let usernameTimeout = null;

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

// Watch for username changes with debouncing
watch(inputUsername, (newValue) => {
    // Clear client-side error when user starts typing
    if (errors.value.inputUsername) {
        errors.value.inputUsername = '';
    }

    if (usernameTimeout) {
        clearTimeout(usernameTimeout);
    }

    usernameTimeout = setTimeout(() => {
        const trimmedUsername = newValue.trim();
        if (trimmedUsername) {
            emit('usernameChange', trimmedUsername);
        }
    }, 1000);
});

// Computed message and styling based on userStatus
function getStatusMessage() {
    if (!props.userStatus.status) return null;

    switch (props.userStatus.status) {
        case 409:
            return { text: 'Username already taken', type: 'error' };
        case 204:
            return { text: 'Username available', type: 'success' };
        case 400:
            return { text: 'Invalid username', type: 'error' };
        default:
            return null;
    }
}
</script>

<template>
    <div class="card w-full max-w-sm bg-white shadow-2xl rounded-2xl border border-gray-100">
        <div class="card-body items-center text-center p-8">
            <AdrianIdBadge />
            <h3 class="text-xl font-semibold mb-6 text-gray-800">Create Your Account</h3>

            <form class="form-control w-full text-left" autocomplete="off">
                <label class="label">
                    <span class="label-text text-gray-700 font-medium">Username</span>
                </label>
                <input
                    v-model="inputUsername"
                    type="text"
                    class="input input-bordered w-full bg-gray-50 focus:bg-white transition-all rounded-lg"
                    :class="{
                        'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200': errors.inputUsername || (getStatusMessage()?.type === 'error'),
                        'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200': getStatusMessage()?.type === 'success',
                        'focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20': !errors.inputUsername && !getStatusMessage()
                    }"
                    placeholder="Choose your username"
                />

                <!-- Client-side validation error -->
                <label v-if="errors.inputUsername" class="label">
                    <span class="label-text-alt text-red-600 font-medium">{{ errors.inputUsername }}</span>
                </label>

                <!-- API status message -->
                <label v-else-if="getStatusMessage()" class="label">
                    <span
                        class="label-text-alt font-medium"
                        :class="{
                            'text-red-600': getStatusMessage().type === 'error',
                            'text-green-600': getStatusMessage().type === 'success'
                        }"
                    >
                        {{ getStatusMessage().text }}
                    </span>
                </label>

                <button
                    type="button"
                    @click="handleCreateUser"
                    class="btn w-full mt-6 text-white bg-brand-primary hover:bg-brand-primary-dark border-none rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 font-medium text-base py-3">
                    Create Account
                </button>
            </form>
        </div>
    </div>
</template>
