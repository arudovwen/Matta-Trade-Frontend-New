<template>
  <div class="gap-y-2 flex flex-col">
    <!-- Top bar   -->
    <div class="p-6 lg:p-8 bg-white rounded-lg">
      <div class="mb-12"><Breadcrumbs /></div>
      <div class=" justify-between items-end mb-8">
        <h1
          class="text-3xl lg:text-[48px] lg:leading-[56px] text-matta-black col-span-1 font-medium capitalize mb-6"
        >
          Personal settings
        </h1>
        <div />
      </div>
      <div class="flex justify-between items-center mb-10">
        <div class="flex items-center">
          <span>
            <span
              v-if="!image"
              class="h-24 w-24 rounded-full flex items-center text-xs bg-[#F1F3F5] mr-4 justify-center"
              >Photo</span
            >
            <img
              v-else
              :src="image"
              class="h-24 w-24 rounded-full flex items-center bg-[#F1F3F5] mr-4 justify-center"
            />
          </span>
        </div>
        <div class="flex items-center gap-x-3">
          <label for="upload">
            <span
              class="text-primary border border-primary rounded-full px-6 py-3 text-sm cursor-pointer"
            >
              Upload photo
            </span>
            <input
              @change="handleEvent($event)"
              type="file"
              accept="image/*"
              id="upload"
              class="hidden"
            />
          </label>
        </div>
      </div>
      <form @submit.prevent="handleSubmit">
        <div>
          <div class="grid lg:grid-cols-2 gap-x-4">
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
          <div class="grid lg:grid-cols-2 gap-x-4">
            <div class="mb-6">
              <label class="mb-2 font-normal text-xs block">Country</label>
              <div class="flex relative">
                <!-- <div class="flex relative items-center w-full">
                  <select
                    v-model="v$.country.$model"
                    :class="{ 'border-red-500': v$.country.$error }"
                    class="rounded-lg appearance-none px-5 py-3 h-12 border w-full bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  >
                    <option v-for="z in CountryList" :key="z" :value="z.name">
                      <span> {{ z.name }}</span>
                    </option>
                  </select>
                  <i
                    class="uil uil-sort absolute right-3 pointer-events-none"
                  ></i>
                </div> -->
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
              <label class="mb-2 font-normal text-xs block">State</label>
              <!-- <div class="flex relative items-center w-full">
                <select
                  v-model="v$.city.$model"
                  :class="{ 'border-red-500': v$.city.$error }"
                  class="rounded-lg appearance-none px-5 py-3 h-12 border w-full bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                >
                  <option v-for="z in states" :key="z" :value="z.name">
                    <span class="flex gap-x-6">
                      <span> {{ z.name }}</span></span
                    >
                  </option>
                </select>
                <i
                  class="uil uil-sort absolute right-3 pointer-events-none"
                ></i>
              </div> -->
              <FormsStatesSelect v-model="v$.city.$model" :states="states" />
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
          <div class="grid lg:grid-cols-2 gap-x-4">
            <div class="mb-6">
              <label class="mb-2 font-normal text-xs block">Phone number</label>
              <div class="flex relative rounded-lg h-12">
                <FormsPhoneCodes v-model="form.code" />

                <input
                  :class="{ 'border-red-500': v$.phone.$error }"
                  v-model="v$.phone.$model"
                  class="flex-1 rounded-r-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
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
              <label class="mb-2 font-normal text-xs block">E-mail</label>
              <div class="flex relative items-center">
                <input
                  :value="form.email"
                  class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                  autocomplete="off"
                  autofocus="on"
                  disabled
                  readonnly
                />
                <i class="uil uil-lock absolute right-4 text-gray-600"></i>
              </div>
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
          <div class="mt-6">
            <button
              :disabled="isLoading"
              :class="isLoading && 'bg-primary/80'"
              type="submit"
              class="border-2 border-primary text-[13px] bg-primary-500 uppercase text-white rounded-full block w-full lg:w-auto px-6 py-3 hover:bg-primary/80"
            >
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="grid grid-rows-2 lg:grid-cols-2 gap-2">
      <div class="p-6 lg:p-8 rounded-lg bg-white col-span-1 row-span-2">
        <form @submit.prevent="handlePassword">
          <legend class="font-medium mb-4">Change Password</legend>

          <div class="mb-6">
            <label class="mb-2 font-normal text-xs block text-matta-black"
              >Password</label
            >
            <div class="relative flex items-center">
              <input
                :class="{ 'border-red-500': newv$.oldPassword.$error }"
                v-model="newv$.oldPassword.$model"
                class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                placeholder="Password"
                autocomplete="off"
                :type="!isOpen ? 'oldPassword' : 'text'"
              />
              <EyeIcon
                v-if="!isOpen"
                @click="isOpen = !isOpen"
                class="w-4 h-4 absolute cursor-pointer right-6"
              />
              <EyeSlashIcon
                @click="isOpen = !isOpen"
                v-else
                class="w-4 h-4 absolute cursor-pointer right-6"
              />
            </div>
            <div
              class="text-red-500 mt-1"
              v-for="error of newv$.oldPassword.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-error text-xs font-semibold">
                {{ error.$message }}
              </div>
            </div>
          </div>
          <div class="mb-6">
            <label class="mb-2 font-normal text-xs block text-matta-black"
              >New Password</label
            >
            <div class="relative flex items-center">
              <input
                :class="{ 'border-red-500': newv$.newPassword.$error }"
                v-model="newv$.newPassword.$model"
                class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                placeholder="Password"
                autocomplete="off"
                :type="!isOpen ? 'oldPassword' : 'text'"
              />
              <EyeIcon
                v-if="!isOpen"
                @click="isOpen = !isOpen"
                class="w-4 h-4 absolute cursor-pointer right-6"
              />
              <EyeSlashIcon
                @click="isOpen = !isOpen"
                v-else
                class="w-4 h-4 absolute cursor-pointer right-6"
              />
            </div>
            <div
              class="text-red-500 mt-1"
              v-for="error of newv$.newPassword.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-error text-xs font-semibold">
                {{ error.$message }}
              </div>
            </div>
          </div>
          <div class="mb-12">
            <label class="mb-2 font-normal text-xs block text-matta-black"
              >Confirm Password</label
            >
            <div class="relative flex items-center">
              <input
                :class="{ 'border-red-500': newv$.confirmPassword.$error }"
                v-model="newv$.confirmPassword.$model"
                class="rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9] focus:outline-matta-black/20"
                placeholder="Confirm oldPassword"
                autocomplete="off"
                :type="!isOpen ? 'oldPassword' : 'text'"
              />
              <EyeIcon
                v-if="!isOpen"
                @click="isOpen = !isOpen"
                class="w-4 h-4 absolute cursor-pointer right-6"
              />
              <EyeSlashIcon
                @click="isOpen = !isOpen"
                v-else
                class="w-4 h-4 absolute cursor-pointer right-6"
              />
            </div>
            <div
              class="text-red-500 mt-1"
              v-for="error of newv$.confirmPassword.$errors"
              :key="error.$uid"
            >
              <div class="error-msg text-error text-xs font-semibold">
                {{ error.$message }}
              </div>
            </div>
          </div>

          <button
            :disabled="isLoading"
            :class="isLoading && 'bg-primary/80'"
            type="submit"
            class="border-2 border-primary text-[13px] bg-primary-500 uppercase text-white rounded-full block w-full lg:w-auto px-6 py-3 hover:bg-primary/80"
          >
            Save changes
          </button>
        </form>
      </div>
      <div class="p-6 lg:p-8 rounded-lg bg-white col-span-1">
        <form>
          <legend class="font-medium mb-4">Timezone</legend>
          <div class="mb-10">
            <div class="flex relative items-center w-full">
              <select
                v-model="form.timezone"
                class="appearance-none rounded-lg px-5 py-3 h-12 w-full border bg-[#F1F3F5] placeholder:text-[#B6B7B9]"
              >
                <option v-for="z in zones" :key="z">
                  ({{ moment.tz(new Date(), z).format("z - Z") }})
                  {{ moment.tz(new Date(), z).format("zz") }} {{ z }}
                </option>
              </select>
              <i class="uil uil-sort absolute right-3 pointer-events-none"></i>
            </div>
          </div>

          <button
            @click="setTimezone"
            :disabled="isLoading"
            :class="isLoading && 'bg-primary/80'"
            type="button"
            class="border-2 border-primary text-[13px] bg-primary-500 uppercase text-white rounded-full block w-full lg:w-auto px-6 py-3 hover:bg-primary/80"
          >
            Save changes
          </button>
        </form>
      </div>
      <div class="p-6 lg:p-8 rounded-lg bg-white col-span-1 hidden">
        <h5 class="font-medium mb-4">Delete account</h5>
        <p class="mb-8 text-base">
          You can delete your account any time. Yet note we cannot revert your
          account back.
        </p>
        <div>
          <button
            type="button"
            @click="handleDelete('delete')"
            class="text-primary border border-primary rounded-full px-6 py-3 text-sm hover:bg-priamry/70"
          >
            Delete account
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
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full"
              >
                <div
                  class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                  v-if="isShowing == 'crop'"
                >
                  <div class="flex justify-between mb-5 items-center">
                    <h4 class="font-medium text-matta-black text-xl">
                      Customize photo
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
                    :stencil-component="ImageStencil"
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
                <div
                  class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                  v-if="isShowing == 'delete'"
                >
                  <div class="flex justify-between mb-5 items-center">
                    <h4 class="font-medium text-matta-black text-xl">
                      Delete Account
                    </h4>
                    <i
                      class="uil uil-times cursor-pointer text-lg"
                      @click="open = false"
                    ></i>
                  </div>

                  <p class="text-sm text-matta-black mb-2">
                    By deleting account, you will delete all data. Please, type
                    ‘Delete’ to confirm.
                  </p>
                  <input
                    v-model="deleteText"
                    class="bg-[#F1F3F5] text-sm px-4 py-2 h-12 rounded-lg w-full"
                  />

                  <div class="flex justify-end gap-x-2 items-center mt-8">
                    <button
                      type="button"
                      @click="open = false"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-matta-black hover:bg-gray-100 text-[13px] uppercase"
                    >
                      Cancel
                    </button>

                    <button
                      @click="deleteAccount"
                      :disabled="deleteText !== 'Delete'"
                      :class="deleteText !== 'Delete' && 'bg-primary/70'"
                      class="appearance-none leading-none px-8 py-3 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
                    >
                      Delete
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
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";
import moment from "moment-timezone";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  maxLength,
  minLength,
  numeric,
} from "@vuelidate/validators";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
// eslint-disable-next-line no-unused-vars

