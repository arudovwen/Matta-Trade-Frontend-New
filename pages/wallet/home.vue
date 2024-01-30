<template>
    <div>
        <SupplierWalletPage />
    </div>
</template>
<script setup>
definePageMeta({
 layout: "dashboard",
  middleware: "auth",
});
</script>