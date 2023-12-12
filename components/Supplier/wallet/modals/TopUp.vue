<template>
  <div class="p-6 lg:p-8 bg-white rounded-lg" v-if="details">
    <span class="block text-2xl font-medium text-center mb-2">{{
      currencyFormat(details.walletBalance)
    }}</span>
    <p class="mb-6 text-sm text-center font-base">
      Add funds to your wallet account from <br />
      your Nigerian Bank App
    </p>
    <div class="grid grid-cols-3 gap-x-4 mb-1">
      <span class="text-sm">Bank name :</span>
      <span class="text-base font-medium col-span-2">{{
        details.bankName
      }}</span>
    </div>
    <div class="grid grid-cols-3 gap-x-4 mb-1">
      <span class="text-sm">Account name :</span>
      <span class="text-base font-medium col-span-2">{{
        details.accountName
      }}</span>
    </div>
    <div class="grid grid-cols-3 gap-x-4">
      <span class="text-sm">Account no :</span>
      <span class="text-base font-medium col-span-2"
        ><span>{{ details.accountNumber }}</span
        ><button
          v-clipboard="details.accountNumber"
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
</template>
<script setup>
import { defineProps, inject } from "vue";
import { useToast } from "vue-toastification";


const toast = useToast();
defineProps(["details"]);
</script>
