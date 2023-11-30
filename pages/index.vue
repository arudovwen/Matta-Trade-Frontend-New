<template>
  <div class="min-h-screen mx-auto">
    <LandingBanner />

    <div class="bg-[#F4F4F4] darks:bg-gray-700 pt-8 sm:pt-[60px] pb-10">
      <div class="hidden lg:block">
        <LandingBoard />
      </div>
      <div class="pb-8 xl:pb-[70px]">
        <LandingHot :content="hotDeals" />
        <div class="lg:hidden">
          <LandingBoard />
        </div>
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
<script setup></script>
