<template>
  <div
    class="bg-white rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] overflow-hidden"
  >
    <div
      class="h-[120px] md:h-[200px] bg-gray-200 bg-cover bg-center"
      :style="{ backgroundImage: `url('${detail.img}')` }"
    ></div>
    <div class="py-4 md:py-5 px-4 md:px-5">
      <span
        class="block mb-[10px] font-bold truncate max-w-max text-sm md:text-base"
        >{{ detail.title }}</span
      >
      <span class="block mb-[25px] text-xs md:text-sm text-[#666]">{{
        detail.company
      }}</span>

      <div class="flex justify-between items-start md:items-center">
        <span
          v-if="detail.type === 'request'"
          class="font-semibold text-[13px] md:text-base text-[#2176FF]"
          >Request Quote</span
        >
        <span
          class="text-base flex flex-col md:flex-row gap-x-1 md:items-center"
          v-else
          ><span class="text-xs md:text-base text-[#666]">From</span>
          <span class="gap-x-1 flex items-center">
            <span
              v-if="detail.oldprice"
              class="line-through text-[#666] text-[13px] md:text-base font-semibold"
              >{{ (currencyFormat(detail.oldprice)) }}/kg</span
            >
            <span
              class="font-bold ml-[2px] text-[13px] md:text-base text-[#333]"
              >{{ currencyFormat(detail.newprice) }}/kg</span
            ></span
          >
        </span>

        <span><AppIcon icon="ph:heart" class="text-sm md:text-base" /></span>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps(["index", "detail"]);
</script>
