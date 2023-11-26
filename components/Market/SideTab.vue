import type { AppIcon } from '#build/components';
<template>
  <div class="p-[15px]">
    <div class="flex justify-between items-center mb-[15px]">
      <span class="font-bold text-sm capitalize">{{ title }}</span>
      <span class="cursor-pointer" @click="active = !active"
        ><AppIcon :icon="active ? 'charm:minus' : 'charm:plus'"
      /></span>
    </div>
    <div v-if="active">
      <ul class="grid gap-y-[10px]">
        <li
          class="flex gap-x-[10px] items-center capitalize"
          v-for="list in lists"
          :key="list.title"
        >
          <Checkbox v-model.value="selected" labelClass="text-xs md:text-sm" />
          {{ list.title.toLowerCase() }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const active = ref(true);
defineProps({
  lists: {
    type: Array,
    default: () => [
      {
        title: "home",
        url: "/",
      },
    ],
  },
  title: {
    type: String,
  },
});
const selected = ref([]);
</script>
