<template>
  <div class="bg-[#292D35]">
    <div
      class="container py-[35px] flex flex-col lg:flex-row items-end justify-between"
    >
      <div>
        <Breadcrumbs :links="links" />
        <h1 class="text-white text-[32px] font-bold mb-[10px] mt-9 capitalize">
          {{ title }}
        </h1>
        <p class="text-base text-white mb-4 lg:mb-0">
          We found {{ total }} Products” matching your search criteria
        </p>
      </div>
      <Select
        :options="options"
        placeholder="Sort prices by"
        classInput="min-w-[180px] !bg-white !border-[#B9C0D4] !rounded-[4px] !text-[#5D6B98] !h-11 cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/products";

const store = useProductStore();
const { total } = storeToRefs(store);

const router = useRoute();
const { title, id } = router.params;

const links = [
  {
    title: "home",
    url: "/",
  },
  {
    title: title,
    url: "#",
  },
];
const options = [
  {
    label: "Low to high",
    value: "lh",
  },
];
</script>
