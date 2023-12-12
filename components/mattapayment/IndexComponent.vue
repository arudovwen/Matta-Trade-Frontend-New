<template>
  <section
    class="h-full bg-white rounded-lg p-8 lg:p-20 flex-1 flex items-center justify-center"
  >
    <div
      class="p-6 bg-[#E7EBEE] min-w-[400px] rounded-lg"
      v-if="walletDetails && cartDetails"
    >
      <h1 class="font-bold mb-7 text-xl">Matta Wallet</h1>
      <div class="p-4 bg-white rounded-lg mb-4">
        <div class="grid grid-cols-3 mb-1 gap-x-4">
          <span class="text-xs">Bank name :</span>
          <span class="text-sm font-medium col-span-2">{{
            walletDetails.bankName
          }}</span>
        </div>
        <div class="grid grid-cols-3 mb-1 gap-x-4">
          <span class="text-xs">Account name :</span>
          <span class="text-sm font-medium col-span-2">{{
            walletDetails.accountName
          }}</span>
        </div>
        <div class="grid grid-cols-3 gap-x-4">
          <span class="text-xs">Account number :</span>
          <span class="text-sm font-medium col-span-2"
            ><span>{{ walletDetails.accountNumber }}</span
            ><button
              v-clipboard="walletDetails.accountNumber"
              @click="
                toast.success('Copied', {
                  position: 'top-right',
                })
              "
              class="cursor-pointer ml-2"
            >
              <i class="uil uil-copy"></i></button
          ></span>
        </div>
      </div>
      <div class="mb-10 grid grid-cols-2 gap-2">
        <div class="">Wallet Balance</div>
        <div class="font-medium">
          {{ currencyFormat(walletDetails.walletBalance || 0) }}
        </div>
        <div>Amount to pay</div>
        <div class="font-medium">
          {{ currencyFormat(cartDetails.cartTotalwithTax || 0) }}
        </div>
      </div>
      <div
        class="text-xs text-center mb-2 text-red-500"
        v-if="walletDetails.walletBalance < cartDetails.cartTotalwithTax"
      >
        Insufficient balance
      </div>
      <div>
        <button
          v-if="walletDetails && cartDetails"
          :disabled="
            walletDetails?.walletBalance < cartDetails?.cartTotalwithTax
          "
          @click="isOpen = true"
          class="px-6 py-3 w-full rounded-md bg-matta-black hover:bg-matta-black/80 active:scale-95 text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Pay now
        </button>
      </div>
    </div>
    <div v-else class="p-6 bg-[#E7EBEE] rounded-lg text-center">
      <i class="fa fa-spinner fa-spin fa-4x" aria-hidden="true"></i>
    </div>
  </section>
  <Modal :isOpen="isOpen" @togglePopup="isOpen = false">
    <template #content>
      <OTP @handleSubmit="handleSubmit" />
    </template>
  </Modal>
</template>
<script setup>
import { ref, onMounted, inject } from "vue";
import OTP from "./TransactionPin.vue";
import { getcart } from "~/services/cartservice";
import { getWalletDetails } from "~/services/walletservice";
import { useToast } from "vue-toastification";
import Modal from "~/components/IndexModal";

const isOpen = ref(false);
const toast = useToast();

const cartDetails = ref(null);
const walletDetails = ref(null);
onMounted(() => {
  getcart().then((res) => {
    if (res.status === 200) {
      cartDetails.value = res.data.data;
    }
  });

  getWalletDetails().then((res) => {
    if (res.status === 200) {
      walletDetails.value = res.data.data;
    }
  });
});
function handleSubmit(value) {
  console.log(value);
  isOpen.value = false;
}
</script>
