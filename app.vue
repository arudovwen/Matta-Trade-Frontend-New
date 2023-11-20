<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  font-family: "Inter", sans-serif;
  color: #333333;
}
.carousel__track{
  column-gap: 34px;
}
</style>

<script setup>
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init();

});
</script>
