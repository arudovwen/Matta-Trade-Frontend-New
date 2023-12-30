<template>
  <aside class="flex flex-col gap-y-2 min-w-[340px] pb-4 h-full">
    <div
      class="bg-white py-6 px-8 rounded-lg flex items-center gap-x-4"
      v-if="company"
    >
      <div
        class="w-16 md:w-16 h-16 md:h-16 rounded-lg bg-white shadow p-4 flex items-center justify-center border border-[#E7EBEE]"
      >
        <img v-if="company.logo" class="" :src="company.logo" alt="logo" />
        <span class="uppercase" v-else>{{
          company.companyName.slice(0, 2)
        }}</span>
      </div>

      <div class="flex-1">
        <p
          class="font-medium text-sm md:text-base text-matta-black capitalize truncate max-w-[180px] mb-1"
        >
          {{ company.companyName }}
        </p>
        <p
          class="font-normal text-[13px] text-matta-black capitalize flex gap-x-1 items-center"
          v-if="company.state && company.country"
        >
          <AppIcon icon="fa-solid:map-marker-alt" />
          <span class="max-w-max truncate">{{ `${company.state}, ${company.country}.` }}</span>
        </p>
        <p class="font-normal text-sm text-matta-black capitalize flex gap-x-1 items-center" v-else>
          <AppIcon icon="fa-solid:map-marker-alt" />
          Not available
        </p>
      </div>
    </div>
    <nav class="bg-white py-6 px-8 rounded-lg flex-1 max-h-[75%] overflow-y-auto">
      <ul>
        <li v-for="n in navigation" :key="n.title">
          <div
            v-if="
              n.role.includes(userType?.toLowerCase()) &&
              n.accountType.includes(authstore.userInfo?.accountType) &&
              n.allowed.includes(authstore.userInfo?.roles[0])
            "
            class="py-4"
          >
            <span class="flex justify-between items-center py-1"
              ><h5 class="text-base text-matta-black font-semibold">
                {{ n.title }}
              </h5>
              <span
                class="text-right text-lg"
                @click="handleIndex(n.title)"
                v-if="!openIndex.includes(n.title)"
                ><AppIcon icon="uil-plus"
              /></span>
              <span
                class="text-right text-lg"
                @click="dropIndex(n.title)"
                v-if="openIndex.includes(n.title)"
                ><AppIcon icon="uil-minus" /></span
            ></span>
            <hr class="my-2" />
            <ul v-if="openIndex.includes(n.title)">
              <router-link
                v-for="item in n.subs"
                :key="item.name"
                :to="item.url"
              >
                <li class="text-sm text-matta-black flex items-center">
                  <span class="flex items-center flex-1 py-2">
                    <AppIcon icon="uil-corner-down-right" class="mr-2 hidden" />
                    <span>
                      {{
                        item.name.toLowerCase() === "company settings"
                          ? "Settings"
                          : item.name
                      }}</span
                    >
                  </span>
                  <span
                    class="h-[.25rem] w-[.25rem] hidden bg-primary-500 rounded-full"
                  ></span>
                </li>
              </router-link>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script setup>
const authstore = useAuthStore();
const company = inject("company");

const navigation = [
  
  {
    title: "Storefront",
    role: ["supplier"],
    accountType: [0, 1],
    allowed: ["CompanyAdmin"],
    subs: [
      {
        name: "Overview",
        url: "/storefront/overview",
      },
      {
        name: "Products",
        url: "/storefront/products",
      },
      {
        name: "Orders",
        url: "/storefront/orders",
      },
      {
        name: "Requests",
        url: "/storefront/requests",
      },
    ],
  },
  {
    title: "Procurement",
    role: ["supplier", "buyer"],
    allowed: ["CompanyAdmin", "CompanyUser"],
    accountType: [0, 1],
    subs: [
      {
        name: "My Orders",
        url: "/procurement/my-orders",
      },
      {
        name: "My Requests",
        url: "/procurement/my-requests",
      },

      // {
      //   name: "Payments",
      //   url: "/account/procurement/payment",
      // },
      {
        name: "Shipping Addresses",
        url: "/procurement/shipping-addresses",
      },
    ],
  },
  {
    title: "Wallet",
    role: ["supplier", "buyer"],
    allowed: ["CompanyAdmin", "CompanyUser"],
    accountType: [0, 1],
    subs: [
      {
        name: "Home",
        url: "/wallet/home",
      },
      {
        name: "Transactions",
        url: "/wallet/transactions",
      },
      {
        name: "Settings",
        url: "/wallet/settings",
      },
    ],
  },
  {
    title: "My Account",
    role: ["supplier", "buyer"],
    accountType: [0, 1],
    allowed: ["CompanyAdmin", "CompanyUser"],
    subs: [
      {
        name: "Settings",
        url: "/account/settings",
      },
      {
        name: "Notifications",
        url: "/account/notifications",
      },
      {
        name: "Saved Searches",
        url: "/account/saved-searches",
      },
    ],
  },
  {
    title: "Company",
    role: ["supplier", "buyer"],
    allowed: ["CompanyAdmin"],
    accountType: [1],
    subs: [
      {
        name: "Company Settings",
        url: "/company/settings",
      },
      {
        name: "User Management",
        url: "/company/user-management",
      },
    ],
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
<style scoped lang="scss">
.router-link-active li span {
  .uil {
    display: flex;
  }

  span {
    font-weight: 500;
  }
  display: flex;
}
</style>
