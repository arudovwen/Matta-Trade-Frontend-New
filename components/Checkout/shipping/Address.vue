<template>
  <div class="py-2">
    <div class="flex justify-between items-center">
      <p class="text-base font-bold mb-[10px]">Joun Dorj</p>
      <AppIcon
        v-if="active"
        icon="lets-icons:check-fill"
        class="text-[#2176FF] text-lg"
      />
    </div>
    <p class="text-sm mb-[7px] max-w-[280px]">
      15th Floor, Elephant House, Marina, Lagos., Lagos Island, Lagos
    </p>
    <p class="text-sm">08020690101</p>
  </div>
</template>

<script setup>
defineProps(["active"]);
</script>
