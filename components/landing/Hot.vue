<template>
  <div class="container mb-[30px]">
    <div
      data-aos="fade-up"
      data-aos-once="true"
      class="flex justify-between items-center mb-4"
    >
      <h2
        class="text-xs sm:text-base lg:text-xl font-bold ttext-[#222] darks:text-white"
      >
        {{ title }}
      </h2>
      <router-link :to="`/market/${encodeURIComponent(title)}`">
        <button
        class="hover:border-b text-[10px] sm:text-sm lg:text-base border-[#333] darks:text-white darks:border-white leading-tight"
      >
        See all items
      </button>
      </router-link>
    </div>
    <div
      class="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-6 xl:gap-x-8"
    >
      <ProductCard
        data-aos="fade-up"
        data-aos-once="true"
        v-for="(n, idx) in productsData.slice(0,4)"
        :key="idx"
        :index="idx"
        :detail="n"
      />
    </div>
    <div class="lg:hidden">
      <carousel
        :items-to-show="4.9"
        :breakpoints="breakpoints"
        class="recommended"
      >
        <slide v-for="(n, idx) in productsData.slice(0,3)" :key="idx">
          <ProductCard :index="idx" :detail="n" />
        </slide>
        <template #addons>
          <div class="hidden lg:inline-block">
            <navigation />
          </div>
        </template>
      </carousel>
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

const breakpoints = {
  300: {
    itemsToShow: 2.4,
    snapAlign: "start",
  },
  565: {
    itemsToShow: 2.6,
    snapAlign: "start",
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
