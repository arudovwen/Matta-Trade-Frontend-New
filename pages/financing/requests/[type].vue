<template>
   <SupplierFinanceRequestTrade />
</template>
<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const route = useRoute()
const url = useRequestURL();
console.log("🚀 ~ route:", url.pathname);

console.log("🚀 ~ route:", route.params.type)
</script>