<template>
  <div
    class="h-screen w-screen grid grid-cols-1 lg:grid-cols-11 bg-cover bg-center relative"
    :style="{ backgroundImage: `url('${AuthBg}')` }"
  >
    <div
      class="bg-[rgba(3,14,46,0.85)] h-full hidden lg:flex flex-col px-10 py-8 gap-y-8 lg:col-span-6"
    >
      <div class="flex justify-between">
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

      <div class="relative flex-1 flex flex-col justify-center">
        <div class="max-w-[520px] w-full">
          <h1 class="text-4xl font-bold mb-10 leading-[46px] text-white">
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
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center p-8 bg-white lg:col-span-5  h-full overflow-y-auto">
      <div class="w-full h-full bg-white flex flex-col">
        <div class="z-10 lg:hidden mb-14 max-h-max">
          <NuxtLink to="/">
            <img
              src="~/assets/images/logo.png"
              width="100"
              height="26"
              alt="Matta"
              class="w-[100px] h-auto"
          /></NuxtLink>
        </div>
     <div class="flex-1 flex flex-col justify-center">
      <slot />
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
