<template>
  <span
    :class="`px-2 py-1 text-xs rounded-full flex gap-x-1 items-center border max-w-max font-semibold ${StatusClass[status]}`"
  >
    <AppIcon icon="octicon:dot-fill-24"/>
    <span v-if="status == 0" class=""> Pending</span>
    <span v-if="status == 1" class=""> In progress</span>

    <span v-if="status == 2" class=""> Shipped</span>
    <span v-if="status == 3" class=""> Completed</span>
  </span>
</template>

<script setup>
defineProps(["status"]);
const StatusClass = {
  0: "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]",
  1: "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]",
  2: "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]",
  3: "text-[#067647] bg-[#ECFDF3] border-[#ABEFC6]",
};
</script>
