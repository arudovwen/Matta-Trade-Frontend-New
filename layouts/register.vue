<template>
  <div
    class="h-screen w-screen bg-cover bg-center relative flex justify-center items-center flex-col py-0 sm:py-6 sm:px-6 lg:px-10"
    :style="{ backgroundImage: `url('${AuthBg}')` }"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-[rgba(3,14,46,0.85)]"></div>
    <div class="max-w-[1600px] mx-auto w-full h-full z-10 flex flex-col gap-y-6">
        <div class="z-10 hidden lg:flex justify-between w-full lg:px-5">
      <NuxtLink to="/">
        <img
          src="~/assets/images/logo-white.png"
          width="100"
          height="26"
          alt="Matta"
          class="w-[100px] h-auto"
      /></NuxtLink>
      <span
        class="hidden lg:flex items-center text-center text-sm text-white/80 gap-x-1 justify-center"
      >
        Not a vendor?
        <NuxtLink to="/auth/register" class="font-semibold text-white"
          >Click here</NuxtLink
        >
      </span>
    </div>
    <div
      class="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 z-[100] h-full lg:h-auto gap-x-8 lg:px-5"
    >
      <div class="relative hidden lg:inline-block h-full">
        <!-- assets/images/banner.pngContent in the banner -->
        <div
          class="flex items-center justify-start text-white text-left h-full"
        >
          <div class="">
            <div class="max-w-[520px] mb-10 mx-auto">
              <h1 class="text-4xl font-bold mb-10 leading-[46px]">
                Sell your chemicals, raw materials and finished goods easily on
                Matta.
              </h1>
              <div class="grid gap-y-7">
                <div
                  v-for="n in content"
                  :key="n.title"
                  class="flex items-start gap-x-6"
                >
                  <div class="w-20 mt-1">
                    <img :src="n.icon" :alt="n.title" class="w-auto" />
                  </div>
                  <div>
                    <p class="text-lg font-bold text-white mb-1">
                      {{ n.title }}
                    </p>
                    <p class="text-sm text-white">
                      Amet minim mollit non deserunt ullamco est sit aliqua
                      dolor do amet sint. Velit officia consequat duis enim
                      velit mollit. Exercitation veniam consequat sunt nostrud
                      amet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center lg:justify-end">
        <div
          class="w-full h-full lg:ml-auto bg-white dark:bg-gray-800 px-8 lg:px-10 pt-12 pb-10 flex flex-col max-w-[600px] sm:rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] sm:max-h-[80vh] overflow-y-auto no-scrollbar"
        >
          <div class="z-10 lg:hidden mb-14 max-h-max">
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
    </div>
    </div>
  </div>
</template>

<script setup>
import AuthBg from "~/assets/images/vendimg.png";
import Earth from "~/assets/images/earth-africa.svg";
import Code from "~/assets/images/code.svg";
import Group from "~/assets/images/users.svg";

const content = [
  {
    title: "Strong coverage across Africa",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    icon: Earth,
  },
  {
    title: "Keep track of your customers",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    icon: Group,
  },
  {
    title: "Integrate seemlessly with our embedded APIs",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    icon: Code,
  },
];
</script>
