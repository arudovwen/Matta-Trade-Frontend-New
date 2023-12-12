<template>
  <div class="flex items-center gap-x-3 mb-4 w-full">
    <div
      class="flex items-center bg-[#F1F3F5] rounded-lg relative w-[55%] pr-4"
    >
      <select
        v-if="product && product.packagesAvailable"
        v-model="selectedPackage"
        class="py-5 text-[13px] px-6 bg-transparent capitlize md:uppercase text-matta-black w-full"
      >
        <option value="">Select a package</option>
        <option :value="n" v-for="(n, i) in product.packagesAvailable" :key="i">
          {{ n.package ? `${n.package.title} ${n.size}  ${n.unit}` : "-" }}
        </option>
      </select>
    </div>
    <div class="flex gap-x-3 items-center w-[45%]">
      <div
        class="flex items-center justify-center gap-x-16 w-full lg:w-[250px] rounded-lg bg-[#F1F3F5] relative py-5 text-[13px] px-6 uppercase text-matta-black"
      >
        <button @click="counter--" :disabled="counter == 0">
          <i class="uil uil-minus"></i>
        </button>
        <span>{{ counter }}</span>
        <button @click="counter++"><i class="uil uil-plus"></i></button>
      </div>
      <button
        class="py-5 text-[13px] px-6 bg-matta-black hidden md:flex w-full justify-center text-white rounded-lg items-center hover:bg-matta-black/80 uppercase text-sm font-normal leading-[unset] gap-x-4"
      >
        <span>add to cart</span> <i class="uil uil-minus"></i>
        <span class="font-medium">{{ currencyFormat(totalAmount) }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { inject, computed, ref } from "vue";


const product = inject("product");
const selectedPackage = ref("");
const counter = ref(1);

const totalAmount = computed(() => {
  if (!selectedPackage.value) return 0;
  return Number(selectedPackage.value.amount) * counter.value;
});
</script>
