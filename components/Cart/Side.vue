<template>
  <div class="bg-[#333] rounded-[10px] py-[30px] px-5 w-[360px]">
    <div class="font-semibold text-2xl text-white pb-6">Order Summary</div>
    <div class="flex flex-col gap-y-5">
      <div class="flex justify-between">
        <div>
          <p class="font-semibold text-sm text-white mb-[2px]">
            Calcium Carbonate
          </p>
          <p class="text-xs text-[#959595]">Qty: 4 Bags</p>
        </div>
        <p class="font-medium text-sm text-white">N1,200,000</p>
      </div>
    </div>
    <hr class="my-[20px] border-white/10" />
    <div class="flex flex-col gap-y-3">
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">Sub-total</p>

        <p class="text-white font-medium text-sm">N1,200,000</p>
      </div>
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">Tax (7.5%)</p>

        <p class="text-white text-sm font-medium">N1,200,000</p>
      </div>
      <div class="flex justify-between">
        <p class="text-sm text-[#E1E1E1]">Shipping & Handling</p>

        <p class="text-white font-medium text-sm">TBD</p>
      </div>
    </div>
    <hr class="my-[20px] border-white/10" />
    <div class="flex justify-between mb-[25px]">
      <p class="text-sm text-[#E1E1E1]">Total</p>

      <p class="text-white font-bold">N1,200,000</p>
    </div>
    <AppButton
      v-if="!isLoggedIn"
      link="/checkout"
      icon="bytesize:cart"
      text="Checkout"
      btnClass="bg-primary-500 w-full text-white !px-4 !sm:px-6 !py-[13px] text-xs sm:text-sm"
    />
  </div>
</template>
