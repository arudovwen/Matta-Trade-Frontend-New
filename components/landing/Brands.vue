<template>
  <div class="py-10 container">
    <h2
      data-aos="fade-up"
      data-aos-once="true"
      class="text-xl font-semibold mb-10 text-center dark:text-white/80"
    >
      Supplies from brands you can trust
    </h2>

    <div class="grid grid-cols-3 lg:grid-cols-6 gap-6 justify-between items-center grayscale">
      <img
        data-aos="fade-up"
        data-aos-once="true"
        v-for="n in brands"
        :src="n"
        :alt="n"
        width="40"
        height="40"
        class="mb-1 mx-auto w-auto h-auto"
      />
    </div>
  </div>
</template>

<script setup>
import Brand1 from "~/assets/images/brand1.svg";
import Brand2 from "~/assets/images/brand2.svg";
import Brand3 from "~/assets/images/brand3.svg";
import Brand4 from "~/assets/images/brand4.svg";
import Brand5 from "~/assets/images/brand5.svg";
import Brand6 from "~/assets/images/brand6.svg";
const brands = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand6];
</script>
