<template>
    <div class="grid grid-cols-2 gap-x-[75px] gap-y-6">
      <div v-for="n in data">
        <p class="text-sm font-medium">{{ n.title }} </p>
        <p class="text-[#A4A4A4] text-xs">{{ n.size }}</p>
       
      </div>
    </div>
  </template>
  <script setup>
  const data = [
    {
      title: "Caustic Soda SDS.pdf",
      size: "169kb",
      
      key: "mp",
    },

  ];
  </script>
  