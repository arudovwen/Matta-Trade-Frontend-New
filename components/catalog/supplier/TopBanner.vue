<template>
  <div class="p-8 bg-white rounded-lg bg-img">
    <div class="mb-8"><Breadcrumbs /></div>
    <div class="grid grid-cols-4 justify-between items-end">
      <h1
        class="text-[48px] leading-[56px] text-matta-black col-span-1 font-medium capitalize"
      >
        {{ name }}
      </h1>
      <div />
      <div />
      <div class="col-span-1 grid justify-end">
        <p class="text-[64px] text-primary font-medium">
          {{ pageData.totalData }}
        </p>
        <p class="text-sm text-matta-black">
          Discover here thousands of products in <br />
          <span class="capitalize">{{ name }}</span> market.
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>

import { useRoute } from "vue-router";
import { onMounted, ref, inject } from "vue";

const pageData = inject("queryParams");
const route = useRoute();
onMounted(() => {
  name.value = route.params.type;
});
const name = ref("");
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
