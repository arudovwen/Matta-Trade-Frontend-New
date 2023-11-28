<template>
  <div class="flex flex-col h-full gap-x-8">
    <div
      class="hidden lg:flex items-center text-center text-sm gap-x-1 justify-end"
    >
      Not a vendor?
      <NuxtLink to="/auth/register" class="font-semibold text-[#2176FF]"
        >Click here</NuxtLink
      >
    </div>
  <div class="flex flex-col justify-center flex-1">
    <div class="w-full max-w-[550px] mx-auto py-2">
      <h1 class="text-[#333] darks:text-white mb-[10px] text-3xl font-bold">
        Create a vendor account
      </h1>
      <p class="mb-[31px] text-sm text-[#666] darks:text-white/80">
        Enter your details to create an account.
      </p>
      <form class="grid grid-cols-1 lg:grid-cols-2 gap-x-[18px] gap-y-5">
        <div>
          <Textinput
            placeholder=""
            label="First name"
            type="text"
            name="firstName"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Last name"
            type="text"
            name="lasttName"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Email"
            type="email"
            name="email"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Phone number"
            type="tel"
            name="phoneNumber"
          />
        </div>
        <div class="lg:col-span-2">
          <Textinput
            placeholder=""
            label="Company name"
            type="text"
            name="companyName"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Password"
            type="password"
            name="password"
          />
        </div>
        <div>
          <Textinput
            placeholder=""
            label="Confirm Password"
            type="password"
            name="confirmpassword"
          />
        </div>
        <div
          class="lg:col-span-2 flex items-center text-[#333] darks:text-slate-400 text-xs lg:text-sm gap-x-[2px]"
        >
          <Checkbox
            v-model.value="agree"
            label="I agree to the "
            labelClass="text-xs lg:text-sm"
          />
          <span
            ><NuxtLink to="/terms" class="text-[#2176FF]">Terms </NuxtLink> and
            <NuxtLink to="/policy" class="text-[#2176FF]">Policy</NuxtLink>
            of Matta Trade</span
          >
        </div>

        <div class="lg:col-span-2 grid gap-y-[22px] mb-9 mt-4">
          <AppButton
            text="sign up"
            btnClass="normal-case btn-primary !py-3"
            :disabled="!agree"
          />
        </div>
        <span
          class="lg:col-span-2 flex items-center text-center text-sm text-[#333] darks:text-white/80 gap-x-1 justify-center"
        >
          Already have an account?
          <NuxtLink to="/auth/login" class="font-semibold text-[#2176FF]"
            >Login</NuxtLink
          >
        </span>
      </form>
    </div>
  </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "register",
});

const agree = ref(false);
</script>
