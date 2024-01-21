<template>
  <div class="flex flex-col items-center justify-center p-4 h-[300px] text-gray-400">
   <div class="mb-6 flex justify-center">
    <img src="~/assets/images/empty.svg" v-if="type !=='shipping'" />
    <AppIcon v-else icon="fa6-solid:truck" iconClass="text-6xl text-[#E8E8E8]" />
   </div>
    <p class="text-lg text-[#101828] font-semibold mb-2">{{ title || "No data available" }}</p>
    <p v-if="subtext" class="text-sm text-[#475467] mb-8 max-w-[352px] mx-auto">{{ subtext }}</p>
    <AppButton @click="emits('btnFunction')" v-if="btnText && btnFunction"  :text="btnText" btnClass="!py-[10px] bg-primary-500 text-white" />
  </div>
</template>
<script setup>
defineProps(["title", "subtext", "btnText", "url", "type"]);
defineEmits(["btnFunction"])

</script>
