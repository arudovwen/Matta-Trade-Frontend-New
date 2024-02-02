<template>
  <section
    class="flex flex-col overflow-y-auto  no-scrollbar"
    :style="{ height: 'calc(100vh - 115px)' }"
  >
    <div
      v-if="
        route.name !== 'company settings' && store.userInfo?.accountType == 1
      "
    >
      <!-- <VerificationBox /> -->
    </div>
    <NuxtPage />
  </section>
</template>
<script setup>
import { useRoute } from "vue-router";
const store = useAuthStore();
const route = useRoute();
</script>
