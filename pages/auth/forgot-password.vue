<template>
  <div class="pt-0 lg:pt-0 max-w-[500px] mx-auto items-center grid flex-1">
    <div class="w-full">
      <div class="mb-6" v-if="isSent">
         <img src="~/assets/images/mail.svg" class="mx-auto" />
      </div>
      <h1
        class="text-[#333] darks:text-white mb-[10px] text-[28px] font-bold text-center"
      >
        {{ isSent ? title2 : title1 }}
      </h1>
      <p class="mb-[28px] text-sm text-[#666] darks:text-white/80 text-center">
        {{ isSent ? text2 : text1 }}
      </p>
      <form @submit.prevent="onSubmit" v-if="!isSent">
        <div class="mb-5">
          <Textinput
            icon="line-md:email"
            placeholder=""
            label="Email address"
            type="email"
            v-bind="emailAtt"
            v-model="email"
            :error="errors.email"
          />
        </div>

        <div class="grid gap-y-[22px] mb-9">
          <AppButton
            type="submit"
            :isLoading="isLoading"
            :isDisabled="isLoading"
            text="Continue"
            btnClass="btn-primary !py-3"
          />
        </div>
        <span
          class="flex items-center text-center text-sm text-[#333] darks:text-white/80 gap-x-1 justify-center"
        >
          Have an account?
          <NuxtLink to="/auth/login" class="font-semibold text-[#2176FF]"
            >Sign in</NuxtLink
          >
        </span>
      </form>
      <div class="pt-5" v-if="isSent">
        <NuxtLink to="/auth/login" class="w-full">
          <AppButton
            text="Return to Login"
            btnClass="btn-primary !py-3 w-full !normal-case"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "auth",
 
});
useHead({
  
  title: "Forgot password | Matta"
});
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from 'vue3-toastify';

import { forgotPassword } from "~/services/authservices";


const title1 = "Forgot password";
const title2 = "Check your email";
const text1 =
  "Enter the email associated with your account and we”ll send you instructions to reset your password";
const text2 =
  "We have sent an account activation link to your email address. Click on the link to activate your account.";
const isSent = ref(false);


const isLoading = ref(false);

const formValues = {
  email: "",
};

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [email, emailAtt] = defineField("email");
const route = useRoute();
const router = useRouter();

const onSubmit = handleSubmit((values) => {
  isLoading.value = true;
  forgotPassword(values)
    .then((res) => {
      if (res.status === 200) {
        isSent.value = true;
      }
    })

    .catch((err) => {
      isLoading.value = false;
      if ((err.response.data.message || err.response.data.Message)) {
        toast.error((err.response.data.message || err.response.data.Message));
      }
    });
});
</script>
