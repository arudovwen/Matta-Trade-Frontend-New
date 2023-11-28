<template>
  <div class="flex justify-between p-[30px]">
    <div class="flex gap-x-6">
      <img
        src="/images/4.png"
        alt="img"
        width="100px"
        height="100"
        class="bg-gray-100 w-[100px] h-[100px] rounded-[5px]"
      />
      <div class="max-w-[350px]">
        <p class="font-bold text-base mb-[10px]">
          Acrypol 600(Styrene Acrylic)
        </p>
        <p class="text-xs mb-[15px]">
          <span class="font-normal">Sold by:</span
          ><span class="font-bold"> A Huber Company</span>
        </p>
        <div class="flex gap-x-6">
          <div>
            <p class="font-medium text-xs mb-1">Package</p>
            <Select
              :options="options"
              placeholder="Select a package"
              classInput="min-w-[180px] w-full !bg-white !border-[#E7E7E7] !rounded-[4px] !text-[#333] !text-xs !min-h-[32px] !h-[32px] cursor-pointer bg-[#FCFCFC]"
            />
          </div>
          <div>
            <p class="font-medium text-xs mb-1">Quantity</p>
            <div
              class="gap-x-4 rounded py-[4px] px-[5px] bg-[#F4F4F4] flex items-center flex-1"
            >
              <button
                type="button"
                :disabled="counter === 1"
                @click="counter--"
                class="h-[25px] w-[25px] rounded flex items-center justify-center bg-white disabled:opacity-60"
              >
                <AppIcon icon="uiw:minus" class="text-xs" />
              </button>
              <div class="flex-1">
                <input
                  v-model="counter"
                  class="h-[25px] bg-transparent rounded text-sm font-medium text-center outline-none w-full"
                />
              </div>
              <button
                type="button"
                @click="counter++"
                class="h-[25px] w-[25px] rounded flex items-center justify-center bg-white"
              >
                <AppIcon icon="uiw:plus" class="text-xs" />
              </button>
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
        iconClass="!text-sm !mr-1"
      />
    </div>
  </div>
</template>
<script setup>
const counter = ref(1);
</script>
