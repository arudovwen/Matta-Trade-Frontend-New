<template>
  <div class="">
    <div class="container pt-[35px] flex flex-col">
      <div class="mb-5">
        <Breadcrumbs :links="links" />
      </div>
      <div class="bg-gray-400 rounded-[5px]">
        <div class="h-[160px] md:h-[210px] w-full "> <NuxtImg src="/images/amosban.png" class="w-full h-full rounded-t-[5px]" /></div>
       <div class="flex justify-between px-10 pt-[50px]  pb-7 items-center bg-white rounded-[5px] relative">
        <div class="absolute w-20 h-20 rounded-[5px] overflow-hidden left-10 bg-white top-0 translate-y-[-60%]">
          <NuxtImg src="/images/amos.png" class="w-full h-full" />
        </div>
        <div>
          <h1
            class="text-[#202939] text-xl font-bold capitalize mb-1"
          >
          Amos Best Enterprises
          </h1>
          <p class="text-sm text-[#364152] font-medium">
           {{ total }} Products
          </p>
        </div>
        <div class="hidden md:flex">
          <Select
            v-model.number="query.sortOrder"
            :options="options"
            placeholder="Sort prices by"
            classInput="min-w-[180px] !bg-white !border-[#B9C0D4] !rounded-[4px] !text-[#5D6B98] !h-11 cursor-pointer"
          />
        </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "~/stores/products";
const query = inject("query");
const store = useProductStore();
const { total } = storeToRefs(store);

const router = useRoute();
const { vendor, id } = router.params;

const links = [
{
    title: "Home",
    url: "/",
  },
  {
    title: "Dashboard",
    url: "/overview",
  },
  {
    title: "Storefront",
    url: "#",
  },
  {
    title: vendor,
    url: "#",
  },
];
const options = [
{
    label: "Default",
    value: "",
  },
  {
    label: "Low to High",
    value: 0,
  },
  {
    label: "High to Low",
    value: 1,
  },
];
</script>
