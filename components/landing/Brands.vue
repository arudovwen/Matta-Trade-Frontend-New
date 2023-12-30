<template>
  <div class="py-10 container hidden lg:block">
    <h2
      data-aos="fade-up"
      data-aos-once="true"
      class="text-xl font-semibold mb-10 text-center darks:text-white/80"
    >
    Trusted by Leading Global Customers & Suppliers

    </h2>

    <div class="grid grid-cols-3 lg:grid-cols-6 gap-6 justify-between items-center">
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
import Brand1 from "~/assets/images/coke.png";
import Brand2 from "~/assets/images/cormart.png";
import Brand3 from "~/assets/images/honywell.png";
import Brand4 from "~/assets/images/basf.png";
import Brand5 from "~/assets/images/liquide.png";
import Brand6 from "~/assets/images/cargill.svg";
const brands = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand6];
</script>
