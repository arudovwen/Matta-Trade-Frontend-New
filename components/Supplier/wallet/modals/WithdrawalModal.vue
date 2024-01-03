<template>
  <div class="min-w-[400px] py-10 px-6">
    <form @submit.prevent="handleSubmit" v-if="stage === 1">
      <span class="block text-2xl font-medium text-center mb-2">{{
        currencyFormat(details.walletBalance)
      }}</span>
      <p class="mb-6 text-sm text-center font-base">
        Enter amount to withdraw into your <br />
        bank account
      </p>
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block">Withdraw amount</label>

        <CurrencyInput
          v-model="v$.amount.$model"
          :class="{ 'border-red-500': v$.amount.$error }"
          class="rounded-lg px-5 text-sm py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          placeholder=""
          :options="{
            currency: 'ngn',
            currencyDisplay: 'narrowSymbol',
          }"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.amount.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block">Bank name</label>
        <input
          v-model="v$.bankName.$model"
          :class="{ 'border-red-500': v$.bankName.$error }"
          class="rounded-lg px-4 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          placeholder="Enter bank name"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.bankName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block">Account name</label>
        <input
          v-model="v$.accountName.$model"
          :class="{ 'border-red-500': v$.accountName.$error }"
          class="rounded-lg px-4 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          placeholder="Enter account name"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.accountName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block">Account number</label>
        <input
          v-model="v$.accountNo.$model"
          :class="{ 'border-red-500': v$.accountNo.$error }"
          class="rounded-lg px-4 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          placeholder="Enter account number"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.accountNo.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block">Transaction pin</label>
        <input
          v-model="v$.pin.$model"
          :class="{ 'border-red-500': v$.pin.$error }"
          class="rounded-lg px-4 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          placeholder="Enter 4 digit pin"
          type="number"
          maxlength="4"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.pin.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <div class="">
        <button
          type="submit"
          :disabled="isLoading"
          class="border text-[13px] border-primary uppercase text-white lg:min-w-[120px] w-full bg-primary-500 rounded-lg px-6 py-2 hover:bg-primary/80 h-12"
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
    <div v-if="stage === 2">
      <OTP />
    </div>
  </div>
</template>
<script setup>
import OTP from "./OTP.vue";
import CurrencyInput from "~/components/CurrencyInput";
import { ref, reactive, inject } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { toast } from 'vue3-toastify';
import { loginUser } from "~/services/authservices";


const stage = ref(1);
const details = inject("details");
const form = reactive({
  bankName: "",
  accountName: "",
  pin: "",
  accountNo: "",
  amount: "",
});
const isLoading = ref(false);

const rules = {
  bankName: required,
  accountName: required,
  accountNo: required,
  pin: required,
  amount: required,
};

const invalidCredentials = ref(false);
const v$ = useVuelidate(rules, form);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;
  loginUser(form)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Login successful");
        window.location.reload();
      }
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error((err.response.data.message || err.response.data.Message));
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
