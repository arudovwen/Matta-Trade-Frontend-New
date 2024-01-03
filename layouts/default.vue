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
        const remoteCartItems = res.data.data.items;
        const remoteTax = res.data.data.tax;

        // Set the remote cart items and tax in the store
        cartStore?.setCart(remoteCartItems);
        cartStore?.setTax(remoteTax);

        if (cookie?.value?.cartItems?.length > 0) {
          // Merge remote and local cart items, remove duplicates, and update the minicart
          const mergedCart = [...remoteCartItems, ...cookie?.value?.cartItems];
          const uniqueCart = mergedCart.filter(
            (item, index, self) =>
              index === self.findIndex((i) => i.productId === item.productId)
          );

          createcart({ items: uniqueCart }).then((createRes) => {
            if (createRes.status === 200) {
              // Refresh the minicart after updating with unique items
              cartStore?.getMyCart();
            }
          });
        }
      }
    });
  } else {
    cartStore?.setCart?.(cookie?.value?.cartItems || []);
  }
});
</script>
