<template>
  <div class="lg:min-w-[450px] w-full max-w-[800px] py-10 px-6">
    <h3 class="block text-2xl font-medium text-center mb-6">Create wallet</h3>

    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 gap-6">
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block text-matta-black"
            >Full name</label
          >
          <div class="relative flex items-center">
            <input
              v-model="v$.customerName.$model"
              :class="{ 'border-red-500 ': v$.customerName.$error }"
              class="rounded-lg px-4 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              placeholder="Enter your name"
            />
          </div>
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.customerName.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block">Phone number</label>
          <div class="flex relative rounded-lg">
            <PhoneCodes v-model="form.phoneCode" />

            <input
              :class="{ 'border-red-500': v$.phoneNumber.$error }"
              v-model="v$.phoneNumber.$model"
              class="flex-1 rounded-r-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              autofocus="on"
              placeholder="08160723884"
              type="tel"
            />
          </div>
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.phoneNumber.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <button
          type="submit"
          :disabled="isLoading"
          class="border text-[13px] mb-4 border-primary- uppercase text-white w-full lg:w-auto lg:min-w-[150px] mx-auto bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-12"
        >
          <span>
            <span
              class="flex gap-x-4 justify-center items-center"
              v-if="isLoading"
              ><span> Processing...</span>
              <i
                v-if="isLoading"
                class="fa fa-spinner fa-spin text-white"
                aria-hidden="true"
              ></i
            ></span>
            <span v-else>Submit</span>
          </span>
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, reactive, defineEmits } from "vue";
import PhoneCodes from "~/components/forms/PhoneCodes";
import useVuelidate from "@vuelidate/core";
import { required, helpers, numeric } from "@vuelidate/validators";
import { createWallet } from "~/services/walletservice";

const emits = defineEmits(["success"]);
const form = reactive({
  customerName: "",
  phoneCode: "+234",
  phoneNumber: "",
});
const isLoading = ref(false);
const validPhoneLength = (value) =>
  form.phoneCode === "+234" ? value.length > 9 && value.length < 12 : true;
const rules = {
  customerName: {
    required: helpers.withMessage("Name field cannot be empty", required),
  },

  phoneNumber: {
    numeric,
    required,
    validPhoneLength: helpers.withMessage(
      "Phone number must be between 10 0r 11 digits",
      validPhoneLength
    ),
  },
};

const v$ = useVuelidate(rules, form);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  createWallet(form).then((res) => {
    emits("success", res.data);
  });
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