import {
  getProfile,
  deleteaccount,
  settimezone,
  updateProfile,
  changepassword,
} from "~/services/settingservices";
import { useToast } from "vue-toastification";
import countries from "~/utils/countries.json";

const store = useAuthStore();
const deleteText = ref("");
const isShowing = ref("crop");
const open = ref(false);
const img = ref("");
const image = ref(null);
const coordinate = ref(null);
const cropper = ref(null);
const route = useRoute();
const isOpen = ref(false);
const zones = moment.tz.names();
const toast = useToast();
const abbrs = {
  EST: "Eastern Standard Time",
  EDT: "Eastern Daylight Time",
  CST: "Central Standard Time",
  CDT: "Central Daylight Time",
  MST: "Mountain Standard Time",
  MDT: "Mountain Daylight Time",
  PST: "Pacific Standard Time",
  PDT: "Pacific Daylight Time",
  GMT: "Greenwich Mean Time",
  CAT: "Central Africa Time",
  WAT: "Western Africa Time",
  EAT: "Eastern Africa Time",
  EET: "Eastern European Time",
};

// const country = computed(() => {
//   return CountryList.map((item) => {
//     return {
//       id: "",
//       name: `${item.flag} ${item.name}`,
//       value: item.dial_code,
//     };
//   });
// });

