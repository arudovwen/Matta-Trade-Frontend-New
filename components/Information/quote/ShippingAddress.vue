<template>
  <form class="mt-8">
    <legend class="text-lg font-medium mb-1">Shipping Address</legend>
    <p class="text-sm text-[#ABABAB] mb-8">
      Choose your shipping options for samples requested.
    </p>
    <div class="mb-6 grid gap-y-3 border-gray-200 rounded-lg text-sm">
      <p>
        <span class="text-gray-500">Name:</span>
        {{ authStore.userInfo?.fullName }}
      </p>
      <p>
        <span class="text-gray-500">Email:</span>
        {{ authStore.userInfo?.email }}
      </p>
    </div>
    <div class="mb-6">
      <label class="mb-2 font-normal text-xs block">Phone number</label>

      <div class="flex relative rounded-lg h-12">
        <FormsPhoneCodes v-model="quoteForm.phoneCode" />

        <input
          v-model="request2$.phone.$model"
          class="flex-1 rounded-r-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20 placeholder:text-sm"
          autocomplete="off"
          autofocus="on"
          placeholder="08160723884"
          type="tel"
        />
      </div>
      <div
        class="text-red-500 mt-1"
        v-for="error of request2$.phone.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <div class="mb-6">
      <label class="mb-2 font-normal text-xs block">Address</label>
      <Listbox v-model="selectedoption">
        <div class="relative w-full">
          <ListboxButton
            class="relative w-full cursor-default rounded-lg min-h-[40px] border-[#D0D5DD] bg-[#F1F3F5] py-2 px-[15px] text-left shadow-[0px_1px_2px_rgba(16,24,40,0.05)] sm:text-[13px] flex items-center"
          >
            <span
              class="flex gap-x-1 text-[#101828] text-[13px] whitespace-nowrap"
              v-if="selectedoption"
              ><span class="font-medium">{{
                `${selectedoption.firstName} ${selectedoption.lastName}`
              }}</span
              >,
              <span class="truncate ... max-w-[170px]">{{
                selectedoption.street
              }}</span></span
            >

            <span
              class="block text-[#8F8C9A] text-[13px] whitespace-nowrap"
              v-else
              >Choose your shipping adress...</span
            >
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <i
                class="uil uil-angle-down absolute right-2 appearance-none"
              ></i>
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div>
              <ListboxOptions
                class="absolute mt-1 w-full z-40 rounded-lg border border-gray-200 bg-white px-6 pb-6 text-xs shadow-lg ring-1 ring-black ring-opacity-5 outline-0 sm:text-[13px]"
              >
                <div class="max-h-60 overflow-y-auto mb-3">
                  <ListboxOption
                    v-for="option in addresses"
                    v-slot="{ active }"
                    :key="option.name"
                    :value="option"
                    as="template"
                  >
                    <li
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'relative cursor-default select-none pt-6 pb-6 text-loft-black border-b hover:bg-gray-50',
                      ]"
                    >
                      <p class="text-sm font-medium mb-1">
                        {{ `${option.firstName} ${option.lastName}` }}
                      </p>
                      <p
                        class="flex items-center justify-start gap-x-2 text-xs"
                      >
                        <span>{{ option.country }}</span>
                        <span
                          class="p-[.15rem] rounded-full bg-[#DDDDDD]"
                        ></span>
                        <span class="line-clamp-1">{{ option.street }}</span>
                      </p>
                    </li>
                  </ListboxOption>
                </div>
                <button
                  type="button"
                  class="text-xs text-primary mt-2"
                  @click="isOpen = true"
                >
                  <i class="uil uil-plus"></i>
                  <span>Add new shipping address</span>
                </button>
              </ListboxOptions>
            </div>
          </transition>
        </div>
      </Listbox>
      <div
        class="text-red-500 mt-1"
        v-for="error of request2$.deliverAddress.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>

    <div class="mb-6">
      <label class="mb-2 font-normal text-xs block"
        >Additional information</label
      >
      <textarea
        v-model="request2$.additionalInformation.$model"
        placeholder=""
        row="4"
        class="placeholder:text-xs rounded-lg px-4 py-3 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
      ></textarea>
      <div
        class="text-red-500 mt-1"
        v-for="error of request2$.additionalInformation.$errors"
        :key="error.$uid"
      >
        <div class="error-msg text-error text-xs font-semibold">
          {{ error.$message }}
        </div>
      </div>
    </div>
  </form>
  <IndexModal :isOpen="isOpen" @togglePopup="isOpen = false">
    <template #content>
      <InformationQuoteShippingForm />
    </template>
  </IndexModal>
</template>
<script setup>
import {
  Listbox,
  // ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { ref } from "vue";
import { inject, onMounted, watch, provide } from "vue";
import { getalladdress } from "~/services/cartservice";
import { useStore } from "vuex";

const authStore = useAuthStore()
const store = useStore();
const request2$ = inject("request2$");
const quoteForm = inject("quoteForm");
const isOpen = ref(false);
const selectedoption = ref();
const addresses = ref([]);

onMounted(() => {
  getalladdress().then((res) => {
    addresses.value = res.data.data;
  });
});
watch(selectedoption, () => {
  quoteForm.deliverAddress = `${selectedoption.value.street}, ${selectedoption.value.city}, ${selectedoption.value.country}. ${selectedoption.value.postalCode}`;
});
function togglePopup() {
  isOpen.value = false;
}

function handleReload() {
  getalladdress().then((res) => {
    addresses.value = res.data.data;
  });
  togglePopup();
}
provide("handleReload", handleReload);
provide("togglePopup", togglePopup);
</script>
