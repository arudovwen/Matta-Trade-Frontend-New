<template>
  <div class="bg-[#F4F4F4] darks:bg-gray-800 relative">
    <AppHeader />
    <slot />
    <AppFooter />
    <AppScrollTop />
  </div>
</template>
<script setup>
import { createcart, getcart } from "~/services/cartservice";
const cookie = useCookie("cart");
const authStore = useAuthStore();
const cartStore = useCartStore();
const localCart = [];
onMounted(() => {
  if (authStore.isLoggedIn) {
    getcart().then((res) => {
      if (res.status === 200) {
        cartStore?.setCart(res.data.data.items);
        cartStore?.setTax(res.data.data.tax);
        // if (cookie?.value?.cartItems?.length > 0) {
        //   const miniCart = [
        //     ...new Set([...res.data.data.items, ...cookie?.value?.cartItems]),
        //   ];
        //   createcart({ items: miniCart }).then((res) => {
        //     if (res.status === 200) {
        //       // localStorage.removeItem("cartItems")
        //       cartStore?.getMyCart();
        //     }
        //   });
        // }
      }
    });
  } else {
    cartStore?.setCart?.(cookie?.value?.cartItems || []);
  }
});
</script>
