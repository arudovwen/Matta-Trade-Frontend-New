<template>
  <div class="bg-[#F4F4F4] darks:bg-gray-800 relative">
    <slot />
  </div>
</template>
<script setup>
const authStore = useAuthStore();
const router = useRouter();
onBeforeMount(() => {
  if (!authStore.isLoggedIn || authStore.userInfo.onboardingPageStatus > 0) {
    router.push("/");
  }
});
</script>
