<template>
    <div class="">
      <div class="bg-white darks:bg-gray-800 rounded-[20px] py-5 px-5 md:px-[32px] lg:mb-[30px]">
        <div
          
          class="flex justify-between items-center mb-6"
        >
          <h2 class="text-xs sm:text-base lg:text-xl font-bold text-[#222] darks:text-white">Similar products you might like</h2>
          
        </div>
        <div>
          <carousel
          :items-to-show="4.9"
          :breakpoints="breakpoints"
          class="recommended"
        >
          <slide v-for="slide in productsData.slice(0, 8)" :key="slide">
            <div class="bg-white darks:bg-gray-800 w-full">
              <div
                class="h-[77px] sm:h-[130px] xl:h-[185px] bg-gray-200 bg-cover bg-center rounded-[10px] overflow-hidden"
                :style="{ backgroundImage: `url('${slide.img}')` }"
              ></div>
              <div class="pt-[20px] pb-4 xl:pb-[20px] text-left">
                <span
                  class="text-[10px] sm:text-sm xl:text-base block mb-2 sm:mb-[10px] font-bold darks:text-white truncate max-w-max"
                  >{{ slide.title }}</span
                >
                <span
                  class="block mb-4 sm:mb-[25px] text-[10px] sm:text-xs lg:text-sm truncate max-w-max text-[#666] darks:text-white/80 text-left"
                  >{{ slide.company }}</span
                >

                <div class="flex justify-between items-center">
                  <span class="text-base flex gap-x-1 items-center">
                    <span
                      class="font-bold ml-[2px] text-xs sm:text-sm xl:text-xl text-[#333] darks:text-white"
                      >{{ currencyFormat(slide.newprice) }}/kg</span
                    ></span
                  >

                  <!-- <span><AppIcon icon="ph:heart" class="darks:text-white" /></span> -->
                </div>
              </div>
            </div>
          </slide>
          <template #addons>
            <div class="hidden xl:inline-block">
              <navigation />
            </div>
          </template>
        </carousel>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import "vue3-carousel/dist/carousel.css";
  import { Carousel, Slide, Navigation } from "vue3-carousel";
  import { useProductStore } from "@/stores/products";
import { getProducts } from "~/services/productservices";

const store = useProductStore();
const { productsData, loading } = storeToRefs(store);
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

  function getAllProducts() {
  store.setLoader(true);
  getProducts({ PageNumber: 1, PageSize: 8 })
    .then((res) => {
      if (res.status === 200) {
        store.setProducts(res.data.data);
        store.setLoader(false);
      }
    })
    .catch(() => {
      setLoader(false);
    });
}

onMounted(() => {
  getAllProducts()
})
  </script>
  <style>
  .carousel__next {
    color: #165ef0;
    background-color: white;
    border-radius: 50em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  </style>
  