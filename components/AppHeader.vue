<template>
  <nav class="py-[30px] border-b border-[rgba(242, 242, 242, 1)]">
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
            link="/register"
            text="Become a Seller"
            btnClass="!font-normal text-sm !p-0 !normal-case"
          />
          <AppButton
            link="/login"
            text="Sign In"
            btnClass="bg-primary-500 text-white !px-10 !py-[6px]"
          />
        </div>

        <span class="lg:hidden">
          <AppIcon icon="pepicons-pop:menu" class="text-[30px]" />
        </span>
      </div>
      <div class="lg:flex justify-between items-center gap-x-10 hidden">
        <ul class="flex items-center gap-x-6">
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
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          'group flex w-full items-center rounded-md px-[14px] py-[11px] text-sm hover:bg-[rgba(22,94,240,0.09)] whitespace-nowrap min-w-[275px]',
                        ]"
                      >
                      Consumer Goods
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <span v-else> {{ n.name }}</span>
          </li>
        </ul>

        <ul class="flex items-center gap-x-6">
          <li class="text-sm">Help Center</li>
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
</template>
<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const navigations = [
  {
    name: "All categories",
    key: "categories",
  },
  {
    name: "Markets",
    key: "markets",
  },
  {
    name: "Applications",
    key: "applications",
  },
  {
    name: "Finance",
    key: "finance",
  },
];
</script>
