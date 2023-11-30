<template>
  <div class="items-center flex justify-center h-[85vh] w-screen">
    <div class="bg-white rounded-[10px] p-9 text-center max-w-[500px]">
      <img
        src="~/assets/images/success.png"
        class="mx-auto mb-[10px]"
        alt="success"
      />
      <h1 class="text-2xl mb-[27px] font-bold">Order Successful</h1>
      <p class="mb-10 text-sm text-[#444] leading-[21px]">
        Your order will be processed as soon as possible. Your order no is
        <span class="font-medium text-[#333]">1234569504</span>. You will
        receive an email shortly with the invoice for your order.
      </p>
      <div class="flex gap-x-[14px]">
        <AppButton
        link="/"
          text="Track your order"
          btnClass="text-[#2176FF] bg-[#165EF014] w-full !text-sm !font-normal"
        />
        <AppButton
          link="/"
          text="Continue shopping"
          btnClass="bg-[#2176FF] text-white w-full !text-sm !font-normal"
        />
      </div>
    </div>
  </div>
</template>
