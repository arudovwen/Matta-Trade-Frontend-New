<template>
  <div class="pt-20 lg:pt-[140px] w-full max-w-[400px] mx-auto grid flex-1 items-center">
    <div>
      <h1 class="text-[#333] dark:text-white mb-[10px] text-[28px] font-bold">
        Reset Password
      </h1>
      <p class="mb-[25px] text-sm text-[#666] dark:text-white/80">
        Enter the email associated with your account and we”ll send you
        instructions to reset your password
      </p>
      <form>
        <div class="mb-5">
          <Textinput
            hasicon
            placeholder="Enter new password"
            label="New Password"
            type="password"
          />
        </div>
        <div class="mb-5">
          <Textinput
            hasicon
            placeholder="Confirm new password"
            label="New Password"
            type="password"
          />
        </div>

        <div class="grid gap-y-[22px] mb-9">
          <AppButton text="Submit" btnClass="btn-primary !py-3" />
        </div>
        <span
          class="flex items-center text-center text-sm text-[#333] dark:text-white/80 gap-x-1 justify-center"
        >
          Have an account?
          <NuxtLink to="/auth/login" class="font-semibold">Sign in</NuxtLink>
        </span>
      </form>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "auth",
});
</script>
