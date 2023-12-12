<template>
  <div class="gap-y-4 flex flex-col">
    <!-- Top bar   -->
    <div class="p-6 lg:p-8 bg-white rounded-lg bg-img">
      <div class="mb-12"><Breadcrumbs /></div>
      <div class="">
        <div>
          <h1
            class="text-3xl lg:text-[48px] lg:leading-[56px] text-matta-black font-medium capitalize mb-2"
          >
            Shipping Addresses
          </h1>
          <p class="text-sm lg:text-base">
            Add and manage your shipping addresses.
          </p>
        </div>
        <div />
      </div>
    </div>

    <div class="bg-white rounded-[10px]">
      <div class="px-[30px] pt-6 pb-[30px]">
        <div class="mb-6 grid grid-cols-2 gap-6">
          <div
            v-for="n in shippingStore.addressesData"
            :key="n"
            :class="
              n.isDefault
                ? 'border-[#91B3F8] bg-[#E3EBFD] '
                : 'border-[#F3F3F3]'
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
        <div
          class="flex flex-col md:flex-row md:items-center gap-y-4 md:gap-y-0 md:gap-x-4"
        >
          <AppButton
            @click="openModal('form')"
            text="New shipping address"
            icon="icon-park-outline:plus"
            btnClass="bg-primary-500  text-white !px-4
      !sm:px-6 !py-[9px] text-xs sm:text-sm"
          />

        </div>
      </div>
    </div>

    <ModalCenter>
      <template #default>
        <div class="w-full max-w-[500px] p-6 md:py-9 md:px-10 z-[999] relative">
          <CheckoutShippingForm v-if="type === 'form'" />
          <CheckoutShippingEditForm v-if="type === 'edit'" />
        
        </div>
      </template>
    </ModalCenter>
  </div>
</template>

<script setup>
import { setdefaultaddress } from "~/services/cartservice";

defineProps(["title"]);

const shippingStore = useShippingStore();
const type = ref("form");
const detail = ref("detail");
const isOpen = ref(false);
function openModal(val) {
  type.value = val;
  isOpen.value = true;
}
onMounted(() => {
  shippingStore.getAlladdress();
});
function handleDefault(id) {
  setdefaultaddress(id).then((res) => {
    if (res.status === 200) {
      isOpen.value = false;
      shippingStore.getAlladdress();
    }
  });
}

function handleEdit(val) {
  detail.value = val;
  type.value = "edit";
  isOpen.value = true;
}
provide("type", type);
provide("isOpen", isOpen);
provide("detail", detail);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
