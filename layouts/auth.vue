<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 h-screen w-screen">
    <div
      class="bg-cover bg-center relative hidden lg:inline-block"
      :style="{ backgroundImage: `url('${AuthBg}')` }"
    >
      <div class="top-10 left-10 logo absolute z-10">
        <NuxtLink to="/">
          <img
            src="~/assets/images/logo-white.png"
            width="100"
            height="26"
            alt="Matta"
            class="w-[100px] h-auto"
        /></NuxtLink>
      </div>
      <!-- Overlay -->
      <div class="absolute inset-0 bg-[rgba(3,14,46,0.85)]"></div>

      <!-- assets/images/banner.pngContent in the banner -->
      <div
        class="absolute inset-0 flex items-center justify-center text-white text-left container"
      >
        <div class="px-16">
          <div class="max-w-[625px] mb-10 mx-auto">
            <h1
              class="text-4xl leading-10 2xl:text-5xl font-bold mb-6 2xl:leading-[62px]"
            >
              Sell your chemicals, raw materials and finished goods easily on
              Matta.
            </h1>
            <p class="text-base xl:text-xl">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white dark:bg-gray-800 container px-6 pb-10 flex flex-col">
      <div class="pt-10 z-10 lg:hidden">
        <NuxtLink to="/">
          <img
            src="~/assets/images/logo-white.png"
            width="100"
            height="26"
            alt="Matta"
            class="w-[100px] h-auto"
        /></NuxtLink>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import AuthBg from "~/assets/images/authbg.png";
</script>
