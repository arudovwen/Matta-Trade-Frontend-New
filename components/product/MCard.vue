<template>
  <NuxtLink
    :to="`/product/${encodeURIComponent(detail.title)}/${encodeURIComponent(
      detail.category
    )}/${detail.id}`"
  >
    <div
      class="bg-white darks:bg-gray-800 rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] darks:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] overflow-hidden"
    >
      <div
        class="h-[120px] md:h-[150px] bg-gray-200 bg-cover bg-center"
        :style="{ backgroundImage: `url('${detail.img}')` }"
      ></div>
      <div class="py-4 md:py-5 px-4 md:px-5">
        <span
          class="block mb-[10px] font-bold truncate max-w-max text-[13px] md:text-sm darks:text-white"
          >{{ detail.title }}</span
        >
        <span
          class="block mb-[30px] text-[11px] md:text-xs truncate max-w-max text-[#666] darks:text-white/80"
          >{{ detail.company }}</span
        >

        <div class="flex justify-between items-start md:items-center">
          <span
            v-if="detail.type === 'request'"
            class="font-semibold text-[13px] md:text-sm text-[#2176FF]"
            >Request Quote</span
          >
          <span
            class="text-base flex flex-col md:flex-row gap-x-1 md:items-center"
            v-else
            ><span
              class="text-[11px] md:text-xs text-[#666] darks:text-white/80"
              >From</span
            >
            <span class="gap-x-1 flex items-center">
              <span
                v-if="detail.oldprice"
                class="line-through text-[#666] darks:text-white/80 text-[13px] md:text-base font-semibold"
                >{{ currencyFormat(detail.oldprice) }}/kg</span
              >
              <span
                class="font-bold ml-[2px] text-[13px] md:text-base text-[#333] darks:text-white"
                >{{ currencyFormat(detail.newprice) }}/kg</span
              ></span
            >
          </span>

          <span
            ><AppIcon
              icon="ph:heart"
              class="text-sm md:text-base darks:text-white"
          /></span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
defineProps(["index", "detail"]);
</script>
