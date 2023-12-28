<template>
  <div class="bg-[#F4F4F4] darks:bg-gray-800 relative">
    <slot />
  </div>
</template>
<script setup>
useHead({
  title: "Onboarding | Matta",
  meta: [{ name: "description", content: "Onboarding" }],
});

const authStore = useAuthStore();
const router = useRouter();
onBeforeMount(() => {
  if (!authStore.isLoggedIn || authStore.userInfo.onboardingPageStatus > 0) {
    router.push("/");
  }
});
</script>
