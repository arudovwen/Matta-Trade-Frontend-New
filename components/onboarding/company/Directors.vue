<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-useless-escape -->
<template>
  <div class="gap-y-2 flex flex-col p-6 lg:p-10">
    <div class="mb-5 text-center text-[13px]"><p>STEP 2/3</p></div>
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
            class="flex-1 rounded-lg py-1 pr-[14px] pl-2 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20 flex items-center justify-between"
          >
            <span>Director name</span>
            <span class="flex gap-x-3 items-center">
              <span class="p-1"><i class="uil uil-pen"></i></span>
              <span class="p-1"
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
            :class="
              !form.directors.length
                ? 'text-primary'
                : 'bg-primary-500 text-white mx-auto px-8 py-3 '
            "
          >
            <span class=""> + Add new director</span>
          </button>
        </div>
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

import { useToast } from "vue-toastification";
import {
  additionalInfo,
  setOnboardingcomplete,
} from "@/services/onboardingservices";
import { useRouter } from "vue-router";
// import { getCompanyProfile } from "@/services/settingservices";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const open = ref(false);

const toast = useToast();

const form = reactive({
  directors: "",
});

const isLoading = ref(false);

//Timer

// const isDisabled = ref(false);

// eslint-disable-next-line no-unused-vars
async function handleSubmit() {
  isLoading.value = true;

  additionalInfo(form)
    .then((res) => {
      if (res.status === 200) {
        setOnboardingcomplete();
        let loggedUser = store.getters.loggedUser;
        loggedUser.onboardingPageStatus = 1;
        store.commit("setUser", loggedUser);
        router.push("/onboarding/company?onboarding_stage=3");
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response.data.Message, {
        position: "bottom",
      });
    });
}
provide("open", open);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("@/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
