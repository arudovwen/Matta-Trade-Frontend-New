<template>
  <div class="py-10 container">
    <h2 class="text-xl font-semibold mb-10 text-center">
      Supplies from brands you can trust
    </h2>

    <div class="flex gap-x-4 justify-between items-center grayscale">
      <img
        v-for="n in brands"
        :src="n"
        :alt="nn"
        width="40"
        height="40"
        class="mb-1 mx-auto w-auto h-auto"
      />
    </div>
  </div>
</template>

<script setup>
import Brand1 from "~/assets/images/brand1.svg"
import Brand2 from "~/assets/images/brand2.svg"
import Brand3 from "~/assets/images/brand3.svg"
import Brand4 from "~/assets/images/brand4.svg"
import Brand5 from "~/assets/images/brand5.svg"
import Brand6 from "~/assets/images/brand6.svg"
const brands = [Brand1,Brand2,Brand3,Brand4,Brand5,Brand6];
</script>
