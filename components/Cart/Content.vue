<template>
  <div>
    <div class="bg-white rounded-[10px]">
      <div class="px-[30px] py-5 font-bold text-2xl border-b border-[#f3f3f3]">
        Cart
      </div>
      <div class="flex flex-col gap-y-5">
       <div v-for="n in 4" class="border-b last:border-none border-[#f3f3f3]">
        <CartItem  />
       </div>
        
      </div>
    </div>
  </div>
</template>
