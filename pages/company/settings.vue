<template>
  <div>
    <SupplierCompanySettings />
  </div>
</template>
<script setup>
definePageMeta({
 layout: "dashboard",
  middleware: "auth",
});
useHead({
  title: "Company | Matta",
  meta: [{ name: "description", content: "Checkout" }],
});
</script>
