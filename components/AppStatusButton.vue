<template>
  <span
    :class="`px-[6px] py-1 text-xs rounded-full flex gap-x-1 items-center border max-w-max font-semibold ${StatusClass[status]}`"
  >
    <AppIcon icon="octicon:dot-fill-24" />
    <span class=""> {{ StatusText[status] }}</span>
  </span>
</template>

<script setup>
defineProps(["status"]);
const StatusClass = {
  0: "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]",
  1: "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]",
  2: "text-[#5925DC] bg-[#F4F3FF] border-[#D9D6FE]",
  3: "text-[#067647] bg-[#ECFDF3] border-[#ABEFC6]",
  4: "text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]",
  5: "text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]",
};
const StatusText = {
  0: "Pending",
  1: "In progress",
  2: "Shipped",
  3: "Completed",
  4: "Rejected",
  5: "Suspended",
};
</script>
