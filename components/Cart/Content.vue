<template>
  <div>
    <div class="bg-white rounded-[10px]">
      <div class="px-[30px] py-5 font-bold text-2xl border-b border-[#f3f3f3]">
        Cart
      </div>
      <div class="flex flex-col gap-y-5" v-if="cartStore?.cart?.length">
       <div v-for="item in cartStore?.cart" class="border-b last:border-none border-[#f3f3f3]">
        <CartItem :detail="item"  />
      
       </div>
        
      </div>

      <EmptyData v-else title="You have no item in your cart" />
    </div>
  </div>
</template>
<script setup>
const cartStore = useCartStore()
</script>