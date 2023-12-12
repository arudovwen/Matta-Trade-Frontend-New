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

const authStore = useAuthStore();
const cartStore = useCartStore();
const localCart = JSON.parse(localStorage.getItem("cartItems"));
onMounted(() => {
  if (authStore.isLoggedIn) {
    getcart().then((res) => {
      if (res.status === 200) {
        cartStore.setCart(res.data.data.items);
        cartStore.setTax(res.data.data.tax);
        if (localCart?.length > 0) {
          const miniCart = [...new Set([...res.data.data.items, ...localCart])];
          createcart({ items: miniCart }).then(res=>{
            if(res.status === 200){
              localStorage.removeItem("cartItems")
              cartStore.getMyCart()
            }
          });
        }
      }
    });
  } else {
    cartStore.setCart(JSON.parse(localStorage.getItem("cartItems")) || []);
  }
});
</script>
