<!-- eslint-disable no-useless-escape -->
<template>
  <div class="gap-y-2 flex flex-col p-6 lg:p-10">
    <div class="mb-5 text-center text-[13px]"><p>STEP 2/4</p></div>
    <!-- Top bar   -->
    <div class="md:max-w-[656px] mx-auto">
      <div class="">
        <div class="mb-8">
          <h1
            class="text-3xl lg:text-[48px] leading-[56px] text-matta-black col-span-1 font-medium text-center mb-1 lg:mb-8"
          >
            Add company information
          </h1>
          <p class="text-sm lg:text-base text-center">
            Fill in the legal information about the company
          </p>
        </div>
        <div
          class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-10 gap-y-8"
        >
          <div class="flex items-center">
            <span>
              <span
                v-if="!image"
                class="h-24 w-24 rounded-lg flex items-center text-xs bg-[#F1F3F5] mr-4 justify-center"
                ><i class="uil uil-image text-4xl text-gray-400"></i
              ></span>
              <img
                v-else
                :src="image"
                class="h-24 w-24 rounded-lg flex items-center bg-[#F1F3F5] mr-4 justify-center"
              />
            </span>
            <span>
              <p class="text-xs lg:text-sm font-medium mb-1">Company logo</p>
              <p class="text-xs lg:text-sm font-normal">
                Recommended 200x200 px
              </p>
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.logo.$errors"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-xs font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </span>
          </div>
          <div class="flex items-center gap-x-3">
            <label for="upload">
              <span
                class="text-primary border border-primary rounded-full px-6 py-3 text-xs lg:text-sm cursor-pointer"
              >
                Upload logo
              </span>
              <input
                @change="handleEvent($event)"
                type="file"
                accept="image/*"
                id="upload"
                class="hidden"
              />
            </label>
            <i
              v-if="image"
              @click="removeImage"
              class="uil uil-times ring-1 flex items-center justify-center ring-[#F1F3F5] text-lg text-matta-black rounded-full w-[46px] h-[46px]"
            ></i>
          </div>
        </div>
        <form @submit.prevent="handleSubmit">
          <div>
            <div class="grid grid-cosl-1 lg:grid-cols-2 gap-4">
              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block">
                  Company name
                  <span class="text-red-500 pl-[.02rem]">*</span></label
                >
                <input
                  v-model="v$.companyName.$model"
                  :class="{ 'border-red-500': v$.companyName.$error }"
                  class="rounded-lg px-5 py-3 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  autocomplete="off"
                  autofocus="on"
                  placeholder=""
                />
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.companyName.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block"
                  >Company sector
                  <span class="text-red-500 pl-[.02rem]">*</span></label
                >

                <div class="flex relative items-center">
                  <select
                    v-model="v$.companyType.$model"
                    :class="{ 'border-red-500': v$.companyType.$error }"
                    class="appearance-none rounded-lg px-5 py-3 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  >
                    <option disabled value="">Select sector</option>
                    <option
                      v-for="item in sectors"
                      :key="item.name"
                      :value="item.name"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                  <i
                    class="uil uil-angle-down absolute right-2 pointer-events-none"
                  ></i>
                </div>
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.companyType.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cosl-1 lg:grid-cols-2 gap-4">
              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block"
                  >Phone number
                  <span class="text-red-500 pl-[.02rem]">*</span></label
                >
                <div class="flex relative rounded-lg h-12">
                  <FormsPhoneCodes v-model="form.code" />

                  <input
                    :class="{ 'border-red-500': v$.phone.$error }"
                    v-model="v$.phone.$model"
                    class="flex-1 rounded-r-lg px-5 py-3 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                    autocomplete="off"
                    autofocus="on"
                    placeholder="08160723884"
                    type="tel"
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

              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block"
                  >E-mail <span class="text-red-500 pl-[.02rem]">*</span></label
                >
                <input
                  v-model="v$.email.$model"
                  :class="{ 'border-red-500': v$.email.$error }"
                  class="px-5 py-3 h-12 text-sm rounded-lg w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  autocomplete="off"
                  autofocus="on"
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
            </div>
            <div class="grid grid-cosl-1 lg:grid-cols-2 gap-4">
              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block">
                  Registration number
                  <span class="text-red-500 pl-[.02rem]">*</span></label
                >
                <input
                  v-model="v$.registrationNo.$model"
                  :class="{ 'border-red-500': v$.registrationNo.$error }"
                  class="rounded-lg px-5 py-3 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  autocomplete="off"
                  autofocus="on"
                  placeholder=""
                />
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.registrationNo.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block"
                  >TIN number
                  <span class="text-red-500 pl-[.02rem]">*</span></label
                >

                <input
                  v-model="v$.tin.$model"
                  :class="{ 'border-red-500': v$.tin.$error }"
                  class="rounded-lg px-5 py-3 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  autocomplete="off"
                  autofocus="on"
                  placeholder=""
                />
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.tin.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cosl-1 lg:grid-cols-2 gap-4">
              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block"
                  >Company website</label
                >
                <input
                  v-model="v$.website.$model"
                  :class="{ 'border-red-500': v$.website.$error }"
                  class="rounded-lg px-5 py-3 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  autocomplete="off"
                  autofocus="on"
                  placeholder="https://www.example.com"
                  type="url"
                />
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.website.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block">Fax</label>
                <input
                  v-model="v$.fax.$model"
                  :class="{ 'border-red-500': v$.fax.$error }"
                  class="rounded-lg px-5 py-3 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  autocomplete="off"
                  autofocus="on"
                  placeholder="Fax"
                />
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.fax.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-6">
              <label class="mb-2 font-normal text-xs block">Description</label>
              <textarea
                v-model="v$.description.$model"
                :class="{ 'border-red-500': v$.description.$error }"
                rows="4"
                placeholder="Company description"
                class="rounded-lg px-5 py-3 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
              ></textarea>
              <div
                class="text-red-500 mt-1"
                v-for="error of v$.description.$errors"
                :key="error.$uid"
              >
                <div class="error-msg text-error text-xs font-semibold">
                  {{ error.$message }}
                </div>
              </div>
            </div>

            <!-- <div class="">
              <div
                class="flex gap-x-3 relative items-center mb-3"
                v-for="(social, i) in form.socials"
                :key="i"
              >
                <div class="flex relative items-center">
                  <select
                    v-model="social.name"
                    class="appearance-none rounded-lg px-4 py-3 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  >
                    <option value="">Select</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">Linkedin</option>
                  </select>
                  <i
                    class="uil uil-angle-down absolute right-2 pointer-events-none"
                  ></i>
                </div>
                <input
                  v-model="social.link"
                  class="flex-1 rounded-lg px-4 py-3 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  autocomplete="off"
                  autofocus="on"
                  placeholder="https://facebook.com/pharmazell"
                />
                <i class="uil uil-times text-xl" @click="removesocial(i)"></i>
              </div>
              <button
                class="text-xs text-primary"
                type="button"
                @click="addsocial"
              >
                <i class="uil uil-plus"></i> Add social network
              </button>
            </div> -->
            <hr class="my-8" />

            <legend class="font-medium mb-6">Company Address</legend>

            <div class="grid grid-cosl-1 lg:grid-cols-2 gap-4">
              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block"
                  >Country
                  <span class="text-red-500 pl-[.02rem]">*</span></label
                >
                <div class="relative">
                  <FormsSelectComponent
                    :options="allcountries"
                    :showSearch="true"
                    :value="form.country"
                    @onGetData="getCountry"
                    containerStyle="w-full"
                    :classStyles="`${
                      v$.country.$error && 'border-red-500'
                    } rounded-lg appearance-none px-5 py-3 h-12 text-sm border w-full !bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20`"
                  />
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
                <label class="mb-2 font-normal text-xs block"
                  >State <span class="text-red-500 pl-[.02rem]">*</span></label
                >
                <FormsSelectComponent
                  :options="mystates"
                  :showSearch="true"
                  :value="form.state"
                  @onGetData="getState"
                  containerStyle="w-full"
                  :classStyles="`${
                    v$.state.$error && 'border-red-500'
                  } rounded-lg appearance-none px-5 py-3 h-12 text-sm border w-full !bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20`"
                />
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.state.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cosl-1 lg:grid-cols-2 gap-4">
              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block"
                  >City <span class="text-red-500 pl-[.02rem]">*</span></label
                >
                <input
                  v-model="v$.city.$model"
                  :class="{ 'border-red-500': v$.city.$error }"
                  class="px-5 py-3 h-12 text-sm w-full border rounded-lg bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
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
              <div class="mb-6">
                <label class="mb-2 font-normal text-xs block"
                  >Address
                  <span class="text-red-500 pl-[.02rem]">*</span></label
                >
                <input
                  v-model="v$.address.$model"
                  :class="{ 'border-red-500': v$.address.$error }"
                  class="rounded-lg px-5 py-3 h-12 text-sm w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  autocomplete="off"
                  autofocus="on"
                  placeholder="Company address"
                />
                <div
                  class="text-red-500 mt-1"
                  v-for="error of v$.address.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg text-error text-xs font-semibold">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-center gap-x-4 items-center mt-16 w-full">
              <router-link
                to="/onboarding/company?onboarding_stage=1"
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
                :disabled="v$.$silentErrors.length || isLoading"
                :class="{
                  'opacity-60 cursor-not-allowed': v$.$silentErrors.length,
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
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="flex justify-between mb-5 items-center">
                    <h4 class="font-medium text-matta-black text-xl">
                      Customize logo
                    </h4>
                    <i
                      class="uil uil-times cursor-pointer text-lg"
                      @click="open = false"
                    ></i>
                  </div>

                  <Cropper
                    ref="cropper"
                    class="cropper"
                    :src="img"
                    :stencil-size="{
                      width: 200,
                      height: 200,
                    }"
                  />
                  <div class="flex justify-end gap-x-2 items-center mt-8">
                    <button
                      @click="open = false"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
                    >
                      Cancel
                    </button>

                    <button
                      @click="crop"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
                    >
                      Save
                    </button>
                  </div>
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
import CountryList from "country-list-with-dial-code-and-flag";
import countries from "@/utils/countries.json";
import sectors from "@/utils/sectors.json";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { ref, reactive, onMounted, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  maxLength,
  url,
  numeric,
  minLength,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import {
  additionalInfo,
  uploadfile,
  setOnboardingcomplete,
} from "@/services/onboardingservices";
import { useRouter } from "vue-router";
import {
  getCompanyProfile,
  updateCompanyProfile,
} from "@/services/settingservices";

const authStore = useAuthStore();
const router = useRouter();
const open = ref(false);
const img = ref("");
const image = ref(null);
const coordinate = ref(null);
const cropper = ref(null);

const toast = useToast();

const form = reactive({
  companyName: "",
  companyType: "",
  phone: "",
  email: "",
  website: "",
  fax: "",
  description: "",
  country: "",
  city: "",
  state: "",
  address: "",
  logo: "",
  code: "+234",
  registrationNo: "",
  tin: "",
  socials: [
    {
      name: "",
      link: "",
    },
  ],
});

const isLoading = ref(false);
const validPhoneLength = (value) =>
  form.code === "+234" ? value.length > 9 && value.length < 12 : true;
const mystates = computed(() => {
  return states.value.map((item) => {
    return {
      id: item.code,
      name: item.name,
      value: item.name,
    };
  });
});

function getCountry(data) {
  form.country = data.value;
}
function getState(data) {
  form.state = data.value;
}
const allcountries = computed(() => {
  return CountryList.map((item) => {
    return {
      id: "",
      name: `${item.name}`,
      value: item.name,
    };
  });
});

function addsocial() {
  form.socials.push({
    name: "",
    link: "",
  });
}
onMounted(() => {
  getCompanyProfile().then((res) => {
    form.photo = image.value = res.data.data.photo;
    form.companyType = res.data.data.companyType;
    form.website = res.data.data.website;
    form.fax = res.data.data.fax;
    form.email = res.data.data.email;
    form.description = res.data.data.description;
    form.socials = res.data.data.socials || [
      {
        name: "",
        link: "",
      },
    ];
    form.address = res.data.data.address;
    form.country = res.data.data.country;
    form.city = res.data.data.city;
    form.tin = res.data.data.tin;
    form.registrationNo = res.data.data.registrationNo;
    form.phone = res.data.data.phone;
    image.value = form.logo = res.data.data.logo;
    form.state = res.data.data.state;

    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (
      !res.data.data.companyName ||
      !res.data.data.companyName.match(validRegex)
    ) {
      form.companyName = res.data.data.companyName;
    }
  });
});
function removesocial(i) {
  form.socials.splice(i, 1);
}
const states = computed(() => {
  if (!form.country) return [];
  return countries.find(
    (item) => item.name.toLowerCase() == form.country.toLowerCase()
  ).states;
});
function handleEvent(e) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  if (img.value) {
    URL.revokeObjectURL(img.value);
  }
  img.value = URL.createObjectURL(files[0]);
  open.value = true;
}

function crop() {
  const { coordinates, canvas } = cropper.value.getResult();
  coordinate.value = coordinates;
  image.value = canvas.toDataURL();
  open.value = false;
  form.logo = canvas.toDataURL().replace("data:", "").replace(/^.+,/, "");
  uploadfile({
    base64: canvas.toDataURL().replace("data:", "").replace(/^.+,/, ""),
  }).then((res) => {
    form.logo = res.data.message;
  });
}

const rules = {
  email: {
    required,
    email: helpers.withMessage("Email is invalid", email),
    maxLength: maxLength(50),
  },
  companyName: {
    required,
    maxLength: maxLength(50),
  },
  website: {
    maxLength: maxLength(50),
    url,
  },
  country: {
    required,
    maxLength: maxLength(50),
  },
  city: {
    required,
    maxLength: maxLength(50),
  },
  address: {
    required,
    maxLength: maxLength(250),
  },
  tin: { required, minLength: minLength(7) },
  registrationNo: { required, minLength: minLength(14) },
  companyType: { required },
  state: {
    required,
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
  fax: {
    maxLength: maxLength(50),
  },
  description: {
    maxLength: maxLength(1000),
  },
  logo: {},
};

const invalidCredentials = ref(false);
const v$ = useVuelidate(rules, form);

//Timer

// const isDisabled = ref(false);

async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  updateCompanyProfile(form)
    .then((res) => {
      if (res.status === 200) {
        setOnboardingcomplete();
        authStore.updateUserInfo({ onboardingPageStatus: 1 });
        router.push("/onboarding/company?onboarding_stage=3");
      }
    })

    .catch((err) => {
      invalidCredentials.value = true;
      isLoading.value = false;

      toast.error(err.response.data.Message);
    });
}
function removeImage() {
  image.value = form.logo = "";
}
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("@/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>
