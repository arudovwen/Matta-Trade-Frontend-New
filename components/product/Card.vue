<template>
  <NuxtLink
    :to="`/product/${encodeURIComponent(detail.title)}${
      route?.params?.title ? `/${encodeURIComponent(route?.params?.title)}` : ''
    }/${detail?.id}?categoryId=${route?.params?.id ? route?.params?.id : ''}`"
    class="w-full"
  >
    <div
      class="min-w-[130px] sm:min-w-[160px] md:min-w-[200px] bg-white darks:bg-gray-800 rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] darks:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] overflow-hidden"
    >
      <div
        class="w-full h-[90px] sm:h-[120px] lg:h-[140px] xl:h-[160px] bg-gray-200 bg-cover bg-center relative"
      >
        <span
          class="absolute h-5 sm:h-[30px] w-5 sm:w-[30px] rounded-full right-[10px] top-[10px] bg-white/70 flex items-center justify-center"
          ><AppIcon
            :icon="!detail.liked ? 'ph:heart' : 'ph:heart-fill'"
            class="text-xs sm:text-sm md:text-base darks:text-white"
        /></span>
        <NuxtImg
          v-if="detail.converPhoto"
          :src="detail.converPhoto"
          alt="image"
          width="276"
          height="160"
          class="w-full h-full object-cover"
          fit="cover"
          loading="lazy"
          crossorigin
        />
        <div
          v-else
          class="w-full h-full bg-gray-200 bg-cover bg-center relative"
        ></div>
      </div>
      <div class="w-full py-3 md:py-5 px-3 xl:px-5">
        <span
          class="block mb-1 font-medium truncate max-w-max text-[12px] sm:text-sm xl:text-base darks:text-white leading-tight"
          >{{ detail.title }}</span
        >
        <span
          class="block mb-[14px] sm:mb-[25px] text-[10px] sm:text-[12px] xl:text-sm truncate max-w-max text-[#666] darks:text-white/80 leading-tight"
          >{{ detail.manufacturer }}</span
        >

        <div class="flex justify-between items-start md:items-center">
          <span
            v-if="detail.type === 'request'"
            class="font-semibold text-[12px] sm:text-sm xl:text-base text-[#2176FF] leading-tight"
            >Request Quote</span
          >
          <span
            class="text-base flex flex-col md:flex-row gap-x-1 md:items-center"
            v-else
          >
            <!-- <span class="text-xs md:text-base text-[#666] darks:text-white/80"
              >From</span
            > -->
            <span class="gap-x-1 flex items-center">
              <span
                v-if="detail.oldprice"
                class="line-through text-[#666] darks:text-white/80 text-[12px] sm:text-sm xl:text-base font-semibold leading-tight"
                >{{ currencyFormat(detail.oldprice) }}/{{ detail.unit }}</span
              >
              <span
                class="font-bold ml-[2px] text-[12px] sm:text-sm xl:text-base text-[#333] darks:text-white leading-tight"
                >{{ currencyFormat(detail.price) }}/{{ detail.unit }}</span
              ></span
            >
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
defineProps(["index", "detail"]);
const route = useRoute();
</script>
