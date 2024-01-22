<template>
  <div
    class="w-full py-5 px-[30px] border-[#F4F7FE] border-b flex items-center justify-between"
    :class="className"
  >
    <div>
      <h1
        v-if="title"
        class="text-lg text-[#101828] col-span-1 font-semibold capitalize"
      >
        {{ title }}
      </h1>
      <h1
        v-if="welcome"
        class="text-[30px] text-[#101828] font-semibold capitalize"
      >
        {{ welcome }}
      </h1>
      <p v-if="subtext" class="text-sm text-[#475467]">
        {{ subtext }}
      </p>
    </div>
    <div>
      <AppButton
        v-if="btnText"
        @click="emits('onClick')"
        :text="btnText"
        :icon="btnIcon"
        btnClass="!px-[14px] !py-[10px] bg-primary-500 !text-white !text-sm"
      />
    </div>
  </div>
</template>
<script setup>
defineProps(["title", "className", "welcome", "subtext", "btnText", "btnIcon"]);
const emits = defineEmits(["onClick"]);
</script>
