<template>
  <div
    class="container relative mt-10 md:helpersmt-[72px] pb-[100px] md:pb-[120px] pr-4"
  >
    <div
      class="inline absolute md:h-[358px] w-[80%] md:w-[95%] rounded-[7px] bg-[rgba(198,226,250,0.3)] z-[1] top-8 left-6 max-w-[1152px]"
    ></div>
    <div
      class="inline absolute md:h-[358px] w-[80%] md:w-[95%] rounded-[7px] bg-[#C6E2FA] z-[2] top-4 left-10 max-w-[1152px]"
    ></div>
    <div
      class="rounded-[6px] md:h-[358px] bg-[linear-gradient(104deg,#2072FF_0%,#0451E5_100%)] pt-10 md:pt-[94px] pb-8 md:pb-[88px] relative h-full z-[3] w-full max-w-[1152px] mx-auto"
    >
      <div class="max-w-[937px] mx-auto text-center">
        <carousel class="max-w-[937px] mx-auto text-center testimonial">
          <slide v-for="slide in 4" :key="slide">
            <div class="carousel__item px-5">
              <p class="text-base lg:text-2xl text-white font-normal mb-8">
                “Ever since we discovered Matta, our production process has been
                more streamlined. From sourcing for materials, to logistics and
                delivery. Matta handles all aspects with exemplary proficiency
                and professionalism”
              </p>
              <p
                class="font-light text-xs md:text-sm xl:text-xl text-white mb-8"
              >
                James Orji - CEO, Mudally Nig. Ltd.
              </p>
            </div>
          </slide>
          <template #addons>
            <Pagination />
          </template>
        </carousel>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Carousel, Slide, Pagination } from "vue3-carousel";
</script>

<style lang="scss">
.testimonial {
  .carousel__pagination-button::after {
    background-color: rgba(217, 217, 217, 0.5);
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }
  .carousel__pagination-button--active::after,
  .carousel__pagination-button:hover::after {
    background-color: rgba(217, 217, 217);
  }
  .carousel__item {
    min-height: 200px;
    width: 100%;
  }
}
</style>
