<template>
  <aside class="flex flex-col min-w-[245px] ">
    <nav class="bg-white py-[11px] rounded-[10px] border border-[#F4F7FE] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)]">
      <ul>
        <li v-for="item in navigation" :key="item.name">
          <NuxtLink
            :to="item.url"
            class="text-sm flex items-center px-5 border-r-[3px] border-transparent"
            exactActiveClass="!border-primary-500 bg-[#2270FA0F] text-primary-500 block"
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
const authstore = useAuthStore();
const company = inject("company");
const route = useRoute();
console.log("🚀 ~ route:", route);

// const navigation = [
//   {
//     title: "My Account",
//     role: ["supplier", "buyer"],
//     accountType: [0, 1],
//     allowed: ["CompanyAdmin", "CompanyUser"],
//     subs: [
//       {
//         name: "Settings",
//         url: "/account/settings",
//       },
//       {
//         name: "Notifications",
//         url: "/account/notifications",
//       },
//       {
//         name: "Saved Searches",
//         url: "/account/saved-searches",
//       },
//     ],
//   },
//   {
//     title: "Storefront",
//     role: ["supplier"],
//     accountType: [0, 1],
//     allowed: ["CompanyAdmin"],
//     subs: [
//       {
//         name: "Overview",
//         url: "/storefront/overview",
//       },
//       {
//         name: "Products",
//         url: "/storefront/products",
//       },
//       {
//         name: "Orders",
//         url: "/storefront/orders",
//       },
//       {
//         name: "Requests",
//         url: "/storefront/requests",
//       },
//     ],
//   },
//   {
//     title: "Procurement",
//     role: ["supplier", "buyer"],
//     allowed: ["CompanyAdmin", "CompanyUser"],
//     accountType: [0, 1],
//     subs: [
//       {
//         name: "My Orders",
//         url: "/procurement/my-orders",
//       },
//       {
//         name: "My Requests",
//         url: "/procurement/my-requests",
//       },

//       // {
//       //   name: "Payments",
//       //   url: "/account/procurement/payment",
//       // },
//       {
//         name: "Shipping Addresses",
//         url: "/procurement/shipping-addresses",
//       },
//     ],
//   },
//   {
//     title: "Wallet",
//     role: ["supplier", "buyer"],
//     allowed: ["CompanyAdmin", "CompanyUser"],
//     accountType: [0, 1],
//     subs: [
//       {
//         name: "Home",
//         url: "/wallet/home",
//       },
//       {
//         name: "Transactions",
//         url: "/wallet/transactions",
//       },
//       {
//         name: "Settings",
//         url: "/wallet/settings",
//       },
//     ],
//   },

//   {
//     title: "Company",
//     role: ["supplier"],
//     allowed: ["CompanyAdmin"],
//     accountType: [1],
//     subs: [
//       {
//         name: "Company Settings",
//         url: "/company/settings",
//       },
//       {
//         name: "User Management",
//         url: "/company/user-management",
//       },
//     ],
//   },
// ];

const navigation = [
  {
    name: "Dashboard",
    url: "/storefront/overview",
    icon: "mingcute:layout-3-line",
  },
  {
    name: "Profile",
    url: "/account/settings",
    icon: "lucide:user",
  },
  {
    name: "My Orders",
    url: "/procurement/my-orders",
    icon: "lucide:shopping-bag",
  },
  {
    name: "My Requests",
    url: "/procurement/my-requests",
    icon: "ri:hand-coin-line",
  },

  {
    name: "Shipping Addresses",
    url: "/procurement/shipping-addresses",
    icon: "ion:map-outline",
  },

  {
    name: "Wallet",
    url: "/wallet/home",
    icon: "ion:wallet-outline",
  },
  {
    name: "Saved items",
    url: "/account/saved-searches",
    icon: "tdesign:heart",
  },
  {
    name: "Storefront",
    url: "/storefront",
    icon: "solar:shop-outline",
  },

  {
    name: "Company Settings",
    url: "/company/settings",
    icon: "mingcute:building-5-line",
  },
  {
    name: "User Management",
    url: "/company/user-management",
    icon: "lucide:users",
  },
  {
    name: "Products",
    url: "/storefront/products",
    icon: "f7:tag",
  },
];
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
