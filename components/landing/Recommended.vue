<template>
  <div class="container">
    <div class="bg-white rounded-[20px] py-5 px-[32px] mb-[30px]">
      <div
        data-aos="fade-up"
        data-aos-once="true"
        class="flex justify-between items-center mb-4"
      >
        <h2 class="text-base lg:text-xl font-bold text-[#222]">Reccomended</h2>
        <button class="text-sm lg:text-base font-medium">View more</button>
      </div>
      <div data-aos="fade-up" data-aos-once="true">
        <carousel :items-to-show="4.9" :breakpoints="breakpoints" class="recommended">
          <slide v-for="slide in 10" :key="slide">
            <div class="bg-white w-full">
              <div
                class="h-[185px] bg-gray-200 bg-cover bg-center rounded-[10px] overflow-hidden"
                :style="{ backgroundImage: `url('${imageSrc}')` }"
              ></div>
              <div class="py-[20px] text-left">
                <span
                  class="text-sm md:text-base block mb-[6px] font-bold truncate max-w-max"
                  >Name</span
                >
                <span
                  class="block mb-[19px] text-xs md:text-sm text-[#666] text-left"
                  >SubName</span
                >

                <div class="flex justify-between items-center">
                  <span class="text-base flex gap-x-1 items-center"
                    ><span class="text-xs md:text-sm xl:text-base text-[#666]">From</span>

                    <span
                      class="font-bold ml-[2px] text-base xl:text-xl text-[#333]"
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
  </div>
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";

const imageSrc = "/images/test.png";
const breakpoints = {
  300: {
    itemsToShow: 1.3,
    snapAlign:"start"
  },
  565: {
    itemsToShow: 2.3,
    snapAlign:"start"
  },
  // 700px and up
  700: {
    itemsToShow: 3.9,
  },
  // 1024 and up
  1280: {
    itemsToShow: 4.9,
  },
};
</script>
