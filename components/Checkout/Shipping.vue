<template>
  <div class="bg-white rounded-[10px]">
    <h2 class="px-[30px] py-5 font-bold text-2xl border-b border-[#f3f3f3]">
      Shipping Address
    </h2>
    <div class="px-[30px] pt-6 pb-[30px]">
      <div class="mb-6">
        <CheckoutShippingAddress />
      </div>
      <div class="flex items-center gap-x-4">
        <AppButton
          @click="openModal('form')"
          text="New shipping address"
          icon="icon-park-outline:plus"
          btnClass="bg-primary-500 text-white !px-4
      !sm:px-6 !py-[9px] text-xs sm:text-sm"
        />

        <AppButton
          @click="openModal('select')"
          text="Change address"
          btnClass="!px-4
      !sm:px-6 !py-[0px] text-sm hover:underline"
        />
      </div>
    </div>
  </div>

  <ModalCenter>
    <template #default>
      <div class="w-[500px] py-9 px-10 z-[999]">
        <CheckoutShippingForm v-if="type === 'form'" />
        <CheckoutSelect v-if="type === 'select'" />
      </div>
    </template>
  </ModalCenter>
</template>
<script setup>
const type = ref("form");
const isOpen = ref(false);
function openModal(val) {
  type.value = val;
  isOpen.value = true;
}

provide("isOpen", isOpen);
</script>
