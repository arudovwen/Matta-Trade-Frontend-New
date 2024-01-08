<template>
  <div class="container mb-6 sm:mb-10">
    <div
      data-aos="fade-up"
      data-aos-once="true"
      class="rounded-[10px] "
    >
      <NuxtLink to="/market/products">
        <NuxtImg  :nonce="nonce" src="https://res.cloudinary.com/arudovwen-me/image/upload/c_scale,h_238/f_webp/ctgfxohrfifietzzvhrh.jpg" alt="image" class="w-full  h-full object-contain rounded-[10px] bg-gray-300" />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
const nonce = useNonce()
const imageSrc = "";
</script>
