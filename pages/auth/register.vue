<template>
  <div class="pt-20 lg:pt-[140px] w-full max-w-[480px] mx-auto">
    <span
        class="hidden absolute top-10 right-10 lg:flex items-center text-center text-sm text-[#333] dark:text-white/80 gap-x-1 justify-center"
      >
      Need a vendor account? 
        <NuxtLink to="/auth/login" class="font-semibold text-[#2176FF]"
          >Click here</NuxtLink
        >
      </span>
    <h1 class="text-[#333] dark:text-white mb-[10px] text-3xl font-bold">
      Sign Up
    </h1>
    <p class="mb-[31px] text-sm text-[#666] dark:text-white/80">
      Enter your details to create an account.
    </p>
    <form class="grid grid-cols-1 lg:grid-cols-2 gap-x-[18px] gap-y-5">
      <div>
        <Textinput
          placeholder="Provide your first name"
          label="First name"
          type="text"
          name="firstName"
        />
      </div>
      <div>
        <Textinput
          placeholder="Provide your last name"
          label="Last name"
          type="text"
          name="lasttName"
        />
      </div>
      <div>
        <Textinput
          placeholder="Enter address"
          label="Email"
          type="email"
          name="email"
        />
      </div>
      <div>
        <Textinput
          placeholder="Provide your phone number"
          label="Phone number"
          type="tel"
          name="phoneNumber"
        />
      </div>
      <div>
        <Textinput
          placeholder="Enter your password"
          label="Password"
          type="password"
          name="password"
        />
      </div>
      <div>
        <Textinput
          placeholder="Confirm your password"
          label="Confirm Password"
          type="password"
          name="confirmpassword"
        />
      </div>
      <div
        class="lg:col-span-2 flex items-center text-[#333] dark:text-slate-400 text-xs md:text-sm gap-x-[2px]"
      >
        <Checkbox
          v-model.value="agree"
          label="I agree to the "
          labelClass="text-xs md:text-sm"
        />
        <span
          ><NuxtLink to="/terms" class="text-[#2176FF]">Terms </NuxtLink> and
          <NuxtLink to="/policy" class="text-[#2176FF]">Policy</NuxtLink>
          of Matta Trade</span
        >
      </div>

      <div class="lg:col-span-2 grid gap-y-[22px] mb-9 mt-4">
        <AppButton
          text="Create your account"
          btnClass="normal-case btn-primary !py-3"
          :disabled="!agree"
        />
      </div>
      <span
        class="lg:col-span-2 flex items-center text-center text-sm text-[#333] dark:text-white/80 gap-x-1 justify-center"
      >
        Already have an account?
        <NuxtLink to="/auth/login" class="font-semibold text-[#2176FF]"
          >Login</NuxtLink
        >
      </span>
    </form>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "auth",
});

const agree = ref(false);
</script>
