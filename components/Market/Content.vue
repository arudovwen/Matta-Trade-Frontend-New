<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px]">
    <ProductCard
      v-for="(n, idx) in market"
      :key="idx"
      :index="idx"
      :detail="n"
    />
  </div>
</template>
<script setup>
import { market } from "~/utils/data";
</script>
