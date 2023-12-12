<template>
  <div v-if="!loading">
    <div
      class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px]"
      v-if="productsData.length"
    >
      <ProductCard
        v-for="(n, idx) in productsData"
        :key="idx"
        :index="idx"
        :detail="n"
      />
    </div>
    <EmptyData v-if="!productsData.length" />
  </div>
  <AppLoader v-if="loading" />
</template>
<script setup>
import { useProductStore } from "~/stores/products";

const store = useProductStore();
const { productsData, loading } = storeToRefs(store);
</script>
