<template>
  <div>
    <h5 class="block text-[20px] font-bold mb-8 text-left">
      Select shipping address
    </h5>

    <div class="grid gap-y-6 mb-4">
      <div
        v-for="n in 2"
        :key="n"
        @click="active = n"
        :class="
          active === n ? 'border-[#91B3F8] bg-[#E3EBFD] ' : 'border-[#F3F3F3]'
        "
        class="rounded-[10px] py-3 px-[16px] border-2 cursor-pointer"
      >
        <CheckoutShippingAddress :active="active === n" />
        <div class="flex gap-x-5 mt-3">
          <AppButton
            text="Edit"
            icon="iconamoon:edit"
            btnClass=" !px-0 0 !py-[0] text-xs sm:text-sm !font-normal"
            iconClass="!text-base"
          />
          <AppButton
            text="Delete"
            icon="bx:trash"
            btnClass=" !px-0  !py-[0] text-xs sm:text-sm !font-normal"
            iconClass="!text-base"
          />
        </div>
      </div>
    </div>
    <AppButton
      text="New shipping address"
      icon="icon-park-outline:plus"
      btnClass=" !px-0 !sm:px-6 !py-[0px] text-xs sm:text-sm !text-[#2176FF]"
    />
  </div>
</template>
<script setup>
const active = ref(1);
</script>
