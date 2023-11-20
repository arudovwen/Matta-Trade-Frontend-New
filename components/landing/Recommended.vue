<template>
  <div class="container bg-white rounded-[20px] py-5 px-[32px] mb-[30px]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-[#222]">Reccomended</h2>
      <button class="font-medium">View more</button>
    </div>
    <div>
      <carousel :items-to-show="4.9">
        <slide v-for="slide in 10" :key="slide">
          <div class="bg-white w-full">
            <div
              class="h-[185px] bg-gray-200 bg-cover bg-center rounded-[10px] overflow-hidden"
              :style="{ backgroundImage: `url('${imageSrc}')` }"
            ></div>
            <div class="py-[20px]  text-left">
              <span class="block mb-[6px] font-bold truncate max-w-max"
                >Name</span
              >
              <span class="block mb-[19px] text-sm text-[#666] text-left"
                >SubName</span
              >

              <div class="flex justify-between items-center">
                <span class="text-base flex gap-x-1 items-center"
                  ><span class="text-base text-[#666]">From</span>

                  <span class="font-bold ml-[2px] text-xl text-[#333]"
                    >2,235/kg</span
                  ></span
                >

                <span><AppIcon icon="ph:heart" /></span>
              </div>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const imageSrc = "/images/test.png";
</script>
