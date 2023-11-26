<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 h-screen w-screen bg-cover bg-center " :style="{ backgroundImage: `url('${AuthBg}')` }">
    <div
      class="relative hidden lg:flex items-center lg:col-span-7 bg-[rgba(3,14,46,0.85)]"
      
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
      
      <div
        class="flex items-center text-white text-left container"
      >
        <div class="px-10">
          <div class="max-w-[600px] 2xl:max-w-[700px] mb-10">
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
    <div class="bg-white px-6 flex flex-col lg:col-span-5 lg:justify-center h-full overflow-y-auto">
      <div class="pt-6 pb-2 z-10 lg:hidden">
        <NuxtLink to="/">
          <img
            src="~/assets/images/logo.png"
            width="100"
            height="26"
            alt="Matta"
            class="w-[100px] h-auto z-10"
        /></NuxtLink>
      </div>
   <div class="flex-1 flex flex-col justify-center">
    <slot />
   </div>
    </div>
  </div>
</template>

<script setup>
import AuthBg from "~/assets/images/authbg.png";
</script>
