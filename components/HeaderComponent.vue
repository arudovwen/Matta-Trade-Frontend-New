<template>
  <div class="py-5 px-[30px] border-[#F4F7FE] border-b" :class="className">
    <h1 class="text-lg text-[#101828] col-span-1 font-semibold capitalize">
      {{title}}
    </h1>
  </div>
</template>
<script setup>
defineProps(["title","className"]);
</script>
