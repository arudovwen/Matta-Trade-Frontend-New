<template>
  <div class="flex flex-col gap-y-2 bg-[#E7EBEE] pb-2 h-screen overflow-hidden">
    <AppHeader />
    <div class="flex gap-x-4 flex-1 container">
      <div class="hidden lg:inline-flex h-full">
        <DashboardLayoutSideComponent />
      </div>

      <div class="flex-1 h-full">
        <DashboardLayoutMainComponent />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCompanyProfile } from "~/services/settingservices";
import { createcart, getcart } from "~/services/cartservice";

const cookie = useCookie("cart");
const authStore = useAuthStore();
const cartStore = useCartStore();
const localCart = cookie?.value?.cartItems;
const company = ref(null);
const router = useRouter();
onBeforeMount(() => {
  if (!authStore.isLoggedIn) {
    router.push("/");
  }
});

onMounted(() => {
  getCompanyProfile().then((res) => {
    company.value = res.data.data;
  });

  if (authStore.isLoggedIn) {
    getcart().then((res) => {
      if (res.status === 200) {
        const remoteCartItems = res.data.data.items;
        const remoteTax = res.data.data.tax;

        // Set the remote cart items and tax in the store
        cartStore?.setCart(remoteCartItems);
        cartStore?.setTax(remoteTax);

        if (localCart?.length > 0) {
          // Merge remote and local cart items, remove duplicates, and update the minicart
          const mergedCart = [...remoteCartItems, ...localCart];
          const uniqueCart = mergedCart.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (i) =>
                  i.productId === item.productId &&
                  i.packageId === item.packageId
              )
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
    cartStore?.setCart(cookie?.value?.cartItems || []);
  }
});
provide("company", company);
</script>
