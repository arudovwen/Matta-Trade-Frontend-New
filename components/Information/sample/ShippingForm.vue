<template>
  <div class="p-6">
    <h3 class="font-medium text-2xl mb-8">Add new shipping address</h3>
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
      <div class="grid grid-cols-2 gap-x-4">
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block">Country</label>
          <div class="relative">
            <FormsCountriesSelect v-model="v$.country.$model" />
            <div
              class="text-red-500 mt-1"
              v-for="error of v$.country.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-error text-xs font-semibold">
                {{ error.$message }}
              </div>
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block">City</label>
          <input
            v-model="v$.city.$model"
            :class="{ 'border-red-500': v$.city.$error }"
            class="px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] rounded-lg focus:outline-matta-black/20"
            autocomplete="off"
            autofocus="on"
            placeholder="Company city"
          />
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.city.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-4">
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block">Street</label>
          <input
            v-model="v$.street.$model"
            :class="{ 'border-red-500': v$.street.$error }"
            class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            autofocus="on"
          />
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.street.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label class="mb-2 font-normal text-xs block">Postal code</label>
          <input
            v-model="v$.postalCode.$model"
            :class="{ 'border-red-500': v$.postalCode.$error }"
            class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
            autocomplete="off"
            autofocus="on"
          />
          <div
            class="text-red-500 mt-1"
            v-for="error of v$.postalCode.$errors"
            :key="error.$uid"
          >
            <div class="error-msg text-error text-xs font-semibold">
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <label class="text-xs flex gap-x-2 items-center">
          <input
            type="checkbox"
            v-model="form.isDefault"
            class="accent-matta-black"
          />Mark as Default shipping address
        </label>
      </div>
      <div class="flex justify-end gap-x-4 mt-8">
        <button
          type="button"
          @click="togglePopup"
          class="text-xs upperase hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="isLoading"
          class="text-xs uppercase bg-primary-500 text-white px-5 py-4 rounded-lg hover:bg-primary/70 disabled:opacity-60"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import { toast } from 'vue3-toastify';
import { addshipping } from "~/services/cartservice";

const togglePopup = inject("togglePopup");
const handleReload = inject("handleReload");

const form = reactive({
  firstName: "",
  lastName: "",
  country: "",
  city: "",
  street: "",
  postalCode: "",
  isDefault: false,
});
const isLoading = ref(false);

const rules = {
  firstName: {
    required,
    maxLength: maxLength(50),
  },

  postalCode: {
    required,
  },
  lastName: {
    required,
  },
  country: {
    required,
  },
  street: {
    required,
  },
  city: {
    required,
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
        toast.info("Address saved");
        isLoading.value = false;
        handleReload();
      }
    })
    .catch((err) => {
      isLoading.value = false;

      toast.error((err.response.data.message || err.response.data.Message));
    });
}
</script>
