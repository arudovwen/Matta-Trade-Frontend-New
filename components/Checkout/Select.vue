<template>
  <div>
    <h5 class="block text-[20px] font-bold mb-8 text-left">
      Select shipping address
    </h5>

    <div class="grid gap-y-6 mb-4 max-h-[600px] overflow-y-auto">
      <div
        v-for="n in shippingStore.addressesData"
        :key="n"
        :class="
          n.isDefault ? 'border-[#91B3F8] bg-[#E3EBFD] ' : 'border-[#F3F3F3]'
        "
        class="rounded-[10px] py-3 px-[16px] border-2 cursor-pointer"
      >
        <div @click="handleDefault(n.id)">
          <CheckoutShippingAddress :detail="n" :active="n.isDefault" />
        </div>
        <div class="flex gap-x-5 mt-3">
          <AppButton
            @click="handleEdit(n)"
            text="Edit"
            type="button"
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
      @click="type = 'form'"
      text="New shipping address"
      icon="icon-park-outline:plus"
      btnClass=" !px-0 !sm:px-6 !py-[0px] text-xs sm:text-sm !text-[#2176FF]"
    />
  </div>
</template>
<script setup>
import { setdefaultaddress } from "~/services/cartservice";
const shippingStore = useShippingStore();

const detail = inject("detail");
const type = inject("type");
const isOpen = inject("isOpen");

function handleEdit(val) {
  detail.value = val;
  type.value = "edit";
  isOpen.value = true;
}
function handleDefault(id) {
  setdefaultaddress(id).then((res) => {
    if (res.status === 200) {
      isOpen.value = false;
      shippingStore.getAlladdress();
    }
  });
}
</script>
