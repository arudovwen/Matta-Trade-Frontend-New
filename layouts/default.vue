<template>
  <div class="bg-[#F4F4F4] darks:bg-gray-800 relative">
    <AppHeader />
    <slot />
    <AppFooter />
    <AppScrollTop />
  </div>
</template>
<script setup>
import { getcart } from "~/services/cartservice";

const authStore = useAuthStore();
const cartStore = useCartStore();

onMounted(() => {
  if (authStore.isLoggedIn) {
    getcart().then((res) => {
     
      cartStore.setCart(res.data.data.items);
      cartStore.setTax(res.data.data.tax);
    });
  }
});
</script>
