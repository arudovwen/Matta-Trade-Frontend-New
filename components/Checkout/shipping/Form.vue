<template>
  <div class="bg-white w-full">
    <legend class="block text-[20px] font-bold mb-8 text-left">
      Shipping Address
    </legend>
    <form class="grid grid-cols-1 xl:grid-cols-2 gap-x-[18px] gap-y-4 w-full">
      <div>
        <Textinput
          placeholder=""
          label="First name"
          type="text"
          name="firstName"
          classInput="!h-[45px]"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Last name"
          type="text"
          name="lasttName"
          classInput="!h-[45px]"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Phone number"
          type="tel"
          name="phoneNumber"
          classInput="!h-[45px]"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Country"
          type="tel"
          name="country"
          classInput="!h-[45px]"
        />
      </div>
      <div class="xl:col-span-2">
        <Textinput
          placeholder=""
          label="Address"
          name="address"
          classInput="!h-[45px]"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="City"
          type="text"
          name="city"
          classInput="!h-[45px]"
        />
      </div>
      <div>
        <Textinput
          placeholder=""
          label="Postal code"
          type="tel"
          name="postalCode"
          classInput="!h-[45px]"
        />
      </div>
      <div class="xl:col-span-2 grid gap-y-[22px] mb-9 mt-4">
        <AppButton
          text="Add address"
          btnClass="normal-case btn-primary !py-3"
        />
      </div>
    </form>
  </div>
</template>
