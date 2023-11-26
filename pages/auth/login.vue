<template>
  <div class="pt-10 lg:pt-0 w-full max-w-[380px] mx-auto">
    <h1 class="text-[#333] darks:text-white mb-[10px] text-3xl font-bold">
      Welcome back
    </h1>
    <p class="mb-[31px] text-sm text-[#666] darks:text-white/80">
      Please enter your details to sign in
    </p>
    <form>
      <div class="mb-5">
        <Textinput
          icon="line-md:email"
          placeholder="Enter address"
          label="Email"
          type="email"
          name="email"
        />
      </div>
      <div class="mb-5">
        <Textinput
          hasicon
          placeholder="Enter password"
          label="Password"
          type="password"
          name="password"
        />
      </div>
      <span class="block text-sm text-[#333] darks:text-white/80 mb-10">
        <NuxtLink to="/auth/forgot-password" class="font-medium"
          >Forgot password?</NuxtLink
        >
      </span>
      <div class="grid gap-y-[22px] mb-9">
        <AppButton text="Login" btnClass="btn-primary !py-3" />
        <AppButton
          text="Sign in with Google"
          icon="flat-color-icons:google"
          btnClass="btn-dark !py-3"
        />
      </div>
      <span
        class="flex items-center text-center text-sm text-[#333] darks:text-white/80 gap-x-1 justify-center"
      >
        Don’t have an account?
        <NuxtLink to="/auth/register" class="font-semibold text-[#2176FF]">Sign Up</NuxtLink>
      </span>
    </form>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "auth",
});
</script>
