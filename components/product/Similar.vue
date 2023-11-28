<template>
    <div class="container">
      <div class="bg-white darks:bg-gray-800 rounded-[20px] py-5 px-4 md:px-[32px] mb-[30px]">
        <div
          data-aos="fade-up"
          data-aos-once="true"
          class="flex justify-between items-center mb-6"
        >
          <h2 class="text-base lg:text-xl font-bold text-[#222] darks:text-white">Similar products you might like</h2>
          
        </div>
        <div data-aos="fade-up" data-aos-once="true">
          <carousel
            :items-to-show="4.9"
            :breakpoints="breakpoints"
            class="recommended"
          >
            <slide v-for="slide in content" :key="slide">
              <div class="bg-white darks:bg-gray-800 w-full">
                <div
                  class="h-[185px] bg-gray-200 bg-cover bg-center rounded-[10px] overflow-hidden"
                  :style="{ backgroundImage: `url('${slide.img}')` }"
                ></div>
                <div class="py-[20px] text-left">
                  <span
                    class="text-sm md:text-base block mb-[8px] font-bold darks:text-white truncate max-w-max"
                    >{{ slide.title }}</span
                  >
                  <span
                    class="block mb-[25px] text-xs md:text-sm truncate max-w-max text-[#666] darks:text-white/80 text-left"
                    >{{ slide.company }}</span
                  >
  
                  <div class="flex justify-between items-center">
                    <span class="text-base flex gap-x-1 items-center"
                      ><span class="text-xs md:text-sm xl:text-base text-[#666] darks:text-white/80"
                        >From</span
                      >
  
                      <span
                        class="font-bold ml-[2px] text-base xl:text-xl text-[#333] darks:text-white"
                        >{{ currencyFormat(slide.newprice) }}/kg</span
                      ></span
                    >
  
                    <span><AppIcon icon="ph:heart" class="darks:text-white" /></span>
                  </div>
                </div>
              </div>
            </slide>
            <template #addons>
              <navigation />
            </template>
          </carousel>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import "vue3-carousel/dist/carousel.css";
  import { Carousel, Slide, Navigation } from "vue3-carousel";
  
  defineProps({
    title: {
      type: String,
      default: "Hot deals",
    },
    content: {
      type: Array,
      default: [],
    },
  });
  const imageSrc = "/images/test.png";
  const breakpoints = {
    300: {
      itemsToShow: 1.6,
      snapAlign: "center",
    },
    565: {
      itemsToShow: 2.6,
      snapAlign: "center",
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
  <style>
  .carousel__next {
    color: #165ef0;
    background-color: white;
    border-radius: 50em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  </style>
  