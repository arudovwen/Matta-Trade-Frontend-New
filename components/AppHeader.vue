<template>
  <nav
    :class="{
      relative: view.atTopOfPage,
      'sticky top-0 opacity-95 fade-in-top pb-5 lg:pb-5 border-b border-[rgba(242, 242, 242, 1)] darks:border-gray-900':
        !view.atTopOfPage,
    }"
    class="relative pt-6 pb-6 w-full bg-white darks:bg-gray-800 darks:text-white/90 z-[999] transition-all duration-500 ease-in-out"
  >
    <div class="container mx-auto">
      <div class="flex justify-between items-center gap-x-5">
        <div class="logo flex gap-x-10 items-center">
          <NuxtLink to="/">
            <img
              src="~/assets/images/logo.png"
              width="100"
              height="26"
              alt="Matta"
              class="w-[100px] h-auto"
          /></NuxtLink>
          <ul class="lg:flex items-center gap-x-6 hidden">
            <li
              v-for="n in navigations"
              :key="n.name"
              class="flex gap-x-[6px] items-center text-sm border-transparent group"
              :class="`${
                currentRoute.name.toLowerCase() == n.name.toLowerCase()
                  ? 'border-[#165EF0]'
                  : ''
              }`"
            >
              <Menu
                as="div"
                v-if="n.key === 'categories' || n.key === 'finance'"
                class="relative inline-block text-left"
              >
                <MenuButton
                  class="flex gap-x-1 items-center group-hover:text-[#165EF0]"
                  ><AppIcon
                    v-if="n.key === 'categories'"
                    class="text-base"
                    icon="tdesign:list"
                  />
                  {{ n.name }}</MenuButton
                >
                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="z-[999] grid grid-cols-2 gap-x-9 absolute left-0 mt-[22px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[650px] origin-top-right bg-white darks:bg-gray-800 rounded-b-[10px] px-[30px] py-5 text-sm"
                  >
                    <div
                      class="px-1 py-1"
                      v-for="cat in n.key === 'categories'
                        ? marketsData
                        : financeMenu"
                      :key="cat.title"
                    >
                      <MenuItem v-slot="{ active }">
                        <NuxtLink
                          :to="`/market/${encodeURIComponent(
                            cat.title.toLowerCase()
                          )}/${cat.id}`"
                        >
                          <button
                            :class="[
                              'group flex w-full items-center rounded-md px-[14px] py-[11px] text-sm hover:bg-[rgba(22,94,240,0.09)] whitespace-nowrap min-w-[275px] gap-x-2 text-[#333] darks:text-white/90',
                            ]"
                          >
                            <AppIcon
                              v-if="n.key === 'categories'"
                              :icon="`fa6-solid:${cat.imagePath}`"
                            />
                            {{ cat.title }}
                          </button>
                        </NuxtLink>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
              <NuxtLink :to="n.url" v-else>
                <span class="cursor-pointer hover:text-[#165EF0]">
                  {{ n.name }}</span
                >
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-x-6 text-sm">
          <!-- <span
            :class="{
              flex: view.atTopOfPage,
              hidden: !view.atTopOfPage,
            }"
            class="gap-x-1 items-center"
          >
            <img
              src="~/assets/images/nigeria.svg"
              width="20"
              height="20"
              alt="Matta"
              class="w-5 h-auto"
            />
            NGN</span
          >

          <span
            :class="{
              'md:flex ': view.atTopOfPage,
              'md:hidden': !view.atTopOfPage,
            }"
            class="hidden gap-x-1 items-center"
          >
            <AppIcon class="text-lg" icon="ion:globe-outline" />
            <select class="appearance-none outline-none text-sm bg-transparent">
              <option value="">English-NGN</option>
            </select></span
          > -->
          <NuxtLink to="/cart" class="flex items-center gap-x-[6px] relative">
            <span class="relative">
              <AppIcon
                class="text-base text-[#333] darks:text-white/90"
                icon="fa6-solid:cart-shopping"
              />
              <span
                class="w-[14px] h-[14px] rounded-full bg-[#16F046] text-[8px] flex items-center justify-center absolute -top-[10px] -right-[6px]"
                >2</span
              >
            </span>
            <span class="text-sm hidden sm:inline-flex">Cart</span>
          </NuxtLink>

          <div class="flex gap-x-3">
            <AppButton
              link="/auth/vendor-register"
              text="Become a Seller"
              btnClass="text-white  !px-[15px] !py-[6px] !normal-case bg-[#f90] hidden md:flex"
            />
            <AppButton
              v-if="!isLoggedIn"
              link="/auth/login"
              text="Sign In"
              btnClass="bg-primary-500 text-white !px-4 !sm:px-6 !py-[6px] text-xs sm:text-sm"
            />

            <Menu
              as="div"
              class="relative hidden lg:inline-flex text-left"
              v-if="isLoggedIn"
            >
              <div>
                <MenuButton
                  class="bg-[#165EF0] text-white rounded-[5px] px-[24px] py-[9px] flex gap-x-1 items-center font-semibold"
                >
                  My account <AppIcon icon="mdi:chevron-down" class="text-lg" />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 mt-2 w-56 origin-top-right rounded-[5px] border border-[#F6F6F6] bg-white darks:bg-gray-800 z-[99] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)]"
                >
                  <div
                    class="flex items-center gap-x-2 px-[15px] pt-3 pb-[14px] border-b border-[#F4F4F4]"
                  >
                    <span
                      class="h-8 w-8 rounded-full flex items-center justify-center text-sm text-white bg-[#f90] font-semibold"
                      >JD</span
                    >
                    <div>
                      <span
                        class="text-[#333] darks:text-white/90 text-[13px] font-semibold block capitalize"
                        >John doe</span
                      >
                      <span
                        class="block text-[11px] text-[#666] darks:text-white/70"
                        >johndoe@gmail.com</span
                      >
                    </div>
                  </div>
                  <div class="px-[15px] pt-[14px] pb-5">
                    <ul class="grid gap-y-3 text-[#555] darks:text-white/80">
                      <li v-for="n in filteredMenu" :key="n.name" class="">
                        <MenuItem v-slot="{ active }">
                          <button
                            class="flex gap-x-3 items-center text-[13px] font-medium"
                          >
                            <AppIcon :icon="n.icon" /> {{ n.name }}
                          </button>
                        </MenuItem>
                      </li>
                    </ul>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <span v-if="isLoggedIn" class="lg:hidden" @click="open = true">
              <AppIcon icon="ci:menu-alt-01" class="text-[30px]" />
            </span>
          </div>
        </div>
      </div>
      <!-- <div
        :class="{
          'md:flex': view.atTopOfPage,
          hidden: !view.atTopOfPage,
        }"
        class="hidden justify-between items-center gap-x-10"
      >
        <ul class="lg:flex items-center gap-x-6 hidden">
          <li
            v-for="n in navigations"
            :key="n.name"
            class="flex gap-x-[6px] items-center text-sm border-b-2 border-transparent group hover:border-[#165EF0] pb-5"
            :class="`${
              currentRoute.name.toLowerCase() == n.name.toLowerCase()
                ? 'border-[#165EF0]'
                : ''
            }`"
          >
            <Menu
              as="div"
              v-if="n.key === 'categories' || n.key === 'finance'"
              class="relative inline-block text-left"
            >
              <MenuButton
                class="flex gap-x-1 items-center group-hover:text-[#165EF0]"
                ><AppIcon
                  v-if="n.key === 'categories'"
                  class="text-base"
                  icon="tdesign:list"
                />
                {{ n.name }}</MenuButton
              >
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="z-[999] grid grid-cols-2 gap-x-9 absolute left-0 mt-[22px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[650px] origin-top-right bg-white darks:bg-gray-800 rounded-b-[10px] px-[30px] py-5 text-sm"
                >
                  <div
                    class="px-1 py-1"
                    v-for="n in n.key === 'categories'
                      ? categories
                      : financeMenu"
                    :key="n.title"
                  >
                    <MenuItem v-slot="{ active }">
                      <NuxtLink :to="n.url">
                        <button
                          :class="[
                            'group flex w-full items-center rounded-md px-[14px] py-[11px] text-sm hover:bg-[rgba(22,94,240,0.09)] whitespace-nowrap min-w-[275px] gap-x-2 text-[#333] darks:text-white/90',
                          ]"
                        >
                          <AppIcon v-if="n?.icon" :icon="n.icon" />
                          {{ n.title }}
                        </button>
                      </NuxtLink>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <NuxtLink :to="n.url" v-else>
              <span class="cursor-pointer hover:text-[#165EF0]">
                {{ n.name }}</span
              >
            </NuxtLink>
          </li>
        </ul>
        <ul class="items-center gap-x-6 lg:hidden">
          <li
            v-for="n in mobileNavigation"
            :key="n.name"
            class="flex gap-x-[6px] items-center text-sm border-b-2 border-transparent hover:border-[#165EF0] pb-5"
          >
            <Menu
              as="div"
              v-if="n.key === 'categories'"
              class="relative inline-block text-left"
            >
              <MenuButton class="flex gap-x-1 items-center"
                ><AppIcon class="text-base" icon="tdesign:list" />
                {{ n.name }}</MenuButton
              >
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="z-[999] grid grid-cols-2 gap-x-9 absolute left-0 mt-[22px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[650px] origin-top-right bg-white darks:bg-gray-800 rounded-b-[10px] px-[30px] py-5 text-sm"
                >
                  <div class="px-1 py-1" v-for="n in categories" :key="n.title">
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          'group flex w-full items-center rounded-md px-[14px] py-[11px] text-sm hover:bg-[rgba(22,94,240,0.09)] whitespace-nowrap min-w-[275px] gap-x-2',
                        ]"
                      >
                        <AppIcon :icon="n.icon" /> {{ n.title }}
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </li>
        </ul>

        <ul class="flex items-center gap-x-6 pb-5">
          <li class="text-sm hidden md:inline-block">Help Center</li>
          <li class="text-sm">
            <span class="flex items-center gap-x-[6px] relative">
              <span class="relative">
                <AppIcon
                  class="text-base text-[#333] darks:text-white/90"
                  icon="fa6-solid:cart-shopping"
                />
                <span
                  class="w-[14px] h-[14px] rounded-full bg-[#16F046] text-[8px] flex items-center justify-center absolute -top-[10px] -right-[6px]"
                  >2</span
                >
              </span>
              <span class="text-sm">Cart</span>
            </span>
          </li>
        </ul>
      </div> -->
    </div>
  </nav>

  <div class="z-[999]" v-if="open">
    <AppSideMenu />
  </div>
</template>
<script setup>
import { ref } from "vue";
import {
  categories,
  navigations,
  mobileNavigation,
  financeMenu,
  mobileMenu,
} from "~/utils/data";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useMarketStore } from "~/stores/markets";

const { marketsData } = useMarketStore();
const router = useRouter();
const { currentRoute } = router;
const isLoggedIn = ref(true);
const filteredMenu = computed(() =>
  mobileMenu.filter(
    (i) =>
      i.key === "profile" ||
      i.key === "wallet" ||
      i.key === "sign-out" ||
      i.key === "my-orders"
  )
);
const view = ref({
  atTopOfPage: true,
});
const open = ref(false);
onBeforeMount(() => {
  window.addEventListener("scroll", handleScroll);
});
function handleScroll() {
  // when the user scrolls, check the pageYOffset
  if (window.pageYOffset > 500) {
    // user is scrolled
    if (view.value.atTopOfPage) view.value.atTopOfPage = false;
  } else {
    // user is at top of page
    if (!view.value.atTopOfPage) view.value.atTopOfPage = true;
  }
}
provide("open", open);
</script>
<style lang="scss">
nav {
  .router-link-active.router-link-exact-active {
    color: #165ef0;
  }
}
/* Add the transition class for slide-down effect */
.fade-in-top {
  -webkit-animation: fade-in-top 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-top 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2023-11-20 13:54:55
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in-top
 * ----------------------------------------
 */
@-webkit-keyframes fade-in-top {
  0% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in-top {
  0% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
.fade-out-top {
  -webkit-animation: fade-out-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: fade-out-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2023-11-20 13:57:36
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-out-top
 * ----------------------------------------
 */
@-webkit-keyframes fade-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
}
@keyframes fade-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    opacity: 0;
  }
}
</style>
