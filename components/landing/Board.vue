<template>
 <div class="container mb-14 ">
  <div
    data-aos="fade-up"
    data-aos-once="true"
    class="h-[206px] rounded-[10px] bg-gray-300 bg-cover bg-center"
    :style="{ backgroundImage: `url('${imageSrc}')` }"
  ></div>
 </div>
</template>
<script setup>
const imageSrc = "/images/board.png";
</script>
