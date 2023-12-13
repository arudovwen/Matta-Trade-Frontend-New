<template>
  <div class="flex flex-col gap-y-2 bg-[#E7EBEE] pb-2 h-screen">
    <AppHeader />
    <div class="flex gap-x-4 flex-1 container">
      <DashboardLayoutSideComponent />

      <div class="flex-1 h-full">
        <DashboardLayoutMainComponent />
      </div>
    </div>
  </div>
</template>
<script setup>
import { getCompanyProfile } from "~/services/settingservices";
import { createcart, getcart } from "~/services/cartservice";

const authStore = useAuthStore();
const cartStore = useCartStore();
const localCart = JSON.parse(localStorage.getItem("cartItems"));
const company = ref(null);
const router = useRouter()
onBeforeMount(()=>{
  
  if(!authStore.isLoggedIn){
    router.push("/")
  }
})

onMounted(() => {
  getCompanyProfile().then((res) => {
    company.value = res.data.data;
  });

  if (authStore.isLoggedIn) {
    getcart().then((res) => {
      if (res.status === 200) {
        cartStore.setCart(res.data.data.items);
        cartStore.setTax(res.data.data.tax);
        if (localCart?.length > 0) {
          const miniCart = [...new Set([...res.data.data.items, ...localCart])];
          createcart({ items: miniCart }).then((res) => {
            if (res.status === 200) {
              localStorage.removeItem("cartItems");
              cartStore.getMyCart();
            }
          });
        }
      }
    });
  } else {
    cartStore.setCart(JSON.parse(localStorage.getItem("cartItems")) || []);
  }
});
provide("company", company);
</script>
