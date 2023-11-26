<template>
  <div class="min-h-screen mx-auto">
    <LandingBanner />

    <div class="bg-[#F4F4F4] darks:bg-gray-700 pt-[60px] md:pb-10">
      <LandingBoard />
      <div class="pb-[70px]">
        <LandingHot :content="hotDeals" />
        <LandingRecommended :content="reccomended" />
        <LandingHot :content="bestSellers" title="Best sellers" />
      </div>
      <LandingInfo />
    </div>
    <LandingCategories />
    <LandingBrands />
    <LandingTestimonials />
    <LandingCall />
  </div>
</template>
<script setup>
import { hotDeals } from "~/utils/data";
</script>
