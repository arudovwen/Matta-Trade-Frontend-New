<template>
  <nav
    :class="{
      relative: view.atTopOfPage,
      'sticky top-0 opacity-95 fade-in-top': !view.atTopOfPage,
    }"
    class="relative py-5 md:py-[30px] border-b border-[rgba(242, 242, 242, 1)] w-full bg-white z-[999] transition-all duration-500 ease-in-out"
  >
    <div class="container mx-auto">
      <div class="flex justify-between items-center gap-x-10 mb-7">
        <div class="logo">
          <img
            src="~/assets/images/logo.png"
            width="100"
            height="26"
            alt="Matta"
            class="w-[100px] h-auto"
          />
        </div>
        <div class="hidden lg:flex items-center gap-x-6 text-sm">
          <span class="flex gap-x-1 items-center">
            <img
              src="~/assets/images/nigeria.svg"
              width="20"
              height="20"
              alt="Matta"
              class="w-5 h-auto"
            />
            NGN</span
          >
          <span class="flex gap-x-1 items-center">
            <AppIcon class="text-lg" icon="ion:globe-outline" />
            <select class="appearance-none outline-none text-sm">
              <option value="">English-NGN</option>
            </select></span
          >

          <AppButton
            link="/auth/register"
            text="Become a Seller"
            btnClass="!font-normal text-sm !p-0 !normal-case"
          />
          <AppButton
            link="/auth/login"
            text="Sign In"
            btnClass="bg-primary-500 text-white !px-10 !py-[6px]"
          />
        </div>

        <span class="lg:hidden" @click="open = true">
          <AppIcon icon="pepicons-pop:menu" class="text-[30px]" />
        </span>
      </div>
      <div class="flex justify-between items-center gap-x-10">
        <ul class="lg:flex items-center gap-x-6 hidden">
          <li
            v-for="n in navigations"
            :key="n.name"
            class="flex gap-x-[6px] items-center text-sm"
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
                  class="z-[999] grid grid-cols-2 gap-x-9 absolute left-0 mt-[30.5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[650px] origin-top-right bg-white rounded-b-[10px] px-[30px] py-5 text-sm"
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
            <span class="cursor-pointer hover:text-[#2176FF]" v-else> {{ n.name }}</span>
          </li>
        </ul>
        <ul class="items-center gap-x-6 lg:hidden">
          <li
            v-for="n in mobileNavigation"
            :key="n.name"
            class="flex gap-x-[6px] items-center text-sm"
          >
            <AppIcon class="text-base" icon="tdesign:list" />
            <span> {{ n.name }}</span>
          </li>
        </ul>

        <ul class="flex items-center gap-x-6">
          <li class="text-sm hidden md:inline-block">Help Center</li>
          <li class="text-sm">
            <span class="flex items-center gap-x-[6px] relative">
              <span class="relative">
                <AppIcon
                  class="text-base text-[#333]"
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
      </div>
    </div>
  </nav>

  <div class="z-[999]" v-if="open">
    <AppMobileMenu />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { categories, navigations, mobileNavigation } from "~/utils/data";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

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
<style>
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
