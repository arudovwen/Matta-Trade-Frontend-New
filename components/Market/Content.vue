<template>
  <div class="grid grid-cols-4 gap-x-4 gap-y-[30px]">
    <ProductMCard
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
