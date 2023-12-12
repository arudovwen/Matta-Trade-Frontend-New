<template>
  <section class="min-h-screen flex flex-col p-3 md:p-3 bg-[#E7EBEE] gap-y-2">
    <BackBanner />
    <div class="flex-1 flex flex-col gap-y-6">
      <div class="">
        <TopBanner />
      </div>
      <div class="grid grid-cols-4 rounded-lg pb-14 gap-x-4">
        <div class="col-span-3">
          <div class=""><ProductContent /></div>
        </div>
        <div class="col-span-1">
          <SideContent />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import TopBanner from "./TopBanner";
import SideContent from "./SideContent";
import ProductContent from "./ProductContent";
import BackBanner from "./BackBanner";
import { inject, provide, computed } from "vue";

const product = inject(["form"]);

const defaultPackage = computed(() => {
  if (!product) return null;
  if (!product.packagesAvailable) return null;
  return product && product.packagesAvailable
    ? product.packagesAvailable[0]
    : null;
});
provide("defaultPackage", defaultPackage);
</script>
<style lang=""></style>
