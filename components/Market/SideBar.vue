<template>
  <div class="bg-white w-full pt-4 pb-2 rounded-[10px]">
    <div class="flex justify-between items-center pb-2 px-[15px]">
      <span class="text-sm font-semibold"> Filter</span>
      <span class="text-xs text-[#8D8D8D] cursor-pointer" as="button"
        >Clear filter</span
      >
    </div>
    <hr class="border-[#EFEFEF] my-2" />
    <MarketSideTab title="Producer" :lists="lists" />

    <hr class="border-[#EFEFEF] my-[1px]" />
    <MarketSideTab title="Applications" :lists="lists" />
  </div>
</template>
<script setup>
const lists = [
  {
    title: "Dazi Plastic",
    url: "",
  },
  {
    title: "Silver Fern Chemical",
    url: "",
  },
  {
    title: "Binsa",
    url: "",
  },
  {
    title: "Labchem",
    url: "",
  },
  {
    title: "ETIMINEUSA",
    url: "",
  },
  {
    title: "Cargill Incorporated",
    url: "",
  },
];
</script>
