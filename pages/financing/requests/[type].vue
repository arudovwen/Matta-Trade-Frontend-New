<template>
   <SupplierFinanceRequestTrade />
</template>
<script setup>


const route = useRoute()
const url = useRequestURL();
console.log("🚀 ~ route:", url.pathname);

console.log("🚀 ~ route:", route.params.type)
</script>