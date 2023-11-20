<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
    {{ test }}
  </section>
</template>
<script setup>
definePageMeta({
  layout: "custom",
});
useHead({
  title: "About",
  meta: [{ name: "description", content: "My about site" }],
  bodyAttrs: {
    class: "test",
  },
  script: [{ innerHTML: "console.log('Hello world')" }],
});

const test = ref("1")
</script>
