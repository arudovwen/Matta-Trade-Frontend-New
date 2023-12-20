<template>
  <h3 class="font-medium text-2xl mb-8">Add director</h3>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-2 gap-x-4">
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block">First name</label>
        <input
          v-model="v$.firstName.$model"
          :class="{ 'border-red-500': v$.firstName.$error }"
          class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.firstName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block">Last name</label>
        <input
          v-model="v$.lastName.$model"
          :class="{ 'border-red-500': v$.lastName.$error }"
          class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.lastName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label for="email" class="mb-2 font-normal text-xs block">E-mail</label>
      <input
        v-model="v$.email.$model"
        :class="{ 'border-red-500': v$.email.$error }"
        class="rounded-lg px-4 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
        placeholder="E-mail"
        autocomplete="off"
        aria-autocomplete="none"
        type="email"
        id="email"
      />
      <div
        class="text-red-500 mt-1"
        v-for="error of v$.email.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="mb-6">
      <label class="mb-2 font-normal text-xs block" for="phone"
        >Phone number <span class="text-red-500 pl-[.02rem]">*</span></label
      >
      <div class="flex relative rounded-lg h-12">
        <FormsPhoneCodes v-model="form.code" />

        <input
          :class="{ 'border-red-500': v$.phone.$error }"
          v-model="v$.phone.$model"
          class="flex-1 rounded-r-lg px-4 py-3 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          aria-autocomplete="none"
          placeholder="08160723884"
          role="presentation"
          id="phone"
        />
      </div>
      <div
        class="text-red-500 mt-1"
        v-for="error of v$.phone.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-4">
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block">BVN</label>
        <input
          v-model="v$.bvn.$model"
          :class="{ 'border-red-500': v$.bvn.$error }"
          class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.bvn.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="mb-2 font-normal text-xs block">Date of birth</label>
        <input
          v-model="v$.dob.$model"
          :class="{ 'border-red-500': v$.dob.$error }"
          class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
          autocomplete="off"
          autofocus="on"
          type="date"
        />
        <div
          class="text-red-500 mt-1"
          v-for="error of v$.dob.$errors"
          :key="error.$uid"
        >
          <div class="error-msg text-error text-xs font-semibold">
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-x-4 mt-8 w-full">
      <button
        type="button"
        @click="open = false"
        class="text-xs uppercase border border-gray-100 w-full px-5 py-4 rounded-lg"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="isLoading"
        class="text-xs uppercase bg-primary-500 text-white px-5 py-4 rounded-lg hover:bg-primary/70 disabled:opacity-60 w-full"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  maxLength,
  minLength,
  numeric,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import { addshipping } from "@/services/cartservice";

const open = inject("open");
const handleReload = inject("handleReload");
const toast = useToast();
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  code: "+234",
  phone: "",
  bvn: "",
  dob: "",
});
const isLoading = ref(false);
const validPhoneLength = (value) =>
  form.code === "+234" ? value.length > 9 && value.length < 12 : true;
const rules = {
  firstName: {
    required,
    maxLength: maxLength(50),
  },

  lastName: {
    required,
  },
  bvn: {
    required,
    minLength: minLength(10),
  },
  dob: {
    required,
  },
  email: {
    required: helpers.withMessage("Email field cannot be empty", required),
    email: helpers.withMessage("Email is invalid", email),
    maxLength: maxLength(50),
  },
  phone: {
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
  addshipping(form)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Address saved", {
          position: "bottom",
        });
        isLoading.value = false;
        handleReload();
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response.data.Message);
    });
}
</script>
