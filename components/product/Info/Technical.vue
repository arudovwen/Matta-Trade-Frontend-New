<template>
  <div class="grid grid-cols-2 gap-x-[75px] gap-y-6">
    <div v-for="n in data">
      <p class="text-[#A4A4A4] text-xs">{{ n.title }}</p>
      <p class="text-sm font-medium">{{ n.value }} {{ n.unit }}</p>
    </div>
  </div>
</template>
<script setup>
const data = [
  {
    title: "Melting Point",
    value: "49.3",
    unit: "°C",
    key: "mp",
  },
  {
    title: "Industrial Cleaning Agent",
    value: "13.3",
    unit: "(1 % soln/water)",
    key: "ica",
  },
];
</script>
