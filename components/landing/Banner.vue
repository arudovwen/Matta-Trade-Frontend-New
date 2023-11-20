<template>
  <div class="relative w-full">
    <div
      class="bg-cover bg-center min-h-[600px] lg:min-h-64 md:min-h-[600px]"
      :style="{ backgroundImage: `url('${imageSrc}')` }"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-[rgba(0,0,0,0.72)]"></div>

      <!-- assets/images/banner.pngContent in the banner -->
      <div
        class="absolute inset-0 flex items-center justify-start text-white text-left container"
      >
        <div>
          <div class="max-w-[761px] mb-10">
            <h1 class="text-4xl md:text-5xl lg:text-[56px] font-bold mb-6">
              Discover and buy chemicals and raw materials all in one place.
            </h1>
            <p class="text-lg md:text-xl lg:text-2xl">
              Search, Compare, Sample, Quote, Supply, and Purchase Chemicals and
              Raw Materials
            </p>
          </div>
          <div class="max-w-[786px]">
            <div
              class="relative flex p-1 w-full bg-white rounded-[5px] items-center mb-8"
            >
              <input
                placeholder="Search by product name or supplier"
                class="px-6 flex-1 h-9 placeholder:text-[rgba(156, 163, 175, 1)] outline-none text-[#333]"
              />
              <AppButton
                text="Search"
                btnClass="!px-10 btn-primary hidden md:flex"
              />
              <AppButton
                icon="iconamoon:search-thin"
                btnClass="!px-4 btn-primary md:hidden"
              />
            </div>

            <div class="flex gap-2 items-center flex-wrap">
              <span class="whitespace-nowrap">Frequently searched: </span>
              <span class="flex gap-x-2 items-center flex-wrap">
                <span
                  v-for="i in frequentlySearched"
                  :key="i.name"
                  class="text-white border border-white rounded-full text-sm py-[5px] px-[10px]"
                  >{{ i.name }}</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const imageSrc = "/images/banner.png";
const frequentlySearched = [
  {
    name: "Ammonia Liquor",
  },
  {
    name: "Hydrogenated Oil",
  },
  {
    name: "Caustic Soda",
  },
];
</script>

<style scoped>
/* Add any custom styling or adjustments here */
</style>