moment.fn.zoneName = function () {
  var abbr = this.zoneAbbr();
  return abbrs[abbr] || abbr;
};
defineProps(["title"]);
const isLoading = ref(false);
onMounted(() => {
  getProfile().then((res) => {
    form.photo = image.value = res.data.data.photo;
    form.firstName = res.data.data.firstName;
    form.lastName = res.data.data.lastName;
    form.country = res.data.data.country;
    form.city = res.data.data.city;
    form.email = res.data.data.email;
    form.phone = res.data.data.phone;
    form.timezone = res.data.data.timeZone;
  });
});

const form = reactive({
  photo: "",
  firstName: "",
  lastName: "",
  country: "",
  city: "",
  email: "",
  phone: "",
  timezone: "",
  code: "+234",
});
const newform = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const validPassword = (value) => {
  let res = /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value);
  return res;
};
const specialPassword = (value) => {
  let res = /[@&!%#$%]/.test(value);
  return res;
};
const samePassword = (value) => value === newform.newPassword;
const newrules = {
  oldPassword: {
    required: helpers.withMessage("Password field cannot be empty", required),
    minLength: minLength(8),
    maxLength: maxLength(16),
    validPassword: helpers.withMessage(
      "Password must include UPPER/lowercase characters and number",
      validPassword
    ),
    specialPassword: helpers.withMessage(
      "Password must contain at least 1 of the special  characters @&!-%#$%",
      specialPassword
    ),
  },
  newPassword: {
    required: helpers.withMessage("Password field cannot be empty", required),
    minLength: minLength(8),
    maxLength: maxLength(16),
    validPassword: helpers.withMessage(
      "Password must include UPPER/lowercase characters and number",
      validPassword
    ),
    specialPassword: helpers.withMessage(
      "Password must contain at least 1 of the special  characters @&!-%#$%",
      specialPassword
    ),
  },
  confirmPassword: {
    required: helpers.withMessage(
      "Confirm Password field cannot be empty",
      required
    ),
    minLength: minLength(8),
    maxLength: maxLength(16),
    validPassword: helpers.withMessage(
      "Confirm Password is invalid",
      validPassword
    ),
    samePassword: helpers.withMessage("Passwords do not match!", samePassword),
  },
};
const states = computed(() => {
  if (!form.country) return [];
  return (
    countries.find(
      (item) => form.country.toLowerCase() === item.name.toLowerCase()
    ).states || []
  );
});
function handleDelete(val) {
  isShowing.value = val;
  open.value = true;
}
function deleteAccount() {
  deleteaccount.then((res) => {
    if (res.status == 200) {
      toast.info("Account deleted successfully");
      store.logOut()
      window.location.href = "/";
    }
  });
}
async function handlePassword() {
  const validity = await newv$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  changepassword(newform)
    .then((res) => {
      if (res.status === 200) {
        toast.info("Password updated successfully");
        isLoading.value = false;
        newform.oldPassword = "";
        newform.newPassword = "";
        newform.confirmPassword = "";
      }
    })

    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response.data.Message);
    });
}
function setTimezone() {
  settimezone(form).then((res) => {
    if (res.status == 200) {
      toast.info("timezone updated successfully");
    }
  });
}
function handleEvent(e) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  if (img.value) {
    URL.revokeObjectURL(img.value);
  }
  img.value = URL.createObjectURL(files[0]);
  isShowing.value = "crop";
  open.value = true;
}

