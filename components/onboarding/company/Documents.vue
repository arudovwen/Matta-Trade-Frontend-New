<!-- eslint-disable no-useless-escape -->
<template>
  <div class="gap-y-2 flex flex-col p-6 lg:p-10">
    <div class="mb-5 text-center text-[13px]"><p>STEP 3/4</p></div>
    <!-- Top bar   -->
    <div class="md:max-w-[550px] mx-auto w-full">
      <div class="">
        <div class="mb-8">
          <h1
            class="text-3xl lg:text-[48px] leading-[56px] text-matta-black col-span-1 font-medium text-center mb-1 lg:mb-8"
          >
            Company Documents
          </h1>
          <p class="text-sm lg:text-base text-center">
            Fill in the legal information about the company
          </p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div>
            <div class="grid gap-y-4">
              <FileUpload
                label="Memorandum and Articles of Association"
                id="mermat"
              />
              <FileUpload label="Certificate of Incorporation" id="cac" />
              <FileUpload label="CAC Status Report" id="statusReport" />
            </div>
            <div class="flex justify-center gap-x-4 items-center mt-16 w-full">
              <router-link
                to="/onboarding/company?onboarding_stage=2"
                class="w-1/2 lg:w-auto"
              >
                <button
                  type="button"
                  class="appearance-none leading-none px-10 py-4 rounded-lg w-full lg:w-auto text-matta-black border border-[#E7EBEE] hover:bg-gray-100 text-[13px] uppercase"
                >
                  Back
                </button>
              </router-link>

              <button
                :disabled="v$.$silentErrors.length || isLoading"
                :class="{
                  'opacity-60 cursor-not-allowed': v$.$silentErrors.length,
                }"
                class="appearance-none leading-none px-10 py-4 grid-cols-1 w-1/2 lg:w-auto lg:grid-cols-2 gap-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
              >
                <i
                  class="fa fa-spinner fa-spin"
                  v-show="isLoading"
                  aria-hidden="true"
                ></i>
                <span v-show="!isLoading">Next</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import "vue-advanced-cropper/dist/style.css";
import { ref, reactive, onMounted, provide } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import { additionalInfo } from "@/services/onboardingservices";
import { useRouter } from "vue-router";
// eslint-disable-next-line no-unused-vars
import { getCompanyProfile } from "@/services/settingservices";
import { useStore } from "vuex";

// eslint-disable-next-line no-unused-vars
const store = useStore();
const router = useRouter();
const toast = useToast();

const form = reactive({
  cac: "",
  mermat: "",
  statusReport: "",
});

const isLoading = ref(false);

onMounted(() => {});

// eslint-disable-next-line no-unused-vars
function handleChange(id, value) {
  if (id === "cac") {
    form.cac = value;
  }
  if (id === "mermat") {
    form.mermat = value;
  }
  if (id === "statusReport") {
    form.statusReport = value;
  }
}

const rules = {
  cac: {
    required,
  },
  mermat: {
    required,
  },
  statusReport: {
    required,
  },
};

const invalidCredentials = ref(false);
const v$ = useVuelidate(rules, form);

//Timer

// const isDisabled = ref(false);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  additionalInfo(form)
    .then((res) => {
      if (res.status === 200) {
        router.push("/onboarding/company?onboarding_stage=4");
      }
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error(err.response.data.Message, {
        position: "bottom",
      });
    });
}
provide("handleChange", handleChange);
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("@/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
