<template>
  <div class="py-5 px-[30px] border-[#F4F7FE] border-b" :class="className">
    <h1
      v-if="title"
      class="text-lg text-[#101828] col-span-1 font-semibold capitalize"
    >
      {{ title }}
    </h1>
    <h1
      v-if="welcome"
      class="text-[30px] text-[#101828] font-semibold capitalize"
    >
      {{ welcome }}
    </h1>
    <p
      v-if="subtext"
      class="text-sm text-[#475467]"
    >
      {{ subtext }}
    </p>
  </div>
</template>
<script setup>
defineProps(["title", "className", "welcome", "subtext"]);
</script>
