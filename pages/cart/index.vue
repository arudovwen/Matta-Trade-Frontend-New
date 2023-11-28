<template>
  <div class="container py-10 w-full">
    <div class="mb-6">
      <AppButton
        link="#"
        icon="ion:arrow-back-sharp"
        text="Back to shopping"
        btnClass="text-xs sm:text-sm !py-0 !px-0 !font-semibold"
      />
    </div>
    <div class="flex gap-x-5 w-full">
      <div class="flex-1">
        <CartContent />
      </div>
      <div>
        <CartSide />
      </div>
    </div>
  </div>
</template>
