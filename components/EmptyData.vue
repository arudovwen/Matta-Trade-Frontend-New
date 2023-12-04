<template>
  <div class="flex items-center justify-center p-4 h-[300px] text-gray-400">
    {{ title || "No data available" }}
  </div>
</template>
<script setup>
defineProps(["title"]);
</script>
