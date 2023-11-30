<template>
  <div class="flex justify-between p-[30px]">
    <div class="flex gap-x-6">
      <img
        src="/images/4.png"
        alt="img"
        width="117"
        height="117"
        class="bg-gray-100 w-[117px] h-[117px] rounded-[5px] bg-cover"
      />
      <div class="max-w-[350px]">
        <p class="font-bold text-base mb-[9px]">
          Acrypol 600(Styrene Acrylic)
        </p>
        <p class="text-xs mb-[15px]">
          <span class="font-normal">Sold by:</span
          ><span class="font-bold"> A Huber Company</span>
        </p>
        <div class="flex gap-x-6">
          <div>
            <p class="font-medium text-xs mb-1">Packaging</p>
            <Select
              :options="options"
              placeholder="Select a package"
              classInput="min-w-[180px] w-full !bg-white !border-[#E7E7E7] !rounded-[4px] !text-[#333] !text-xs !min-h-[32px] !h-[32px] cursor-pointer bg-[#FCFCFC]"
            />
          </div>
          <div>
            <p class="font-medium text-xs mb-1">Quantity</p>
           <div class="h-8 max-w-[115px]">
            <CartButton textClass="!text-sm" iconClass="!text-xs" btnClass="!px-[10px]" />
           </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-between">
      <p class="font-bold">N1,200,000</p>

      <AppButton
        text="Remove item"
        icon="bx:trash"
        btnClass=" !px-0  !py-[0] text-xs sm:text-sm !font-normal"
        iconClass="!text-base !mr-1"
      />
    </div>
  </div>
</template>
<script setup>
const counter = ref(1);
provide("counter", counter)
</script>
