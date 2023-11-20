<template>
  <div class="bg-[#061C5E] max-w-[1440px] mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-y-0">
      <div class="py-10 lg:py-20 pl-[15px] pr-[15px] lg:pr-[0px] lg:pl-20">
        <p
          data-aos="fade-up"
          data-aos-once="true"
          class="font-bold text-[#F1F4FE] text-3xl xl:text-5xl xl:leading-[58px] mb-[37px]"
        >
          From raw materials to finished products and everything in-between.
        </p>
        <AppButton
          data-aos="fade-up"
          data-aos-once="true"
          text="Start selling on Matta"
          btnClass="bg-white text-[#333] !px-10"
        />
      </div>
      <div
        data-aos="fade-in"
        data-aos-once="true"
        class="bg-cover bg-center hidden lg:inline-block"
        :style="{ backgroundImage: `url('${CallBg}')` }"
      ></div>
     
    </div>
  </div>
</template>
<script setup>
import CallBg from "~/assets/images/callbg.png";
</script>
