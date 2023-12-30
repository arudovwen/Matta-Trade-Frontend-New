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
              <FileUpload
                label="Certificate of Incorporation"
                id="incorporation"
              />
              <FileUpload label="CAC Status Report" id="statusReport" />
            </div>
            <div class="flex justify-center gap-x-4 items-center mt-16 w-full">
              <router-link
                to="/onboarding/company?onboarding_stage=2"
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
                :disabled="
                  form.companyDocuments.some((i) => i.url === '') || isLoading
                "
                :class="{
                  'opacity-60 cursor-not-allowed': form.companyDocuments.some(
                    (i) => i.url === ''
                  ),
                }"
                class="appearance-none leading-none px-20 py-4 grid-cols-1 w-1/2 lg:w-auto lg:grid-cols-2 gap-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
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
import { toast } from 'vue3-toastify';
import { useRouter } from "vue-router";
// eslint-disable-next-line no-unused-vars
import { getCompanyProfile, updateDocuments } from "@/services/settingservices";
import { useStore } from "vuex";

const router = useRouter();


const form = reactive({
  companyDocuments: [
    {
      url: "",
      documentType: 0,
    },
    {
      url: "",
      documentType: 1,
    },
    {
      url: "",
      documentType: 2,
    },
  ],
});

const isLoading = ref(false);

onMounted(() => {});

// eslint-disable-next-line no-unused-vars
function handleChange(id, value) {
  form.companyDocuments.map((i) => {
    if (id === "incorporation" && i.documentType === 0) {
      i.url = value;
    }
    if (id === "mermat" && i.documentType === 1) {
      i.url = value;
    }
    if (id === "statusReport" && i.documentType === 2) {
      i.url = value;
    }
  });
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

//Timer

// const isDisabled = ref(false);

async function handleSubmit() {
  if (form.companyDocuments.some((i) => i.url === "")) return;
  isLoading.value = true;

  updateDocuments(form)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Documents saved");
        router.push("/onboarding/company?onboarding_stage=4");
      }
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error(err.response.data.Message);
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
