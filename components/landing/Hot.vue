<template>
  <div class="container mb-[30px]" v-if="content.length">
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
      <router-link :to="`/market/${encodeURIComponent(title)}?tag=${tag}`">
        <button
          class="hover:border-b text-[10px] sm:text-sm lg:text-base border-[#333] darks:text-white darks:border-white leading-tight"
        >
          See all items
        </button>
      </router-link>
    </div>
    <div
      class="flex xl:grid grid-cols-2 lg:grid-cols-4  xl:grid-cols-5 gap-y-8 gap-x-4 md:gap-x-6 overflow-x-auto pb-6"
    >
      <ProductCard
        data-aos="fade-up"
        data-aos-once="true"
        v-for="(n, idx) in content.slice(0, 5)"
        :key="idx"
        :index="idx"
        :detail="n"
      />
    </div>
    <!-- <div class="flex overflow-x-auto gap-x-4 lg:hidden">
      <div v-for="(n, idx) in content.slice(0, 6)" :key="idx">
        <ProductCard :index="idx" :detail="n" />
      </div>
    </div> -->
  </div>
</template>
<script setup>
import { getProductsByTag } from "~/services/productservices";

const props = defineProps({
  title: {
    type: String,
    default: "Hot deals",
  },
  tag: {
    type: String,
    default: "hotdeals",
  },
});
const content = ref([]);
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
  getProductsByTag({ PageNumber: 1, PageSize: 8, tag: props.tag })
    .then((res) => {
      if (res.status === 200) {
   
        content.value = res.data.data.data;
      }
    })
    .catch(() => {
      setLoader(false);
    });
}

onMounted(() => {
  getAllProducts();
});
</script>
