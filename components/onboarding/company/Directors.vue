<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-useless-escape -->
<template>
  <div class="gap-y-2 flex flex-col p-6 lg:p-10">
    <div class="mb-5 text-center text-[13px]"><p>STEP 4/4</p></div>
    <!-- Top bar   -->
    <div class="md:max-w-[550px] mx-auto w-full">
      <div class="">
        <div class="mb-8">
          <h1
            class="text-3xl lg:text-[48px] leading-[56px] text-matta-black col-span-1 font-medium text-center mb-1 lg:mb-8"
          >
            Add directors
          </h1>
          <p class="text-sm lg:text-base text-center">
            Fill in the legal information about the company
          </p>
        </div>

        <div class="grid gap-y-6 mb-6">
          <div
            v-for="(director, id) in form.directors"
            :key="id"
            class="flex-1 rounded-lg py-1 pr-[14px] pl-2 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20 flex items-center justify-between"
          >
            <span>{{ director.firstName }} {{ director.lastName }}</span>
            <span class="flex gap-x-3 items-center">
              <span class="p-1"><i class="uil uil-pen"></i></span>
              <span class="p-1" @click="form.directors.splice(id, 1)"
                ><i class="uil uil-trash text-red-500"></i
              ></span>
            </span>
          </div>
        </div>
        <div>
          <button
            type="button"
            @click="open = true"
            class="rounded-lg hover:opacity-70 text-[13px] flex items-center"
            :class="text - primary"
          >
            <span class=""> + Add new director</span>
          </button>
        </div>
      </div>
      <div class="flex justify-center gap-x-4 items-center mt-20 w-full">
        <router-link
          to="/onboarding/company?onboarding_stage=3"
          class="w-1/2 lg:w-auto"
        >
          <button
            type="button"
            class="appearance-none leading-none px-20 py-4 rounded-lg w-full lg:w-auto text-matta-black border border-[#E7EBEE] hover:bg-gray-100 text-[13px] uppercase"
          >
            Back
          </button>
        </router-link>

        <button
        @click="handleSubmit"
          :disabled="!form.directors.length || isLoading"
          :class="{
            'opacity-60 cursor-not-allowed': !form.directors.length,
          }"
          class="appearance-none leading-none px-20 py-4 grid-cols-1 w-1/2 lg:w-auto lg:grid-cols-2 gap-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
        >
          <i
            class="fa fa-spinner fa-spin"
            v-show="isLoading"
            aria-hidden="true"
          ></i>
          <span v-show="!isLoading">Complete</span>
        </button>
      </div>
    </div>
  </div>
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>
        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div
            class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
              >
                <div class="p-6">
                  <OnboardingCompanyDirectorForm />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import "vue-advanced-cropper/dist/style.css";
import { ref, reactive, provide } from "vue";

import { toast } from 'vue3-toastify';
import {
  additionalInfo,
  setOnboardingcomplete,
} from "@/services/onboardingservices";
import { useRouter } from "vue-router";
// import { getCompanyProfile } from "@/services/settingservices";
import { useStore } from "vuex";
import { updateDirectors } from "~/services/settingservices";

const store = useStore();
const router = useRouter();
const open = ref(false);



const form = reactive({
  directors: [],
});

const isLoading = ref(false);

//Timer

// const isDisabled = ref(false);

// eslint-disable-next-line no-unused-vars
async function handleSubmit() {
  if (!form.directors.length) return;
  isLoading.value = true;

  updateDirectors(form)
    .then((res) => {
      if (res.status === 200) {
        setOnboardingcomplete();
        window.location.href = "/onboarding/complete/company";
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response.data.Message);
    });
}
provide("open", open);
provide("directors", form.directors);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("@/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
