<template>
  <div class="container mb-[30px]">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold ttext-[#222]">Hot deals</h2>
      <button class="border-b text-[19px] border-[#333] leading-tight">
        See all items
      </button>
    </div>
    <div class="grid grid-cols-4 gap-x-8">
      <ProductCard v-for="n in 4" :key="n" :index="n" imageSrc="/images/test.png" />
    </div>
  </div>
</template>
