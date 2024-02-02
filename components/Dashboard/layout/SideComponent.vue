<template>
  <aside class="flex flex-col min-w-[245px]">
    <nav
      class="bg-white py-[11px] rounded-[10px] border border-[#F4F7FE] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)]"
    >
      <ul>
        <li v-for="item in mappedNav" :key="item.name">
          <NuxtLink
            :to="item.url"
            class="text-sm flex items-center px-5 border-r-[3px] border-transparent"
            activeClass="!border-primary-500 bg-[#2270FA0F] text-primary-500 block"
          >
            <span class="flex items-center gap-x-[10px] flex-1 py-[9px]">
              <AppIcon :icon="item.icon" iconClass="text-xl" />
              <span> {{ item.name }}</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script setup>
import {
  updateVendorInfo,
  postStoreName,
  getVendorInfo,
} from "~/services/userservices";

const formValues = reactive({
  storeUrl: "",
});
onMounted(() => {
  getVendorInfo().then((res) => {
    formValues.storeSlug = res.data.data.storeName;
  });
});
const authstore = useAuthStore();

const navigation = [
  {
    name: "Dashboard",
    url: "/overview",
    icon: "mingcute:layout-3-line",
    key: "overview",
  },
  {
    name: "Profile",
    url: "/account/settings",
    icon: "lucide:user",
    key: "account",
  },
  {
    name: "My Orders",
    url: "/procurement/my-orders",
    icon: "lucide:shopping-bag",
    key: "my-orders",
  },
  {
    name: "My Requests",
    url: "/procurement/my-requests",
    icon: "ri:hand-coin-line",
    key: "my-requests",
  },

  {
    name: "Shipping Addresses",
    url: "/procurement/shipping-addresses",
    icon: "ion:map-outline",
    key: "shipping",
  },

  {
    name: "Wallet",
    url: "/wallet/home",
    icon: "ion:wallet-outline",
    key: "wallet",
  },
  {
    name: "Financing requests",
    url: "/financing",
    icon: "f7:tag",
    key: "financing",
  },
  {
    name: "Saved items",
    url: "/account/saved-searches",
    icon: "tdesign:heart",
    key: "saved",
  },
  {
    name: "Storefront",
    url: "/tech-store",
    icon: "solar:shop-outline",
    key: "storefront",
  },

  {
    name: "Company Settings",
    url: "/company/settings",
    icon: "mingcute:building-5-line",
    key: "company",
  },
  {
    name: "User Management",
    url: "/user-management",
    icon: "lucide:users",
    key: "user",
  },
  {
    name: "Products",
    url: "/storefront/products",
    icon: "fluent-mdl2:product-variant",
    key: "products",
  },
];
const mappedNav = computed(() => {
  return navigation.map((i) => {
    return {
      ...i,
      url: i.key === "storefront" ? `/${formValues.storeUrl}` : i.url,
    };
  });
});
const openIndex = ref([
  "Company",
  "Procurement",
  "My Account",
  "Storefront",
  "Wallet",
]);
const userType = computed(() => {
  return authstore.userType;
});
function handleIndex(val) {
  openIndex.value.push(val);
}
function dropIndex(val) {
  openIndex.value = openIndex.value.filter((i) => i !== val);
}
</script>
<style scoped lang="scss"></style>
