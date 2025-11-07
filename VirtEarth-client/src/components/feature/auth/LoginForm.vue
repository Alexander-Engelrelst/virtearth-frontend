<script setup>
import { ref } from "vue";
import AdrianIdBadge from "@/components/base/AdrianIdBadge.vue";

const emit = defineEmits(["login"]);

const inputUsername = ref("");
const errors = ref({});

function validateForm() {
  errors.value = {};

  if (!inputUsername.value.trim()) {
    errors.value.inputUsername = "Username is required";
    return false;
  }

  return true;
}

function handleLogin() {
  if (validateForm()) {
    emit("login", inputUsername.value.trim());
  }
}
</script>

<template>
  <div class="card w-full max-w-sm bg-white shadow-2xl rounded-2xl border border-gray-100">
    <div class="card-body items-center text-center p-8">
      <AdrianIdBadge />
      <h3 class="text-xl font-semibold mb-6 text-gray-800">Login to Your Account</h3>

      <form class="form-control w-full text-left" autocomplete="off" @submit.prevent="handleLogin">
        <label class="label">
          <span class="label-text text-gray-700 font-medium">Username</span>
        </label>
        <input
          v-model="inputUsername"
          type="text"
          class="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all rounded-lg"
          :class="{
            'input-error border-red-500 focus:border-red-500 focus:ring-red-200':
              errors.inputUsername,
          }"
          placeholder="Enter your username"
        />
        <label v-if="errors.inputUsername" class="label">
          <span class="label-text-alt text-red-600 font-medium">{{ errors.inputUsername }}</span>
        </label>

        <button
          type="submit"
          class="btn w-full mt-6 text-white bg-brand-primary hover:bg-brand-primary-dark border-none rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 font-medium text-base py-3"
        >
          Enter Dashboard
        </button>
      </form>
    </div>
  </div>
</template>
