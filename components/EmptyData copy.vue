<template>
  <div
    class="h-[310px] rounded-lg w-full flex items-center justify-center bg-[#F1F3F5]"
  >
    <div class="text-center max-w-sm mx-auto">
      <img
        src="~/assets/img/nofound.svg"
        class="w-[52px] h-auto mx-auto mb-4"
      />
      <p class="text-matta-black font-medium text-xl">{{ text }}</p>
      <p class="text-sm text-matta-black mb-6">
        We did not find the query you requested
      </p>
      <router-link :to="url" v-if="url">
        <button class="bg-primary-500 text-white rounded-full px-6 py-3 uppercase">
          {{ buttonText }}
        </button>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
defineProps(["url", "buttonText", "text"]);
</script>
