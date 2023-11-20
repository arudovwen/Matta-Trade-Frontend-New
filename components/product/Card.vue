<template>
  <div
    class="bg-white rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] max-w-[300px] overflow-hidden"
  >
    <div class="h-[200px] bg-gray-200 bg-cover bg-center" :style="{ backgroundImage: `url('${imageSrc}')` }"></div>
    <div class="py-[30px] px-5">
      <span class="block mb-[14px] font-bold truncate max-w-max">Name</span>
      <span class="block mb-[39px] text-sm text-[#666]">SubName</span>

      <div class="flex justify-between items-center">
        <span v-if="index == 1" class="font-semibold text-base text-[#2176FF]"
          >Request Quote</span
        >
        <span class="text-base flex gap-x-1 items-center" v-else
          ><span class="text-base text-[#666]">From</span>
          <span
            v-if="index == 2"
            class="line-through text-[#666] text-base font-semibold"
            >3,235/kg</span
          >
          <span class="font-bold ml-[2px] text-base text-[#333]"
            >2,235/kg</span
          ></span
        >

        <span><AppIcon icon="ph:heart" /></span>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps(["index", "imageSrc"]);
</script>
