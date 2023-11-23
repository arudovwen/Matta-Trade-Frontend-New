<template>
  <div class="container mb-[30px]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-base lg:text-xl font-bold ttext-[#222] dark:text-white">{{ title }}</h2>
      <button class="border-b text-sm lg:text-base border-[#333] dark:text-white dark:border-white leading-tight">
        See all items
      </button>
    </div>
    <div
      class="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-6 xl:gap-x-8"
    >
      <ProductCard
        data-aos="fade-up"
        data-aos-once="true"
        v-for="(n,idx) in content"
        :key="idx"
        :index="idx"
        :detail="n"
       
      />
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: "Hot deals",
  },
  content: {
    type: Array,
    default: []
  }
});
</script>
