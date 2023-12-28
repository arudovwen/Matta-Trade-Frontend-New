<template>
  <div>
    <ul class="flex gap-x-1">
      <li
        v-for="(link, idx) in links"
        :key="idx"
        :class="` ${className} ${link.title && `after:content-['/']`} text-white/80 last:text-white font-light last:font-semibold text-[10px] sm:text-xs lg:text-sm capitalize  last:after:content-[''] flex gap-x-1 items-center`"
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
  className: {
    type: String,
  },
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
