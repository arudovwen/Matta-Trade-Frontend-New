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
.recommended .carousel__viewport .carousel__track{
  column-gap: 34px;
  @media(max-width:768px){
    column-gap: 16px;
  }
}
</style>

<script setup>
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init();

});
</script>
