<template>
  <div>
    <ul class="flex gap-x-1">
      <li
        v-for="(link, idx) in links"
        :key="idx"
        class="text-white/80 last:text-white font-light last:font-semibold text-sm capitalize after:content-['/'] last:after:content-[''] flex gap-x-1 items-center"
      >
        <NuxtLink :to="link.url" class="">
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
defineProps({
  links: {
    type: Array,
    default: [
      {
        title: "home",
        url: "/",
      },
    ],
  },
});
</script>
