<template>
  <div class="bg-[#061C5E] max-w-[1440px] mx-auto">
    <div class="grid grid-cols-2">
      <div class="py-20 pl-20">
        <p class="font-bold text-[#F1F4FE] text-5xl leading-[58px] mb-[37px]">
          From raw materials to finished products and everything in-between.
        </p>
        <AppButton
          text="Start selling on Matta"
          btnClass="bg-white text-[#333] !px-10"
        />
      </div>
      <div
        class="bg-cover bg-center"
        :style="{ backgroundImage: `url('${CallBg}')` }"
      ></div>
      <div></div>
    </div>
  </div>
</template>
<script setup>
import CallBg from "~/assets/images/callbg.png";
</script>