function crop() {
  const { coordinates, canvas } = cropper.value.getResult();
  coordinate.value = coordinates;
  image.value = canvas.toDataURL();
  open.value = false;
  form.photo = canvas.toDataURL().replace("data:", "").replace(/^.+,/, "");
}
const validPhoneLength = (value) =>
  form.code === "+234" ? value.length > 9 && value.length < 12 : true;
const rules = {
  email: {
    required,
    email: helpers.withMessage("Email is invalid", email),
    maxLength: maxLength(50),
  },
  firstName: {
    required,
    maxLength: maxLength(50),
  },
  lastName: {
    required,
    maxLength: maxLength(50),
  },
  country: {
    required,
    maxLength: maxLength(50),
  },
  city: {
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
  timezone: {
    required,
    maxLength: maxLength(250),
  },
  photo: {
    required,
  },
};
const fullName = computed(() => {
  return `${form.firstName} ${form.lastName}`;
});
const v$ = useVuelidate(rules, form);
const newv$ = useVuelidate(newrules, newform);
async function handleSubmit() {
  const validity = await v$.value.$validate();
  if (!validity) return;
  isLoading.value = true;

  updateProfile(form)
    .then((res) => {
      if (res.status === 200) {
        store.updateUser(fullName.value);
        toast.info("Profile updated successfully");
        isLoading.value = false;
      }
    })
    .catch((err) => {
      isLoading.value = false;

      toast.error(err.response.data.Message);
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
