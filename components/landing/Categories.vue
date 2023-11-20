<template>
  <div>
    <div class="container py-20">
      <div class="flex justify-between mb-[90px]">
        <h1
          class="max-w-[633px] text-[#222] text-[49px] font-bold leading-[67.6px]"
        >
          Explore our wide range of offerings tailored to your business needs
        </h1>

        <div class="grid grid-cols-2 gap-5">
          <div
            class="px-5 border-l-4 border-[rgba(81,32,11,0.05)]"
            v-for="n in content"
            :key="n.text"
          >
            <span class="block font-bold text-[#2176FF] text-[44px]">{{
              n.title
            }}</span>
            <span class="block font-normal text-[#333] text-[20px]">{{
              n.text
            }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-8 gap-5">
        <span
          v-for="(n, idx) in categories"
          :key="idx"
          class="cursor-pointer px-5 flex flex-col w-[140px] h-[140px] border-2 border-[#EAEAEA] rounded-full items-center justify-center hover:border-[#777] hover:bg-[rgba(33,118,255,0.04)]"
        >
          <AppIcon :icon="n.icon" class="text-[40px] text-[#444444] mb-[6px]" />
          <span class="text-xs text-[#333] text-center">{{ n.title }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { categories } from "~/utils/data";
const content = [
  {
    title: "200M+",
    text: "Products",
  },
  {
    title: "200K+",
    text: "Suppliers",
  },
  {
    title: "5,900",
    text: "Product categories",
  },
  {
    title: "200+",
    text: "Countries and regions",
  },
];
</script>
