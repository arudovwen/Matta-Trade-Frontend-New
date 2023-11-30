<template>
  <div class="flex flex-col sm:flex-row justify-between p-5 sm:p-6 lg:p-[30px] gap-y-5 md:gap-y-0">
    <div class="flex gap-x-4 md:gap-x-6">
      <img
        src="/images/4.png"
        alt="img"
        width="117"
        height="117"
        class="bg-gray-100 w-12 md:w-[117px] h-12 md:h-[117px] rounded-[5px] bg-cover"
      />
      <div class="w-full sm:w-auto sm:max-w-[350px]">
        <p class="font-bold text-xs md:text-base mb-[6px]md: mb-[9px]">
          Acrypol 600(Styrene Acrylic)
        </p>
        <p class="text-[10px] md:text-xs mb-[10px]md: mb-[15px]">
          <span class="font-normal">Sold by:</span
          ><span class="font-bold"> A Huber Company</span>
        </p>
        <div class="flex flex-col  sm:flex-row gap-y-4 lg:gap-y-0 sm:gap-x-6">
          <div>
            <p class="font-medium text-[10px] md:text-xs mb-1">Packaging</p>
            <Select
              :options="options"
              placeholder="Select a package"
              classInput="lg:min-w-[180px] w-full !bg-white !border-[#E7E7E7] !rounded-[4px] !text-[#333] !text-xs !min-h-[32px] !h-[32px] cursor-pointer bg-[#FCFCFC]"
            />
          </div>
          <div>
            <p class="font-medium text-[10px] md:text-xs mb-1">Quantity</p>
           <div class="h-8 sm:max-w-[115px]">
            <CartButton textClass="!text-[11px] md:!text-sm" iconClass="!text-[10px] md:!text-xs" btnClass="!px-[10px]" />
           </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row justify-center md:justify-between">
      <p class="font-bold text-center md:text-right">N1,200,000</p>

      <AppButton
        text="Remove item"
        icon="bx:trash"
        btnClass=" !px-0  !py-[0] !text-[11px] sm:text-xs md:text-sm !font-normal"
        iconClass="!text-[10px] md:!text-base !mr-1"
      />
    </div>
  </div>
</template>
<script setup>
const counter = ref(1);
provide("counter", counter)
</script>
